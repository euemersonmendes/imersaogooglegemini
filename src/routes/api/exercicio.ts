import { createFileRoute } from "@tanstack/react-router";
import { gerarExercicio } from "@/lib/exercicio.server";

export const Route = createFileRoute("/api/exercicio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        if (!token) return new Response("Entre com seu acesso para gerar exercícios.", { status: 401 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.auth.getUser(token);
        if (error || !data.user) return new Response("Entre com seu acesso para gerar exercícios.", { status: 401 });
        return gerarExercicio(request);
      },
    },
  },
});
