import { createFileRoute, Navigate } from "@tanstack/react-router";
import { AcessoUsuario } from "@/components/AcessoUsuario";
import { useSessao } from "@/lib/sessao";

export const Route = createFileRoute("/inscricao/$codigo")({
  head: () => ({
    meta: [
      { title: "Inscrição na Imersão Google Gemini" },
      { name: "description", content: "Crie seu acesso à Imersão Google Gemini com o link da sua turma." },
      { property: "og:title", content: "Inscrição na Imersão Google Gemini" },
      { property: "og:description", content: "Crie seu acesso à imersão com o link da sua turma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Inscricao,
});

function Inscricao() {
  const { codigo } = Route.useParams();
  const sessao = useSessao();
  if (sessao.user) return <Navigate to="/book" />;
  return <AcessoUsuario codigoInicial={codigo.toUpperCase()} />;
}
