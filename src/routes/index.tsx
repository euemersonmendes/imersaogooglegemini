import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BookOpen, Check, CheckCircle2, Eye, GraduationCap, KeyRound, LogOut, Settings, Sparkles } from "lucide-react";

import instrutorFoto from "@/assets/instrutor.emerson.asset.json";

import { BOOK, modulos, aulas, passosDa } from "@/content/imersao";
import { Glifo } from "@/components/imersao/Glifo";
import { LogoGemini } from "@/components/imersao/LogoGemini";
import { ModalModeloCertificado } from "@/components/imersao/ModalModeloCertificado";
import { useProgresso } from "@/lib/progresso";
import { sair, useSessao } from "@/lib/sessao";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imersão Google Gemini com Emerson Mendes — IA Gestão de pequenos negócios" },
      { name: "description", content: "Conheça a Imersão Google Gemini para micro e pequenos empresários: 5 módulos e 20 aulas para resolver financeiro, vendas, compras, equipe e atendimento com IA." },
      { property: "og:title", content: "Imersão Google Gemini com Emerson Mendes" },
      { property: "og:description", content: "5 módulos e 20 aulas para usar o Gemini no dia a dia do seu negócio: financeiro, vendas, compras, equipe e atendimento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Apresentacao,
});

const COMO_FUNCIONA = [
  {
    passo: "01",
    icone: BookOpen,
    titulo: "Aulas em passos práticos",
    texto: "Cada aula termina com um exercício prático do seu negócio: caixa, vendas, compras, estoque, equipe ou atendimento — você aplica com os seus números e sai com o resultado pronto.",
  },
  {
    passo: "02",
    icone: Sparkles,
    titulo: "Exercício sob medida com IA",
    texto: "Escolha o tema do módulo, descreva o momento da sua empresa e receba na hora um exercício prático personalizado, gerado com inteligência artificial.",
  },
  {
    passo: "03",
    icone: Award,
    titulo: `Certificado oficial de ${BOOK.cargaHoraria}`,
    texto: `Conclua as ${TOTAL_AULAS_CURSO} aulas e emita automaticamente seu certificado com nome, carga horária de ${BOOK.cargaHoraria} e QR Code de validação pública.`,
  },
];

const DESTAQUES_CARD = [
  "Prompts prontos para copiar e aplicar na sua conta Gemini",
  "Exercício prático ao final de cada aula com os dados da empresa",
  "Gerador de exercícios personalizados com IA por módulo",
  `Certificado de ${BOOK.cargaHoraria} com código e verificação via QR Code`,
];

function Apresentacao() {
  const sessao = useSessao();
  const prog = useProgresso();
  const [verCertificado, setVerCertificado] = useState(false);
  const logado = !!sessao.user;
  const feitas = prog.concluidas.length;
  const total = aulas.length;
  const pct = total > 0 ? Math.round((feitas / total) * 100) : 0;
  const ultimo = prog.ultimo;
  const continuar = ultimo ? { secao: ultimo.aula, pagina: String(ultimo.passo) } : { secao: aulas[0]!.aula.n, pagina: "1" };

  return (
    <div className="flex min-h-screen w-full flex-col palco-fundo text-tinta">
      {/* Cabeçalho fixo com respiro horizontal amplo */}
      <header className="sticky top-0 z-30 w-full border-b border-linha bg-branco/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-4 px-6 py-4 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <LogoGemini className="size-8" />
            <p className="sobretitulo">
              <span className="text-g-azul">G</span>
              <span className="text-g-vermelho">o</span>
              <span className="text-g-amarelo">o</span>
              <span className="text-g-azul">g</span>
              <span className="text-g-verde">l</span>
              <span className="text-g-vermelho">e</span>{" "}
              <span className="acento">Gemini</span>
            </p>
            <span className="hidden h-4 w-px bg-linha-2 md:inline-block" />
            <span className="hidden text-xs font-medium text-apagado md:inline">{BOOK.selo}</span>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2.5 text-sm">
            <button
              type="button"
              onClick={() => setVerCertificado(true)}
              className="btn-claro flex items-center gap-2 rounded-xl px-3.5 py-2 font-semibold text-tinta transition-colors"
            >
              <Award className="size-4 text-cobre-texto" /> Ver certificado
            </button>
            {logado ? (
              <>
                <span className="hidden px-1 text-apagado sm:inline">
                  Olá, <span className="font-semibold text-tinta">{sessao.nome.split(" ")[0]}</span>
                </span>
                <Link to="/book" className="btn-tinta flex items-center gap-2 rounded-xl px-4 py-2 font-semibold">
                  <BookOpen className="size-4" /> Abrir o book
                </Link>
                {sessao.admin && (
                  <Link to="/admin" className="btn-claro flex items-center gap-2 rounded-xl px-3.5 py-2 font-semibold">
                    <Settings className="size-4" /> Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => void sair()}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2 font-semibold text-apagado transition-colors hover:bg-areia-2 hover:text-tinta"
                >
                  <LogOut className="size-4" /> Sair
                </button>
              </>
            ) : (
              <Link to="/acesso" className="btn-tinta flex items-center gap-2 rounded-xl px-4 py-2 font-semibold">
                <KeyRound className="size-4" /> Acesso do aluno
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo principal com ritmo vertical generoso (padrão de mercado) */}
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-16 px-6 py-10 sm:px-10 md:gap-20 md:py-14 lg:px-16">
        {/* Hero Section */}
        <section className="grid w-full gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-stretch xl:gap-10">
          <div className="flex flex-col justify-between rounded-3xl border border-linha bg-branco/85 p-8 backdrop-blur-sm sombra md:p-10 lg:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cobre-borda bg-cobre-suave px-3.5 py-1.5 text-xs font-semibold text-cobre-texto">
                <Sparkles className="size-3.5" /> Formação prática em IA para gestão de negócios
              </div>
              <h1 className="mt-6 text-5xl font-bold leading-[0.96] tracking-tight md:text-6xl xl:text-7xl">
                {BOOK.tituloAntes}
                <br />
                <span className="acento">{BOOK.tituloAcento}</span>
                <LogoGemini className="ml-2.5 inline-block size-[0.68em] -translate-y-[0.06em]" />
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-apagado md:text-lg">
                {BOOK.chamada}
              </p>
            </div>

            <div className="mt-8 border-t border-linha pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-apagado">
                Áreas trabalhadas passo a passo na empresa
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {BOOK.areas.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-linha-2 bg-areia px-3.5 py-1.5 text-xs font-semibold text-tinta-2"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card lateral de resumo, métricas e conversão */}
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-linha bg-branco p-8 sombra md:p-10">
            <div className="flex items-center gap-4 border-b border-linha pb-5">
              <img
                src={instrutorFoto.url}
                alt={BOOK.instrutor}
                className="size-14 shrink-0 rounded-2xl border border-linha object-cover object-top"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-cobre-texto">Instrutor responsável</p>
                <p className="mt-0.5 truncate text-lg font-bold text-tinta">{BOOK.instrutor}</p>
                <p className="truncate text-xs text-apagado">Cientista de Dados · Especialista CVM</p>
              </div>
              <span className="rounded-xl bg-cobre-suave px-3 py-1.5 text-xs font-bold text-cobre-texto">
                {BOOK.cargaHoraria}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3.5 text-center">
              {[
                ["5", "módulos"],
                [String(total), "aulas práticas"],
                ["16h", "certificadas"],
              ].map(([n, r]) => (
                <div key={r} className="rounded-2xl border border-linha bg-areia px-3 py-4">
                  <p className="text-2xl font-bold text-cobre-texto md:text-3xl">{n}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-apagado">{r}</p>
                </div>
              ))}
            </div>

            <ul className="flex flex-col gap-3 text-sm text-tinta-2">
              {DESTAQUES_CARD.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cobre-texto" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 pt-2">
              {logado ? (
                <>
                  <div className="flex items-center justify-between text-xs font-semibold text-apagado">
                    <span>Seu progresso no curso</span>
                    <span className="text-cobre-texto">
                      {feitas}/{total} aulas ({pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-areia-2">
                    <div className="h-full rounded-full bg-cobre transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                      to="/ler/$secao/$pagina"
                      params={continuar}
                      className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
                    >
                      {ultimo ? `Continuar aula ${ultimo.aula}` : "Começar a imersão"} <ArrowRight className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setVerCertificado(true)}
                      className="btn-claro flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold"
                    >
                      <Eye className="size-4 text-cobre-texto" /> Modelo do certificado
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                      to="/acesso"
                      className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold"
                    >
                      Começar agora <ArrowRight className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setVerCertificado(true)}
                      className="btn-claro flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold"
                    >
                      <Eye className="size-4 text-cobre-texto" /> Ver certificado
                    </button>
                  </div>
                  <p className="text-center text-xs text-apagado">
                    Acesso imediato com o código da turma fornecido pelo instrutor
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Seção Como Funciona */}
        <section aria-labelledby="como-funciona" className="w-full">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="sobretitulo text-cobre-texto">Metodologia prática</p>
              <h2 id="como-funciona" className="mt-1.5 text-3xl font-bold tracking-tight md:text-4xl">
                Você assiste, faz na sua conta e aplica
              </h2>
            </div>
            <p className="max-w-md text-sm text-apagado">
              Sem teoria solta: cada etapa foi desenhada para gerar entregas imediatas para o seu negócio.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3 lg:gap-8">
            {COMO_FUNCIONA.map((c) => (
              <div
                key={c.titulo}
                className="flex flex-col justify-between rounded-3xl border border-linha bg-branco p-7 sombra md:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-cobre-suave text-cobre-texto">
                      <c.icone className="size-6" />
                    </span>
                    <span className="rounded-full bg-areia-2 px-3 py-1 font-mono text-xs font-bold text-cobre-texto">
                      ETAPA {c.passo}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-tinta">{c.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-apagado">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção O Programa — Grade 3x2 espaçada e legível */}
        <section aria-labelledby="o-que-ver" className="w-full">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="sobretitulo text-cobre-texto">O programa completo</p>
              <h2 id="o-que-ver" className="mt-1.5 text-3xl font-bold tracking-tight md:text-4xl">
                O que você vai ver na imersão
              </h2>
            </div>
            <p className="text-sm text-apagado">
              5 módulos e {total} aulas práticas · clique em qualquer aula para abrir o passo a passo
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {modulos.map((m, mi) => {
              const conclModulo = m.aulas.filter((a) => prog.concluidas.includes(a.n)).length;
              return (
                <div
                  key={m.id}
                  className="flex flex-col rounded-3xl border border-linha bg-branco p-6 sombra md:p-7"
                >
                  <div className="flex items-start gap-3.5 border-b border-linha pb-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-cobre-suave text-cobre-texto">
                      <Glifo id={m.glifo} className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="sobretitulo">Módulo {mi + 1}</p>
                        <span className="rounded-full bg-areia-2 px-2.5 py-0.5 text-xs font-semibold text-apagado">
                          {logado ? `${conclModulo}/${m.aulas.length}` : `${m.aulas.length} aulas`}
                        </span>
                      </div>
                      <h3 className="mt-1 text-lg font-bold leading-snug text-tinta">
                        {m.nomeCompleto}
                      </h3>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-1 flex-col gap-1.5">
                    {m.aulas.map((a) => {
                      const ok = prog.concluidas.includes(a.n);
                      const numPassos = passosDa(a).length;
                      return (
                        <li key={a.n}>
                          <Link
                            to="/ler/$secao/$pagina"
                            params={{ secao: a.n, pagina: "1" }}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-areia"
                          >
                            <span className="w-8 shrink-0 font-mono text-xs font-semibold text-cobre-texto">
                              {a.n}
                            </span>
                            <span className="flex-1 font-medium text-tinta-2 group-hover:text-cobre-texto">
                              {a.titulo}
                            </span>
                            <span className="shrink-0 text-xs text-apagado group-hover:hidden">
                              {numPassos} passos
                            </span>
                            {ok ? (
                              <Check className="size-4 shrink-0 text-verde" aria-label="Concluída" />
                            ) : (
                              <ArrowRight className="hidden size-4 shrink-0 text-cobre-texto group-hover:inline-block" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            {/* 6º card da grade: Certificação & Prática */}
            <div className="flex flex-col justify-between rounded-3xl border border-escuro-borda bg-tinta p-6 text-escuro-texto sombra md:p-7">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-escuro-hover px-3.5 py-1 text-xs font-semibold text-cobre">
                    <Award className="size-3.5" /> Certificação & Prática
                  </span>
                  <span className="font-mono text-xs text-escuro-texto-2">{BOOK.cargaHoraria}</span>
                </div>
                <div className="mt-5 flex items-baseline gap-2.5">
                  <p className="text-4xl font-bold text-branco">
                    {feitas}/{total}
                  </p>
                  <p className="text-sm text-escuro-texto">
                    {logado ? "aulas concluídas por você" : "aulas práticas com exercícios"}
                  </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-escuro-hover">
                  <div
                    className="h-full rounded-full bg-cobre transition-all"
                    style={{ width: `${logado ? Math.max(pct, 4) : 100}%` }}
                  />
                </div>
                <ul className="mt-5 flex flex-col gap-3 text-sm text-escuro-texto-2">
                  <li className="flex items-center gap-2.5">
                    <Sparkles className="size-4 shrink-0 text-cobre" />
                    <span>Gerador de exercícios personalizados com IA</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <BookOpen className="size-4 shrink-0 text-cobre" />
                    <span>20 ferramentas de gestão prontas para aplicar</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Award className="size-4 shrink-0 text-cobre" />
                    <span>Certificado com código e QR Code verificável</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setVerCertificado(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-escuro-borda bg-escuro-hover px-4 py-3 text-sm font-semibold text-branco transition-colors hover:border-cobre"
                >
                  <Eye className="size-4 text-cobre" /> Ver como será o certificado
                </button>
                <Link
                  to={logado ? "/book" : "/acesso"}
                  className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  {logado ? "Abrir o book completo" : "Entrar na imersão"} <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Quem Ensina (Instrutor) */}
        <section aria-labelledby="quem-ensina" className="w-full">
          <div className="grid gap-8 rounded-3xl border border-linha bg-branco p-8 sombra md:grid-cols-[280px_1fr] md:p-10 lg:grid-cols-[320px_1fr] lg:gap-12">
            <img
              src={instrutorFoto.url}
              alt="Emerson Mendes, instrutor da Imersão Google Gemini"
              className="h-72 w-full rounded-2xl border border-linha object-cover object-top md:h-full md:max-h-[360px]"
              loading="lazy"
            />
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="sobretitulo text-cobre-texto">Quem ensina</p>
                  <span className="rounded-full border border-linha bg-areia px-3.5 py-1 text-xs font-semibold text-apagado">
                    Mentoria prática orientada a negócios
                  </span>
                </div>
                <h2 id="quem-ensina" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  Emerson Mendes
                </h2>
                <p className="mt-2 text-base font-semibold text-cobre-texto md:text-lg">
                  Cientista de Dados · Instrutor da Imersão Google Gemini
                </p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-apagado">
                  Emerson conduz você aula por aula, mostrando na prática como configurar e usar o Google Gemini para resolver problemas reais da empresa — do fluxo de caixa às vendas, compras, equipe e atendimento.
                </p>
              </div>

              <ul className="grid gap-3.5 sm:grid-cols-3">
                {[
                  "Pós-graduado em Data Science",
                  "Pós-graduando em Engenharia de IA",
                  "Especialista em Investimentos, credenciado na CVM",
                ].map((cred) => (
                  <li
                    key={cred}
                    className="flex items-center gap-3 rounded-2xl border border-linha bg-areia px-4 py-3.5 text-sm font-semibold leading-snug text-tinta-2"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto">
                      <GraduationCap className="size-4" />
                    </span>
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>

              {/* Barra de chamada final com espaçamento confortável */}
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-cobre-borda bg-cobre-suave/60 p-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3.5">
                  <LogoGemini className="size-9 shrink-0" />
                  <div>
                    <p className="text-base font-bold text-tinta">
                      Pronto para aplicar o Gemini na gestão da sua empresa?
                    </p>
                    <p className="mt-0.5 text-sm text-apagado">
                      {logado
                        ? `Você já concluiu ${feitas} de ${total} aulas — continue de onde parou.`
                        : "Entre com o código da turma que você recebeu do instrutor e comece agora."}
                    </p>
                  </div>
                </div>
                <Link
                  to={logado ? "/book" : "/acesso"}
                  className="btn-tinta flex shrink-0 items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
                >
                  {logado ? "Abrir o book" : "Acessar agora"} <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModalModeloCertificado
        aberto={verCertificado}
        aoFechar={() => setVerCertificado(false)}
        nomeAluno={sessao.nome}
      />
    </div>
  );
}
