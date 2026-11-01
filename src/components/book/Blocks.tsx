import { useState } from "react";
import { Check, Copy, Lightbulb, AlertTriangle, Sparkles, Zap, X, RotateCcw, Quote } from "lucide-react";

import type { Block, QuizQuestion } from "@/content/types";
import { answerQuiz, resetQuiz, toggleCheck, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      return <p className="font-display text-2xl leading-snug text-foreground md:text-[1.7rem]">{block.text}</p>;
    case "p":
      return <p className="text-[1.05rem] leading-relaxed text-foreground/85">{block.text}</p>;
    case "h":
      return <h3 className="font-display text-2xl text-foreground">{block.text}</h3>;
    case "list":
      return <ListBlock items={block.items} ordered={block.ordered} />;
    case "callout":
      return <Callout {...block} />;
    case "prompt":
      return <PromptBlock {...block} />;
    case "steps":
      return <Steps items={block.items} />;
    case "table":
      return <TableBlock head={block.head} rows={block.rows} />;
    case "cards":
      return <Cards items={block.items} />;
    case "compare":
      return <Compare bad={block.bad} good={block.good} />;
    case "exercise":
      return <Exercise {...block} />;
    case "checklist":
      return <Checklist {...block} />;
    case "quiz":
      return <Quiz id={block.id} questions={block.questions} />;
    case "quote":
      return (
        <figure className="relative rounded-3xl bg-primary px-8 py-10 text-primary-foreground shadow-lift">
          <Quote className="mb-4 size-6 text-copper" />
          <blockquote className="font-display text-2xl leading-snug md:text-3xl">{block.text}</blockquote>
          {block.author && <figcaption className="mt-4 text-sm opacity-70">— {block.author}</figcaption>}
        </figure>
      );
  }
}

function ListBlock({ items, ordered }: { items: string[]; ordered?: boolean | undefined }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-foreground/85">
          <span
            className={cn(
              "mt-[0.55rem] shrink-0",
              ordered ? "font-mono text-xs text-copper" : "size-1.5 rounded-full bg-copper",
            )}
          >
            {ordered ? String(i + 1).padStart(2, "0") : null}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const toneMap = {
  dica: { icon: Lightbulb, label: "Dica", cls: "bg-cobalt-soft border-cobalt/20", ic: "text-cobalt" },
  atencao: { icon: AlertTriangle, label: "Atenção", cls: "bg-copper-soft border-copper/30", ic: "text-copper" },
  insight: { icon: Sparkles, label: "Insight", cls: "bg-ink-soft border-foreground/10", ic: "text-foreground" },
  novidade: { icon: Zap, label: "Novidade", cls: "bg-sage-soft border-sage/25", ic: "text-sage" },
} as const;

function Callout({ tone, title, text }: { tone: keyof typeof toneMap; title?: string; text: string }) {
  const t = toneMap[tone];
  const Icon = t.icon;
  return (
    <aside className={cn("flex gap-4 rounded-2xl border p-5", t.cls)}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", t.ic)} />
      <div>
        <p className={cn("eyebrow mb-1", t.ic)}>{title ?? t.label}</p>
        <p className="leading-relaxed text-foreground/85">{text}</p>
      </div>
    </aside>
  );
}

function PromptBlock({ title, text, note }: { title?: string; text: string; note?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard bloqueado */
    }
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-paper">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/60 px-5 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-spark" />
          <span className="truncate text-sm font-semibold">{title ?? "Prompt"}</span>
        </div>
        <Button variant="paper" size="sm" onClick={copy} className="h-8 shrink-0 rounded-full px-3">
          {copied ? <Check className="text-success" /> : <Copy />}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap px-5 py-4 font-mono text-[0.86rem] leading-relaxed text-foreground/90">
        {text}
      </pre>
      {note && <p className="border-t border-dashed border-border px-5 py-3 text-sm text-muted-foreground">{note}</p>}
    </div>
  );
}

function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="relative space-y-5 border-l border-border pl-8">
      {items.map((s, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[2.85rem] flex size-7 items-center justify-center rounded-full border border-border bg-card font-mono text-xs text-copper">
            {i + 1}
          </span>
          <p className="font-semibold text-foreground">{s.title}</p>
          <p className="mt-1 leading-relaxed text-foreground/75">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

function TableBlock({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-paper">
      <table className="w-full min-w-[520px] text-left text-[0.93rem]">
        <thead>
          <tr className="border-b border-border bg-muted/60">
            {head.map((h) => (
              <th key={h} className="eyebrow px-4 py-3 !text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/70 last:border-0">
              {r.map((c, j) => (
                <td key={j} className={cn("px-4 py-3 align-top leading-relaxed", j === 0 ? "font-semibold" : "text-foreground/80")}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cards({ items }: { items: { title: string; text: string; tag?: string }[] }) {
  return (
    <div className={cn("grid gap-3", items.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
      {items.map((c, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-paper">
          {c.tag && <p className="eyebrow mb-2">{c.tag}</p>}
          <p className="font-semibold leading-snug">{c.title}</p>
          <p className="mt-1.5 text-[0.93rem] leading-relaxed text-foreground/70">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

function Compare({ bad, good }: { bad: { label?: string; text: string }; good: { label?: string; text: string } }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-2xl border border-dashed border-foreground/20 p-5">
        <p className="eyebrow mb-2 flex items-center gap-1.5 !text-muted-foreground">
          <X className="size-3.5" /> {bad.label ?? "Antes"}
        </p>
        <p className="leading-relaxed text-foreground/70">{bad.text}</p>
      </div>
      <div className="rounded-2xl border border-cobalt/25 bg-cobalt-soft p-5">
        <p className="eyebrow mb-2 flex items-center gap-1.5 !text-cobalt">
          <Check className="size-3.5" /> {good.label ?? "Depois"}
        </p>
        <p className="leading-relaxed text-foreground/85">{good.text}</p>
      </div>
    </div>
  );
}

function Exercise({ title, text, tasks }: { title: string; text: string; tasks: string[] }) {
  return (
    <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-lift md:p-8">
      <p className="eyebrow mb-2">Exercício</p>
      <p className="font-display text-2xl">{title}</p>
      <p className="mt-2 opacity-75">{text}</p>
      <ol className="mt-5 space-y-2.5">
        {tasks.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-mono text-sm text-copper">{String(i + 1).padStart(2, "0")}</span>
            <span className="opacity-90">{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Checklist({ id, title, items }: { id: string; title: string; items: string[] }) {
  const progress = useProgress();
  const done = progress.checks[id] ?? [];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-paper">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="font-display text-2xl">{title}</p>
        <span className="font-mono text-sm text-muted-foreground">
          {done.length}/{items.length}
        </span>
      </div>
      <ul className="space-y-1">
        {items.map((it, i) => {
          const on = done.includes(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggleCheck(id, i)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-muted"
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    on ? "border-cobalt bg-cobalt text-accent-foreground" : "border-foreground/25",
                  )}
                >
                  {on && <Check className="size-3.5" />}
                </span>
                <span className={cn("transition-colors", on && "text-muted-foreground line-through")}>{it}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Quiz({ id, questions }: { id: string; questions: QuizQuestion[] }) {
  const progress = useProgress();
  const answers = progress.quiz[id] ?? {};
  const answered = Object.keys(answers).length;
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const isAnswered = chosen !== undefined;
        return (
          <div key={qi} className="rounded-2xl border border-border bg-card p-6 shadow-paper">
            <p className="eyebrow mb-2">Pergunta {qi + 1}</p>
            <p className="text-lg font-semibold leading-snug">{q.q}</p>
            <div className="mt-4 grid gap-2">
              {q.options.map((opt, oi) => {
                const isRight = oi === q.answer;
                const isChosen = chosen === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => answerQuiz(id, qi, oi)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                      !isAnswered && "border-border hover:border-foreground/30 hover:bg-muted",
                      isAnswered && isRight && "border-success/40 bg-success-soft",
                      isAnswered && isChosen && !isRight && "border-destructive/40 bg-copper-soft",
                      isAnswered && !isRight && !isChosen && "border-border opacity-55",
                    )}
                  >
                    <span className="font-mono text-xs text-muted-foreground">{String.fromCharCode(65 + oi)}</span>
                    <span className="flex-1">{opt}</span>
                    {isAnswered && isRight && <Check className="size-4 text-success" />}
                    {isAnswered && isChosen && !isRight && <X className="size-4 text-destructive" />}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <p className="mt-4 animate-rise rounded-xl bg-muted px-4 py-3 text-[0.93rem] leading-relaxed text-foreground/80">
                <strong className="text-foreground">{chosen === q.answer ? "Isso mesmo! " : "Quase. "}</strong>
                {q.explain}
              </p>
            )}
          </div>
        );
      })}
      {answered === questions.length && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary px-6 py-5 text-primary-foreground">
          <p className="font-display text-2xl">
            Você acertou {correct} de {questions.length}
          </p>
          <Button variant="soft" onClick={() => resetQuiz(id)} className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <RotateCcw /> Refazer
          </Button>
        </div>
      )}
    </div>
  );
}
