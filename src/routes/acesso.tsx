import { useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import { AcessoUsuario } from "@/components/AcessoUsuario";
import { useSessao } from "@/lib/sessao";

export const Route = createFileRoute("/acesso")({
  head: () => ({
    meta: [
      { title: "Acesso do usuário — Imersão Google Gemini" },
      { name: "description", content: "Entre ou crie seu acesso à Imersão Google Gemini com o código da turma." },
      { property: "og:title", content: "Acesso do usuário — Imersão Google Gemini" },
      { property: "og:description", content: "Entre ou crie seu acesso à Imersão Google Gemini." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Acesso,
});

function Acesso() {
  const sessao = useSessao();
  const router = useRouter();
  useEffect(() => {
    if (sessao.user) void router.navigate({ to: "/book", replace: true });
  }, [sessao.user, router]);
  if (sessao.user) return null;
  return <AcessoUsuario />;
}
