import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Menu } from "lucide-react";

import { BOOK_TITLE, findPage, flatPages, neighbors } from "@/content/book";
import { Blocks } from "@/components/book/Blocks";
import { Toc } from "@/components/book/Toc";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { markVisited, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/ler/$secao/$pagina")({
  loader: ({ params }) => {
    const fp = findPage(params.secao, params.pagina);
    if (!fp) throw notFound();
    return { key: fp.key };
  },
  head: ({ params }) => {
    const fp = findPage(params.secao, params.pagina);
    const title = fp ? `${fp.section.id} ${fp.page.title} · ${BOOK_TITLE}` : BOOK_TITLE;
    const description = fp
      ? `${fp.module.kicker}: ${fp.module.title}. ${fp.module.summary}`
      : "Imersão completa em Google Gemini.";
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
  component: Reader,
});

function Reader() {
  const { key } = Route.useLoaderData();
  const fp = flatPages.find((p) => p.key === key)!;
  const { prev, next } = neighbors(fp);
  const navigate = useNavigate();
  const progress = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    markVisited(fp.key);
    window.scrollTo({ top: 0 });
  }, [fp.key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && ["INPUT", "TEXTAREA"].includes(el.tagName)) return;
      const target = e.key === "ArrowRight" ? next : e.key === "ArrowLeft" ? prev : undefined;
      if (target) {
        navigate({ to: "/ler/$secao/$pagina", params: { secao: target.sectionId, pagina: String(target.pageNumber) } });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, navigate]);

  const pct = Math.round((progress.visited.length / flatPages.length) * 100);

  return (
    <div className="min-h-screen paper-grain">
      {/* Barra superior */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="soft" size="icon" className="lg:hidden" aria-label="Abrir sumário">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] overflow-y-auto bg-sidebar p-4">
              <SheetHeader className="px-1 pb-2">
                <SheetTitle className="font-display text-2xl font-normal">Sumário</SheetTitle>
              </SheetHeader>
              <Toc currentKey={fp.key} onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-spark" />
            <span className="font-display text-xl">Imersão Gemini</span>
          </Link>
          <span className="hidden truncate text-sm text-muted-foreground md:inline">
            · {fp.module.kicker} · {fp.module.title}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">{pct}% lido</span>
            <Button asChild variant="soft" size="sm" className="h-8 rounded-full">
              <Link to="/">
                <BookOpen /> <span className="hidden sm:inline">Capa</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="h-0.5 bg-foreground/5">
          <div className="h-full bg-spark transition-all duration-500" style={{ width: `${((fp.index + 1) / flatPages.length) * 100}%` }} />
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sumário fixo (desktop) */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[300px] shrink-0 overflow-y-auto border-r border-border bg-sidebar/60 p-4 lg:block">
          <p className="eyebrow mb-3 px-3">Sumário</p>
          <Toc currentKey={fp.key} />
        </aside>

        {/* Página */}
        <main className="min-w-0 flex-1 px-5 pb-24 pt-10 md:px-10 md:pt-14">
          <article key={fp.key} className="mx-auto max-w-[720px] animate-rise">
            <div className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full border border-copper/40 px-2.5 py-0.5 font-mono text-xs text-copper">
                  {fp.section.id}
                </span>
                <span className="eyebrow !text-muted-foreground">{fp.section.title}</span>
                {fp.section.pages.length > 1 && (
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {fp.pageNumber}/{fp.section.pages.length}
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">{fp.page.title}</h1>
            </div>

            <Blocks blocks={fp.page.blocks} />

            {/* Navegação */}
            <nav className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2" aria-label="Páginas">
              {prev ? (
                <Link
                  to="/ler/$secao/$pagina"
                  params={{ secao: prev.sectionId, pagina: String(prev.pageNumber) }}
                  className="group rounded-2xl border border-border bg-card p-4 shadow-paper transition-colors hover:border-foreground/25"
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Anterior · {prev.sectionId}
                  </span>
                  <span className="mt-1 block font-semibold leading-snug">{prev.page.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to="/ler/$secao/$pagina"
                  params={{ secao: next.sectionId, pagina: String(next.pageNumber) }}
                  className="group rounded-2xl bg-primary p-4 text-right text-primary-foreground shadow-lift transition-opacity hover:opacity-90"
                >
                  <span className="flex items-center justify-end gap-1.5 text-xs opacity-70">
                    Próxima · {next.sectionId} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1 block font-semibold leading-snug">{next.page.title}</span>
                </Link>
              ) : (
                <Link
                  to="/"
                  className="rounded-2xl bg-spark p-4 text-right font-semibold text-accent-foreground shadow-lift"
                >
                  Voltar para a capa →
                </Link>
              )}
            </nav>
            <p className="mt-6 hidden text-center text-xs text-muted-foreground md:block">
              Dica: use as setas ← → do teclado para virar a página.
            </p>
          </article>
        </main>
      </div>
    </div>
  );
}
