// Cartão do certificado, compartilhado entre a tela do aluno (/certificado) e o painel do administrador.
import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { LogoGemini } from "@/components/imersao/LogoGemini";
import { BOOK, modulos } from "@/content/imersao";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";

const SITE = "https://imersaogemini.lovable.app";

type Props = {
  userId: string;
  nome: string;
  codigo: string;
  emitidoEm: string;
  cartaoRef?: React.Ref<HTMLDivElement>;
};

export function CartaoCertificado({ userId, nome, codigo, emitidoEm, cartaoRef }: Props) {
  const [qr, setQr] = useState("");
  useEffect(() => {
    void QRCode.toDataURL(`${SITE}/validar/${codigo}`, { margin: 1, width: 240, color: { dark: "#1B1C1F", light: "#FFFFFF" } }).then(setQr);
  }, [codigo]);

  return (
    <div ref={cartaoRef} className="fonte-certificado rounded-3xl border-4 border-double border-cobre bg-branco p-8 text-center sombra md:p-14 print:mt-0 print:shadow-none">
      <div className="flex flex-col items-center gap-2">
        <LogoGemini className="size-20 md:size-24" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-apagado">Google Gemini</span>
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cobre-texto">Certificado de conclusão</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
        Imersão <span className="text-cobre-texto">Google Gemini</span>
      </h1>
      <p className="mt-8 text-apagado">Certificamos que</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{nome}</p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-apagado">
          concluiu a Imersão Google Gemini para micro e pequenos empresários, com carga horária de {BOOK.cargaHoraria}, abrangendo {modulos.length} módulos e {TOTAL_AULAS_CURSO} aulas sobre o uso da inteligência artificial na gestão de negócios.
        </p>
      <div className="mt-10 border-t border-linha pt-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-cobre-texto">Grade de aulas da imersão</p>
        <div className="mt-5 grid gap-x-6 gap-y-5 text-left text-[11px] leading-snug text-apagado sm:grid-cols-2 md:grid-cols-5">
          {modulos.map((m, i) => (
            <div key={m.id}>
              <p className="text-tinta">Módulo {i + 1} · {m.nome}</p>
              <ul className="mt-1.5 space-y-1">
                {m.aulas.map((a) => (
                  <li key={a.n} className="whitespace-nowrap">
                    <span className="font-mono font-semibold text-cobre-texto">{a.n}</span> {a.curto}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-2xl gap-8 text-sm sm:grid-cols-2">
        <div>
          <div className="mx-auto w-48 border-t border-tinta pt-2 font-semibold">{BOOK.instrutor}</div>
          <p className="text-apagado">Instrutor e responsável</p>
        </div>
        <div>
          <div className="mx-auto w-48 border-t border-tinta pt-2 font-semibold">{new Date(emitidoEm).toLocaleDateString("pt-BR")}</div>
          <p className="text-apagado">Data de emissão</p>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-4 text-left">
        {qr ? <img src={qr} alt="QR code para validar o certificado" className="size-24" /> : <div className="size-24" />}
        <div className="text-xs text-apagado">
          <p className="font-semibold text-tinta">Valide este certificado</p>
          <p>Aponte a câmera para o QR code.</p>
          <p className="mt-1 font-mono">Código: {codigo}</p>
        </div>
      </div>
    </div>
  );
}
