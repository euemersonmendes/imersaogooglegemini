import { writeFileSync } from "node:fs";
import { modulo3 } from "./src/content/imersao/modulo-3.ts";
import { modulo4 } from "./src/content/imersao/modulo-4.ts";
import { modulo5 } from "./src/content/imersao/modulo-5.ts";

const any = (x: unknown) => x as any;
function deepReplace(o: any, pares: [string, string][]): any {
  if (typeof o === "string") { for (const [a, b] of pares) o = o.split(a).join(b); return o; }
  if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) o[i] = deepReplace(o[i], pares); return o; }
  if (o && typeof o === "object") { for (const k of Object.keys(o)) o[k] = deepReplace(o[k], pares); }
  return o;
}
function ctx(p: string, novo: string) {
  return p.replace(/# Contexto\n[\s\S]*?\n# Objetivo/, `# Contexto\n${novo}\n# Objetivo`);
}
function save(nome: string, file: string, m: unknown) {
  writeFileSync(`./src/content/imersao/${file}`, `import type { Modulo } from "./tipos";\n\nexport const ${nome}: Modulo = ${JSON.stringify(m, null, 2)};\n`);
}

// ---------- Módulo 3 ----------
const m3 = any(modulo3);
m3.nomeCompleto = "Ferramentas do Gemini aplicadas ao negócio";
for (const a of m3.aulas) for (const p of a.passos) if (p.tipo === "resultado") p.texto = "Repita o exercício com os dados fictícios. Confira a entrega antes de usar no seu negócio.";
{
  const a = m3.aulas[0];
  const it = a.passos[0].itens[0];
  it.pergunta = "O que outras lojas do bairro oferecem?";
  it.itens[0] = "Compare produtos, preços públicos e condições de venda.";
  it.itens[1] = "Confira o que faz sentido para seus clientes e seus custos.";
  const p2 = a.passos[2];
  p2.titulo = "Investigue antes de investir"; p2.tituloEnfase = "antes de investir";
  p2.nomePrompt = "Concorrentes e ideias para uma padaria";
  p2.prompt = "# Perfil\nAtue como apoio ao dono de uma pequena padaria na pesquisa de mercado.\n# Contexto\nEste é um exercício didático fictício para uma padaria em [[seu bairro e município]]. Quero conhecer concorrentes, preços e ideias de produtos antes de investir. Use apenas fontes públicas, sem dados pessoais de clientes ou funcionários.\n# Objetivo\nPesquise ofertas e preços públicos de padarias da região e proponha até três ideias de produto para testar. Compare tamanho, unidade, data do preço e condições de venda; não compare preço por quilo com preço por unidade. Considere custos, validade, estoque e capacidade de produção. Cruze fontes independentes. Não trate uma postagem como prova de demanda nem dados estaduais como procura no bairro.\n# Modelo de Entrega\nProponha primeiro um plano de pesquisa. No relatório, entregue resumo e matriz com ideia de produto, público, concorrente ou oferta de referência, preço e unidade, fonte e data, obstáculo e teste de baixo custo. Não invente empresas, preços, estatísticas ou entrevistas. Marque dados ausentes como “não localizado” e inferências como hipóteses. Separe os dados públicos encontrados do cenário fictício. Indique o que devo conferir diretamente antes de comprar insumos ou mudar meus preços.";
  if (p2.observe) p2.observe[1] = "Os preços têm fonte, data, unidade e condições de venda?";
  a.passos[3].linhas[0] = ["Outra padaria vende esse produto; a minha também vai vender bem.", "Confira público, preço, custos e procura no bairro; a oferta do concorrente não prova venda na sua padaria."];
}
{
  const a = m3.aulas[1];
  a.objetivo = "Comparar o plano de vendas da loja com os resultados e conferir cada conclusão nas fontes.";
  a.voceSaiCom = "Uma comparação entre metas, vendas e informações que ainda faltam para decidir.";
  const p1 = a.passos[1];
  p1.nomePrompt = "Plano e vendas fictícias de uma loja";
  p1.prompt = "# Perfil\nAtue como apoio ao dono de uma pequena loja na revisão das vendas.\n# Contexto\nEstes são dados didáticos fictícios. Crie duas fontes separadas com os blocos abaixo e consulte apenas essas fontes no notebook, sem dados pessoais de clientes ou funcionários.\nFonte 1 — Plano de junho da loja: vender 40 camisetas; publicar 4 posts no Instagram; obter avaliação média de pelo menos 4 em escala de 1 a 5; conferir o lucro do mês após fechar custos e despesas.\nFonte 2 — Resultados de junho: 48 camisetas vendidas; 4 posts publicados; 12 avaliações respondidas, média 4,5; custos e despesas do mês ainda não fechados.\n# Objetivo\nCompare metas e resultados. Não trate peças vendidas como clientes únicos nem satisfação como lucro. Não atribua as vendas aos posts sem evidência. Não invente dados ausentes.\n# Modelo de Entrega\nEntregue tabela com meta, resultado, situação e citação da fonte correspondente. Separe fato, interpretação e lacuna. Sugira uma verificação para o próximo fechamento do mês. Se a fonte não permitir responder, declare isso. Vou abrir cada citação para conferir os trechos.";
  if (p1.recebe) {
    p1.recebe.secoes[0].itens[0] = "4 posts publicados: meta cumprida; confira plano e resultados nas citações.";
    p1.recebe.secoes[0].itens[1] = "48 camisetas vendidas: acima da meta de 40, sem comprovar 48 clientes únicos.";
    p1.recebe.secoes[1].itens[0] = "Média 4,5 com 12 respostas; não representa necessariamente todos os clientes.";
    p1.recebe.secoes[1].itens[1] = "Sem fechar custos e despesas, o lucro do mês continua desconhecido.";
  }
  const l = a.passos[2].linhas;
  l[0][0] = "“4 posts publicados”, com citação do documento Resultados: abra e confira.";
  l[1][0] = "“Lucro ainda não apurado”, com trecho sobre custos e despesas pendentes.";
  l[1][1] = "“A loja já aumentou o lucro”: dado inexistente nas fontes.";
  l[2][0] = "“48 camisetas vendidas”, preservando a unidade do documento.";
  l[2][1] = "“48 clientes diferentes”: contagem que os documentos não permitem.";
  a.passos[3].confira[2] = "Registrei o lucro como lacuna, sem inventar resultado";
}
{
  const a = m3.aulas[2];
  a.objetivo = "Transformar informações do negócio em um cardápio editável e revisar um trecho sem inventar ofertas.";
  a.voceSaiCom = "Um cardápio curto com texto para Instagram, pronto para sua conferência.";
  const p1 = a.passos[1];
  p1.nomePrompt = "Cardápio e post de uma pequena lanchonete";
  p1.prompt = "# Perfil\nAtue como redator de cardápios e posts para pequenos negócios.\n# Contexto\nEstes são dados didáticos fictícios de uma pequena lanchonete em [[seu município]]: sanduíche de queijo por R$ 12; suco de laranja de 300 ml por R$ 8; combo com esses dois itens por R$ 18. A oferta vale apenas para retirada no balcão, de terça a sexta, das 14h às 18h. Não há informação confirmada sobre estoque diário, entrega ou ingredientes além dos citados. Não inclua dados pessoais.\n# Objetivo\nCrie no Canvas uma página editável com cardápio curto e um texto de post para Instagram. Use somente os dados acima. Não invente ingredientes, fotos, depoimentos, disponibilidade, benefícios de saúde ou promessas de venda.\n# Modelo de Entrega\nOrganize título, cardápio com produtos, tamanhos informados e preços, condições da oferta, legenda para Instagram e checklist de revisão. Destaque “exemplo didático fictício”. Marque as informações não confirmadas como pendentes de conferência. Use linguagem simples e até 350 palavras. Termine perguntando se preços, estoque e horário foram conferidos antes da publicação.";
  if (p1.observe) { p1.observe[0] = "O combo mantém os dois itens e o preço de R$ 18?"; p1.observe[1] = "O texto informa retirada no balcão, dias e horário sem inventar entrega?"; }
  const p2 = a.passos[2];
  p2.nomePrompt = "Ajuste da legenda sem mudar a oferta";
  p2.prompt = "# Perfil\nAtue como editor de linguagem simples.\n# Contexto\nNo Canvas, selecionei [[o texto do post para Instagram]]. O documento usa dados didáticos fictícios de uma lanchonete: sanduíche de queijo por R$ 12; suco de laranja de 300 ml por R$ 8; combo com esses dois itens por R$ 18. A oferta vale apenas para retirada no balcão, de terça a sexta, das 14h às 18h. O estoque diário não foi confirmado.\n# Objetivo\nReescreva apenas a seleção para os clientes da lanchonete. Preserve produtos, preços, tamanho informado e condições da oferta. Não altere o restante do documento nem inclua dados novos ou pessoais.\n# Modelo de Entrega\nSubstitua o trecho por até três frases curtas, sem jargão. Não anuncie entrega, disponibilidade garantida ou ingredientes não informados. Preserve a identificação de exemplo fictício e a pendência de conferir estoque. Se houver ambiguidade, sinalize-a em vez de completar com suposição. Explique na conversa o que mudou e o que foi preservado para que eu compare com a versão anterior.";
  a.passos[3].esperado[0] = "Um cardápio editável com legenda para Instagram e condições da oferta preservadas.";
}
{
  const a = m3.aulas[3];
  a.objetivo = "Comparar vendas por produto e mês, conferir estoque e separar receita de saldo de caixa e lucro.";
  a.voceSaiCom = "Uma análise de vendas e estoque com taxas conferidas e um gráfico simples.";
  a.passos[0].texto = "Abra uma planilha e o painel do Gemini. Cole a tabela fictícia do próximo passo em colunas separadas; confirme os tipos numéricos e deixe o estoque final não informado em branco.";
  const p1 = a.passos[1];
  p1.titulo = "Compare vendas e estoque"; p1.tituloEnfase = "vendas e estoque";
  p1.nomePrompt = "Base fictícia de vendas de uma padaria";
  p1.prompt = "# Perfil\nAtue como apoio ao dono de uma pequena padaria no controle de vendas e estoque.\n# Contexto\nEstes são dados didáticos fictícios, agregados por produto e mês. Não há dados pessoais. Copie a tabela para A1:F7; o estoque final de Bolo em junho deve ficar vazio. Cada linha trata de unidades do mesmo produto. Não houve perdas nem devoluções neste exercício.\nProduto | Mês | Unidades disponíveis no mês | Unidades vendidas | Receita de vendas (R$) | Estoque final (unidades)\nPão de queijo | Maio | 120 | 96 | 288 | 24\nBolo | Maio | 80 | 56 | 840 | 24\nSalgado | Maio | 60 | 54 | 324 | 6\nPão de queijo | Junho | 140 | 126 | 378 | 14\nBolo | Junho | 90 | 63 | 945 | \nSalgado | Junho | 100 | 80 | 480 | 20\n# Objetivo\nCompare vendas por produto e mês, percentual vendido e estoque final. Trate unidades disponíveis como estoque inicial mais entradas do mês. Não confunda receita com lucro nem com saldo de caixa: faltam custos, despesas, prazos de recebimento e pagamentos. Não invente motivos para as diferenças.\n# Modelo de Entrega\nEntregue tabela de taxas, três achados e duas hipóteses a verificar. Não transforme estoque ausente em zero. Se calcular um saldo esperado, identifique-o como cálculo a conferir na contagem física, não como estoque registrado. Separe fatos e sugestões; cite as células usadas para eu conferir.";
  p1.observe = [
    "Pão de queijo passa de 96 unidades vendidas em maio para 126 em junho.",
    "Bolo tem 70% das unidades disponíveis vendidas nos dois meses: 56 de 80 e 63 de 90.",
    "O estoque final de Bolo em junho não foi informado; 27 unidades é o saldo calculado, ainda não conferido.",
  ];
  a.passos[2].linhas = [
    ["Vendas: Pão de queijo registra 126 unidades em junho.", "Avaliar produção e procura; maior venda não prova maior lucro."],
    ["Estoque: Salgado termina maio com 6 unidades registradas.", "Conferir validade e contagem física antes de planejar novas compras."],
    ["Percentual vendido: Bolo vende 56 de 80 unidades em maio, ou 70%.", "Investigar procura e quantidade produzida antes de mudar o preço."],
    ["Receita: Bolo registra R$ 945 em junho.", "Conferir recebimentos, custos e despesas; receita não é saldo de caixa nem lucro."],
  ];
  a.passos[3].prompt = "# Perfil\nAtue como apoio no Google Planilhas.\n# Contexto\nUso a base didática fictícia desta aula em A1:F7. A contém produto, B mês, C unidades disponíveis, D unidades vendidas, E receita de vendas em reais e F estoque final registrado. Não há dados pessoais.\n# Objetivo\nCrie em G o percentual vendido (D dividido por C) e em H o saldo esperado em unidades (C menos D). Use percentual em G e número de unidades em H. Trate denominador zero como informação ausente, não como taxa zero. Não preencha F com o cálculo de H: o estoque registrado depende de conferência física.\n# Modelo de Entrega\nMostre as fórmulas da linha 2 adequadas à localidade da planilha e explique como preencher até a linha 7. Crie um gráfico de colunas com produtos no eixo de categorias, unidades vendidas no eixo numérico e uma série para cada mês. Não misture reais, unidades e percentuais no mesmo eixo. Se não puder inserir o gráfico, forneça as etapas manuais. Indique os intervalos usados e peça conferência: Bolo em maio deve ter percentual vendido de 70% e saldo esperado de 24 unidades. Não invente causas para as diferenças.";
  a.passos[3].dica = "Confira uma divisão manualmente. Dê ao gráfico o título “Unidades vendidas por produto e mês — base fictícia”.";
  a.passos[4].esperado[0] = "Uma comparação de vendas e estoque sem confundir receita, caixa e lucro.";
  a.passos[4].confira = [
    "Conferi colunas, seis registros e o estoque não informado em branco",
    "Validei um percentual vendido e um saldo esperado manualmente",
    "Conferi o gráfico e registrei o que falta para analisar estoque e caixa",
  ];
}
{
  const p1 = m3.aulas[4].passos[1];
  p1.nomePrompt = "Imagem para o Instagram da minha loja";
  p1.prompt = "# Perfil\nAtue como fotógrafo de produtos para pequenos negócios.\n# Contexto\nEste é um exercício didático fictício para o Instagram e o catálogo de uma pequena loja de artesanato de [[seu município]]. O produto imaginado é um cesto de fibra trançada, sem marca. Não represente uma peça como produção de artesão real nem atribua certificações ou origem comprovada. Não inclua dados pessoais.\n# Objetivo\nCrie uma imagem com aparência de fotografia de catálogo: um cesto centralizado sobre mesa clara, fundo neutro, luz natural suave pela esquerda e enquadramento a três quartos. Mostre a trama sem brilho artificial e sem objetos que confundam o que está à venda.\n# Modelo de Entrega\nUse proporção quadrada 1:1, com margem para recorte no Instagram. Não inclua pessoas, logotipos, selos ou texto na imagem. Não invente assinatura de artesão. O resultado será identificado como imagem gerada por IA. Antes de publicar, vou conferir forma, alças, textura e fidelidade ao produto real; não trate esta simulação como foto documental.";
}
save("modulo3", "modulo-3.ts", m3);

// ---------- Módulo 4 ----------
const m4 = any(modulo4);
m4.nomeCompleto = "O Gemini no dia a dia da empresa";
{
  const a = m4.aulas[0];
  a.passos[1].prompt = "# Perfil\nAtue como assistente de quem é dono de uma pequena padaria.\n# Contexto\nEstes são dados didáticos fictícios. A conversa aberta é com um fornecedor de embalagens. Há mensagens sobre orçamento, mudança no prazo de entrega e confirmação do pedido. Considere somente esta conversa, preparada sem nomes, contatos ou dados de clientes.\n# Objetivo\nResuma a sequência dos acontecimentos e separe decisões confirmadas, dúvidas e pendências. Se mensagens se contradisserem, mostre a divergência e indique quais trechos precisam de conferência.\n# Modelo de Entrega\nEntregue um resumo de até cinco linhas e uma tabela: pendência | responsável informado | prazo informado | mensagem de origem. Use [A CONFIRMAR] quando faltar informação. Não invente preços, datas ou confirmação do pedido. Termine com três pontos que devo verificar na conversa original antes de responder.";
  a.passos[2].prompt = "# Perfil\nAtue como assistente de redação para o atendimento da minha pequena loja.\n# Contexto\nEstes são dados didáticos fictícios. Um cliente escreveu: “Pedi um orçamento e ainda não recebi confirmação. Assim fica difícil organizar minha compra”. O pedido de orçamento foi recebido, mas ainda preciso conferir o estoque com o fornecedor. Não há prazo de retorno confirmado. Não use dados pessoais nem peça que eu cole dados de clientes.\n# Objetivo\nEscreva uma resposta respeitosa que reconheça a dificuldade, informe apenas o que está confirmado e proponha verificar a disponibilidade com o fornecedor. Não culpe o cliente nem prometa estoque, desconto ou prazo.\n# Modelo de Entrega\nProduza um rascunho de até 120 palavras, com saudação, acolhimento, situação atual e próximo passo. Se precisar de informação ausente, use [A CONFIRMAR]. Não apresente uma verificação futura como já realizada. Deixe o texto pronto para minha revisão, sem enviar a mensagem.";
}
{
  const a = m4.aulas[1];
  a.objetivo = "Criar uma proposta com orçamento baseado em arquivos e transformá-la em uma apresentação para banco ou parceiro.";
  a.voceSaiCom = "Uma proposta com valores conferidos e uma estrutura de slides para revisar.";
  a.saibaMais = "Defina qual decisão a proposta precisa apoiar antes de pedir o documento. Para um banco ou parceiro, destaque custos, condições e próximos passos. Não apresente estimativas como receitas garantidas.";
  const an = a.passos[1];
  an.titulo = "Monte uma proposta com evidências";
  if (an.tituloEnfase && !an.titulo.endsWith(an.tituloEnfase)) an.tituloEnfase = "com evidências";
  an.nomePrompt = "Proposta de ampliação do negócio";
  an.intro.texto = "A proposta deve ajudar você a avaliar a compra de um forno para sua padaria e apresentar o investimento a um banco ou parceiro.";
  const pre = (i: number, novo: string) => { const t: string = an.blocos[i].texto; const m = t.match(/^# [^\n]*\n/); an.blocos[i].texto = (m ? m[0] : "") + novo; };
  pre(0, "Atue como assistente de quem é dono de uma pequena padaria e precisa organizar uma proposta de investimento.");
  pre(1, "Estes são dados didáticos fictícios. Use somente @[[Orçamentos de fornos]] e @[[Resumo de custos e vendas da padaria]]. Os arquivos não contêm dados pessoais. A proposta será revisada por mim antes de ser apresentada a um banco ou parceiro.");
  an.blocos[2].pergunta = "Que decisão a proposta deve apoiar?";
  pre(2, "Produza uma proposta de compra de um forno, comparando preços, condições e custos informados. Não invente retorno financeiro, aprovação de crédito ou aumento de vendas. Marque lacunas como [A CONFIRMAR].");
  pre(3, "Organize em objetivo da compra, orçamento, condições, capacidade de pagamento informada, riscos e próximos passos. Identifique o arquivo e o trecho que sustentam cada valor. Separe fatos de estimativas e destaque divergências entre as fontes.");
  an.fecho.texto = "Abra os arquivos citados, confira valores e condições e mantenha na proposta somente informações sustentadas pelas fontes.";
  const sl = a.passos[2];
  sl.titulo = "Transforme a proposta em slides";
  if (sl.tituloEnfase && !sl.titulo.endsWith(sl.tituloEnfase)) sl.tituloEnfase = "em slides";
  sl.texto = "Salve a proposta revisada no Drive. Nas Apresentações, abra o Gemini e selecione esse documento com @ para pedir a estrutura.";
  sl.prompt = "# Perfil\nAtue como assistente de quem é dono de uma pequena padaria e vai apresentar um investimento a um banco ou parceiro.\n# Contexto\nEstes são dados didáticos fictícios. Use somente @[[Proposta revisada de compra do forno]], sem dados pessoais ou bancários. A compra e o financiamento ainda não foram aprovados.\n# Objetivo\nTransforme a proposta em uma estrutura de cinco slides. Preserve valores, condições e limitações da fonte. Não acrescente estatísticas, garantias, receitas projetadas ou resultados não documentados.\n# Modelo de Entrega\nPara cada slide, entregue título, mensagem principal, até três tópicos e uma nota de fala curta. Organize em necessidade do negócio, orçamento, condições, riscos e decisão solicitada. Indique o trecho da proposta que sustenta cada valor. Diferencie estimativa de fato e use [A CONFIRMAR] nas lacunas. Sugira gráficos apenas quando houver dados suficientes, sem criar valores. Não declare a compra ou o crédito aprovados.";
}
deepReplace(m4, [
  ["A vaga continua descrita como não confirmada.", "A disponibilidade continua descrita como não confirmada."],
  ["Escolha a que acolhe o empresário", "Escolha a que acolhe o cliente"],
  ["Sua vaga está garantida.", "Seu produto está garantido."],
  ["O recebimento dos documentos foi registrado; a vaga segue em análise.", "Recebi seu pedido de orçamento; ainda preciso confirmar a disponibilidade."],
  ["Vou verificar a situação com a equipe responsável.", "Vou conferir a disponibilidade com o fornecedor."],
  ["dificulta sua organização.", "dificulta sua compra."],
  ["1 · Contexto", "1 · Necessidade"], ["Objetivo da oficina e decisão a apoiar", "Necessidade da padaria e investimento em avaliação"],
  ["2 · Execução", "2 · Orçamento"], ["Planejado e realizado conforme o relatório", "Preços e itens conforme os orçamentos consultados"],
  ["3 · Resultados", "3 · Condições"], ["Evidências com indicação do trecho de origem", "Condições de pagamento com indicação da fonte"],
  ["4 · Limitações", "4 · Riscos"], ["Lacunas e limites das conclusões", "Informações ausentes e limites das estimativas"],
  ["Ajustes propostos para avaliação da equipe", "Investimento proposto para avaliação do banco ou parceiro"],
  ["Confira cada dado no relatório e revise a legibilidade antes de apresentar.", "Confira cada valor na proposta e revise a legibilidade antes de apresentar."],
  ["Crie um relatório curto com fontes autorizadas e transforme a versão revisada em uma apresentação para decisão.", "Crie uma proposta curta com orçamento baseado em arquivos fictícios e transforme a versão revisada em uma apresentação para banco ou parceiro."],
  ["Um relatório fundamentado e cinco slides que distinguem evidências de propostas.", "Uma proposta fundamentada e cinco slides que distinguem valores confirmados de estimativas."],
  ["Conferi números, fontes e lacunas no relatório", "Conferi valores, condições e lacunas na proposta"],
  ["Informe os participantes e siga as regras da organização.", "Informe a equipe ou o fornecedor sobre o registro e respeite a LGPD. Não inclua dados de clientes."],
  ["Informe sobre o registro e siga as regras internas", "Combine o registro com a equipe ou o fornecedor"],
  ["Valide os compromissos com a equipe.", "Valide os compromissos com a equipe ou o fornecedor."],
  ["nem suponha quem validará o material.", "nem suponha quem validará a lista."],
  ["O convite depende da validação do material.", "O orçamento depende da validação da lista."],
  ["Atue como apoio à organização de documentos de uma ação.", "Atue como assistente de organização dos arquivos da minha pequena oficina mecânica."],
  ["[[Oficina Bacabal — treino]]", "[[Compra de peças — exercício fictício]]"],
  ["@[[Plano anterior]]", "@[[Orçamento anterior]]"], ["@[[Plano atual]]", "@[[Orçamento atual]]"],
  ["Resuma mudanças comprováveis no escopo, no cronograma e nas tarefas.", "Resuma mudanças comprováveis nas peças, nos preços, nas condições e nos prazos de entrega."],
  ["Onde a IA ajuda no seu trabalho", "Onde a IA ajuda no seu negócio"],
  ["Um plano pessoal de 30 dias com teste pequeno, revisão e medida de resultado.", "Um plano de 30 dias para seu negócio, com teste pequeno, revisão e medida de resultado."],
  ["Enviar uma promessa ao empresário sem revisão.", "Enviar uma promessa ao cliente sem revisão."],
  ["Comparar dados agregados de uma ação.", "Comparar totais de vendas sem identificar clientes."],
  ["Atue como facilitador de melhoria de rotinas de trabalho.", "Atue como assistente de melhoria de rotinas de um pequeno negócio."],
]);
m4.aulas[2].passos[1].prompt = ctx(m4.aulas[2].passos[1].prompt, "Estes são dados didáticos fictícios, sem dados pessoais. Anotações de uma reunião da minha pequena oficina mecânica com um fornecedor: aprovamos revisar a lista de peças; eu farei essa revisão, sem prazo definido; foi sugerida uma nova data de entrega, mas não houve decisão; o fornecedor enviará o orçamento depois da validação da lista.");
m4.aulas[3].passos[2].prompt = ctx(m4.aulas[3].passos[2].prompt, "Sou dono de [[um MEI, uma microempresa ou uma pequena empresa]] no ramo de [[padaria, salão, loja, oficina, restaurante ou prestação de serviços]]. Trabalho [[sozinho ou com uma pequena equipe]]. Este exercício usa dados fictícios, sem dados de clientes. Notas de 1 a 5, em que 1 significa muita dificuldade e 5 significa rotina sob controle: e-mails [[nota]]; reuniões [[nota]]; relatórios [[nota]]; dados [[nota]]; pesquisa [[nota]]. Minha rotina prioritária é [[rotina]] e disponho de [[minutos por semana]].");
save("modulo4", "modulo-4.ts", m4);

// ---------- Módulo 5 ----------
const m5 = any(modulo5);
m5.nomeCompleto = "Agentes e automação para o seu negócio";
deepReplace(m5, [
  ["Sugere uma pauta de atendimento.", "Sugere uma pauta de reunião com meu fornecedor."],
  ["Planeja etapas e usa ferramentas disponíveis para preparar a pauta.", "Consulta os arquivos autorizados e prepara a pauta para minha revisão."],
  ["Explica como montar um relatório.", "Explica como montar um resumo de vendas."],
  ["Preparar um relatório mensal", "Preparar um resumo mensal de vendas"],
  ["Preparar relatório para a coordenação", "Preparar um resumo para eu avaliar as vendas"],
  ["Definir mês e unidade", "Definir mês e negócio"],
  ["O total é 40, sem comparação inventada com metas.", "O total é 40 serviços, sem receita ou comparação inventada."],
  ["Atue como apoio à pesquisa para atendimento de pequenos negócios.", "Atue como assistente de pesquisa para mim, que sou dono de um pequeno restaurante."],
  ["Estes são dados didáticos fictícios: uma pequena empresa de alimentação de São Luís busca recursos para equipamentos.", "Estes são dados didáticos fictícios: quero avaliar recursos para comprar equipamentos para meu pequeno restaurante."],
  ["Antes de recomendar", "Antes de decidir"],
  ["Escrever e testar um briefing de relatório mensal com fontes, limites e aprovação humana.", "Escrever e testar um briefing de resumo mensal do negócio com fontes, limites e minha aprovação antes de qualquer ação externa."],
  ["Estes são dados didáticos fictícios: em abril, Balsas registrou 30 atendimentos em alimentação e 20 em moda; a meta total de treino era 60.", "Estes são dados didáticos fictícios: em abril, meu salão realizou 30 cortes e 20 escovas; a previsão usada neste exercício era de 60 serviços no total."],
  ["Prepare um rascunho mensal para a coordenação de Balsas revisar o volume de atendimentos por setor e a diferença para a meta total.", "Prepare um rascunho mensal para eu revisar o volume de serviços do meu salão e a diferença para a previsão do exercício."],
  ["Use somente os totais agregados e a meta de treino fornecidos nesta conversa.", "Use somente os totais agregados e a previsão fictícia fornecidos nesta conversa."],
]);
m5.aulas[0].passos[3].prompt = "# Objetivo\nPrepare o plano de um resumo mensal de serviços da minha [[pequena oficina]]. Quero conferir o movimento antes de decidir as ações do próximo mês. Estes são dados didáticos fictícios.\n# Insumos\nConsidere apenas estes totais: manutenção preventiva, 24 serviços; reparos, 16. Não há valores de vendas nem dados de meses anteriores disponíveis.\n# Limites\nNão consulte sistemas, não envie mensagens e não altere arquivos. Não peça dados pessoais nem dados de clientes. Não invente receitas ou tendências; marque as lacunas. Antes de qualquer ação externa, peça minha aprovação explícita.\n# Entrega\nApresente o plano em três etapas, os recursos necessários e uma tabela preliminar com tipo de serviço e quantidade. Confira a soma e indique o que falta para comparar o movimento com o mês anterior. Aguarde minha revisão antes de prosseguir.";
{
  const a = m5.aulas[1];
  a.passos[1].prompt = "# Perfil\nAtue como assistente de organização da minha pequena loja.\n# Contexto\nEstes são dados didáticos fictícios. A base desta semana registra 12 vendas de camisetas e 8 de calças, sem nomes, contatos ou dados de clientes. Não há valores de faturamento informados.\n# Objetivo\nPrograme um resumo toda segunda-feira às 8h, no fuso America/Fortaleza. Use apenas informações autorizadas e disponíveis na execução. Se só houver esta base fictícia, identifique-a como estática e não a apresente como resultado de uma nova semana.\n# Modelo de Entrega\nEntregue até cinco tópicos: período, totais de vendas, destaques, lacunas e próximos passos sugeridos. Não invente faturamento nem envie o resumo a terceiros. Peça minha revisão. Confirme recorrência, fuso e próxima execução; se não puder agendar, informe a limitação sem simular sucesso.";
  const p = a.passos[2];
  Object.assign(p, {
    rotulo: "Toda semana", titulo: "Lembre de revisar as cobranças", tituloEnfase: "as cobranças", nomePrompt: "Revisão das contas a receber",
    texto: "Cole o lembrete e ajuste o dia. Agendar uma revisão não autoriza enviar cobranças aos clientes.",
    prompt: "# Perfil\nAjude a organizar as contas a receber do meu pequeno negócio de prestação de serviços.\n# Contexto\nEstes são dados didáticos fictícios. Preciso lembrar de conferir pagamentos antes de preparar cobranças. Nenhum saldo ou atraso foi informado. Não use nomes, contatos, dados bancários ou outros dados de clientes.\n# Objetivo\nCrie um lembrete recorrente toda [[terça-feira]] às [[9h]], no fuso America/Fortaleza, para eu revisar as contas a receber no meu controle financeiro.\n# Modelo de Entrega\nNo lembrete, peça para conferir vencimentos e pagamentos recebidos antes de preparar qualquer mensagem. Não invente dívidas, não altere registros e não envie cobranças. Qualquer rascunho deve passar pela minha revisão, sem dados de clientes neste exercício. Confirme a próxima execução e a recorrência. Se a conta não permitir programar, explique a limitação e entregue somente o texto do lembrete.",
  });
  if (p.observe) p.observe = ["O lembrete pede conferência antes de qualquer cobrança.", "Nenhum dado de cliente foi incluído.", "Recorrência, horário e fuso estão confirmados."];
  if (p.recebe) delete p.recebe;
}
save("modulo5", "modulo-5.ts", m5);
console.log("ok");
