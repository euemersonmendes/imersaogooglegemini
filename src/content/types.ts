export type Block =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; tone: "dica" | "atencao" | "insight" | "novidade"; title?: string; text: string }
  | { type: "prompt"; title?: string; text: string; note?: string }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "cards"; items: { title: string; text: string; tag?: string }[] }
  | { type: "compare"; bad: { label?: string; text: string }; good: { label?: string; text: string } }
  | { type: "exercise"; title: string; text: string; tasks: string[] }
  | { type: "checklist"; id: string; title: string; items: string[] }
  | { type: "quiz"; id: string; questions: QuizQuestion[] }
  | { type: "quote"; text: string; author?: string };

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type Page = {
  title: string;
  blocks: Block[];
};

export type Section = {
  /** e.g. "5.1" */
  id: string;
  title: string;
  pages: Page[];
};

export type Module = {
  /** e.g. 5 */
  n: number;
  title: string;
  kicker: string;
  summary: string;
  sections: Section[];
};
