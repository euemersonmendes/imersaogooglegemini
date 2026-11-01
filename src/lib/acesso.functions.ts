import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";

import { COOKIE, lerCookie, tokenPara, tokenValido } from "./acesso.server";

export const verificarAcesso = createServerFn({ method: "GET" }).handler(async () => ({
  liberado: await tokenValido(lerCookie(getRequestHeader("cookie") ?? null)),
}));

export const entrarTurma = createServerFn({ method: "POST" })
  .inputValidator((d: { codigo: string }) => ({ codigo: String(d.codigo ?? "").slice(0, 60) }))
  .handler(async ({ data }) => {
    const token = await tokenPara(data.codigo);
    if (!token) return { ok: false };
    setResponseHeader(
      "Set-Cookie",
      `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 180}`,
    );
    return { ok: true };
  });

export const sairTurma = createServerFn({ method: "POST" }).handler(async () => {
  setResponseHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  return { ok: true };
});
