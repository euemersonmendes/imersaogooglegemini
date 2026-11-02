import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, BadgeCheck, Loader, ShieldAlert } from "lucide-react";

import { listarAlunos } from "@/lib/conta.functions";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import { useSessao } from "@/lib/sessao";
import { LinhaAluno, dataCurta } from "@/components/admin/LinhaAluno";

export const Route = createFileRoute("/admin_/aluno/$id")({
  head: () => ({
    meta: [
      { title: "Perfil do aluno — Imersão Gemini" },
      { name: "description", content: "Validação do certificado e andamento do aluno na Imersão Gemini." },
      { property: "og:title", content: "Perfil do aluno — Imersão Gemini" },
      { property: "og:description", content: "Validação de certificado da Imersão Gemini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PaginaAluno,
});

function PaginaAluno() {
  const sessao = useSessao();
  if (!sessao.admin)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-areia px-5 text-center text-tinta">
        <h1 className="text-2xl font-bold">Área do administrador</h1>
        <p className="text-apagado">Entre com a conta do instrutor para validar este certificado.</p>
        <Link to="/book" className="btn-tinta rounded-xl px-5 py-2.5 font-semibold">Voltar à capa</Link>
      </div>
    );
  return <Perfil />;
}

function Perfil() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const listar = useServerFn(listarAlunos);
  const { data, isLoading } = useQuery({ queryKey: ["admin-alunos"], queryFn: () => listar() });
  const a = data?.alunos.find((x) => x.id === id);
  const valido = a && a.certificado !== "revogado" && (a.certificado === "emitido" || a.concluidas >= TOTAL_AULAS_CURSO);

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-4xl px-5 py-8">
        <Link to="/admin" className="selo flex items-center gap-2 text-apagado hover:text-cobre-texto"><ArrowLeft className="size-4" /> Administração</Link>
        {isLoading ? (
          <p className="mt-8 flex items-center gap-2 text-apagado"><Loader className="size-4 animate-spin" /> Carregando…</p>
        ) : !a ? (
          <p className="mt-8 rounded-2xl border border-linha bg-branco p-6">Aluno não encontrado. A conta pode ter sido removida.</p>
        ) : (
          <>
            <div className={valido ? "mt-6 flex items-center gap-3 rounded-2xl border border-verde bg-verde-suave p-4 text-verde-texto" : "mt-6 flex items-center gap-3 rounded-2xl border border-cobre bg-cobre-suave p-4 text-cobre-texto"}>
              {valido ? <BadgeCheck className="size-6" /> : <ShieldAlert className="size-6" />}
              <p className="font-semibold">{valido ? "Certificado válido" : a.certificado === "revogado" ? "Certificado revogado" : "Certificado ainda não liberado"}</p>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">{a.nome || a.email}</h1>
            <p className="text-apagado">{a.email} · turma <span className="font-mono">{a.turma ?? "sem código"}</span> · cadastro {dataCurta(a.criado_em)}</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-linha bg-branco p-5 barra-clara">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wider text-apagado">
                  <tr className="border-b border-linha"><th className="py-2 pr-3">Aluno</th><th className="py-2 pr-3">Aulas concluídas</th><th className="py-2 pr-3">Último acesso</th><th className="py-2 pr-3">Certificado</th><th /></tr>
                </thead>
                <tbody><LinhaAluno a={a} semTurma aoMudar={() => qc.invalidateQueries({ queryKey: ["admin-alunos"] })} /></tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
