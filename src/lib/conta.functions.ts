import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const TOTAL_AULAS = 20;

function limpar(s: unknown, max: number) {
  return String(s ?? "").trim().slice(0, max);
}

type NovoAluno = { nome: string; email: string; senha: string; codigo: string };

function validarAluno(d: NovoAluno) {
  const v = { nome: limpar(d.nome, 100), email: limpar(d.email, 200).toLowerCase(), senha: String(d.senha ?? "").slice(0, 100), codigo: limpar(d.codigo, 60).toUpperCase() };
  if (!v.nome) throw new Error("Informe o nome.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) throw new Error("E-mail inválido.");
  if (v.senha.length < 6) throw new Error("A senha precisa ter pelo menos 6 caracteres.");
  return v;
}

async function criarConta(v: ReturnType<typeof validarAluno>, turma: string | null) {
  if (!process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.auth.signUp({
      email: v.email,
      password: v.senha,
      options: { data: { nome: v.nome, turma } },
    });
    if (error) {
      if (/already|registered|exists/i.test(error.message)) return { ok: false as const, erro: "Este e-mail já tem acesso. Use a opção Entrar." };
      if (/weak|pwned|easy to guess/i.test(error.message)) return { ok: false as const, erro: "Essa senha é muito fácil de adivinhar. Escolha outra, misturando letras e números." };
      if (/rate limit|too many requests/i.test(error.message)) return { ok: false as const, erro: "Muitas tentativas seguidas. Aguarde alguns instantes e tente novamente." };
      console.error("Erro criarConta signUp:", error);
      return { ok: false as const, erro: `Não foi possível criar o acesso: ${error.message}` };
    }
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return { ok: false as const, erro: "Este e-mail já tem acesso. Use a opção Entrar." };
    }
    return { ok: true as const };
  }
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: v.email,
    password: v.senha,
    email_confirm: true,
    user_metadata: { nome: v.nome, turma },
  });
  if (error) {
    if (/already|registered|exists/i.test(error.message)) return { ok: false as const, erro: "Este e-mail já tem acesso. Use a opção Entrar." };
    if (/weak|pwned|easy to guess/i.test(error.message)) return { ok: false as const, erro: "Essa senha é muito fácil de adivinhar. Escolha outra, misturando letras e números." };
    console.error(error);
    return { ok: false as const, erro: "Não foi possível criar o acesso agora." };
  }
  return { ok: true as const };
}

/** Público: o aluno cria o próprio acesso usando o código da turma. */
export const cadastrarAluno = createServerFn({ method: "POST" })
  .inputValidator((d: NovoAluno) => d)
  .handler(async ({ data }) => {
    let v;
    try {
      v = validarAluno(data);
    } catch (e) {
      return { ok: false as const, erro: (e as Error).message };
    }
    if (!v.codigo || v.codigo.length < 4) {
      return { ok: false as const, erro: "Código da turma inválido. Confira com o instrutor." };
    }
    if (process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: turma } = await supabaseAdmin.from("turmas").select("codigo").eq("codigo", v.codigo).eq("ativa", true).maybeSingle();
      if (!turma) return { ok: false as const, erro: "Código da turma inválido. Confira com o instrutor." };
      return criarConta(v, turma.codigo);
    }
    return criarConta(v, v.codigo);
  });

async function exigirAdmin(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (!data) throw new Error("Acesso restrito ao administrador.");
}

export type AlunoStatus = {
  id: string;
  nome: string;
  email: string;
  turma: string | null;
  criado_em: string;
  ultimo_acesso: string | null;
  concluidas: number;
  ultima_aula: string | null;
  atualizado_em: string | null;
  certificado: "emitido" | "revogado" | "nenhum";
  cert_codigo: string | null;
  cert_emitido_em: string | null;
  admin: boolean;
};

export const listarAlunos = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await exigirAdmin(context);
    const sb = context.supabase;
    const [perfis, progs, certs, papeis, turmas] = await Promise.all([
      sb.from("profiles").select("*").order("criado_em", { ascending: false }),
      sb.from("progresso").select("*"),
      sb.from("certificados").select("*"),
      sb.from("user_roles").select("user_id, role").eq("role", "admin"),
      sb.from("turmas").select("*").order("criado_em"),
    ]);
    let acesso = new Map<string, string | null>();
    if (process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      try {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: usuarios } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        acesso = new Map((usuarios?.users ?? []).map((u) => [u.id, u.last_sign_in_at ?? null]));
      } catch {
        /* sem chave service_role local */
      }
    }
    const alunos: AlunoStatus[] = (perfis.data ?? []).map((p) => {
      const pr = progs.data?.find((x) => x.user_id === p.id);
      const c = certs.data?.find((x) => x.user_id === p.id);
      const dados = (pr?.dados ?? {}) as { ultimo?: { aula: string } };
      return {
        id: p.id,
        nome: p.nome,
        email: p.email,
        turma: p.turma,
        criado_em: p.criado_em,
        ultimo_acesso: acesso.get(p.id) ?? pr?.atualizado_em ?? null,
        concluidas: pr?.concluidas ?? 0,
        ultima_aula: dados.ultimo?.aula ?? null,
        atualizado_em: pr?.atualizado_em ?? null,
        certificado: c ? (c.revogado ? "revogado" : "emitido") : (pr?.concluidas ?? 0) >= 20 ? "emitido" : "nenhum",
        cert_codigo: c?.codigo ?? null,
        cert_emitido_em: c?.emitido_em ?? null,
        admin: !!papeis.data?.some((r) => r.user_id === p.id),
      };
    });
    return { alunos, turmas: turmas.data ?? [] };
  });

export const criarAlunoAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: NovoAluno) => d)
  .handler(async ({ data, context }) => {
    await exigirAdmin(context);
    let v;
    try {
      v = validarAluno(data);
    } catch (e) {
      return { ok: false as const, erro: (e as Error).message };
    }
    return criarConta(v, v.codigo || null);
  });

export const definirCertificado = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string; acao: "emitir" | "revogar" }) => ({ userId: limpar(d.userId, 60), acao: d.acao === "revogar" ? "revogar" : "emitir" }))
  .handler(async ({ data, context }) => {
    await exigirAdmin(context);
    const { error } = await context.supabase
      .from("certificados")
      .upsert({ user_id: data.userId, revogado: data.acao === "revogar" }, { onConflict: "user_id" });
    if (error) throw new Error("Não foi possível alterar o certificado.");
    return { ok: true };
  });

export const salvarTurma = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { codigo: string; nome: string; ativa: boolean }) => ({ codigo: limpar(d.codigo, 40).toUpperCase(), nome: limpar(d.nome, 80), ativa: !!d.ativa }))
  .handler(async ({ data, context }) => {
    await exigirAdmin(context);
    if (data.codigo.length < 4) return { ok: false, erro: "Use um código com pelo menos 4 caracteres." };
    const { error } = await context.supabase.from("turmas").upsert(data, { onConflict: "codigo" });
    if (error) return { ok: false, erro: "Não foi possível salvar a turma." };
    return { ok: true };
  });

export const removerAluno = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { userId: string }) => ({ userId: limpar(d.userId, 60) }))
  .handler(async ({ data, context }) => {
    await exigirAdmin(context);
    if (data.userId === context.userId) return { ok: false, erro: "Você não pode remover o próprio acesso." };
    if (!process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      return { ok: false, erro: "Remoção de conta requer SUPABASE_SERVICE_ROLE_KEY no servidor." };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("progresso").delete().eq("user_id", data.userId);
    await supabaseAdmin.from("certificados").delete().eq("user_id", data.userId);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) return { ok: false, erro: "Não foi possível remover o acesso." };
    return { ok: true };
  });

export const editarTurma = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { antigo: string; codigo: string; nome: string; ativa: boolean }) => ({
    antigo: limpar(d.antigo, 40).toUpperCase(),
    codigo: limpar(d.codigo, 40).toUpperCase().replace(/\s+/g, "-"),
    nome: limpar(d.nome, 80),
    ativa: !!d.ativa,
  }))
  .handler(async ({ data, context }) => {
    await exigirAdmin(context);
    if (data.codigo.length < 4) return { ok: false, erro: "Use um código com pelo menos 4 caracteres." };
    const sb = context.supabase;
    if (data.codigo === data.antigo) {
      const { error } = await sb.from("turmas").update({ nome: data.nome, ativa: data.ativa }).eq("codigo", data.antigo);
      return error ? { ok: false, erro: "Não foi possível salvar a turma." } : { ok: true };
    }
    const { data: existe } = await sb.from("turmas").select("codigo").eq("codigo", data.codigo).maybeSingle();
    if (existe) return { ok: false, erro: "Já existe uma turma com esse código." };
    const { error } = await sb.from("turmas").insert({ codigo: data.codigo, nome: data.nome, ativa: data.ativa });
    if (error) return { ok: false, erro: "Não foi possível salvar a turma." };
    if (process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("profiles").update({ turma: data.codigo }).eq("turma", data.antigo);
    } else {
      await sb.from("profiles").update({ turma: data.codigo }).eq("turma", data.antigo);
    }
    await sb.from("turmas").delete().eq("codigo", data.antigo);
    return { ok: true };
  });

export const apagarTurma = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { codigo: string }) => ({ codigo: limpar(d.codigo, 40).toUpperCase() }))
  .handler(async ({ data, context }) => {
    await exigirAdmin(context);
    const { error } = await context.supabase.from("turmas").delete().eq("codigo", data.codigo);
    if (error) return { ok: false, erro: "Não foi possível apagar a turma." };
    if (process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("profiles").update({ turma: null }).eq("turma", data.codigo);
    } else {
      await context.supabase.from("profiles").update({ turma: null }).eq("turma", data.codigo);
    }
    return { ok: true };
  });
