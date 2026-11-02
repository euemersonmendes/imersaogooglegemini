import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader, Search } from "lucide-react";

import { listarAlunos } from "@/lib/conta.functions";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import { useSessao } from "@/lib/sessao";
import { LinhaAluno } from "@/components/admin/LinhaAluno";
import { resumoTurma } from "@/lib/turmas";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin_/turma/$codigo")({
  head: ({ params }) => ({
    meta: [
      { title: `Turma ${params.codigo} — Imersão Gemini` },
      { name: "description", content: "Alunos da turma, aulas concluídas, progresso e certificados em uma só tela." },
      { property: "og:title", content: `Turma ${params.codigo} — Imersão Gemini` },
      { property: "og:description", content: "Acompanhe e gerencie os alunos da turma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaginaTurma,
});

const SEM = "SEM-TURMA";
type Filtro = "todos" | "nao" | "andamento" | "concluiu";

function PaginaTurma() {
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
  const { codigo } = Route.useParams();
  const qc = useQueryClient();
  const listar = useServerFn(listarAlunos);
  const { data, isLoading, error } = useQuery({ queryKey: ["admin-alunos"], queryFn: () => listar() });
  const atualizar = () => qc.invalidateQueries({ queryKey: ["admin-alunos"] });
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const turmas = data?.turmas ?? [];
  const cod = codigo.toUpperCase();
  const turma = turmas.find((t) => t.codigo === cod);
  const codigos = new Set(turmas.map((t) => t.codigo));
  const daTurma = (data?.alunos ?? []).filter((a) =>
    cod === SEM ? !a.turma || !codigos.has(a.turma) : a.turma === cod,
  );
  const r = resumoTurma(daTurma);
  const q = busca.trim().toLowerCase();
  const lista = daTurma
    .filter((a) => !q || a.nome.toLowerCase().includes(q) || a.email.toLowerCase().includes(q))
    .filter((a) =>
      filtro === "todos" ? true
      : filtro === "nao" ? a.concluidas === 0
      : filtro === "concluiu" ? a.concluidas >= TOTAL_AULAS_CURSO
      : a.concluidas > 0 && a.concluidas < TOTAL_AULAS_CURSO,
    )
    .sort((a, b) => b.concluidas - a.concluidas || a.nome.localeCompare(b.nome));

  const filtros: [Filtro, string][] = [["todos", "Todos"], ["nao", "Não começaram"], ["andamento", "Em andamento"], ["concluiu", "Concluíram"]];

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Link to="/admin/turmas" className="selo flex items-center gap-2 text-apagado hover:text-cobre-texto">
          <ArrowLeft className="size-4" /> Turmas
        </Link>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div className="flex-1">
            <h1 className="font-mono text-3xl font-bold">{cod === SEM ? "Sem turma" : cod}</h1>
            <p className="text-apagado">
              {cod === SEM ? "Alunos criados sem código ou de turmas apagadas" : turma ? turma.nome || "Sem nome" : isLoading ? "" : "Este código não existe mais."}
              {turma && <span className={cn("ml-2 rounded-full px-2 py-0.5 text-xs font-semibold", turma.ativa ? "bg-verde-suave text-verde-texto" : "bg-linha text-apagado")}>{turma.ativa ? "Ativo" : "Inativo"}</span>}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[["Alunos", r.alunos], ["Começaram", r.comecaram], ["Concluíram", r.concluiram], ["Certificados", r.certificados], ["Andamento médio", `${r.media}%`]].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-linha bg-branco p-4">
              <dd className="text-2xl font-bold">{v}</dd>
              <dt className="text-xs text-apagado">{k}</dt>
            </div>
          ))}
        </dl>

        <section className="mt-6 rounded-2xl border border-linha bg-branco p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {filtros.map(([k, l]) => (
                <button key={k} type="button" onClick={() => setFiltro(k)} aria-pressed={filtro === k}
                  className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", filtro === k ? "bg-cobre text-branco" : "bg-areia text-apagado hover:text-tinta")}>
                  {l}
                </button>
              ))}
            </div>
            <label className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-apagado" />
              <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar nome ou e-mail"
                className="w-full rounded-xl border border-linha-2 bg-areia py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cobre" />
            </label>
          </div>
          {isLoading && <p className="mt-6 flex items-center gap-2 text-apagado"><Loader className="size-4 animate-spin" /> Carregando…</p>}
          {error && <p className="mt-6 text-cobre-texto">Não foi possível carregar os alunos.</p>}
          <div className="mt-4 overflow-x-auto barra-clara">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-apagado">
                <tr className="border-b border-linha">
                  <th className="py-2 pr-3">Aluno</th>
                  <th className="py-2 pr-3">Aulas concluídas</th>
                  <th className="py-2 pr-3">Último acesso</th>
                  <th className="py-2 pr-3">Certificado</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {lista.map((a) => <LinhaAluno key={a.id} a={a} aoMudar={atualizar} semTurma />)}
                {!isLoading && !lista.length && (
                  <tr><td colSpan={5} className="py-6 text-center text-apagado">Nenhum aluno aqui.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
