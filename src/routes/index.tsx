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
    texto: "Cada aula termina com um exercício prático do seu negócio: caixa, vendas, compras, estoque, equipe ou atendimento — aplicado aos seus números.",
  },
  {
    passo: "02",
    icone: Sparkles,
    titulo: "Exercício sob medida com IA",
    texto: "Escolha o tema do módulo, descreva o momento da sua empresa e receba na hora um exercício personalizado gerado com IA.",
  },
  {
    passo: "03",
    icone: Award,
    titulo: `Certificado oficial de ${BOOK.cargaHoraria}`,
    texto: `Conclua as ${TOTAL_AULAS_CURSO} aulas e emita automaticamente seu certificado com nome, carga horária e QR Code de validação pública.`,
  },
];

const DESTAQUES_CARD = [
  "Prompts prontos para copiar e usar na sua conta Gemini",
  "Exercício prático ao final de cada aula com os dados da empresa",
  "Gerador de exercícios personalizados com IA por módulo",
  `Certificado de ${BOOK.cargaHoraria} com código e verificação QR`,
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
      {/* Topo ocupando toda a largura da tela */}
      <header className="sticky top-0 z-30 flex w-full flex-wrap items-center gap-3 border-b border-linha bg-branco/90 px-4 py-3 backdrop-blur-md md:px-8 xl:px-12">
        <div className="flex items-center gap-2.5">
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
          <span className="hidden h-4 w-px bg-linha-2 sm:inline-block" />
          <span className="hidden text-xs font-medium text-apagado sm:inline">{BOOK.selo}</span>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => setVerCertificado(true)}
            className="btn-claro flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold text-tinta"
          >
            <Award className="size-4 text-cobre-texto" /> Ver certificado
          </button>
          {logado ? (
            <>
              <span className="hidden text-apagado sm:inline">
                Olá, <span className="font-semibold text-tinta">{sessao.nome.split(" ")[0]}</span>
              </span>
              <Link to="/book" className="btn-tinta flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-semibold">
                <BookOpen className="size-4" /> Abrir o book
              </Link>
              {sessao.admin && (
                <Link to="/admin" className="btn-claro flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold">
                  <Settings className="size-4" /> Admin
                </Link>
              )}
              <button
                type="button"
                onClick={() => void sair()}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold text-apagado hover:bg-areia-2 hover:text-tinta"
              >
                <LogOut className="size-4" /> Sair
              </button>
            </>
          ) : (
            <Link to="/acesso" className="btn-tinta flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold">
              <KeyRound className="size-4" /> Acesso do aluno
            </Link>
          )}
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col gap-6 px-4 py-5 md:px-8 md:py-6 xl:px-12">
        {/* Hero em duas colunas ocupando toda a largura */}
        <section className="grid w-full gap-5 lg:grid-cols-[1.45fr_1fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-3xl border border-linha bg-branco/80 p-6 backdrop-blur-sm sombra md:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cobre-borda bg-cobre-suave px-3 py-1 text-xs font-semibold text-cobre-texto">
                <Sparkles className="size-3.5" /> Formação prática em IA para gestão de negócios
              </div>
              <h1 className="mt-4 text-5xl font-bold leading-[0.96] tracking-tight md:text-6xl xl:text-7xl">
                {BOOK.tituloAntes}{" "}
                <span className="acento">
                  {BOOK.tituloAcento}
                </span>
                <LogoGemini className="ml-2 inline-block size-[0.68em] -translate-y-[0.06em]" />
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-apagado md:text-lg">{BOOK.chamada}</p>
            </div>

            <div className="mt-6 border-t border-linha pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-apagado">Áreas trabalhadas na prática</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {BOOK.areas.map((a) => (
                  <span key={a} className="rounded-lg border border-linha-2 bg-areia px-2.5 py-1 text-xs font-semibold text-tinta-2">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card lateral de resumo e ação */}
          <div className="flex flex-col justify-between gap-5 rounded-3xl border border-linha bg-branco p-6 sombra md:p-7">
            <div className="flex items-center gap-3.5 border-b border-linha pb-4">
              <img
                src={instrutorFoto.url}
                alt={BOOK.instrutor}
                className="size-12 shrink-0 rounded-xl border border-linha object-cover object-top"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-cobre-texto">Instrutor responsável</p>
                <p className="truncate font-bold text-tinta">{BOOK.instrutor}</p>
                <p className="truncate text-xs text-apagado">Cientista de Dados · Especialista CVM</p>
              </div>
              <span className="rounded-xl bg-cobre-suave px-2.5 py-1 text-xs font-bold text-cobre-texto">
                {BOOK.cargaHoraria}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              {[
                ["5", "módulos"],
                [String(total), "aulas práticas"],
                ["16h", "certificadas"],
              ].map(([n, r]) => (
                <div key={r} className="rounded-2xl border border-linha bg-areia px-2 py-3">
                  <p className="text-2xl font-bold text-cobre-texto md:text-3xl">{n}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-apagado">{r}</p>
                </div>
              ))}
            </div>

            <ul className="flex flex-col gap-2 text-sm text-tinta-2">
              {DESTAQUES_CARD.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cobre-texto" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2.5 pt-1">
              {logado ? (
                <>
                  <div className="flex items-center justify-between text-xs font-semibold text-apagado">
                    <span>Seu progresso no curso</span>
                    <span className="text-cobre-texto">{feitas}/{total} aulas ({pct}%)</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-areia-2">
                    <div className="h-full rounded-full bg-cobre transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Link
                      to="/ler/$secao/$pagina"
                      params={continuar}
                      className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                    >
                      {ultimo ? `Continuar aula ${ultimo.aula}` : "Começar a imersão"} <ArrowRight className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setVerCertificado(true)}
                      className="btn-claro flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                    >
                      <Eye className="size-4 text-cobre-texto" /> Ver modelo do certificado
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Link
                      to="/acesso"
                      className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
                    >
                      Começar agora <ArrowRight className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setVerCertificado(true)}
                      className="btn-claro flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold"
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

        {/* Como funciona — faixa horizontal ocupando toda a largura */}
        <section aria-labelledby="como-funciona" className="w-full">
          <div className="grid gap-4 md:grid-cols-3">
            {COMO_FUNCIONA.map((c) => (
              <div key={c.titulo} className="flex items-start gap-4 rounded-2xl border border-linha bg-branco p-5 sombra">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto">
                  <c.icone className="size-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cobre">PASSO {c.passo}</span>
                  </div>
                  <h2 id={c.passo === "01" ? "como-funciona" : undefined} className="mt-0.5 text-base font-bold text-tinta">
                    {c.titulo}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-apagado sm:text-sm">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* O que você vai ver — grade de módulos ocupando toda a largura */}
        <section aria-labelledby="o-que-ver" className="w-full">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="sobretitulo text-cobre-texto">O programa completo</p>
              <h2 id="o-que-ver" className="mt-0.5 text-2xl font-bold tracking-tight md:text-3xl">
                O que você vai ver na imersão
              </h2>
            </div>
            <p className="text-sm text-apagado">
              Cinco módulos práticos · clique em qualquer aula para abrir o passo a passo
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {modulos.map((m, mi) => {
              const conclModulo = m.aulas.filter((a) => prog.concluidas.includes(a.n)).length;
              return (
                <div key={m.id} className="flex flex-col rounded-2xl border border-linha bg-branco p-5 sombra">
                  <div className="flex items-center gap-3 border-b border-linha pb-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto">
                      <Glifo id={m.glifo} className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="sobretitulo">Módulo {mi + 1}</p>
                        <span className="rounded-full bg-areia-2 px-2 py-0.5 text-[11px] font-semibold text-apagado">
                          {logado ? `${conclModulo}/${m.aulas.length}` : `${m.aulas.length} aulas`}
                        </span>
                      </div>
                      <h3 className="truncate font-bold leading-snug text-tinta" title={m.nomeCompleto}>
                        {m.nomeCompleto}
                      </h3>
                    </div>
                  </div>
                  <ul className="mt-2.5 flex flex-1 flex-col divide-y divide-linha/60">
                    {m.aulas.map((a) => {
                      const ok = prog.concluidas.includes(a.n);
                      const numPassos = passosDa(a).length;
                      return (
                        <li key={a.n}>
                          <Link
                            to="/ler/$secao/$pagina"
                            params={{ secao: a.n, pagina: "1" }}
                            className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-areia"
                          >
                            <span className="w-7 shrink-0 font-mono text-xs font-semibold text-cobre-texto">{a.n}</span>
                            <span className="min-w-0 flex-1 truncate font-medium text-tinta-2 group-hover:text-cobre-texto">
                              {a.titulo}
                            </span>
                            <span className="shrink-0 text-[11px] text-apagado group-hover:hidden">
                              {numPassos}p
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

            {/* 6º card da grade: progresso, IA e certificação preenchido por completo */}
            <div className="flex flex-col justify-between rounded-2xl border border-escuro-borda bg-tinta p-5 text-escuro-texto sombra">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-escuro-hover px-3 py-1 text-xs font-semibold text-cobre">
                    <Award className="size-3.5" /> Certificação & Prática
                  </span>
                  <span className="font-mono text-xs text-escuro-texto-2">{BOOK.cargaHoraria}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-branco">{feitas}/{total}</p>
                  <p className="text-xs text-escuro-texto">
                    {logado ? "aulas concluídas na sua conta" : "aulas passo a passo com exercícios"}
                  </p>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-escuro-hover">
                  <div
                    className="h-full rounded-full bg-cobre transition-all"
                    style={{ width: `${logado ? Math.max(pct, 4) : 100}%` }}
                  />
                </div>
                <ul className="mt-4 flex flex-col gap-2 text-xs text-escuro-texto-2">
                  <li className="flex items-center gap-2">
                    <Sparkles className="size-3.5 shrink-0 text-cobre" />
                    <span>Gerador de exercícios personalizados com IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="size-3.5 shrink-0 text-cobre" />
                    <span>20 ferramentas de gestão prontas para aplicar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="size-3.5 shrink-0 text-cobre" />
                    <span>Certificado com código e QR Code verificável</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setVerCertificado(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-escuro-borda bg-escuro-hover px-4 py-2.5 text-sm font-semibold text-branco transition-colors hover:border-cobre"
                >
                  <Eye className="size-4 text-cobre" /> Ver como será o certificado
                </button>
                <Link
                  to={logado ? "/book" : "/acesso"}
                  className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                >
                  {logado ? "Abrir o book completo" : "Entrar na imersão"} <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Instrutor + Chamada final ocupando toda a largura */}
        <section aria-labelledby="quem-ensina" className="w-full">
          <div className="grid gap-6 rounded-3xl border border-linha bg-branco p-6 sombra md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] md:p-7">
            <img
              src={instrutorFoto.url}
              alt="Emerson Mendes, instrutor da Imersão Google Gemini"
              className="h-64 w-full rounded-2xl border border-linha object-cover object-top md:h-full md:max-h-[290px]"
              loading="lazy"
            />
            <div className="flex flex-col justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="sobretitulo text-cobre-texto">Quem ensina</p>
                  <span className="rounded-full border border-linha bg-areia px-3 py-0.5 text-xs font-semibold text-apagado">
                    Mentoria prática orientada a negócios
                  </span>
                </div>
                <h2 id="quem-ensina" className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                  Emerson Mendes
                </h2>
                <p className="mt-1 text-sm font-semibold text-cobre-texto md:text-base">
                  Cientista de Dados · Instrutor da Imersão Google Gemini
                </p>
                <p className="mt-2.5 max-w-4xl text-sm leading-relaxed text-apagado md:text-base">
                  Emerson conduz você aula por aula, mostrando na prática como configurar e usar o Google Gemini para resolver problemas reais da empresa — do fluxo de caixa às vendas, compras, equipe e atendimento.
                </p>
              </div>

              <ul className="grid gap-2.5 sm:grid-cols-3">
                {[
                  "Pós-graduado em Data Science",
                  "Pós-graduando em Engenharia de IA",
                  "Especialista em Investimentos (CVM)",
                ].map((cred) => (
                  <li
                    key={cred}
                    className="flex items-center gap-2.5 rounded-xl border border-linha bg-areia px-3.5 py-2.5 text-xs font-semibold leading-snug text-tinta-2"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cobre-suave text-cobre-texto">
                      <GraduationCap className="size-4" />
                    </span>
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>

              {/* Barra de chamada integrada no rodapé do card */}
              <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-cobre-borda bg-cobre-suave/60 px-4 py-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <LogoGemini className="size-7 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-tinta">
                      Pronto para aplicar o Gemini na gestão da sua empresa?
                    </p>
                    <p className="text-xs text-apagado">
                      {logado
                        ? `Você já concluiu ${feitas} de ${total} aulas — continue de onde parou.`
                        : "Entre com o código da turma que você recebeu do instrutor e comece agora."}
                    </p>
                  </div>
                </div>
                <Link
                  to={logado ? "/book" : "/acesso"}
                  className="btn-tinta flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
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
