import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BookOpen, KeyRound, LogOut, Settings, Sparkles } from "lucide-react";

import { BOOK, modulos, aulas } from "@/content/imersao";
import { Glifo } from "@/components/imersao/Glifo";
import { LogoGemini } from "@/components/imersao/LogoGemini";
import { useProgresso } from "@/lib/progresso";
import { sair, useSessao } from "@/lib/sessao";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imersão Gemini com Emerson Mendes — IA para pequenas empresas" },
      { name: "description", content: "Conheça a Imersão Google Gemini para micro e pequenos empresários: 5 módulos e 20 aulas para resolver financeiro, vendas, compras, equipe e atendimento com IA." },
      { property: "og:title", content: "Imersão Gemini com Emerson Mendes" },
      { property: "og:description", content: "5 módulos e 20 aulas para usar o Gemini no dia a dia do seu negócio: financeiro, vendas, compras, equipe e atendimento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Apresentacao,
});

const COMO_FUNCIONA = [
  {
    icone: BookOpen,
    titulo: "Aulas em passos",
    texto: "Cada aula é um passo a passo com telas anotadas do Gemini e prompts prontos para copiar, adaptar e usar no seu negócio.",
  },
  {
    icone: Sparkles,
    titulo: "Exercício com IA",
    texto: "Escolha o tema do módulo, conte o objetivo do seu negócio e receba um exercício prático personalizado, gerado na hora.",
  },
  {
    icone: Award,
    titulo: "Certificado",
    texto: `Conclua as ${TOTAL_AULAS_CURSO} aulas e o certificado com ${BOOK.cargaHoraria} sai automaticamente, com o seu nome e código de validação.`,
  },
];

function Apresentacao() {
  const sessao = useSessao();
  const prog = useProgresso();
  const logado = !!sessao.user;
  const feitas = prog.concluidas.length;
  const total = aulas.length;
  const ultimo = prog.ultimo;
  const continuar = ultimo ? { secao: ultimo.aula, pagina: String(ultimo.passo) } : { secao: aulas[0]!.aula.n, pagina: "1" };

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12">
        {/* Topo */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <LogoGemini className="size-9" />
            <p className="sobretitulo">Google Gemini</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2 text-sm">
            {logado ? (
              <>
                <span className="text-apagado">Olá, <span className="font-semibold text-tinta">{sessao.nome.split(" ")[0]}</span></span>
                <Link to="/book" className="btn-tinta flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold"><BookOpen className="size-4" /> Abrir o book</Link>
                {sessao.admin && <Link to="/admin" className="btn-claro flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold"><Settings className="size-4" /> Administração</Link>}
                <button type="button" onClick={() => void sair()} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold text-apagado hover:text-tinta"><LogOut className="size-4" /> Sair</button>
              </>
            ) : (
              <Link to="/acesso" className="btn-tinta flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold"><KeyRound className="size-4" /> Acesso do usuário</Link>
            )}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-12 grid gap-10 md:grid-cols-[1.25fr_1fr] md:items-center">
          <div>
            <h1 className="text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">
              {BOOK.tituloAntes}
              <br />
              <span className="text-cobre-texto">
                {BOOK.tituloAcento}
                <LogoGemini className="ml-2 inline-block size-[0.72em] -translate-y-[0.06em]" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-apagado">{BOOK.chamada}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {BOOK.areas.map((a) => <span key={a} className="rounded-full border border-linha-2 bg-branco px-3 py-1 text-xs font-semibold">{a}</span>)}
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-linha bg-branco p-6 sombra md:p-8">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[["5", "módulos"], [String(total), "aulas"], ["16", "horas"]].map(([n, r]) => (
                <div key={r} className="rounded-2xl bg-areia px-2 py-4">
                  <p className="text-3xl font-bold text-cobre-texto">{n}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-apagado">{r}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-apagado">Instrutor e responsável: <span className="font-semibold text-tinta">{BOOK.instrutor}</span></p>
            {logado ? (
              <>
                <Link to="/ler/$secao/$pagina" params={continuar} className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold">
                  {ultimo ? `Continuar na aula ${ultimo.aula}` : "Começar a imersão"} <ArrowRight className="size-4" />
                </Link>
                <p className="text-center text-sm text-apagado">{feitas} de {total} aulas concluídas</p>
              </>
            ) : (
              <Link to="/acesso" className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold">
                Começar agora <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>

        {/* O que você vai ver */}
        <section aria-labelledby="o-que-ver" className="mt-16">
          <p className="sobretitulo text-cobre-texto">O programa</p>
          <h2 id="o-que-ver" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">O que você vai ver na imersão</h2>
          <p className="mt-3 max-w-2xl text-apagado">Cinco módulos pensados para o dono do negócio: cada aula resolve uma tarefa real da empresa com o Gemini.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modulos.map((m, mi) => (
              <div key={m.id} className="flex flex-col rounded-2xl border border-linha bg-branco p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto">
                    <Glifo id={m.glifo} className="size-5" />
                  </span>
                  <p className="sobretitulo">Módulo {mi + 1} · {m.aulas.length} aulas</p>
                </div>
                <h3 className="mt-3 font-bold leading-snug">{m.nomeCompleto}</h3>
                <ul className="mt-3 flex flex-1 flex-col">
                  {m.aulas.map((a) => {
                    const ok = prog.concluidas.includes(a.n);
                    return (
                      <li key={a.n}>
                        <Link to="/ler/$secao/$pagina" params={{ secao: a.n, pagina: "1" }} className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-areia">
                          <span className="w-8 font-mono text-xs text-cobre">{a.n}</span>
                          <span className="flex-1 group-hover:text-cobre-texto">{a.titulo}</span>
                          {ok ? <ArrowRight className="size-4 text-verde" aria-label="Concluída" /> : <ArrowRight className="size-4 text-apagado opacity-0 group-hover:opacity-100" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <div className="flex flex-col justify-center gap-3 rounded-2xl border border-linha bg-tinta p-6 text-escuro-texto">
              <p className="text-4xl font-bold">{feitas}/{total}</p>
              <p className="text-sm text-escuro-texto/80">{logado ? "aulas concluídas por você" : "aulas para destravar o dia a dia da sua empresa"}</p>
              <Link to={logado ? "/book" : "/acesso"} className="btn-tinta mt-2 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
                {logado ? "Abrir o book" : "Entrar na imersão"} <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section aria-labelledby="como-funciona" className="mt-16">
          <p className="sobretitulo text-cobre-texto">Como funciona</p>
          <h2 id="como-funciona" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Você assiste, faz na sua conta e aplica</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {COMO_FUNCIONA.map((c) => (
              <div key={c.titulo} className="rounded-2xl border border-linha bg-branco p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto"><c.icone className="size-5" /></span>
                <h3 className="mt-4 text-lg font-bold">{c.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-apagado">{c.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chamada final */}
        <section className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-linha bg-branco p-8 text-center sombra md:p-12">
          <LogoGemini className="size-12" />
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">Pronto para resolver o dia a dia da empresa com o Gemini?</h2>
          <p className="max-w-xl text-apagado">{logado ? `Você já tem acesso — ${feitas} de ${total} aulas concluídas. Continue de onde parou.` : "Entre com o código da turma que você recebeu do instrutor e comece agora."}</p>
          <Link to={logado ? "/book" : "/acesso"} className="btn-tinta flex items-center gap-2 rounded-xl px-7 py-4 font-semibold">
            {logado ? "Abrir o book" : "Acesso do usuário"} <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
