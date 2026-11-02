import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Award, BookOpenCheck, Loader, TrendingUp, Users } from "lucide-react";
import { listarAlunos } from "@/lib/conta.functions";
import { calcularMetricas } from "@/lib/metricas";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import { useSessao } from "@/lib/sessao";

export const Route = createFileRoute("/admin_/metricas")({
  head: () => ({
    meta: [
      { title: "Métricas de impacto — Imersão Google Gemini" },
      { name: "description", content: "Alunos inscritos, aulas concluídas, certificados emitidos e taxa de conclusão da Imersão Google Gemini." },
      { property: "og:title", content: "Métricas de impacto — Imersão Google Gemini" },
      { property: "og:description", content: "Acompanhe o impacto da Imersão Google Gemini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Metricas,
});

function Metricas() {
  const sessao = useSessao();
  if (!sessao.admin)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-areia px-5 text-center text-tinta">
        <h1 className="text-2xl font-bold">Área do administrador</h1>
        <Link to="/book" className="btn-tinta rounded-xl px-5 py-2.5 font-semibold">Voltar à capa</Link>
      </div>
    );
  return <Painel />;
}

function Painel() {
  const listar = useServerFn(listarAlunos);
  const { data, isLoading, error } = useQuery({ queryKey: ["admin-alunos"], queryFn: () => listar(), refetchInterval: 60_000 });
  const todos = data?.alunos ?? [];
  const m = calcularMetricas(todos);
  const alunos = todos.filter((a) => !a.admin);

  const turmas = Object.entries(
    alunos.reduce<Record<string, typeof alunos>>((acc, a) => {
      (acc[a.turma ?? "Sem turma"] ??= []).push(a);
      return acc;
    }, {}),
  ).map(([turma, lista]) => ({ turma, ...calcularMetricas(lista) }));

  const funil = [
    ["Inscritos", m.inscritos],
    ["Começaram", m.comecaram],
    ["Concluíram as 20 aulas", m.concluiram],
    ["Certificados emitidos", m.certificados],
  ] as const;

  const cards = [
    { r: "Alunos inscritos", v: m.inscritos, i: Users },
    { r: "Aulas concluídas", v: m.aulasConcluidas, s: `de ${m.inscritos * TOTAL_AULAS_CURSO} possíveis`, i: BookOpenCheck },
    { r: "Certificados emitidos", v: m.certificados, i: Award },
    { r: "Taxa de conclusão", v: `${m.taxaConclusao}%`, s: `andamento médio ${m.andamentoMedio}%`, i: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-10">
        <Link to="/admin" className="selo flex items-center gap-2 text-apagado hover:text-cobre-texto">
          <ArrowLeft className="size-3.5" /> Voltar à administração
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">Métricas de impacto</h1>
        <p className="mt-1 text-apagado">Contas de administrador não entram nos números. Atualiza a cada minuto.</p>

        {isLoading && <p className="mt-8 flex items-center gap-2 text-apagado"><Loader className="size-4 animate-spin" /> Carregando…</p>}
        {error && <p className="mt-8 text-destructive">Não foi possível carregar as métricas.</p>}

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {cards.map(({ r, v, s, i: Icone }) => (
            <div key={r} className="rounded-2xl border border-linha bg-branco p-5">
              <Icone className="size-5 text-cobre-texto" />
              <p className="mt-3 text-sm text-apagado">{r}</p>
              <p className="mt-1 text-4xl font-bold">{v}</p>
              {s && <p className="mt-1 text-xs text-apagado">{s}</p>}
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-linha bg-branco p-6">
          <h2 className="text-lg font-bold">Funil da imersão</h2>
          <div className="mt-4 space-y-3">
            {funil.map(([r, v]) => {
              const pct = m.inscritos ? Math.round((v / m.inscritos) * 100) : 0;
              return (
                <div key={r}>
                  <div className="flex justify-between text-sm"><span>{r}</span><span className="font-semibold">{v} · {pct}%</span></div>
                  <div className="mt-1 h-3 overflow-hidden rounded-full bg-areia"><div className="btn-tinta h-full rounded-full" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-linha bg-branco p-6">
          <h2 className="text-lg font-bold">Por turma</h2>
          <div className="barra-clara mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-apagado">
                <tr><th className="py-2">Turma</th><th>Inscritos</th><th>Aulas concluídas</th><th>Certificados</th><th>Taxa de conclusão</th></tr>
              </thead>
              <tbody>
                {turmas.map((t) => (
                  <tr key={t.turma} className="border-t border-linha">
                    <td className="py-2 font-semibold">{t.turma}</td><td>{t.inscritos}</td><td>{t.aulasConcluidas}</td><td>{t.certificados}</td><td>{t.taxaConclusao}%</td>
                  </tr>
                ))}
                {!turmas.length && !isLoading && <tr><td colSpan={5} className="py-4 text-apagado">Nenhum aluno inscrito ainda.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
