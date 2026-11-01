import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { modules, pageKeysOfModule } from "@/content/book";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function Toc({ currentKey, onNavigate }: { currentKey?: string; onNavigate?: () => void }) {
  const progress = useProgress();
  const visited = new Set(progress.visited);
  const currentSection = currentKey?.split("/")[0];
  const currentModule = currentSection?.split(".")[0];

  return (
    <nav aria-label="Sumário" className="space-y-1">
      {modules.map((m) => {
        const keys = pageKeysOfModule(m);
        const done = keys.filter((k) => visited.has(k)).length;
        const complete = done === keys.length;
        const open = String(m.n) === currentModule;
        return (
          <details key={m.n} open={open} className="group rounded-xl">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-sidebar-accent [&::-webkit-details-marker]:hidden">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.7rem]",
                  complete ? "border-cobalt bg-cobalt text-accent-foreground" : "border-foreground/20 text-muted-foreground",
                )}
              >
                {complete ? <Check className="size-3.5" /> : m.n}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{m.title}</span>
                <span className="mt-1 block h-0.5 overflow-hidden rounded-full bg-foreground/10">
                  <span className="block h-full bg-spark transition-all" style={{ width: `${(done / keys.length) * 100}%` }} />
                </span>
              </span>
            </summary>
            <ul className="mb-2 ml-[1.6rem] mt-1 space-y-0.5 border-l border-border pl-3">
              {m.sections.map((s) =>
                s.pages.map((p, i) => {
                  const key = `${s.id}/${i + 1}`;
                  const active = key === currentKey;
                  return (
                    <li key={key}>
                      <Link
                        to="/ler/$secao/$pagina"
                        params={{ secao: s.id, pagina: String(i + 1) }}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[0.84rem] leading-snug transition-colors",
                          active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-sidebar-accent hover:text-foreground",
                        )}
                      >
                        <span className={cn("mt-px shrink-0 font-mono text-[0.7rem]", active ? "opacity-70" : "text-muted-foreground")}>
                          {s.id}
                          {s.pages.length > 1 ? `.${i + 1}` : ""}
                        </span>
                        <span className="flex-1">{s.pages.length > 1 ? p.title : s.title}</span>
                        {visited.has(key) && !active && <Check className="mt-0.5 size-3 shrink-0 text-cobalt" />}
                      </Link>
                    </li>
                  );
                }),
              )}
            </ul>
          </details>
        );
      })}
    </nav>
  );
}
