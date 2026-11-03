import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BookOpen, Check, Eye, LogOut, Presentation, Settings, Sparkles } from "lucide-react";

import { BOOK, aulas, modulos, passosDa } from "@/content/imersao";
import { Glifo } from "@/components/imersao/Glifo";
import { LogoGemini } from "@/components/imersao/LogoGemini";
import { ModalModeloCertificado } from "@/components/imersao/ModalModeloCertificado";
import { useProgresso } from "@/lib/progresso";
import { sair, useSessao } from "@/lib/sessao";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book da Imersão Google Gemini — aulas e módulos" },
      { name: "description", content: "Book digital da Imersão Google Gemini para micro e pequenos empresários: cinco módulos, aulas em passos, prompts para copiar e telas ilustradas." },
      { property: "og:title", content: "Book da Imersão Google Gemini — aulas e módulos" },
      { property: "og:description", content: "Cinco módulos e aulas em passos para micro e pequenos empresários usarem o Gemini no negócio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Capa,
});

function Capa() {
  const prog = useProgresso();
  const sessao = useSessao();
  const [aberto, setAberto] = useState(0);
  const [verCertificado, setVerCertificado] = useState(false);
  const ultimo = prog.ultimo;
  const continuar = ultimo ? { secao: ultimo.aula, pagina: String(ultimo.passo) } : { secao: aulas[0]!.aula.n, pagina: "1" };
  const total = aulas.length;
  const feitas = prog.concluidas.length;
  const pct = total > 0 ? Math.round((feitas / total) * 100) : 0;

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
          <Link to="/" className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold text-apagado hover:bg-areia-2 hover:text-tinta">
            <Presentation className="size-4" /> Apresentação
          </Link>
          <span className="hidden text-apagado sm:inline">
            Olá, <span className="font-semibold text-tinta">{sessao.nome.split(" ")[0]}</span>
          </span>
          {feitas >= total ? (
            <Link
              to="/certificado"
              title="Você concluiu todas as aulas — seu certificado está pronto"
              className="btn-tinta relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold"
            >
              <span className="absolute -right-1 -top-1 flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cobre opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-cobre" />
              </span>
              <Award className="size-4" /> Certificado liberado!
            </Link>
          ) : (
            <Link to="/certificado" className="btn-claro flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold">
              <Award className="size-4" /> Certificado
            </Link>
          )}
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
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col gap-6 px-4 py-5 md:px-8 md:py-6 xl:px-12">
        {feitas >= total && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cobre bg-cobre-suave px-4 py-3 text-sm">
            <Link to="/certificado" role="status" className="flex flex-1 items-center gap-3 hover:brightness-95">
              <Award className="size-6 shrink-0 text-cobre-texto" />
              <span className="flex-1">
                <b>Parabéns, você concluiu todas as {total} aulas!</b> Seu certificado está pronto para imprimir ou salvar em PDF.
              </span>
              <span className="flex items-center gap-1 font-semibold text-cobre-texto">
                Ver certificado <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link to="/pesquisa" className="inline-flex items-center gap-1 font-semibold text-cobre-texto hover:underline">
              Responder pesquisa <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        {/* Hero ocupando toda a largura: apresentação à esquerda + painel de estudo à direita */}
        <section className="grid w-full gap-5 lg:grid-cols-[1.45fr_1fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-3xl border border-linha bg-branco/85 p-6 backdrop-blur-sm sombra md:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cobre-borda bg-cobre-suave px-3 py-1 text-xs font-semibold text-cobre-texto">
                <BookOpen className="size-3.5" /> {BOOK.selo}
              </div>
              <h1 className="mt-3 text-5xl font-bold leading-[0.96] tracking-tight md:text-6xl xl:text-7xl">
                {BOOK.tituloAntes}{" "}
                <span className="acento">{BOOK.tituloAcento}</span>
                <LogoGemini className="ml-2 inline-block size-[0.68em] -translate-y-[0.06em]" />
              </h1>
              <p className="mt-4 hidden max-w-3xl text-base leading-relaxed text-apagado md:block lg:text-lg">{BOOK.chamada}</p>
              <p className="mt-4 text-base leading-relaxed text-apagado md:hidden">{BOOK.chamadaCelular}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-linha pt-4">
              <div className="flex flex-wrap gap-1.5">
                {BOOK.areas.map((a) => (
                  <span key={a} className="rounded-lg border border-linha-2 bg-areia px-2.5 py-1 text-xs font-semibold text-tinta-2">
                    {a}
                  </span>
                ))}
              </div>
              <p className="text-xs text-apagado">
                Instrutor: <span className="font-semibold text-tinta">{BOOK.instrutor}</span>
              </p>
            </div>
          </div>

          {/* Painel do aluno à direita */}
          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-linha bg-branco p-6 sombra md:p-7">
            <div>
              <div className="flex items-center justify-between gap-2">
                <p className="sobretitulo text-cobre-texto">Seu painel de estudo</p>
                <span className="rounded-full bg-cobre-suave px-2.5 py-0.5 text-xs font-bold text-cobre-texto">
                  {pct}% concluído
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <p className="text-2xl font-bold text-tinta">
                  {feitas} <span className="text-base font-medium text-apagado">de {total} aulas concluídas</span>
                </p>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-areia-2">
                <div className="h-full rounded-full bg-cobre transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              {[
                ["5", "módulos"],
                [String(total), "aulas"],
                [BOOK.cargaHoraria, "certificado"],
              ].map(([n, r]) => (
                <div key={r} className="rounded-2xl border border-linha bg-areia px-2 py-2.5">
                  <p className="text-xl font-bold text-cobre-texto md:text-2xl">{n}</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-apagado">{r}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Link
                  to="/ler/$secao/$pagina"
                  params={continuar}
                  className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
                >
                  {ultimo ? `Continuar aula ${ultimo.aula}` : "Começar a imersão"} <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/exercicio"
                  className="btn-claro flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
                >
                  <Sparkles className="size-4 text-cobre-texto" /> Exercício com IA
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setVerCertificado(true)}
                className="btn-claro flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-tinta-2"
              >
                <Eye className="size-4 text-cobre-texto" /> Ver como será o certificado de conclusão
              </button>
            </div>
          </div>
        </section>

        {/* Módulos em lombada ocupando toda a largura */}
        <section aria-label="Navegação por módulos" className="w-full">
          <div className="flex flex-col gap-3 md:h-[390px] md:flex-row">
            {modulos.map((m, mi) => {
              const ativo = aberto === mi;
              const concl = m.aulas.filter((a) => prog.concluidas.includes(a.n)).length;
              return (
                <div
                  key={m.id}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-all duration-500",
                    ativo
                      ? "flex-[5] border-linha bg-branco sombra"
                      : "flex-1 cursor-pointer border-escuro-borda bg-tinta text-escuro-texto hover:bg-escuro-hover",
                  )}
                  onClick={() => setAberto(mi)}
                >
                  {ativo ? (
                    <div className="flex h-full flex-col p-5 md:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-linha pb-3">
                        <div className="flex items-center gap-3">
                          <span className="flex size-10 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto">
                            <Glifo id={m.glifo} className="size-5" />
                          </span>
                          <div>
                            <p className="sobretitulo">
                              Módulo {mi + 1} · {concl}/{m.aulas.length} concluídas
                            </p>
                            <h2 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">{m.nomeCompleto}</h2>
                          </div>
                        </div>
                        <Link
                          to="/ler/$secao/$pagina"
                          params={{ secao: m.aulas[0]!.n, pagina: "1" }}
                          className="btn-claro hidden items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold sm:inline-flex"
                        >
                          Iniciar módulo <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                      <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-y-auto barra-clara pr-1 xl:grid-cols-2">
                        {m.aulas.map((a) => {
                          const ok = prog.concluidas.includes(a.n);
                          const numPassos = passosDa(a).length;
                          return (
                            <Link
                              key={a.n}
                              to="/ler/$secao/$pagina"
                              params={{ secao: a.n, pagina: "1" }}
                              className="group flex items-center gap-3.5 rounded-xl border border-linha/70 bg-areia/50 px-3.5 py-2.5 transition-colors hover:border-cobre-borda hover:bg-cobre-suave/40"
                            >
                              <span className="w-8 shrink-0 font-mono text-sm font-semibold text-cobre-texto">{a.n}</span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-semibold text-tinta group-hover:text-cobre-texto">{a.titulo}</span>
                                <span className="block truncate text-xs text-apagado">{a.objetivo}</span>
                              </span>
                              <span className="hidden shrink-0 rounded-md bg-branco px-2 py-0.5 text-[11px] font-medium text-apagado sm:inline">
                                {numPassos} passos
                              </span>
                              {ok ? (
                                <Check className="size-4 shrink-0 text-verde" />
                              ) : (
                                <ArrowRight className="size-4 shrink-0 text-apagado opacity-40 transition-opacity group-hover:text-cobre-texto group-hover:opacity-100" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center gap-4 px-5 py-3.5 md:flex-col md:justify-between md:px-0 md:py-5">
                      <span className="font-mono text-sm font-bold text-cobre">0{mi + 1}</span>
                      <span className="text-sm font-semibold tracking-wide md:rotate-180 md:[writing-mode:vertical-rl]">
                        {m.nomeCompleto}
                      </span>
                      <Glifo id={m.glifo} className="ml-auto size-5 md:ml-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Todas as aulas ocupando toda a largura */}
        <section aria-labelledby="todas-aulas" className="w-full">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="sobretitulo text-cobre-texto">Mapa completo</p>
              <h2 id="todas-aulas" className="mt-0.5 text-2xl font-bold tracking-tight">
                Todas as aulas da imersão
              </h2>
            </div>
            <span className="text-sm text-apagado">
              {feitas} de {total} concluídas
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {modulos.map((m, mi) => {
              const conclModulo = m.aulas.filter((a) => prog.concluidas.includes(a.n)).length;
              return (
                <div key={m.id} className="flex flex-col rounded-2xl border border-linha bg-branco p-5 sombra">
                  <div className="flex items-center justify-between gap-2 border-b border-linha pb-3">
                    <div className="min-w-0">
                      <p className="sobretitulo text-cobre-texto">Módulo {mi + 1}</p>
                      <h3 className="mt-0.5 truncate font-bold leading-snug" title={m.nomeCompleto}>{m.nomeCompleto}</h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-areia-2 px-2.5 py-0.5 text-xs font-semibold text-apagado">
                      {conclModulo}/{m.aulas.length}
                    </span>
                  </div>
                  <ul className="mt-2.5 flex flex-1 flex-col divide-y divide-linha/60">
                    {m.aulas.map((a) => {
                      const ok = prog.concluidas.includes(a.n);
                      return (
                        <li key={a.n}>
                          <Link
                            to="/ler/$secao/$pagina"
                            params={{ secao: a.n, pagina: "1" }}
                            className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-areia"
                          >
                            <span className="w-8 font-mono text-xs font-semibold text-cobre-texto">{a.n}</span>
                            <span className="flex-1 truncate group-hover:text-cobre-texto">{a.titulo}</span>
                            {ok ? (
                              <Check className="size-4 text-verde" aria-label="Concluída" />
                            ) : (
                              <ArrowRight className="size-4 text-apagado opacity-0 group-hover:opacity-100" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            {/* 6º card para fechar a grade sem espaço vazio */}
            <div className="flex flex-col justify-between rounded-2xl border border-escuro-borda bg-tinta p-5 text-escuro-texto sombra">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-escuro-hover px-3 py-1 text-xs font-semibold text-cobre">
                    <Sparkles className="size-3.5" /> Recursos extras
                  </span>
                  <span className="font-mono text-xs text-escuro-texto-2">{BOOK.cargaHoraria}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-branco">Prática com IA & Certificado</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-escuro-texto">
                  Gere exercícios sob medida para o momento atual da sua empresa ou acompanhe a liberação do seu certificado oficial.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/exercicio"
                  className="btn-tinta flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
                >
                  <Sparkles className="size-4" /> Exercício com IA
                </Link>
                <button
                  type="button"
                  onClick={() => setVerCertificado(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-escuro-borda bg-escuro-hover px-4 py-2.5 text-sm font-semibold text-branco hover:border-cobre"
                >
                  <Eye className="size-4 text-cobre" /> Modelo do certificado
                </button>
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
