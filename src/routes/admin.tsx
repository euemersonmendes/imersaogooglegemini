import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Award, Loader, Search, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { criarAlunoAdmin, definirCertificado, listarAlunos, removerAluno, salvarTurma, type AlunoStatus } from "@/lib/conta.functions";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import { useSessao } from "@/lib/sessao";
import { BOOK } from "@/content/imersao";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração — Imersão Gemini" },
      { name: "description", content: "Painel do instrutor: acessos dos alunos, certificados e andamento da turma." },
      { property: "og:title", content: "Administração — Imersão Gemini" },
      { property: "og:description", content: "Painel do instrutor da Imersão Gemini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const campo = "w-full rounded-xl border border-linha-2 bg-areia px-3 py-2.5 text-sm outline-none focus:border-cobre";

function data(d: string | null) {
  return d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";
}

function Admin() {
  const sessao = useSessao();
  if (!sessao.admin)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-areia px-5 text-center text-tinta">
        <h1 className="text-2xl font-bold">Área do administrador</h1>
        <p className="text-apagado">Seu acesso não tem permissão para esta página.</p>
        <Link to="/" className="btn-tinta rounded-xl px-5 py-2.5 font-semibold">Voltar à capa</Link>
      </div>
    );
  return <Painel />;
}

function Painel() {
  const qc = useQueryClient();
  const listar = useServerFn(listarAlunos);
  const { data, isLoading, error } = useQuery({ queryKey: ["admin-alunos"], queryFn: () => listar() });
  const [busca, setBusca] = useState("");
  const atualizar = () => qc.invalidateQueries({ queryKey: ["admin-alunos"] });

  const alunos = (data?.alunos ?? []).filter((a) => `${a.nome} ${a.email} ${a.turma ?? ""}`.toLowerCase().includes(busca.toLowerCase()));
  const todos = data?.alunos ?? [];
  const concluiram = todos.filter((a) => a.concluidas >= TOTAL_AULAS_CURSO).length;
  const media = todos.length ? Math.round((todos.reduce((s, a) => s + a.concluidas, 0) / todos.length / TOTAL_AULAS_CURSO) * 100) : 0;

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10">
        <Link to="/" className="selo flex items-center gap-2 text-apagado hover:text-cobre-texto">
          <ArrowLeft className="size-3.5" /> Voltar à capa
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Administração</h1>
        <p className="mt-1 text-apagado">Instrutor responsável: {BOOK.instrutor}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["Alunos", todos.length],
            ["Concluíram", concluiram],
            ["Andamento médio", `${media}%`],
            ["Certificados ativos", todos.filter((a) => a.certificado === "emitido").length],
          ].map(([r, v]) => (
            <div key={r} className="rounded-2xl border border-linha bg-branco p-5">
              <p className="text-sm text-apagado">{r}</p>
              <p className="mt-1 text-3xl font-bold">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="min-w-0 rounded-2xl border border-linha bg-branco p-5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold">Alunos</h2>
              <label className="relative ml-auto w-full sm:w-64">
                <Search className="absolute left-3 top-3 size-4 text-apagado" />
                <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar nome, e-mail ou turma" className={cn(campo, "pl-9")} />
              </label>
            </div>
            {isLoading && <p className="mt-6 flex items-center gap-2 text-apagado"><Loader className="size-4 animate-spin" /> Carregando…</p>}
            {error && <p className="mt-6 text-cobre-texto">Não foi possível carregar os alunos.</p>}
            <div className="mt-4 overflow-x-auto barra-clara">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-apagado">
                  <tr className="border-b border-linha">
                    <th className="py-2 pr-3">Aluno</th>
                    <th className="py-2 pr-3">Turma</th>
                    <th className="py-2 pr-3">Andamento</th>
                    <th className="py-2 pr-3">Último acesso</th>
                    <th className="py-2 pr-3">Certificado</th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((a) => <Linha key={a.id} a={a} aoMudar={atualizar} />)}
                  {!isLoading && !alunos.length && (
                    <tr><td colSpan={6} className="py-6 text-center text-apagado">Nenhum aluno encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex flex-col gap-6">
            <NovoAcesso turmas={data?.turmas ?? []} aoCriar={atualizar} />
            <Turmas turmas={data?.turmas ?? []} aoMudar={atualizar} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Linha({ a, aoMudar }: { a: AlunoStatus; aoMudar: () => void }) {
  const cert = useServerFn(definirCertificado);
  const remover = useServerFn(removerAluno);
  const [confirmar, setConfirmar] = useState(false);
  const pct = Math.round((a.concluidas / TOTAL_AULAS_CURSO) * 100);
  const mCert = useMutation({
    mutationFn: (acao: "emitir" | "revogar") => cert({ data: { userId: a.id, acao } }),
    onSuccess: (_r, acao) => { toast.success(acao === "emitir" ? "Certificado emitido." : "Certificado revogado."); aoMudar(); },
    onError: () => toast.error("Não foi possível alterar o certificado."),
  });
  const mRem = useMutation({
    mutationFn: () => remover({ data: { userId: a.id } }),
    onSuccess: (r) => { if (r.ok) { toast.success("Acesso removido."); aoMudar(); } else toast.error(r.erro); },
  });

  return (
    <tr className="border-b border-linha align-top last:border-0">
      <td className="py-3 pr-3">
        <p className="font-semibold">{a.nome || "—"} {a.admin && <span className="ml-1 rounded bg-cobre-suave px-1.5 py-0.5 text-[10px] font-bold uppercase text-cobre-texto">admin</span>}</p>
        <p className="text-xs text-apagado">{a.email}</p>
      </td>
      <td className="py-3 pr-3 font-mono text-xs">{a.turma ?? "—"}</td>
      <td className="py-3 pr-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-linha">
            <div className="h-full bg-verde" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs">{a.concluidas}/{TOTAL_AULAS_CURSO}</span>
        </div>
        <p className="mt-1 text-xs text-apagado">{a.ultima_aula ? `Parou na aula ${a.ultima_aula}` : "Ainda não começou"}</p>
      </td>
      <td className="py-3 pr-3 text-xs">{data(a.ultimo_acesso)}</td>
      <td className="py-3 pr-3">
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", a.certificado === "emitido" ? "bg-verde-suave text-verde-texto" : a.certificado === "revogado" ? "bg-cobre-suave text-cobre-texto" : a.concluidas >= TOTAL_AULAS_CURSO ? "bg-verde-suave text-verde-texto" : "bg-linha text-apagado")}>
          {a.certificado === "emitido" ? "Emitido" : a.certificado === "revogado" ? "Revogado" : a.concluidas >= TOTAL_AULAS_CURSO ? "Liberado" : "Pendente"}
        </span>
        <div className="mt-2">
          {a.certificado === "emitido" || (a.certificado === "nenhum" && a.concluidas >= TOTAL_AULAS_CURSO) ? (
            <button type="button" disabled={mCert.isPending} onClick={() => mCert.mutate("revogar")} className="text-xs font-semibold text-cobre-texto hover:underline">Revogar</button>
          ) : (
            <button type="button" disabled={mCert.isPending} onClick={() => mCert.mutate("emitir")} className="flex items-center gap-1 text-xs font-semibold text-tinta hover:underline">
              <Award className="size-3.5" /> Emitir
            </button>
          )}
        </div>
      </td>
      <td className="py-3 text-right">
        {confirmar ? (
          <span className="flex items-center justify-end gap-2 text-xs">
            Remover?
            <button type="button" onClick={() => mRem.mutate()} className="font-bold text-cobre-texto">Sim</button>
            <button type="button" onClick={() => setConfirmar(false)} className="text-apagado">Não</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirmar(true)} aria-label="Remover acesso" className="text-apagado hover:text-cobre-texto">
            <Trash2 className="size-4" />
          </button>
        )}
      </td>
    </tr>
  );
}

type Turma = { codigo: string; nome: string; ativa: boolean };

function NovoAcesso({ turmas, aoCriar }: { turmas: Turma[]; aoCriar: () => void }) {
  const criar = useServerFn(criarAlunoAdmin);
  const [f, setF] = useState({ nome: "", email: "", senha: "", codigo: "" });
  const m = useMutation({
    mutationFn: () => criar({ data: f }),
    onSuccess: (r) => {
      if (!r.ok) {
        toast.error(r.erro);
        return;
      }
      toast.success(`Acesso criado para ${f.email}. Envie o e-mail e a senha ao aluno.`);
      setF({ nome: "", email: "", senha: "", codigo: f.codigo });
      aoCriar();
    },
    onError: () => toast.error("Não foi possível criar o acesso."),
  });
  return (
    <section className="rounded-2xl border border-linha bg-branco p-5">
      <h2 className="flex items-center gap-2 text-xl font-bold"><UserPlus className="size-5" /> Criar acesso</h2>
      <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="mt-4 flex flex-col gap-3">
        <input required placeholder="Nome completo" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} className={campo} />
        <input required type="email" placeholder="E-mail" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={campo} />
        <input required minLength={6} placeholder="Senha inicial (mín. 6)" value={f.senha} onChange={(e) => setF({ ...f, senha: e.target.value })} className={campo} />
        <select value={f.codigo} onChange={(e) => setF({ ...f, codigo: e.target.value })} className={campo}>
          <option value="">Sem turma</option>
          {turmas.map((t) => <option key={t.codigo} value={t.codigo}>{t.codigo} {t.nome && `· ${t.nome}`}</option>)}
        </select>
        <button type="submit" disabled={m.isPending} className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-60">
          {m.isPending && <Loader className="size-4 animate-spin" />} Criar acesso
        </button>
      </form>
    </section>
  );
}

function Turmas({ turmas, aoMudar }: { turmas: Turma[]; aoMudar: () => void }) {
  const salvar = useServerFn(salvarTurma);
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const m = useMutation({
    mutationFn: (t: Turma) => salvar({ data: t }),
    onSuccess: (r) => { if (!r.ok) { toast.error(r.erro); return; } setCodigo(""); setNome(""); aoMudar(); },
  });
  return (
    <section className="rounded-2xl border border-linha bg-branco p-5">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Códigos de turma</h2>
        <Link to="/admin/turmas" className="ml-auto text-sm font-semibold text-cobre-texto hover:underline">Gerenciar turmas →</Link>
      </div>
      <p className="mt-1 text-sm text-apagado">Alunos usam o código para criar o próprio acesso. Desative para bloquear novos cadastros.</p>
      <ul className="mt-4 flex max-h-64 flex-col gap-2 overflow-y-auto barra-clara">
        {turmas.map((t) => (
          <li key={t.codigo} className="flex items-center gap-2 rounded-xl bg-areia px-3 py-2 text-sm">
            <span className="flex-1">
              <span className="font-mono font-semibold">{t.codigo}</span>
              {t.nome && <span className="block text-xs text-apagado">{t.nome}</span>}
            </span>
            <button type="button" onClick={() => m.mutate({ ...t, ativa: !t.ativa })} className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", t.ativa ? "bg-verde-suave text-verde-texto" : "bg-linha text-apagado")}>
              {t.ativa ? "Ativo" : "Inativo"}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => { e.preventDefault(); m.mutate({ codigo, nome, ativa: true }); }} className="mt-4 flex flex-col gap-2">
        <input required placeholder="Novo código (ex.: TURMA-MARCO)" value={codigo} onChange={(e) => setCodigo(e.target.value)} className={cn(campo, "uppercase")} />
        <input placeholder="Nome da turma (opcional)" value={nome} onChange={(e) => setNome(e.target.value)} className={campo} />
        <button type="submit" className="btn-claro rounded-xl px-4 py-2.5 text-sm font-semibold">Adicionar código</button>
      </form>
    </section>
  );
}
