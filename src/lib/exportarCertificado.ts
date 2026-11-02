// Gera PNG e PDF (A4 paisagem) a partir do cartão do certificado, no navegador.
async function capturar(el: HTMLElement) {
  const { default: html2canvas } = await import("html2canvas-pro");
  await document.fonts?.ready;
  return html2canvas(el, { scale: 3, backgroundColor: "#ffffff", useCORS: true });
}

export function baixar(blob: Blob, nome: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export function nomeArquivo(nome: string, ext: string) {
  const base = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  return `certificado-imersao-gemini-${base || "aluno"}.${ext}`;
}

export async function baixarImagem(el: HTMLElement, nome: string) {
  const canvas = await capturar(el);
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Não foi possível gerar a imagem.")), "image/png"));
  baixar(blob, nomeArquivo(nome, "png"));
}

export async function gerarPdf(el: HTMLElement) {
  const canvas = await capturar(el);
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pw = 297, ph = 210, m = 10;
  const ratio = Math.min((pw - 2 * m) / canvas.width, (ph - 2 * m) / canvas.height);
  const w = canvas.width * ratio, h = canvas.height * ratio;
  pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", (pw - w) / 2, (ph - h) / 2, w, h, undefined, "FAST");
  return pdf.output("blob");
}

export async function baixarPdf(el: HTMLElement, nome: string, janela?: Window | null) {
  const blob = await gerarPdf(el);
  baixar(blob, nomeArquivo(nome, "pdf"));
  // Abre também numa aba nova: funciona mesmo onde o download direto é bloqueado.
  if (janela && !janela.closed) janela.location.href = URL.createObjectURL(blob);
}
