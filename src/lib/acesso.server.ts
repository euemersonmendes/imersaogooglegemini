// Códigos de turma autorizados (ficam só no servidor).
const CODIGOS = ["SEBRAE-GNIA"];
export const COOKIE = "turma_acesso";

async function hash(texto: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`imersao-gemini:${texto}`));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function normalizar(codigo: string) {
  return codigo.trim().toUpperCase();
}

export async function tokenPara(codigo: string) {
  const c = normalizar(codigo);
  return CODIGOS.includes(c) ? hash(c) : null;
}

export async function tokenValido(token: string | undefined) {
  if (!token) return false;
  for (const c of CODIGOS) if ((await hash(c)) === token) return true;
  return false;
}

export function lerCookie(header: string | null, nome = COOKIE) {
  const m = header?.match(new RegExp(`(?:^|;\\s*)${nome}=([^;]+)`));
  return m?.[1];
}
