import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, Loader, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { apagarTurma, editarTurma, listarAlunos, salvarTurma, type AlunoStatus } from "@/lib/conta.functions";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import { useSessao } from "@/lib/sessao";
import { cn } from "@/lib/utils";
import { resumoTurma } from "@/lib/turmas";

export const Route = createFileRoute("/admin_/turmas")({
  head: () => ({
    meta: [
      { title: "Turmas — Imersão Gemini" },
      { name: "description", content: "Crie, edite e apague códigos de turma e acompanhe o progresso de cada turma." },
      { property: "og:title", content: "Turmas — Imersão Gemini" },
      { property: "og:description", content: "Códigos de turma e progresso por turma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaginaTurmas,
});

const campo = "w-full rounded-xl border border-linha-2 bg-areia px-3 py-2.5 text-sm outline-none focus:border-cobre";
type Turma = { codigo: string; nome: string; ativa: boolean };


function PaginaTurmas() {
  const sessao = useSessao();
  if (!sessao.admin)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-areia px-5 text-center text-tinta">
        <h1 className="text-2xl font-bold">Área do administrador</h1>
        <p className="text-apagado">Seu acesso não tem permissão para esta página.</p>
        <Link to="/" className="btn-tinta rounded-xl px-5 py-2.5 font-semibold">Voltar à capa</Link>
      </div>
    );
  return <Conteudo />;
}

function Conteudo() {
  const qc = useQueryClient();
  const listar = useServerFn(listarAlunos);
  const { data, isLoading } = useQuery({ queryKey: ["admin-alunos"], queryFn: () => listar() });
  const atualizar = () => qc.invalidateQueries({ queryKey: ["admin-alunos"] });
  const turmas = data?.turmas ?? [];
  const alunos = data?.alunos ?? [];
  const semTurma = alunos.filter((a) => !a.turma || !turmas.some((t) => t.codigo === a.turma));

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-10">
        <Link to="/admin" className="selo flex items-center gap-2 text-apagado hover:text-cobre-texto">
          <ArrowLeft className="size-3.5" /> Voltar à administração
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Turmas</h1>
        <p className="mt-1 text-apagado">Cada código libera o cadastro de alunos. Veja abaixo como cada turma está avançando.</p>

        <NovaTurma aoCriar={atualizar} />

        {isLoading && <p className="mt-6 flex items-center gap-2 text-apagado"><Loader className="size-4 animate-spin" /> Carregando…</p>}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {turmas.map((t) => (
            <CartaoTurma key={t.codigo} t={t} alunos={alunos.filter((a) => a.turma === t.codigo)} aoMudar={atualizar} />
          ))}
          {semTurma.length > 0 && <CartaoTurma t={null} alunos={semTurma} aoMudar={atualizar} />}
          {!isLoading && !turmas.length && <p className="text-apagado">Nenhuma turma ainda. Crie o primeiro código acima.</p>}
        </div>
      </div>
    </div>
  );
}

function NovaTurma({ aoCriar }: { aoCriar: () => void }) {
  const salvar = useServerFn(salvarTurma);
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const m = useMutation({
    mutationFn: () => salvar({ data: { codigo, nome, ativa: true } }),
    onSuccess: (r) => {
      if (!r.ok) { toast.error(r.erro); return; }
      toast.success("Turma criada.");
      setCodigo("");
      setNome("");
      aoCriar();
    },
    onError: () => toast.error("Não foi possível criar a turma."),
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="mt-8 grid gap-3 rounded-2xl border border-linha bg-branco p-5 md:grid-cols-[1fr_1fr_auto]">
      <input required aria-label="Novo código" placeholder="Novo código (ex.: TURMA-MARCO)" value={codigo} onChange={(e) => setCodigo(e.target.value)} className={cn(campo, "uppercase")} />
      <input aria-label="Nome da turma" placeholder="Nome da turma (opcional)" value={nome} onChange={(e) => setNome(e.target.value)} className={campo} />
      <button type="submit" disabled={m.isPending} className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold disabled:opacity-60">
        {m.isPending ? <Loader className="size-4 animate-spin" /> : <Plus className="size-4" />} Criar turma
      </button>
    </form>
  );
}

function CartaoTurma({ t, alunos, aoMudar }: { t: Turma | null; alunos: AlunoStatus[]; aoMudar: () => void }) {
  const editar = useServerFn(editarTurma);
  const apagar = useServerFn(apagarTurma);
  const [editando, setEditando] = useState(false);
  const [confirmar, setConfirmar] = useState(false);
  const [f, setF] = useState({ codigo: t?.codigo ?? "", nome: t?.nome ?? "" });
  const r = resumoTurma(alunos);

  const mEditar = useMutation({
    mutationFn: (d: { codigo: string; nome: string; ativa: boolean }) => editar({ data: { antigo: t!.codigo, ...d } }),
    onSuccess: (res) => {
      if (!res.ok) { toast.error(res.erro); return; }
      setEditando(false);
      aoMudar();
    },
    onError: () => toast.error("Não foi possível salvar a turma."),
  });
  const mApagar = useMutation({
    mutationFn: () => apagar({ data: { codigo: t!.codigo } }),
    onSuccess: (res) => {
      if (!res.ok) { toast.error(res.erro); return; }
      toast.success("Turma apagada. Os alunos continuam com acesso.");
      aoMudar();
    },
    onError: () => toast.error("Não foi possível apagar a turma."),
  });

  return (
    <section className="rounded-2xl border border-linha bg-branco p-5" aria-label={t ? `Turma ${t.codigo}` : "Sem turma"}>
      {editando && t ? (
        <form onSubmit={(e) => { e.preventDefault(); mEditar.mutate({ ...f, ativa: t.ativa }); }} className="flex flex-col gap-2">
          <input aria-label="Código" required value={f.codigo} onChange={(e) => setF({ ...f, codigo: e.target.value })} className={cn(campo, "font-mono uppercase")} />
          <input aria-label="Nome" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} placeholder="Nome da turma" className={campo} />
          {f.codigo.trim().toUpperCase() !== t.codigo && alunos.length > 0 && (
            <p className="text-xs text-apagado">Os {alunos.length} aluno(s) desta turma passam para o novo código.</p>
          )}
          <div className="flex gap-2">
            <button type="submit" disabled={mEditar.isPending} className="btn-tinta flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold"><Check className="size-4" /> Salvar</button>
            <button type="button" onClick={() => { setEditando(false); setF({ codigo: t.codigo, nome: t.nome }); }} className="btn-claro flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold"><X className="size-4" /> Cancelar</button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-lg font-bold">{t ? t.codigo : "Sem turma"}</p>
            <p className="text-sm text-apagado">{t ? t.nome || "Sem nome" : "Alunos criados sem código ou de turmas apagadas"}</p>
          </div>
          {t && (
            <>
              <button type="button" onClick={() => mEditar.mutate({ codigo: t.codigo, nome: t.nome, ativa: !t.ativa })} className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", t.ativa ? "bg-verde-suave text-verde-texto" : "bg-linha text-apagado")}>
                {t.ativa ? "Ativo" : "Inativo"}
              </button>
              <button type="button" aria-label="Editar" onClick={() => setEditando(true)} className="rounded-lg p-1.5 text-apagado hover:text-tinta"><Pencil className="size-4" /></button>
              <button type="button" aria-label="Apagar" onClick={() => setConfirmar(true)} className="rounded-lg p-1.5 text-apagado hover:text-cobre-texto"><Trash2 className="size-4" /></button>
            </>
          )}
        </div>
      )}

      {confirmar && t && (
        <div className="mt-3 rounded-xl bg-areia p-3 text-sm">
          <p>Apagar o código <b className="font-mono">{t.codigo}</b>? Ninguém mais se cadastra com ele. Os {alunos.length} aluno(s) continuam com acesso e progresso.</p>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={() => mApagar.mutate()} className="btn-tinta rounded-lg px-3 py-1.5 text-xs font-semibold">Sim, apagar</button>
            <button type="button" onClick={() => setConfirmar(false)} className="btn-claro rounded-lg px-3 py-1.5 text-xs font-semibold">Não</button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="flex justify-between text-sm"><span className="text-apagado">Andamento médio</span><b>{r.media}%</b></div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-linha"><div className="h-full rounded-full bg-cobre" style={{ width: `${r.media}%` }} /></div>
      </div>
      <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
        {[["Alunos", r.alunos], ["Começaram", r.comecaram], ["Concluíram", r.concluiram], ["Certificados", r.certificados]].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-areia py-2">
            <dd className="text-xl font-bold">{v}</dd>
            <dt className="text-[11px] text-apagado">{k}</dt>
          </div>
        ))}
      </dl>
      <Link to="/admin/turma/$codigo" params={{ codigo: t ? t.codigo : "SEM-TURMA" }} className="btn-claro mt-4 flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold">
        Abrir turma e gerenciar alunos →
      </Link>
      {alunos.length > 0 && (
        <ul className="mt-4 flex max-h-48 flex-col gap-1.5 overflow-y-auto barra-clara text-sm">
          {alunos.map((a) => (
            <li key={a.id} className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate">{a.nome || a.email}</span>
              <span className="text-xs text-apagado"><b className="text-tinta">{Math.round((a.concluidas / TOTAL_AULAS_CURSO) * 100)}%</b> · {a.concluidas}/{TOTAL_AULAS_CURSO}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
