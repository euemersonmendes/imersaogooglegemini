import { describe, expect, it } from "vitest";
import { resultadoPublico, uuidCertificado } from "./validacao-certificado";

const certificado = { codigo: "d4da662b-6d05-4b06-93c0-fbc0c484845c", emitido_em: "2026-11-02T12:51:49Z", revogado: false };
describe("validação pública", () => {
  it("valida um certificado emitido sem dados de login", () => {
    expect(resultadoPublico(certificado, { nome: "Aluna" })).toEqual({ status: "valido", nome: "Aluna", codigo: certificado.codigo, emitidoEm: certificado.emitido_em });
  });
  it("nunca apresenta um certificado revogado como válido", () => {
    expect(resultadoPublico({ ...certificado, revogado: true }, { nome: "Aluna" }).status).toBe("revogado");
  });
  it("não valida uma conta removida", () => {
    expect(resultadoPublico(certificado, null)).toEqual({ status: "nao-encontrado" });
  });
  it("não valida um código inexistente", () => {
    expect(resultadoPublico(null, { nome: "Aluna" })).toEqual({ status: "nao-encontrado" });
  });
  it("restringe a consulta a UUIDs exatos", () => {
    expect(uuidCertificado(certificado.codigo)).toBe(true);
    expect(uuidCertificado("%" )).toBe(false);
    expect(uuidCertificado("IMERSAO-GEMINI")).toBe(false);
  });
});