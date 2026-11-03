import { createFileRoute } from "@tanstack/react-router";
import { gerarExercicio } from "@/lib/exercicio.server";

export const Route = createFileRoute("/api/exercicio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        if (!token) return new Response("Entre com seu acesso para gerar exercícios.", { status: 401 });
        let autenticado = false;
        if (process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin.auth.getUser(token);
          autenticado = !error && !!data.user;
        } else {
          const { supabase } = await import("@/integrations/supabase/client");
          const { data, error } = await supabase.auth.getUser(token);
          autenticado = !error && !!data.user;
        }
        if (!autenticado) return new Response("Entre com seu acesso para gerar exercícios.", { status: 401 });
        return gerarExercicio(request);
      },
    },
  },
});
