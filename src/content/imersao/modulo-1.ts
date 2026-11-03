import type { Modulo } from "./tipos";
import { aula11 } from "./aula-1-1";

export const modulo1: Modulo = {
  id: "modulo-1",
  glifo: "chat",
  nome: "Conhecer",
  nomeCompleto: "Conhecer e personalizar o Gemini",
  aulas: [
    aula11,
    {
      n: "1.2",
      titulo: "Personalização",
      curto: "Personalização",
      ferramenta: "Gemini · Personalizar",
      objetivo: "Ajustar as instruções do Gemini ao seu trabalho e conferir a diferença nas respostas.",
      voceSaiCom: "Instruções revisadas e uma comparação da mesma pergunta antes e depois da personalização.",
      saibaMais: "Instruções orientam as respostas, mas não garantem acerto. Salve apenas contexto profissional genérico, sem dados pessoais ou informações internas restritas. Os controles disponíveis podem variar por conta.",
      fontes: [{ nome: "Ajuda sobre personalização", url: "https://support.google.com/gemini" }],
      passos: [
        {
          tipo: "prompt", rotulo: "Antes", titulo: "Faça uma pergunta de teste", tituloEnfase: "de teste",
          texto: "Cole e envie antes de mudar as instruções. Guarde a resposta para comparar depois, sem trocar o modelo.",
          nomePrompt: "Pergunta de teste", tela: "inicio", marca: "cole aqui e envie",
          prompt: `# Perfil
Atue como assistente de gestão para uma micro ou pequena empresa.
# Contexto
Tenho um negócio no segmento de [[seu segmento/tipo de empresa]] em [[sua cidade]] e quero melhorar as vendas nas próximas duas semanas. Ainda não defini orçamento nem divulgação. Não inclua CPF, dados bancários ou dados pessoais de clientes.
# Objetivo
Sugira como posso começar sem inventar informações, metas ou regras.
# Modelo de Entrega
Apresente três ações simples para vender mais, como divulgar no WhatsApp ou Instagram, organizar produtos e conversar com clientes. Explique cada ação e o que preciso confirmar. Marque lacunas como “a confirmar” e termine com duas perguntas.`,
          dica: "Guarde este pedido exatamente como enviou: ele será o seu teste antes e depois.",
        },
        {
          tipo: "tela", tela: "personalizar", rotulo: "Onde ajustar", titulo: "Abra as instruções do Gemini", tituloEnfase: "do Gemini",
          texto: "Abra Personalizar e localize Instruções para o Gemini. Veja onde salvar; primeiro você vai preparar um texto ligado ao seu trabalho.",
        },
        {
          tipo: "texto", rotulo: "Seu perfil", titulo: "Escolha seu perfil de trabalho", tituloEnfase: "de trabalho",
          texto: "Escolha o perfil mais próximo da sua rotina. Troque os trechos destacados e mantenha apenas contexto que pode compartilhar.",
          comoFazer: ["Escolha um perfil e copie o texto.", "Adapte a função sem nomes, contatos ou dados de clientes.", "Use o próximo prompt para revisar antes de salvar nas instruções."],
          rotuloSelecionado: "Perfil escolhido", rotuloCopiar: "Copiar perfil",
          opcoes: [
            { nome: "Gestão do meu negócio", resumo: "Rotina, vendas e prioridades da empresa.", texto: `# Quem sou
Sou responsável por uma [[loja de roupas]] em [[município]].
# O que muda a resposta no meu contexto
- Tenho pouco tempo e recursos para testar mudanças.
- Ajude a organizar vendas, estoque, caixa e atendimento.
- Separe o que sei do que preciso confirmar.
# Como prefiro as respostas
Use linguagem simples, passos curtos e exemplos práticos. Não invente números; marque lacunas e peça confirmação.` },
            { nome: "Organizar minha oficina", resumo: "Melhorias práticas para a rotina e o atendimento.", texto: `# Quem sou
Sou dono(a) de uma [[oficina]] e cuido da gestão do negócio.
# O que muda a resposta no meu contexto
- Considere recursos limitados e aplicação gradual.
- Diferencie evidências de hipóteses do diagnóstico.
- Sugira perguntas antes de recomendar soluções definitivas.
# Como prefiro as respostas
Use linguagem simples, etapas e critérios de acompanhamento. Não invente dados; sinalize o que devo validar.` },
            { nome: "Atendimento e relacionamento", resumo: "Orientações claras e próximos passos.", texto: `# Quem sou
Atendo clientes na minha [[loja de roupas]] em [[município]].
# O que muda a resposta no meu contexto
- Preciso entender a demanda antes de encaminhar.
- Não prometa serviços, prazos ou condições sem confirmação.
- Evite solicitar dados pessoais desnecessários.
# Como prefiro as respostas
Use mensagens acolhedoras e curtas, com perguntas objetivas e próximo passo. Marque informações a confirmar.` },
            { nome: "Dados e resultados", resumo: "Indicadores com limites e evidências.", texto: `# Quem sou
Cuido das vendas e do caixa do meu [[restaurante]].
# O que muda a resposta no meu contexto
- Distinga valor observado, meta e estimativa.
- Confira período, unidade e base de comparação.
- Trabalhe apenas com dados agregados autorizados.
# Como prefiro as respostas
Use tabelas curtas e explique cálculos. Não invente valores; destaque lacunas e limites da análise.` },
            { nome: "Divulgação do meu negócio", resumo: "Ideias para apresentar produtos e serviços.", texto: `# Quem sou
Tenho um [[salão de beleza]] e quero divulgar serviços para novos clientes.
# O que muda a resposta no meu contexto
- Relacione publicações aos produtos e serviços que quero divulgar.
- Considere acessibilidade e recursos disponíveis.
- Não presuma orçamento, descontos ou disponibilidade que não confirmei.
# Como prefiro as respostas
Use roteiro com etapas, duração sugerida e checklist. Marque suposições e informações a confirmar.` },
            { nome: "Finanças, precificação e margem", resumo: "Cálculo real com taxas de cartão, impostos e capital de giro.", texto: `# Quem sou
Cuido do financeiro, compras e precificação da minha [[tipo de empresa: comércio, restaurante ou serviço]] emquadrada no [[MEI ou Simples Nacional]].
# O que muda a resposta no meu contexto
- Diferencie faturamento bruto, margem de contribuição, lucro líquido e saldo de caixa.
- Sempre considere taxas de maquininha (PIX, débito, crédito parcelado), alíquota de imposto, frete de compra, perdas e comissões.
- Não confunda markup sobre o custo com margem sobre o preço de venda.
# Como prefiro as respostas
Exiba memória de cálculo passo a passo, tabela comparativa e fórmula pronta para Google Planilhas. Nunca arredonde ou invente taxas; marque dados faltantes como [A CONFIRMAR].` },
            { nome: "Operação, equipe e POP", resumo: "Padronização de rotinas, checklists e treinamento rápido.", texto: `# Quem sou
Gerencio a operação e a equipe de [[quantidade de pessoas]] colaboradores no meu [[segmento do negócio]].
# O que muda a resposta no meu contexto
- Preciso de processos simples que qualquer funcionário consiga seguir no balcão ou na produção.
- Foque em reduzir retrabalho, desperdício de insumos e falhas de abertura ou fechamento de turno.
# Como prefiro as respostas
Entregue Procedimentos Operacionais Padrão (POP) de uma página, com passos numerados, responsável, tempo estimado e critério visual de conferência ("como saber que ficou pronto").` },
          ],
        },
        {
          tipo: "prompt", rotulo: "Ajustar instruções", titulo: "Prepare suas instruções para salvar", tituloEnfase: "para salvar",
          texto: "Cole o perfil no lugar indicado. Revise a resposta e só então copie o texto final para Instruções para o Gemini e salve.",
          nomePrompt: "Revisar meu perfil",
          prompt: `# Perfil
Atue como editor de instruções de trabalho para o Gemini.
# Contexto
Quero adaptar as respostas à rotina real da minha empresa (não inclua CPF, dados bancários nem dados pessoais de clientes). Meu perfil é:
[[descreva aqui seu negócio, sua função, seus principais produtos ou serviços e seu público-alvo]]
# Objetivo
Transforme o perfil em instruções claras e curtas, sem acrescentar informações ou regras que não forneci. Não inclua dados pessoais. Se faltar contexto, marque a lacuna em vez de inventar.
# Modelo de Entrega
Entregue um bloco pronto para salvar com “Quem sou”, “O que muda a resposta no meu contexto” e “Como prefiro as respostas”. Depois, fora do bloco, liste até três pontos que preciso conferir antes de salvar.`,
          observe: ["O texto corresponde à sua função real?", "As preferências estão claras, sem dados pessoais?", "Há alguma suposição que precisa ser removida?"],
        },
        {
          tipo: "prompt", rotulo: "Depois", titulo: "Repita o teste e compare", tituloEnfase: "e compare",
          texto: "Abra um novo chat normal, mantenha o modelo e repita o pedido inicial sem mudanças. Compare com a resposta guardada; variação não prova melhoria.",
          nomePrompt: "Repetir a pergunta de teste",
          prompt: `# Perfil
Atue como assistente de gestão para uma micro ou pequena empresa.
# Contexto
Tenho [[seu segmento de negócio]] em [[sua cidade]] e quero melhorar as vendas nas próximas duas semanas. Ainda não defini orçamento nem divulgação. Não inclua dados pessoais de clientes, CPF ou informações bancárias.
# Objetivo
Sugira como posso começar sem inventar informações, metas ou regras.
# Modelo de Entrega
Apresente três ações simples para vender mais, como divulgar no WhatsApp ou Instagram, organizar produtos e conversar com clientes. Explique cada ação e o que preciso confirmar. Marque lacunas como “a confirmar” e termine com duas perguntas.`,
          observe: ["A linguagem e as prioridades ficaram mais adequadas ao seu trabalho?", "As lacunas continuam explícitas, sem números inventados?", "O que ainda exige ajuste nas instruções?"],
          dica: "Se adaptou os campos no primeiro teste, repita os mesmos valores aqui. Confira o conteúdo, não apenas o estilo.",
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Finalize a personalização e confirme se ela ajuda no seu trabalho, sem dispensar sua revisão.",
          exercicio: {
            situacao: "Use as instruções da aula trocando os campos pelo seu trabalho: o tipo de negócio, o que você decide sozinho e o formato de resposta que ajuda a decidir.",
            tarefa: [
              "Salve instruções com o seu contexto: dono de [[tipo do seu negócio]], decisões de [[caixa, vendas, compras ou equipe]].",
              "Teste com uma pergunta real da gestão, como: por onde começo a organizar o fluxo de caixa ou o estoque?",
              "Compare com a resposta da mesma pergunta sem instruções e ajuste o que ficou genérico.",
            ],
            entrega: "O Gemini respondendo no seu contexto, com próximos passos aplicáveis.",
          },
          esperado: ["Instruções salvas com contexto profissional e comparação antes/depois."],
          confira: ["Salvei instruções revisadas sem dados pessoais ou restritos", "Repeti a mesma pergunta com o mesmo modelo e comparei as respostas", "Conferi lacunas e corrigi instruções que geraram suposições"],
        },
      ],
    },
    {
      n: "1.3", titulo: "Memórias e privacidade", curto: "Memórias", ferramenta: "Gemini · Memórias",
      objetivo: "Salvar uma preferência, revisar memórias e escolher quando usar chat temporário.",
      voceSaiCom: "Uma preferência conferida e um roteiro para revisar memórias, chat temporário e atividade.",
      saibaMais: "Memória não é arquivo de clientes. Chat temporário não entra no histórico nem na personalização, mas não autoriza compartilhar dados sensíveis. Recursos podem variar por conta e pelas regras da organização.",
      fontes: [
        { nome: "Central de Ajuda do Gemini", url: "https://support.google.com/gemini" },
        { nome: "Privacidade nos apps Gemini", url: "https://support.google.com/gemini/answer/13594961?hl=pt-BR" },
      ],
      passos: [
        {
          tipo: "comparacao", rotulo: "Antes de colar", titulo: "Escolha o que pode compartilhar", tituloEnfase: "pode compartilhar",
          texto: "Use os dados reais do seu negócio e respeite a LGPD e a privacidade da sua empresa: nunca insira dados pessoais de clientes. Remover o nome não basta se outros detalhes identificam a pessoa.",
          colunas: ["Não cole", "Prefira"],
          linhas: [
            ["CPF, telefone ou cadastro de cliente", "Um exemplo baseado nos dados reais do seu negócio, sem dados pessoais de clientes."],
            ["Relatório interno restrito sem autorização", "Contexto genérico ou dados agregados autorizados"],
            ["Senhas ou informações financeiras identificáveis", "Uma descrição da tarefa sem segredos ou dados sensíveis"],
          ],
          frase: "Chat temporário não transforma dado restrito em dado permitido.",
        },
        {
          tipo: "prompt", rotulo: "Salvar preferência", titulo: "Peça para lembrar uma preferência", tituloEnfase: "uma preferência",
          texto: "Em um chat normal, envie uma preferência simples. Não considere a confirmação na conversa uma prova de que ela foi salva: confira na lista.",
          nomePrompt: "Lembre que...",
          prompt: `Lembre que prefiro respostas em português do Brasil, com um resumo curto, uma lista de próximos passos e uma seção “O que conferir”.

# Contexto
Tenho um pequeno negócio de [[seu ramo de atuação e cidade]]. Quero registrar esta preferência de formato para as consultas sobre a minha empresa, sem incluir CPF, dados bancários ou dados pessoais de clientes.
# Objetivo
Use essa preferência quando for adequada ao pedido. Não invente dados nem transforme exemplos em fatos sobre mim. Sinalize informações ausentes.
# Modelo de Entrega
Confirme qual preferência você entendeu. Se não puder salvá-la nesta conta, informe a limitação e não afirme que a memória foi registrada.`,
          dica: "Se o recurso não estiver disponível, registre a limitação e use instruções para preferências explícitas de trabalho.",
        },
        {
          tipo: "tela", tela: "memorias", rotulo: "Conferir memória", titulo: "Confira e edite a memória", tituloEnfase: "a memória",
          texto: "Abra Personalizar → Memórias. Localize a preferência; edite um trecho e confira a mudança. Exclua o que não quiser manter e revise Usar chats anteriores.",
        },
        {
          tipo: "comparacao", rotulo: "Qual recurso usar", titulo: "Separe memória, instrução e conversa", tituloEnfase: "e conversa",
          texto: "Escolha o recurso conforme a intenção. Confira os controles da sua conta e não use nenhum deles como lugar para guardar dados de clientes.",
          colunas: ["Recurso", "Quando usar"],
          linhas: [
            ["Memória", "Preferência lembrada entre conversas; revise, edite ou exclua na lista."],
            ["Instruções", "Orientação explícita sobre função, contexto e formato das respostas."],
            ["Chat temporário", "Conversa que não entra no histórico nem na personalização; mantenha os mesmos cuidados com dados."],
          ],
        },
        {
          tipo: "tela", tela: "memorias", rotulo: "Chat temporário", titulo: "Experimente um chat temporário", tituloEnfase: "chat temporário",
          texto: "Abra o Chat temporário e confirme o indicador antes de enviar: “Sugira três títulos para um novo serviço ou ação da minha empresa de [[seu ramo de atuação]]”. Confira se a conversa ficou fora do histórico.",
        },
        {
          tipo: "comparacao", rotulo: "Revisar atividade", titulo: "Revise sua atividade com cuidado", tituloEnfase: "com cuidado",
          texto: "Abra Atividade nos apps Gemini pelo menu ou pelas configurações. Confira os controles disponíveis; na conta usada, confira os controles disponíveis e mantenha os cuidados com privacidade.",
          colunas: ["O que revisar", "O que fazer"],
          linhas: [
            ["Registros de atividade", "Localize a conversa de teste e use a opção de exclusão se disponível."],
            ["Exclusão automática", "Confira as opções de 3, 18 ou 36 meses e escolha conforme a política permitida."],
            ["Memórias salvas", "Volte à lista para excluir a preferência se desejar; não presuma que apagar uma conversa apagou a memória."],
          ],
          frase: "Se o controle não aparecer, consulte a ajuda da sua conta.",
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Confira o que ficou salvo e mantenha somente o necessário. Revise também toda resposta antes de usar no trabalho.",
          exercicio: {
            situacao: "Defina um jeito fixo de receber respostas que ajude a decidir no seu negócio: resumo curto, próximos passos e o que conferir antes de agir.",
            tarefa: [
              "Salve como memória ou instrução: respostas sobre meu negócio devem terminar com próximos passos e o que conferir.",
              "Revise a lista de memórias e exclua o que não for sobre o seu trabalho.",
              "Teste em um chat novo com [[uma decisão real da sua gestão]], sem dados pessoais de clientes.",
            ],
            entrega: "Um padrão fixo de resposta para as decisões do dia a dia.",
          },
          esperado: ["Uma preferência revisada e controles de privacidade localizados, ou limitações da conta identificadas."],
          confira: ["Conferi e editei ou excluí a memória de teste, quando disponível", "Testei o chat temporário sem dados pessoais e verifiquei o indicador", "Revisei a atividade e as opções de exclusão permitidas na minha conta"],
        },
      ],
    },
  ],
};
