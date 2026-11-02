export function uuidCertificado(valor: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(valor);
}

export function resultadoPublico(
  certificado: { codigo: string; emitido_em: string; revogado: boolean } | null,
  perfil: { nome: string } | null,
) {
  if (!certificado || !perfil) return { status: "nao-encontrado" as const };
  return {
    status: certificado.revogado ? "revogado" as const : "valido" as const,
    nome: perfil.nome,
    codigo: certificado.codigo,
    emitidoEm: certificado.emitido_em,
  };
}