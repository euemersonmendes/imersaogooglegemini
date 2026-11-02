// Cartão do certificado, compartilhado entre a tela do aluno (/certificado) e o painel do administrador.
// Frente: certificado em si. Verso: grade completa de aulas (segunda página do PDF e da impressão).
import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { LogoGemini } from "@/components/imersao/LogoGemini";
import { BOOK, modulos } from "@/content/imersao";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";

const SITE = "https://imersaogooglegemini.lovable.app";

type Props = {
  userId: string;
  nome: string;
  codigo: string;
  emitidoEm: string;
  cartaoRef?: React.Ref<HTMLDivElement>;
  versoRef?: React.Ref<HTMLDivElement>;
};

export function CartaoCertificado({ userId, nome, codigo, emitidoEm, cartaoRef, versoRef }: Props) {
  const [qr, setQr] = useState("");
  useEffect(() => {
    void QRCode.toDataURL(`${SITE}/validar/${codigo}`, { margin: 1, width: 240, color: { dark: "#1B1C1F", light: "#FFFFFF" } }).then(setQr);
  }, [codigo]);

  return (
    <div className="space-y-6">
      {/* Frente */}
      <div ref={cartaoRef} className="fonte-certificado cert-moldura rounded-3xl sombra print:mt-0 print:shadow-none">
        <div className="cert-fundo relative flex overflow-hidden rounded-[20px] md:aspect-[297/200]">
          {/* Faixa lateral */}
          <div className="cert-faixa relative hidden w-[17%] shrink-0 flex-col items-center justify-between py-10 md:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-branco/80 [writing-mode:vertical-rl] rotate-180">Imersão Google Gemini · {BOOK.cargaHoraria}</span>
            <div className="cert-selo flex size-24 items-center justify-center rounded-full p-1">
              <div className="flex size-full flex-col items-center justify-center rounded-full bg-branco text-center">
                <LogoGemini className="size-8" />
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-tinta">Concluído</span>
              </div>
            </div>
          </div>
          <div className="cert-google absolute inset-x-0 top-0" />
          <div className="cert-google absolute inset-x-0 bottom-0" />
          {/* Marca d'água */}
          <LogoGemini className="pointer-events-none absolute -right-16 -bottom-16 size-80 opacity-[0.06]" />

          <div className="relative flex flex-1 flex-col justify-between px-8 py-8 text-left md:px-14 md:py-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogoGemini className="size-12 md:size-14" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em]"><span className="text-g-azul">G</span><span className="text-g-vermelho">o</span><span className="text-g-amarelo">o</span><span className="text-g-azul">g</span><span className="text-g-verde">l</span><span className="text-g-vermelho">e</span> <span className="acento">Gemini</span></p>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-cobre-texto">Certificado de conclusão</p>
                </div>
              </div>
              <p className="hidden text-right text-[11px] uppercase tracking-[0.2em] text-apagado sm:block">{modulos.length} módulos · {TOTAL_AULAS_CURSO} aulas<br /><b className="text-tinta">{BOOK.cargaHoraria}</b></p>
            </div>

            <div className="mt-8 md:mt-0">
              <p className="text-base text-apagado md:text-lg">Certificamos que</p>
              <p className="mt-1 text-4xl font-extrabold leading-tight tracking-tight text-tinta md:text-6xl">{nome}</p>
              <div className="cert-linha mt-4 w-full max-w-3xl" />
              <p className="mt-5 max-w-4xl text-lg leading-relaxed text-tinta/80 md:text-xl">
                concluiu a <b className="text-tinta">Imersão Google Gemini</b> para micro e pequenos empresários, com carga horária de <b className="text-tinta">{BOOK.cargaHoraria}</b>, abrangendo {modulos.length} módulos e {TOTAL_AULAS_CURSO} aulas sobre o uso da inteligência artificial na gestão de negócios.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 md:mt-0">
              <div className="flex gap-10 text-sm">
                <div>
                  <div className="w-52 border-t-2 border-tinta pt-2 text-base font-bold">{BOOK.instrutor}</div>
                  <p className="text-apagado">Instrutor e responsável</p>
                </div>
                <div>
                  <div className="w-40 border-t-2 border-tinta pt-2 text-base font-bold">{new Date(emitidoEm).toLocaleDateString("pt-BR")}</div>
                  <p className="text-apagado">Data de emissão</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-linha bg-branco/90 p-2.5 pr-4">
                {qr ? <img src={qr} alt="QR code para validar o certificado" className="size-20" /> : <div className="size-20" />}
                <div className="text-[11px] text-apagado">
                  <p className="font-semibold text-tinta">Valide este certificado</p>
                  <p>Aponte a câmera para o QR code.</p>
                  <p className="mt-1 max-w-[11rem] break-all font-mono text-[10px]">{codigo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verso: grade de aulas (página 2 do PDF e da impressão) */}
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-apagado print:hidden">Verso do certificado</p>
      <div ref={versoRef} className="fonte-certificado relative overflow-hidden rounded-3xl border-4 border-double border-cobre bg-branco p-8 sombra md:p-14 print:mt-0 print:break-before-page print:shadow-none">
        <div className="cert-google absolute inset-x-0 top-0" />
        <div className="flex flex-col items-center gap-2 text-center">
          <LogoGemini className="size-12" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-apagado">Imersão Google Gemini</p>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cobre-texto">Grade de aulas da imersão</p>
        </div>
        <div className="mt-6 grid gap-x-6 gap-y-5 text-left text-[11px] leading-snug text-apagado sm:grid-cols-2 md:grid-cols-5">
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
        <p className="mt-8 border-t border-linha pt-4 text-center text-xs text-apagado">
          Certificado de <span className="font-semibold text-tinta">{nome}</span> · Carga horária: {BOOK.cargaHoraria} · Código: <span className="font-mono">{codigo}</span>
        </p>
      </div>
    </div>
  );
}
