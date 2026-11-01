import { useSyncExternalStore } from "react";

const CHAVE = "imersao-gemini:v2";

export type Progresso = {
  /** Aulas concluídas ("1.1"). */
  concluidas: string[];
  /** Passos vistos por aula (índice 1-based). */
  vistos: Record<string, number[]>;
  /** Checklists marcados: chave "1.1" → índices. */
  checks: Record<string, number[]>;
  /** Autoavaliações: chave "4.4/2" → índice → nota. */
  notas: Record<string, Record<number, number>>;
  ultimo?: { aula: string; passo: number };
};

const VAZIO: Progresso = { concluidas: [], vistos: {}, checks: {}, notas: {} };

let estado: Progresso | null = null;
const ouvintes = new Set<() => void>();

function ler(): Progresso {
  if (estado) return estado;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    estado = bruto ? { ...VAZIO, ...(JSON.parse(bruto) as Partial<Progresso>) } : VAZIO;
  } catch {
    estado = VAZIO;
  }
  return estado;
}

function gravar(novo: Progresso) {
  estado = novo;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(novo));
  } catch {
    /* armazenamento bloqueado: segue em memória */
  }
  ouvintes.forEach((o) => o());
}

function assinar(cb: () => void) {
  ouvintes.add(cb);
  return () => ouvintes.delete(cb);
}

export function useProgresso(): Progresso {
  return useSyncExternalStore(assinar, ler, () => VAZIO);
}

export function marcarVisto(aula: string, passo: number) {
  const s = ler();
  const atuais = s.vistos[aula] ?? [];
  if (s.ultimo?.aula === aula && s.ultimo.passo === passo && atuais.includes(passo)) return;
  gravar({
    ...s,
    ultimo: { aula, passo },
    vistos: { ...s.vistos, [aula]: atuais.includes(passo) ? atuais : [...atuais, passo] },
  });
}

export function alternarConcluida(aula: string, valor?: boolean) {
  const s = ler();
  const tem = s.concluidas.includes(aula);
  const quer = valor ?? !tem;
  if (quer === tem) return;
  gravar({ ...s, concluidas: quer ? [...s.concluidas, aula] : s.concluidas.filter((a) => a !== aula) });
}

export function alternarCheck(chave: string, item: number) {
  const s = ler();
  const atual = s.checks[chave] ?? [];
  const novo = atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item];
  gravar({ ...s, checks: { ...s.checks, [chave]: novo } });
}

export function darNota(chave: string, item: number, nota: number) {
  const s = ler();
  gravar({ ...s, notas: { ...s.notas, [chave]: { ...(s.notas[chave] ?? {}), [item]: nota } } });
}

export function zerarProgresso() {
  gravar(VAZIO);
}
