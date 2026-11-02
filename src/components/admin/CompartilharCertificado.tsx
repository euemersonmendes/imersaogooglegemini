import { useState, type RefObject } from "react";
import { Loader, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { baixar, gerarPdf, nomeArquivo } from "@/lib/exportarCertificado";

export function CompartilharCertificado({ cartaoRef, versoRef, nome, codigo, disabled = false }: {
  cartaoRef: RefObject<HTMLDivElement | null>; versoRef?: RefObject<HTMLDivElement | null>; nome: string; codigo: string; disabled?: boolean;
}) {
  const [aberto, setAberto] = useState(false);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [suportaArquivo, setSuportaArquivo] = useState(false);
  const [erro, setErro] = useState(false);

  async function preparar() {
    const cartao = cartaoRef.current;
    if (!cartao) return;
    setAberto(true);
    setArquivo(null);
    setErro(false);
    setOcupado(true);
    try {
      const blob = await gerarPdf(cartao, versoRef?.current);
      const pdf = new File([blob], nomeArquivo(nome, "pdf"), { type: "application/pdf" });
      setArquivo(pdf);
      setSuportaArquivo(typeof navigator.share === "function" && typeof navigator.canShare === "function" && navigator.canShare({ files: [pdf] }));
    } catch {
      setErro(true);
    } finally {
      setOcupado(false);
    }
  }

  const mensagem = `Certificado de ${nome} — Imersão Google Gemini, 16 horas. Valide pelo QR code no PDF ou pelo link: https://imersaogooglegemini.lovable.app/validar/${codigo}`;

  function abrirWhatsApp() {
    if (!arquivo) return;
    baixar(arquivo, arquivo.name);
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener,noreferrer");
  }

  async function compartilhar() {
    if (!arquivo) return;
    if (!suportaArquivo) return abrirWhatsApp();
    setOcupado(true);
    try {
      await navigator.share({ files: [arquivo], title: `Certificado de ${nome}`, text: mensagem });
      setAberto(false);
    } catch (e) {
      if (!(e instanceof Error && e.name === "AbortError")) toast.error("Não foi possível compartilhar. Tente baixar o PDF e anexá-lo no WhatsApp.");
    } finally {
      setOcupado(false);
    }
  }

  return <>
    <Button variant="outline" disabled={disabled || ocupado} onClick={() => void preparar()}>
      <MessageCircle /> Enviar pelo WhatsApp
    </Button>
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogTitle>Certificado de {nome}</DialogTitle>
        <DialogDescription>
          {ocupado && !arquivo ? "Preparando o PDF com o nome do aluno e o QR code…" : erro ? "Não foi possível gerar o PDF. Feche esta janela e tente novamente." : suportaArquivo ? "Escolha o WhatsApp na janela de compartilhamento. Se ele não aparecer na lista, use o botão \"Baixar PDF e abrir WhatsApp\" e anexe o arquivo na conversa." : "O navegador não permite anexar o PDF automaticamente. Baixe o arquivo e anexe-o na conversa do WhatsApp que será aberta."}
        </DialogDescription>
        <Button disabled={!arquivo || ocupado} onClick={() => void compartilhar()}>
          {ocupado ? <Loader className="animate-spin" /> : <MessageCircle />}
          {suportaArquivo ? "Compartilhar PDF" : "Baixar PDF e abrir WhatsApp"}
        </Button>
        {suportaArquivo && (
          <Button variant="outline" disabled={!arquivo || ocupado} onClick={abrirWhatsApp}>
            <MessageCircle /> Baixar PDF e abrir WhatsApp
          </Button>
        )}
      </DialogContent>
    </Dialog>
  </>;
}