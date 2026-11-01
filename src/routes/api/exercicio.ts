import { createFileRoute } from "@tanstack/react-router";
import { gerarExercicio } from "@/lib/exercicio.server";
import { lerCookie, tokenValido } from "@/lib/acesso.server";

export const Route = createFileRoute("/api/exercicio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await tokenValido(lerCookie(request.headers.get("cookie")))))
          return new Response("Acesso restrito aos alunos da turma.", { status: 401 });
        return gerarExercicio(request);
      },
    },
  },
});
