import { useSyncExternalStore } from "react";

const KEY = "imersao-gemini:v1";

export type ProgressState = {
  visited: string[];
  last?: string;
  checks: Record<string, number[]>;
  quiz: Record<string, Record<number, number>>;
};

const EMPTY: ProgressState = { visited: [], checks: {}, quiz: {} };

let state: ProgressState | null = null;
const listeners = new Set<() => void>();

function load(): ProgressState {
  if (state) return state;
  try {
    const raw = window.localStorage.getItem(KEY);
    state = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    state = EMPTY;
  }
  return state!;
}

function save(next: ProgressState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage cheio ou bloqueado: segue só em memória */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export function markVisited(key: string) {
  const s = load();
  if (s.last === key && s.visited.includes(key)) return;
  save({ ...s, last: key, visited: s.visited.includes(key) ? s.visited : [...s.visited, key] });
}

export function toggleCheck(id: string, item: number) {
  const s = load();
  const cur = s.checks[id] ?? [];
  const next = cur.includes(item) ? cur.filter((i) => i !== item) : [...cur, item];
  save({ ...s, checks: { ...s.checks, [id]: next } });
}

export function answerQuiz(id: string, question: number, option: number) {
  const s = load();
  save({ ...s, quiz: { ...s.quiz, [id]: { ...(s.quiz[id] ?? {}), [question]: option } } });
}

export function resetQuiz(id: string) {
  const s = load();
  const quiz = { ...s.quiz };
  delete quiz[id];
  save({ ...s, quiz });
}

export function resetProgress() {
  save(EMPTY);
}
