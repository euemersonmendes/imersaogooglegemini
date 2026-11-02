import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Check, LogOut, Settings, Sparkles } from "lucide-react";

import { BOOK, aulas, modulos } from "@/content/imersao";
import { Glifo } from "@/components/imersao/Glifo";
import { LogoGemini } from "@/components/imersao/LogoGemini";
import { useProgresso } from "@/lib/progresso";
import { sair, useSessao } from "@/lib/sessao";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imersão Gemini com Emerson Mendes — IA para pequenas empresas" },
      { name: "description", content: "Book digital da Imersão Google Gemini para micro e pequenos empresários: cinco módulos, aulas em passos, prompts para copiar e telas ilustradas." },
      { property: "og:title", content: "Imersão Gemini — book digital da turma" },
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
  const ultimo = prog.ultimo;
  const continuar = ultimo ? { secao: ultimo.aula, pagina: String(ultimo.passo) } : { secao: aulas[0]!.aula.n, pagina: "1" };
  const total = aulas.length;
  const feitas = prog.concluidas.length;

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="selo text-apagado">{BOOK.selo}</p>
          <div className="ml-auto flex flex-wrap items-center gap-2 text-sm">
            <span className="text-apagado">Olá, <span className="font-semibold text-tinta">{sessao.nome.split(" ")[0]}</span></span>
            {feitas >= total ? (
              <Link to="/certificado" title="Você concluiu todas as aulas — seu certificado está pronto" className="btn-tinta relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold">
                <span className="absolute -right-1 -top-1 flex size-3"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cobre opacity-75" /><span className="relative inline-flex size-3 rounded-full bg-cobre" /></span>
                <Award className="size-4" /> Certificado liberado!
              </Link>
            ) : (
              <Link to="/certificado" className="btn-claro flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold"><Award className="size-4" /> Certificado</Link>
            )}
            {sessao.admin && <Link to="/admin" className="btn-claro flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold"><Settings className="size-4" /> Administração</Link>}
            <button type="button" onClick={() => void sair()} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold text-apagado hover:text-tinta"><LogOut className="size-4" /> Sair</button>
          </div>
        </div>
        {feitas >= total && (
          <Link to="/certificado" role="status" className="mt-5 flex items-center gap-3 rounded-2xl border border-cobre bg-cobre-suave px-4 py-3 text-sm hover:brightness-95">
            <Award className="size-6 shrink-0 text-cobre-texto" />
            <span className="flex-1"><b>Parabéns, você concluiu todas as {total} aulas!</b> Seu certificado está pronto para imprimir ou salvar em PDF.</span>
            <span className="flex items-center gap-1 font-semibold text-cobre-texto">Ver certificado <ArrowRight className="size-4" /></span>
          </Link>
        )}
        <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <LogoGemini className="size-14 md:size-16" />
              <p className="sobretitulo text-cobre-texto">Google Gemini</p>
            </div>
            <h1 className="mt-4 text-6xl font-bold leading-[0.95] tracking-tight md:text-8xl">
              {BOOK.tituloAntes}
              <br />
              <span className="text-cobre-texto">
                {BOOK.tituloAcento}
                <LogoGemini className="ml-2 inline-block size-[0.72em] -translate-y-[0.06em]" />
              </span>
            </h1>
            <p className="mt-6 hidden max-w-xl text-lg text-apagado md:block">{BOOK.chamada}</p>
            <p className="mt-6 max-w-xl text-lg text-apagado md:hidden">{BOOK.chamadaCelular}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {BOOK.areas.map((a) => <span key={a} className="rounded-full border border-linha-2 bg-branco px-3 py-1 text-xs font-semibold">{a}</span>)}
            </div>
            <p className="mt-5 text-sm text-apagado">Instrutor e responsável: <span className="font-semibold text-tinta">{BOOK.instrutor}</span></p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link to="/ler/$secao/$pagina" params={continuar} className="btn-tinta flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold">
              {ultimo ? `Continuar na aula ${ultimo.aula}` : "Começar a imersão"} <ArrowRight className="size-4" />
            </Link>
            <Link to="/exercicio" className="btn-claro flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold">
              <Sparkles className="size-4" /> Gerar exercício com IA
            </Link>
            <p className="text-sm text-apagado">
              {feitas} de {total} aulas concluídas
            </p>
          </div>
        </div>

        {/* Módulos em lombada */}
        <div className="mt-12 flex flex-col gap-3 md:h-[540px] md:flex-row">
          {modulos.map((m, mi) => {
            const ativo = aberto === mi;
            const concl = m.aulas.filter((a) => prog.concluidas.includes(a.n)).length;
            return (
              <div
                key={m.id}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-500",
                  ativo ? "flex-[5] border-linha bg-branco sombra" : "flex-1 cursor-pointer border-escuro-borda bg-tinta text-escuro-texto hover:bg-escuro-hover",
                )}
                onClick={() => setAberto(mi)}
              >
                {ativo ? (
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto">
                        <Glifo id={m.glifo} className="size-5" />
                      </span>
                      <p className="sobretitulo">
                        Módulo {mi + 1} · {concl}/{m.aulas.length}
                      </p>
                    </div>
                    <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight">{m.nomeCompleto}</h2>
                    <div className="mt-5 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto barra-clara pr-1">
                      {m.aulas.map((a) => (
                        <Link
                          key={a.n}
                          to="/ler/$secao/$pagina"
                          params={{ secao: a.n, pagina: "1" }}
                          className="group flex items-center gap-4 rounded-xl px-3 py-2.5 hover:bg-areia-2"
                        >
                          <span className="w-8 font-mono text-sm text-cobre-texto">{a.n}</span>
                          <span className="flex-1">
                            <span className="font-semibold">{a.titulo}</span>
                            <span className="block text-sm text-apagado">{a.objetivo}</span>
                          </span>
                          {prog.concluidas.includes(a.n) ? <Check className="size-4 text-verde" /> : <ArrowRight className="size-4 text-apagado opacity-0 group-hover:opacity-100" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center gap-4 px-5 py-4 md:flex-col md:justify-between md:px-0 md:py-6">
                    <span className="font-mono text-sm text-cobre">0{mi + 1}</span>
                    <span className="text-sm font-semibold tracking-wide md:rotate-180 md:[writing-mode:vertical-rl]">{m.nomeCompleto}</span>
                    <Glifo id={m.glifo} className="ml-auto size-5 md:ml-0" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Todas as aulas */}
        <section aria-labelledby="todas-aulas" className="mt-14">
          <div className="flex flex-wrap items-end gap-3">
            <h2 id="todas-aulas" className="text-2xl font-bold tracking-tight">Todas as aulas da imersão</h2>
            <span className="ml-auto text-sm text-apagado">{feitas} de {total} concluídas</span>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modulos.map((m, mi) => (
              <div key={m.id} className="rounded-2xl border border-linha bg-branco p-5">
                <p className="sobretitulo text-cobre-texto">Módulo {mi + 1}</p>
                <h3 className="mt-1 font-bold leading-snug">{m.nomeCompleto}</h3>
                <ul className="mt-3 flex flex-col">
                  {m.aulas.map((a) => {
                    const ok = prog.concluidas.includes(a.n);
                    return (
                      <li key={a.n}>
                        <Link to="/ler/$secao/$pagina" params={{ secao: a.n, pagina: "1" }} className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm hover:bg-areia">
                          <span className="w-8 font-mono text-xs text-cobre">{a.n}</span>
                          <span className="flex-1 group-hover:text-cobre-texto">{a.titulo}</span>
                          {ok ? <Check className="size-4 text-verde" aria-label="Concluída" /> : <ArrowRight className="size-4 text-apagado opacity-0 group-hover:opacity-100" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
