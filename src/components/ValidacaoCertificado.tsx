import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, ShieldAlert } from "lucide-react";
import { LogoGemini } from "@/components/imersao/LogoGemini";
import { BOOK } from "@/content/imersao";
import { validarCertificado } from "@/lib/validacao-certificado.functions";

export const validacaoOptions = (codigo: string, legado = false) => queryOptions({
  queryKey: ["validacao-certificado", codigo, legado],
  queryFn: () => validarCertificado({ data: { codigo, legado } }),
  staleTime: 0,
});

export function ValidacaoCertificado({ codigo, legado = false }: { codigo: string; legado?: boolean }) {
  const { data } = useSuspenseQuery(validacaoOptions(codigo, legado));
  const valido = data.status === "valido";
  return (
    <main className="min-h-screen bg-areia px-5 py-12 text-tinta">
      <div className="mx-auto max-w-2xl">
        <LogoGemini className="mx-auto size-20" />
        <h1 className="mt-6 text-center text-3xl font-bold">Validação de certificado</h1>
        <p className="mt-2 text-center text-apagado">Imersão Google Gemini</p>
        <div className={`mt-8 flex items-center gap-3 rounded-lg border p-5 ${valido ? "border-verde bg-verde-suave text-verde-texto" : "border-cobre bg-cobre-suave text-cobre-texto"}`} role="status">
          {valido ? <BadgeCheck className="size-7 shrink-0" /> : <ShieldAlert className="size-7 shrink-0" />}
          <p className="font-semibold">{valido ? "Certificado válido" : data.status === "revogado" ? "Certificado revogado" : "Certificado não encontrado"}</p>
        </div>
        {data.status !== "nao-encontrado" ? (
          <dl className="mt-8 space-y-5 break-words border-y border-linha py-6">
            <div><dt className="text-sm text-apagado">Aluno</dt><dd className="mt-1 text-2xl font-semibold">{data.nome}</dd></div>
            <div><dt className="text-sm text-apagado">Curso</dt><dd>Imersão Google Gemini · {BOOK.cargaHoraria}</dd></div>
            <div><dt className="text-sm text-apagado">Instrutor e responsável</dt><dd>{BOOK.instrutor}</dd></div>
            <div><dt className="text-sm text-apagado">Data de emissão</dt><dd>{new Date(data.emitidoEm).toLocaleDateString("pt-BR", { timeZone: "America/Fortaleza" })}</dd></div>
            <div><dt className="text-sm text-apagado">Código de verificação</dt><dd className="font-mono text-sm">{data.codigo}</dd></div>
          </dl>
        ) : <p className="mt-6 text-apagado">Confira o código no certificado. O documento pode não ter sido emitido ou a conta pode ter sido removida.</p>}
        <Link to="/" className="mt-8 inline-block text-cobre-texto underline underline-offset-4">Imersão Google Gemini</Link>
      </div>
    </main>
  );
}