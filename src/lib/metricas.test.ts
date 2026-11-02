import { describe, expect, it } from "vitest";
import { calcularMetricas } from "./metricas";

const a = (concluidas: number, certificado: "emitido" | "revogado" | "nenhum" = "nenhum", admin = false) => ({ concluidas, certificado, admin, turma: "T" });

describe("métricas da imersão", () => {
  it("taxa de conclusão = alunos com 20 aulas / inscritos, sem contar admins", () => {
    const m = calcularMetricas([a(20, "emitido"), a(5), a(0), a(20, "revogado"), a(20, "nenhum", true)]);
    expect(m.inscritos).toBe(4);
    expect(m.concluiram).toBe(2);
    expect(m.taxaConclusao).toBe(50);
    expect(m.aulasConcluidas).toBe(45);
  });
  it("certificado revogado não conta como emitido", () => {
    expect(calcularMetricas([a(20, "revogado"), a(20, "emitido")]).certificados).toBe(1);
  });
});
