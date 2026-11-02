import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { resultadoPublico, uuidCertificado } from "./validacao-certificado";

/** Public capability lookup: disclose only certificate fields for an exact UUID.
 * Never grant anonymous access to profiles, certificates or student lists. */
export const validarCertificado = createServerFn({ method: "GET" })
  .inputValidator((d: { codigo: string; legado?: boolean }) => ({ codigo: String(d.codigo ?? "").trim(), legado: d.legado === true }))
  .handler(async ({ data }) => {
    setResponseHeader("Cache-Control", "no-store");
    if (!uuidCertificado(data.codigo)) return resultadoPublico(null, null);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: certificado, error } = await supabaseAdmin.from("certificados")
      .select("user_id, codigo, emitido_em, revogado")
      .eq(data.legado ? "user_id" : "codigo", data.codigo).maybeSingle();
    if (error) throw new Error("Não foi possível consultar o certificado. Tente novamente.");
    if (!certificado) return resultadoPublico(null, null);
    const { data: perfil, error: erroPerfil } = await supabaseAdmin.from("profiles")
      .select("nome").eq("id", certificado.user_id).maybeSingle();
    if (erroPerfil) throw new Error("Não foi possível consultar o certificado. Tente novamente.");
    return resultadoPublico(certificado, perfil);
  });