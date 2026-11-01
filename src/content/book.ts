import type { Module, Page, Section } from "./types";
import { m00, m01, m02 } from "./modules/m00-02";
import { m03 } from "./modules/m03";
import { m04 } from "./modules/m04";
import { m05, m06 } from "./modules/m05-06";
import { m07, m08 } from "./modules/m07-08";
import { m09, m10 } from "./modules/m09-10";

export const BOOK_TITLE = "Imersão Google Gemini";
export const BOOK_EDITION = "Edição novembro 2026";

export const modules: Module[] = [m00, m01, m02, m03, m04, m05, m06, m07, m08, m09, m10];

export type FlatPage = {
  /** "5.1/1" */
  key: string;
  sectionId: string;
  /** 1-based page number inside its section */
  pageNumber: number;
  page: Page;
  section: Section;
  module: Module;
  index: number;
};

export const flatPages: FlatPage[] = modules.flatMap((module) =>
  module.sections.flatMap((section) =>
    section.pages.map((page, i) => ({
      key: `${section.id}/${i + 1}`,
      sectionId: section.id,
      pageNumber: i + 1,
      page,
      section,
      module,
      index: 0,
    })),
  ),
).map((p, index) => ({ ...p, index }));

export function findPage(sectionId: string, pageNumber: number | string): FlatPage | undefined {
  return flatPages.find((p) => p.sectionId === sectionId && p.pageNumber === Number(pageNumber));
}

export function neighbors(fp: FlatPage) {
  return {
    prev: fp.index > 0 ? flatPages[fp.index - 1] : undefined,
    next: fp.index < flatPages.length - 1 ? flatPages[fp.index + 1] : undefined,
  };
}

export function pageKeysOfModule(module: Module): string[] {
  return module.sections.flatMap((s) => s.pages.map((_, i) => `${s.id}/${i + 1}`));
}

export const stats = {
  modules: modules.length,
  pages: flatPages.length,
  prompts: flatPages.reduce((n, p) => n + p.page.blocks.filter((b) => b.type === "prompt").length, 0),
  quizzes: flatPages.reduce((n, p) => n + p.page.blocks.filter((b) => b.type === "quiz").length, 0),
};
