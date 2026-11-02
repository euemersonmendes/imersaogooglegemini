import { describe, expect, it } from "vitest";
import { calcularNps } from "./nps";

describe("NPS", () => {
  it("promotores 9–10 menos detratores 0–6", () => {
    expect(calcularNps([10, 9, 8, 7, 6, 0])).toMatchObject({ promotores: 2, neutros: 2, detratores: 2, nps: 0 });
    expect(calcularNps([10, 10, 9, 5])).toMatchObject({ nps: 50 });
  });
  it("sem respostas dá zero", () => {
    expect(calcularNps([]).nps).toBe(0);
  });
});
