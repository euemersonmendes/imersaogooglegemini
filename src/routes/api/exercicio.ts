import { createFileRoute } from "@tanstack/react-router";
import { gerarExercicio } from "@/lib/exercicio.server";

export const Route = createFileRoute("/api/exercicio")({
  server: { handlers: { POST: ({ request }) => gerarExercicio(request) } },
});
