import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const RUN = "X-Lovable-AIG-Run-ID";

export async function gerarExercicio(request: Request) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return new Response("IA não configurada.", { status: 500 });

  let body: { tema?: string; objetivo?: string };
  try {
    body = await request.json();
  } catch {
    return new Response("Pedido inválido.", { status: 400 });
  }
  const tema = (body.tema ?? "").trim().slice(0, 300);
  const objetivo = (body.objetivo ?? "").trim().slice(0, 600);
  if (!tema || !objetivo) return new Response("Informe o tema e o objetivo.", { status: 400 });

  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const res = await fetch(input, init);
      runId ??= res.headers.get(RUN) ?? undefined;
      return res;
    },
  });

  let erro: { status: number; msg: string } | undefined;
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system:
      "Você é instrutor da Imersão Google Gemini, conduzida por Emerson Mendes, para donos de micro e pequenas empresas (MEI, comércio, serviços, alimentação, beleza, oficinas). Crie exercícios práticos em português do Brasil, em linguagem simples, sem jargão técnico, para o empresário fazer no Gemini em 15 a 25 minutos e aplicar no próprio negócio (financeiro, fluxo de caixa, preços, marketing, vendas, WhatsApp, Instagram, compras, estoque, fornecedores, gestão de pessoas, atendimento). Use dados fictícios e lembre de não colar dados pessoais de clientes. Formato em Markdown simples: título; ## Contexto (2 frases); ## Passo a passo (3 a 5 passos numerados); ## Prompt para copiar (bloco com # Perfil, # Contexto, # Objetivo, # Modelo de Entrega e [lacunas] entre colchetes); ## Como conferir o resultado (3 itens). Seja direto.",
    messages: [{ role: "user", content: `Tema do módulo: ${tema}\nNegócio e objetivo do empresário: ${objetivo}` }],
    abortSignal: request.signal,
    maxRetries: 0,
    onError: ({ error }) => {
      const e = error as { statusCode?: number; responseBody?: string; message?: string };
      erro = { status: e.statusCode ?? 500, msg: e.message ?? "Erro" };
      console.error("exercicio", e.statusCode, e.responseBody ?? e.message);
    },
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const res = result.toTextStreamResponse();
  // Se falhar antes do primeiro texto, devolve status claro.
  const reader = res.body!.getReader();
  const primeiro = await reader.read();
  if (primeiro.done && erro) {
    const msg =
      erro.status === 402
        ? "Créditos de IA esgotados. Adicione créditos em Configurações → Planos e créditos."
        : erro.status === 429
          ? "Muitos pedidos agora. Tente novamente em instantes."
          : "Não foi possível gerar o exercício agora.";
    return new Response(msg, { status: erro.status });
  }
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      if (primeiro.value) c.enqueue(primeiro.value);
    },
    async pull(c) {
      const { done, value } = await reader.read();
      if (done) c.close();
      else c.enqueue(value);
    },
    cancel() {
      reader.cancel();
    },
  });
  const headers = new Headers(res.headers);
  if (runId) headers.set(RUN, runId);
  return new Response(stream, { headers });
}
