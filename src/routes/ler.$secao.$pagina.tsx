import { useEffect, useState } from "react";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, LogOut, Menu, Minimize2, MonitorPlay, PanelLeftClose, PanelLeftOpen, RotateCcw, X } from "lucide-react";
import { sair } from "@/lib/sessao";

import { BOOK, ROTULO_TIPO, acharAula, aulaVizinha, modulos, passosDa, type AulaInfo } from "@/content/imersao";
import { CorpoPasso } from "@/components/imersao/Passos";
import { Glifo } from "@/components/imersao/Glifo";
import { marcarVisto, useProgresso, zerarProgresso } from "@/lib/progresso";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ler/$secao/$pagina")({
  loader: ({ params }) => {
    const info = acharAula(params.secao);
    const i = Number(params.pagina);
    if (!info || !Number.isInteger(i) || i < 1 || i > passosDa(info.aula).length) throw redirect({ to: "/" });
    return { n: info.aula.n, i };
  },
  head: ({ params }) => {
    const info = acharAula(params.secao);
    const title = info ? `Aula ${info.aula.n} · ${info.aula.titulo} — ${BOOK.nome}` : BOOK.nome;
    const description = info ? info.aula.objetivo : "Imersão Google Gemini.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Leitor,
});

function Lateral({ atual, aoFechar, aoRecolher }: { atual: string; aoFechar?: () => void; aoRecolher?: () => void }) {
  const prog = useProgresso();
  const [confirmando, setConfirmando] = useState(false);

  function reiniciar() {
    if (!confirmando) {
      setConfirmando(true);
      return;
    }
    zerarProgresso();
    setConfirmando(false);
  }

  return (
    <nav className="flex h-full flex-col bg-tinta px-4 py-6 text-escuro-texto">
      <div className="flex items-center justify-between px-2">
        <Link to="/book" className="text-lg font-bold text-branco">
          {BOOK.tituloAntes} <span className="text-cobre">{BOOK.tituloAcento}</span>
        </Link>
        {aoRecolher && (
          <button type="button" onClick={aoRecolher} aria-label="Recolher menu" title="Recolher menu" className="rounded-lg p-1 hover:bg-escuro-hover hover:text-branco">
            <PanelLeftClose className="size-5" />
          </button>
        )}
        {aoFechar && (
          <button type="button" onClick={aoFechar} aria-label="Fechar menu" className="lg:hidden">
            <X className="size-5" />
          </button>
        )}
      </div>
      <div className="mt-6 flex-1 overflow-y-auto barra-lateral pr-2">
        <div className="flex flex-col gap-6">
          {modulos.map((m, mi) => (
            <div key={m.id}>
              <p className="mb-2 flex items-center gap-2 px-2 text-[11px] font-bold uppercase tracking-[0.14em] text-escuro-texto-2">
                <Glifo id={m.glifo} className="size-3.5" /> {mi + 1} · {m.nome}
              </p>
              <div className="flex flex-col gap-0.5">
                {m.aulas.map((a) => {
                  const ativa = a.n === atual;
                  const feita = prog.concluidas.includes(a.n);
                  return (
                    <Link
                      key={a.n}
                      to="/ler/$secao/$pagina"
                      params={{ secao: a.n, pagina: "1" }}
                      onClick={aoFechar}
                      className={cn("flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors", ativa ? "bg-escuro-hover text-branco" : "hover:bg-escuro-hover")}
                    >
                      <span className={cn("w-7 shrink-0 font-mono text-xs", ativa ? "text-cobre" : "text-escuro-texto-2")}>{a.n}</span>
                      <span className="flex-1 leading-snug">{a.curto}</span>
                      {feita && <Check className="size-3.5 text-verde" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 border-t border-escuro-borda pt-4">
        {confirmando ? (
          <div className="flex items-center gap-2">
            <p className="flex-1 text-xs leading-snug text-escuro-texto-2">Apaga aulas concluídas e passos vistos. Confirma?</p>
            <button type="button" onClick={reiniciar} className="rounded-lg bg-verde-suave px-3 py-1.5 text-xs font-bold text-verde-texto">
              Sim
            </button>
            <button type="button" onClick={() => setConfirmando(false)} className="rounded-lg border border-escuro-borda px-3 py-1.5 text-xs font-semibold text-escuro-texto hover:bg-escuro-hover">
              Não
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={reiniciar}
            title="Zera aulas concluídas, passos vistos e checklists"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-escuro-borda px-3 py-2 text-xs font-semibold text-escuro-texto transition-colors hover:border-cobre hover:bg-escuro-hover hover:text-branco"
          >
            <RotateCcw className="size-3.5" /> Reiniciar imersão
          </button>
        )}
        <button type="button" onClick={() => void sair()} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-escuro-texto-2 hover:bg-escuro-hover hover:text-branco">
          <LogOut className="size-3.5" /> Sair
        </button>
      </div>
    </nav>
  );
}

function Leitor() {
  const { n, i } = Route.useLoaderData();
  const info = acharAula(n) as AulaInfo;
  const passos = passosDa(info.aula);
  const passo = passos[i - 1]!;
  const prog = useProgresso();
  const vistos = prog.vistos[n] ?? [];
  const [menu, setMenu] = useState(false);
  const [telao, setTelao] = useState(false);
  const [recolhido, setRecolhido] = useState(false);
  useEffect(() => {
    setRecolhido(window.localStorage.getItem("imersao-menu-recolhido") === "1");
  }, []);
  function recolher(v: boolean) {
    setRecolhido(v);
    try {
      window.localStorage.setItem("imersao-menu-recolhido", v ? "1" : "0");
    } catch {
      /* sem armazenamento */
    }
  }
  const comLateral = !telao && !recolhido;
  const navigate = useNavigate();

  useEffect(() => {
    marcarVisto(n, i);
    window.scrollTo({ top: 0 });
  }, [n, i, passos.length]);

  const prox = aulaVizinha(info, 1);
  const ant = aulaVizinha(info, -1);
  const destinoProx = i < passos.length ? { secao: n, pagina: String(i + 1) } : prox ? { secao: prox.aula.n, pagina: "1" } : null;
  const destinoAnt = i > 1 ? { secao: n, pagina: String(i - 1) } : ant ? { secao: ant.aula.n, pagina: String(passosDa(ant.aula).length) } : null;
  const titulo = passo.titulo;
  const enfase = "tituloEnfase" in passo ? passo.tituloEnfase : undefined;
  const ultimo = i === passos.length;

  function alternarTelao(ligar = !telao) {
    setTelao(ligar);
    try {
      if (ligar && !document.fullscreenElement) void document.documentElement.requestFullscreen?.();
      if (!ligar && document.fullscreenElement) void document.exitFullscreen?.();
    } catch {
      /* tela cheia indisponível */
    }
  }

  useEffect(() => {
    const sair = () => !document.fullscreenElement && setTelao(false);
    document.addEventListener("fullscreenchange", sair);
    return () => document.removeEventListener("fullscreenchange", sair);
  }, []);

  useEffect(() => {
    function tecla(e: KeyboardEvent) {
      const alvo = e.target as HTMLElement;
      if (alvo.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight" && destinoProx) {
        navigate({ to: "/ler/$secao/$pagina", params: destinoProx });
      } else if (e.key === "ArrowLeft" && destinoAnt) navigate({ to: "/ler/$secao/$pagina", params: destinoAnt });
      else if (e.key.toLowerCase() === "t") alternarTelao();
      else if (e.key === "Escape" && telao) alternarTelao(false);
    }
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  });

  const corpoTitulo = enfase && titulo.endsWith(enfase) ? titulo.slice(0, -enfase.length).trimEnd() : titulo;

  return (
    <div className={cn("min-h-screen bg-areia text-tinta", comLateral && "lg:grid lg:grid-cols-[280px_1fr]")}>
      <aside className={cn("sticky top-0 hidden h-screen", comLateral && "lg:block")}>
        <Lateral atual={n} aoRecolher={() => recolher(true)} />
      </aside>
      {menu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-tinta/50" onClick={() => setMenu(false)} />
          <div className="absolute inset-y-0 left-0 w-[290px]">
            <Lateral atual={n} aoFechar={() => setMenu(false)} />
          </div>
        </div>
      )}

      <main className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-linha bg-areia/95 backdrop-blur">
          <div className="flex items-center gap-3 px-5 pt-4 md:px-10">
            <button type="button" onClick={() => setMenu(true)} aria-label="Abrir menu" className="lg:hidden">
              <Menu className="size-5" />
            </button>
            {recolhido && !telao && (
              <button type="button" onClick={() => recolher(false)} aria-label="Mostrar menu" title="Mostrar menu" className="hidden rounded-lg p-1 hover:bg-areia-2 lg:block">
                <PanelLeftOpen className="size-5" />
              </button>
            )}
            <p className="text-sm text-apagado">
              <span className="font-semibold text-tinta">Aula {n}</span> · {info.aula.titulo} · <span className="text-cobre-texto">{info.aula.ferramenta}</span>
            </p>
            <button
              type="button"
              onClick={() => alternarTelao()}
              title="Modo telão (tecla T)"
              className="btn-claro ml-auto hidden items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold md:flex"
            >
              {telao ? <Minimize2 className="size-3.5" /> : <MonitorPlay className="size-3.5" />} {telao ? "Sair do telão" : "Modo telão"}
            </button>
          </div>
          <div className="flex gap-1 overflow-x-auto px-5 pt-3 barra-clara md:px-10">
            {passos.map((p, k) => {
              const ativo = k + 1 === i;
              const visto = vistos.includes(k + 1);
              return (
                <Link
                  key={k}
                  to="/ler/$secao/$pagina"
                  params={{ secao: n, pagina: String(k + 1) }}
                  className={cn(
                    "flex shrink-0 items-center gap-2 border-b-2 px-3 pb-3 pt-1 text-sm font-semibold transition-colors",
                    ativo ? "border-cobre text-tinta" : "border-transparent text-apagado hover:text-tinta",
                  )}
                >
                  <span className={cn("flex size-5 items-center justify-center rounded-full text-[11px]", ativo ? "bg-tinta text-branco" : visto ? "bg-verde-suave text-verde-texto" : "bg-linha")}>{k + 1}</span>
                  {p.rotulo}
                </Link>
              );
            })}
          </div>
        </header>

        <div key={`${n}-${i}`} className={cn("mx-auto w-full flex-1 animate-entra px-5 py-8 md:px-10 md:py-10", telao ? "max-w-[1500px]" : "max-w-6xl")} style={telao ? { zoom: 1.25 } : undefined}>
          <p className="sobretitulo">
            {String(i).padStart(2, "0")} · {"rotuloTipo" in passo && passo.rotuloTipo ? passo.rotuloTipo : ROTULO_TIPO[passo.tipo]}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-[1.08] tracking-tight md:text-[2.6rem]">
            {corpoTitulo}
            {enfase && (
              <>
                <br />
                <span className="text-cobre-texto">{enfase}</span>
              </>
            )}
          </h1>
          {"texto" in passo && passo.texto && <p className="mt-3 max-w-3xl text-lg text-apagado">{passo.texto}</p>}
          <div className="mt-8">
            <CorpoPasso info={info} passo={passo} indice={i} />
          </div>
        </div>

        <footer className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-linha bg-areia/95 px-5 py-3 backdrop-blur md:px-10">
          {destinoAnt ? (
            <Link to="/ler/$secao/$pagina" params={destinoAnt} className="btn-claro flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
              <ArrowLeft className="size-4" /> Anterior
            </Link>
          ) : (
            <span />
          )}
          <span className="flex items-center gap-3 text-xs text-apagado">
            {i} / {passos.length}
          </span>
          {destinoProx ? (
            <Link
              to="/ler/$secao/$pagina"
              params={destinoProx}
              className="btn-tinta flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              {!ultimo ? "Próximo" : `Ir para ${destinoProx.secao}`} <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link to="/book" className="btn-tinta rounded-xl px-4 py-2.5 text-sm font-semibold">
              Voltar à capa
            </Link>
          )}
        </footer>
      </main>
    </div>
  );
}
