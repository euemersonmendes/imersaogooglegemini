import { createFileRoute } from "@tanstack/react-router";
import { ValidacaoCertificado, validacaoOptions } from "@/components/ValidacaoCertificado";

export const Route = createFileRoute("/validar/$codigo")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(validacaoOptions(params.codigo)),
  head: () => ({ meta: [
    { title: "Validar certificado — Imersão Google Gemini" },
    { name: "description", content: "Consulta pública de autenticidade de certificados da Imersão Google Gemini com Emerson Mendes." },
    { property: "og:title", content: "Validar certificado — Imersão Google Gemini" },
    { property: "og:description", content: "Verifique a autenticidade de um certificado da Imersão Google Gemini, sem login." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: PaginaValidacao,
});

function PaginaValidacao() {
  const { codigo } = Route.useParams();
  return <ValidacaoCertificado codigo={codigo} />;
}