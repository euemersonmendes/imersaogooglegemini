import { describe, expect, it } from "vitest";

import { findPage, flatPages, modules, neighbors } from "./book";

describe("book structure", () => {
  it("section ids are unique and start with their module number", () => {
    const ids = modules.flatMap((m) => m.sections.map((s) => s.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const m of modules) for (const s of m.sections) expect(s.id.split(".")[0]).toBe(String(m.n));
  });

  it("resolves the reference-style address 5.1/1 to the Gmail page", () => {
    expect(findPage("5.1", "1")?.section.title).toBe("Gmail");
    expect(findPage("5.1", "9")).toBeUndefined();
  });

  it("first page has no previous and last page has no next", () => {
    expect(neighbors(flatPages[0]).prev).toBeUndefined();
    expect(neighbors(flatPages[flatPages.length - 1]).next).toBeUndefined();
  });

  it("quiz answers point to an existing option", () => {
    for (const p of flatPages)
      for (const b of p.page.blocks)
        if (b.type === "quiz") for (const q of b.questions) expect(q.options[q.answer]).toBeDefined();
  });
});
