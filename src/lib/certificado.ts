export const TOTAL_AULAS_CURSO = 20;

/** Certificado sai automático ao concluir todas as aulas, a menos que o administrador tenha revogado. */
export function certificadoLiberado(concluidas: number, revogado: boolean, total = TOTAL_AULAS_CURSO) {
  return !revogado && concluidas >= total;
}
