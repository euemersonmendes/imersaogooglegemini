import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";

import capa from "@/assets/capa-gemini.jpg";
import { BOOK_EDITION, BOOK_TITLE, flatPages, modules, pageKeysOfModule, stats } from "@/content/book";
import { Button } from "@/components/ui/button";
import { resetProgress, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BOOK_TITLE} — o book digital completo` },
      {
        name: "description",
        content:
          "Ebook interativo e imersão completa em Google Gemini: prompts, Deep Research, Canvas, imagens, vídeos, agentes, Workspace e plano de ação de 30 dias.",
      },
      { property: "og:title", content: `${BOOK_TITLE} — o book digital completo` },
      {
        property: "og:description",
        content: "Aprenda a usar o Google Gemini do zero ao avançado, com prompts prontos, exercícios e quizzes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cover,
});

function Cover() {
  const progress = useProgress();
  const first = flatPages[0];
  const last = progress.last ? flatPages.find((p) => p.key === progress.last) : undefined;
  const start = (last ?? first)!;
  const visited = new Set(progress.visited);
  const pct = Math.round((progress.visited.length / flatPages.length) * 100);

  return (
    <div className="min-h-screen paper-grain">
      {/* Capa */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:pt-16">
        <div className="animate-rise">
          <p className="eyebrow">Book digital · {BOOK_EDITION}</p>
          <h1 className="mt-5 font-display text-[3.4rem] leading-[0.95] md:text-[5.6rem]">
            Imersão
            <br />
            <span className="italic text-spark">Google Gemini</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/75">
            Do primeiro prompt aos agentes que trabalham por você. Um curso completo, prático e em português, para
            usar a IA do Google no trabalho e na vida.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="ink" size="xl">
              <Link to="/ler/$secao/$pagina" params={{ secao: start.sectionId, pagina: String(start.pageNumber) }}>
                {last ? "Continuar de onde parei" : "Começar a imersão"} <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="paper" size="xl">
              <a href="#sumario">Ver sumário</a>
            </Button>
            <Button asChild variant="paper" size="xl">
              <Link to="/exercicio">Gerar exercício com IA</Link>
            </Button>
          </div>
          {last && (
            <p className="mt-3 text-sm text-muted-foreground">
              Última página: {last.sectionId} · {last.page.title}
            </p>
          )}

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              [stats.modules, "módulos"],
              [stats.pages, "páginas"],
              [stats.prompts, "prompts prontos"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-4xl">{n}</dt>
                <dd className="text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute -inset-3 rotate-2 rounded-[2rem] border border-border bg-card/60" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border shadow-lift">
            <img src={capa} alt="Duas estrelas de luz entrelaçadas, em azul e cobre, sobre papel cor de areia" width={1200} height={1504} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-6">
              <p className="eyebrow !text-primary-foreground/80">Do zero ao avançado</p>
              <p className="mt-1 font-display text-3xl leading-tight text-primary-foreground">
                Entender. Pedir. Aplicar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sumário */}
      <section id="sumario" className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Sumário</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">O caminho da imersão</h2>
            </div>
            {progress.visited.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="w-40">
                  <div className="mb-1 flex justify-between font-mono text-xs text-muted-foreground">
                    <span>Seu progresso</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-foreground/10">
                    <div className="h-full bg-spark" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <Button
                  variant="soft"
                  size="sm"
                  onClick={() => {
                    if (window.confirm("Apagar todo o seu progresso neste navegador?")) resetProgress();
                  }}
                >
                  <RotateCcw /> Recomeçar
                </Button>
              </div>
            )}
          </div>

          <ol className="grid gap-4 md:grid-cols-2">
            {modules.map((m) => {
              const keys = pageKeysOfModule(m);
              const done = keys.filter((k) => visited.has(k)).length;
              const firstSection = m.sections[0]!;
              return (
                <li key={m.n}>
                  <Link
                    to="/ler/$secao/$pagina"
                    params={{ secao: firstSection.id, pagina: "1" }}
                    className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-paper transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lift"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-display text-5xl leading-none text-copper">
                        {String(m.n).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="eyebrow !text-muted-foreground">{m.kicker}</p>
                        <h3 className="mt-1 font-display text-3xl leading-tight">{m.title}</h3>
                      </div>
                      <ArrowRight className="mt-2 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                    </div>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/70">{m.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.sections.map((s) => (
                        <span
                          key={s.id}
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 text-xs",
                            s.pages.every((_, i) => visited.has(`${s.id}/${i + 1}`))
                              ? "border-cobalt/30 bg-cobalt-soft text-cobalt"
                              : "border-border text-muted-foreground",
                          )}
                        >
                          {s.id} {s.title}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-5">
                      <div className="h-0.5 overflow-hidden rounded-full bg-foreground/10">
                        <div className="h-full bg-spark transition-all" style={{ width: `${(done / keys.length) * 100}%` }} />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-spark" /> {BOOK_TITLE} · {BOOK_EDITION}
          </span>
          <span>Material independente, sem vínculo oficial com o Google.</span>
        </div>
      </footer>
    </div>
  );
}
