import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Trechos inline: [[lacuna]] em cobre e **negrito**. */
export function Inline({ texto }: { texto: string }) {
  const partes = texto.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g);
  return (
    <>
      {partes.map((p, i) => {
        if (p.startsWith("[[") && p.endsWith("]]"))
          return (
            <span key={i} className="rounded-md bg-lacuna px-1.5 py-px font-semibold text-cobre-texto">
              {p.slice(2, -2)}
            </span>
          );
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <strong key={i} className="font-semibold text-tinta">
              {p.slice(2, -2)}
            </strong>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

type Bloco =
  | { t: "titulo"; texto: string }
  | { t: "p"; texto: string }
  | { t: "lista"; itens: string[] }
  | { t: "tabela"; linhas: string[][] };

export function analisar(texto: string): Bloco[] {
  const blocos: Bloco[] = [];
  for (const linhaBruta of texto.split("\n")) {
    const linha = linhaBruta.trimEnd();
    const ultimo = blocos[blocos.length - 1];
    if (!linha.trim()) {
      blocos.push({ t: "p", texto: "" });
      continue;
    }
    if (linha.startsWith("# ")) blocos.push({ t: "titulo", texto: linha.slice(2) });
    else if (/^\s*[-•] /.test(linha)) {
      const item = linha.replace(/^\s*[-•] /, "");
      if (ultimo?.t === "lista") ultimo.itens.push(item);
      else blocos.push({ t: "lista", itens: [item] });
    } else if (linha.includes(" | ")) {
      const celulas = linha.split(" | ").map((c) => c.trim());
      if (ultimo?.t === "tabela") ultimo.linhas.push(celulas);
      else blocos.push({ t: "tabela", linhas: [celulas] });
    } else if (ultimo?.t === "p" && ultimo.texto) ultimo.texto += "\n" + linha;
    else blocos.push({ t: "p", texto: linha });
  }
  return blocos.filter((b) => !(b.t === "p" && !b.texto));
}

/** Renderiza texto com subtítulos (# ), listas (- ), tabelas ( | ), lacunas e negrito. */
export function Rico({
  texto,
  tamanho = "md",
  className,
  render,
}: {
  texto: string;
  tamanho?: "sm" | "md" | "lg";
  className?: string;
  /** Permite envolver cada bloco (usado na anatomia para acender um bloco). */
  render?: (no: ReactNode, i: number) => ReactNode;
}) {
  const blocos = analisar(texto);
  const corpo = tamanho === "lg" ? "text-[17px] leading-[1.75]" : tamanho === "sm" ? "text-[14px] leading-[1.55]" : "text-[15.5px] leading-[1.65]";
  return (
    <div className={cn("flex flex-col gap-3", corpo, className)}>
      {blocos.map((b, i) => {
        let no: ReactNode;
        if (b.t === "titulo") no = <p className="mt-1 font-bold text-tinta">{b.texto}</p>;
        else if (b.t === "p")
          no = (
            <p className="whitespace-pre-line text-pretty">
              <Inline texto={b.texto} />
            </p>
          );
        else if (b.t === "lista")
          no = (
            <ul className="flex flex-col gap-1.5 pl-1">
              {b.itens.map((it, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-cobre-texto" />
                  <span>
                    <Inline texto={it} />
                  </span>
                </li>
              ))}
            </ul>
          );
        else
          no = (
            <div className="overflow-x-auto rounded-lg border border-linha-2">
              <table className="w-full min-w-[420px] border-collapse text-left text-[13.5px] leading-snug">
                <thead>
                  <tr className="bg-areia-2">
                    {b.linhas[0]?.map((c, j) => (
                      <th key={j} className="px-3 py-2 font-semibold">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.linhas.slice(1).map((l, j) => (
                    <tr key={j} className="border-t border-linha">
                      {l.map((c, k) => (
                        <td key={k} className={cn("px-3 py-2", k === 0 && "font-medium")}>
                          <Inline texto={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return <Fragment key={i}>{render ? render(no, i) : no}</Fragment>;
      })}
    </div>
  );
}

/** Texto limpo para copiar: remove marcação de lacuna e negrito. */
export function textoParaCopiar(texto: string) {
  return texto.replace(/\[\[([^\]]+)\]\]/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}
