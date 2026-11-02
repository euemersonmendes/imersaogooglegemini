import type { Modulo } from "./tipos";

export const modulo2: Modulo = {
  id: "modulo-2", glifo: "spark", nome: "Prompts",
  nomeCompleto: "Engenharia de prompts com Gemini",
  aulas: [
    {
      n: "2.1", titulo: "Pensar antes de pedir: Modelo IPO", curto: "Modelo IPO",
      ferramenta: "Gemini · Chat",
      objetivo: "Definir a entrega, o trabalho e os dados necessários antes de escrever o pedido.",
      voceSaiCom: "Um cartão IPO revisado para transformar uma necessidade em prompt.",
      saibaMais: "IPO organiza o trabalho, não apenas a mensagem. Planeje pelo resultado; na execução, forneça o conteúdo para que a transformação produza a entrega.",
      fontes: [{ nome: "Ajuda do Gemini", url: "https://support.google.com/gemini" }],
      passos: [
        {
          tipo: "catalogo", rotulo: "Modelo IPO", titulo: "Organize antes de pedir", tituloEnfase: "antes de pedir",
          texto: "Clique em cada parte. Comece pelo resultado desejado, depois defina o trabalho e os dados que ele exige.",
          itens: [
            { sigla: "I", nome: "Conteúdo", sub: "O material disponível para trabalhar.", rotulo: "I · Conteúdo", pergunta: "Quais informações são necessárias?", cuidado: "Use dados autorizados e sem identificação pessoal; marque o que falta.", itens: ["Registros e períodos", "Definições e unidades", "Fontes e limites"] },
            { sigla: "P", nome: "Transformação", sub: "As operações que produzem a entrega.", rotulo: "P · Transformação", pergunta: "O que fazer com o conteúdo?", cuidado: "Troque verbos vagos por operações verificáveis.", itens: ["Comparar períodos", "Calcular variações", "Separar evidência de hipótese"] },
            { sigla: "O", nome: "Resultado", sub: "A entrega e a decisão que ela apoia.", rotulo: "O · Resultado", pergunta: "O que receber e para quê?", cuidado: "Uma tabela é um formato; explique também a decisão que ela deve apoiar.", itens: ["Público da entrega", "Decisão ou ação", "Critério de aceitação"] },
          ],
          ordens: [
            { rotulo: "Para executar", sequencia: ["I", "P", "O"], texto: "Forneça os dados, faça a transformação e confira a entrega." },
            { rotulo: "Para planejar", sequencia: ["O", "P", "I"], texto: "Defina a entrega, escolha as operações e identifique os dados necessários." },
          ],
        },
        {
          tipo: "mapa", rotulo: "Planejar", titulo: "Comece pela decisão", tituloEnfase: "pela decisão",
          texto: "Clique em Revelar. Veja como a decisão orienta a transformação e, só então, a escolha dos dados.",
          pedido: "Preciso decidir qual canal de vendas da minha loja melhorar primeiro.", fluxo: "volta", rotuloSeta: "PLANEJAR",
          nos: [
            { id: "I", sigla: "I", nome: "Conteúdo", itens: ["Pedidos e prazos por canal", "Dois meses comparáveis", "Metas, se disponíveis"] },
            { id: "P", sigla: "P", nome: "Transformação", itens: ["Comparar volumes e prazos separadamente", "Calcular variações", "Não atribuir causas sem evidência"] },
            { id: "O", sigla: "O", nome: "Resultado", itens: ["Prioridade de melhoria para o próximo mês", "Evidência e lacuna por canal"] },
          ],
          quadros: [
            { legenda: "Pedir “analise minhas vendas” ainda não define uma entrega útil.", abertos: [] },
            { legenda: "O: escolha primeiro a decisão que será apoiada.", abertos: ["O"], foco: "O" },
            { legenda: "P: defina as comparações necessárias para decidir.", abertos: ["O", "P"], foco: "P" },
            { legenda: "I: identifique os dados exigidos pelas comparações.", abertos: ["O", "P", "I"], foco: "I" },
            { legenda: "Confira a ligação entre entrega, transformação e conteúdo.", abertos: ["O", "P", "I"] },
          ],
        },
        {
          tipo: "prompt", rotulo: "Entrevista IPO", titulo: "Construa o cartão IPO", tituloEnfase: "o cartão IPO",
          texto: "Cole no Gemini e responda uma pergunta por vez. O cartão ao lado ilustra uma possível conclusão, não uma resposta garantida.",
          nomePrompt: "Entrevista antes do pedido",
          prompt: `# Perfil
Atue como facilitador de planejamento de tarefas.
# Contexto
Estes são dados didáticos fictícios. Sou dono de uma pequena loja de roupas e quero decidir qual canal de vendas (balcão, WhatsApp ou Instagram) melhorar primeiro. Tenho número de pedidos e prazos médios de entrega de dois meses, mas não defini metas. Não há dados pessoais.
# Objetivo
Ajude a estruturar o trabalho pelo Modelo IPO. Não execute a análise. Entreviste-me na ordem O: resultado e decisão; P: operações necessárias; I: conteúdo disponível. Faça uma pergunta por vez e aguarde. Limite a entrevista a cinco perguntas; não repita informações já dadas.
# Modelo de Entrega
Ao terminar, entregue um cartão com O, P, I e principal lacuna. Diferencie o informado do sugerido. Não invente dados nem causas. Marque ausências como “a confirmar” e peça minha revisão. Comece perguntando qual decisão a entrega deve apoiar.`,
          recebe: {
            titulo: "Cartão IPO · exemplo fictício",
            texto: "Possível cartão após responder à entrevista.",
            secoes: [
              { rotulo: "O · Resultado", itens: ["Quadro para escolher uma etapa a investigar", "Justificar a prioridade com evidências"] },
              { rotulo: "P · Transformação", itens: ["Comparar variações de volume e prazo", "Separar constatações de hipóteses"] },
              { rotulo: "I · Conteúdo", itens: ["Volumes e prazos de dois meses", "Metas e definições: a confirmar"] },
            ], aceite: "Aceite apenas se o cartão corresponder às suas respostas; sem meta, não conclua que houve descumprimento.",
          },
        },
        {
          tipo: "prompt", rotulo: "Sua vez", titulo: "Planeje a sua tarefa", tituloEnfase: "a sua tarefa",
          texto: "Abra outro chat e troque a lacuna por uma necessidade sem dados pessoais. Responda à entrevista e corrija o cartão final.",
          nomePrompt: "Meu cartão IPO",
          prompt: `# Perfil
Atue como entrevistador para organizar uma tarefa com o Modelo IPO.
# Contexto
Minha necessidade é [[descreva uma tarefa do seu negócio — vendas, clientes, estoque, caixa, preços ou divulgação — sem identificar pessoas]]. Se eu usar números de exercício, considere: Estes são dados didáticos fictícios. Não solicite nomes, contatos nem documentos pessoais.
# Objetivo
Antes de executar qualquer trabalho, descubra O: entrega, público e decisão; P: operações e critérios; I: dados e fontes necessários. Faça uma pergunta por vez, espere minha resposta e adapte a seguinte. Faça no máximo cinco perguntas.
# Modelo de Entrega
Entregue um cartão curto com O, P, I e lacunas. Separe informações fornecidas de sugestões suas. Não invente dados; indique “a confirmar” quando faltar algo. Verifique se as operações produzem a entrega e se o conteúdo permite realizá-las. Peça minha validação antes de seguir.`,
          observe: ["A primeira pergunta trata da decisão?", "O cartão registra o que falta sem preencher por suposição?"],
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Guarde o cartão revisado para a próxima aula. Não avance com suposições apresentadas como fatos.",
          esperado: ["Um cartão IPO que conecta decisão, operações e dados disponíveis."],
          confira: ["Defini a entrega e a decisão que ela apoia", "Conferi as operações e marquei lacunas sem inventar dados", "Revisei o cartão e removi dados pessoais"],
        },
      ],
    },
    {
      n: "2.2", titulo: "Estrutura de um prompt", curto: "Estrutura", ferramenta: "Gemini · Chat",
      objetivo: "Transformar o cartão IPO em um pedido organizado em quatro blocos.",
      voceSaiCom: "Um prompt executado e revisado, com critérios claros de entrega.",
      fontes: [{ nome: "Ajuda do Gemini", url: "https://support.google.com/gemini" }],
      passos: [
        {
          tipo: "anatomia", rotulo: "Quatro blocos", titulo: "Dê estrutura ao pedido", tituloEnfase: "ao pedido",
          texto: "Revele os blocos e localize o IPO. Os títulos ajudam a organizar; as informações e os critérios é que orientam a resposta.",
          nomePrompt: "Prioridade de investigação",
          intro: { titulo: "Do cartão à mensagem", texto: "Contexto carrega o I; Objetivo conecta P e O; os outros blocos orientam o papel e a entrega." },
          blocos: [
            { titulo: "Perfil", pergunta: "Que papel o Gemini assume?", texto: "Atue como apoio ao dono de uma pequena loja na análise das vendas. Diferencie observações de hipóteses.", nota: "Defina como trabalhar, não um currículo imaginário." },
            { titulo: "Contexto", pergunta: "Quais dados e limites existem?", ipo: "I", texto: "Estes são dados didáticos fictícios de uma pequena loja de roupas. Prazos em dias até a entrega; volumes são pedidos concluídos. Mesmas definições nos dois meses; metas não informadas.\nCanal | Março: volume | Março: prazo | Abril: volume | Abril: prazo\nBalcão | 100 | 1 | 105 | 1\nWhatsApp | 50 | 2 | 55 | 3\nInstagram | 40 | 3 | 42 | 6" },
            { titulo: "Objetivo", pergunta: "O que fazer e para quê?", ipo: "PO", texto: "Compare os meses por etapa, calcule variações de volume e prazo e sugira onde investigar primeiro. Apoie minha decisão do próximo mês, sem recomendar solução antes de verificar causas." },
            { titulo: "Modelo de Entrega", pergunta: "Como conferir o resultado?", texto: "Apresente prioridade, tabela de variações e lacunas. Mostre cálculos, unidades e períodos. Não invente metas ou causas; termine com uma pergunta de investigação." },
          ],
          fecho: { titulo: "Confira a ligação", texto: "O conteúdo precisa permitir a transformação, e a transformação deve produzir a entrega desejada." },
        },
        {
          tipo: "prompt", rotulo: "Demonstração", titulo: "Execute o pedido estruturado", tituloEnfase: "o pedido estruturado",
          texto: "Cole em um novo chat. Confira os cálculos: o prazo de entrega dos pedidos do Instagram passa de 3 para 6 dias, um aumento de 100%.",
          nomePrompt: "Comparar canais de venda da loja",
          prompt: `# Perfil
Atue como apoio ao dono de uma pequena loja; separe evidência de hipótese.
# Contexto
Estes são dados didáticos fictícios de uma pequena loja de roupas. Volumes são pedidos concluídos; prazos médios até a entrega estão em dias. As definições são iguais nos dois meses. Não há metas nem causas informadas.
Canal | Março: volume | Março: prazo | Abril: volume | Abril: prazo
Balcão | 100 | 1 | 105 | 1
WhatsApp | 50 | 2 | 55 | 3
Instagram | 40 | 3 | 42 | 6
# Objetivo
Compare março e abril, separando volume de prazo. Calcule as variações percentuais e sugira o canal a melhorar primeiro no próximo mês. Não confunda aumento de prazo com causa demonstrada.
# Modelo de Entrega
Abra com uma prioridade justificada. Entregue tabela com canal, variação de volume, variação de prazo e evidência. Mostre a fórmula utilizada. Termine com lacunas e uma pergunta para eu investigar. Não invente dados, metas ou causas.`,
          observe: ["Pedidos pelo Instagram: aumento de 5%", "Prazo de entrega no WhatsApp: aumento de 50%", "Ausência de meta não vira descumprimento comprovado"],
        },
        {
          tipo: "prompt", rotulo: "Sua vez", titulo: "Escreva os quatro blocos", tituloEnfase: "os quatro blocos",
          texto: "Substitua todas as lacunas usando seu cartão IPO. Envie só depois de retirar identificadores pessoais e conferir os dados.",
          nomePrompt: "Do meu cartão ao prompt",
          prompt: `# Perfil
Atue como [[papel necessário à tarefa]], usando evidências e distinguindo fatos de hipóteses.
# Contexto
A situação é [[situação e público da entrega]]. O conteúdo disponível é [[dados do seu negócio, períodos, unidades de medida e fontes do I]]. As limitações são [[informações ausentes e limites de uso]]. Não incluo dados pessoais. Se o caso for um exercício, declare: Estes são dados didáticos fictícios.
# Objetivo
Realize [[operações concretas do P]] para produzir [[resultado do O]] e apoiar [[decisão ou ação]]. Use [[critérios de comparação ou priorização]]. Não extrapole o conteúdo fornecido.
# Modelo de Entrega
Entregue [[formato, campos e tamanho]]. Mostre as evidências e os cálculos relevantes. Não invente dados; registre ausências como “a confirmar”. Se faltar algo que impeça a execução, pergunte antes de concluir. Termine com pontos que devo verificar antes de usar a resposta.`,
          dica: "Se faltar um dado essencial, volte ao cartão IPO em vez de pedir ao Gemini que adivinhe.",
        },
        {
          tipo: "comparacao", rotulo: "Compare", titulo: "Compare os dois pedidos", tituloEnfase: "os dois pedidos",
          texto: "Compare os pedidos sobre o mesmo caso. A estrutura melhora o direcionamento, mas não dispensa conferir a resposta.",
          colunas: ["Pedido vago", "Pedido em blocos"],
          linhas: [
            ["Analise as vendas.", "Perfil: apoio ao dono que separa evidência de hipótese."],
            ["Sem dados nem períodos definidos.", "Contexto: tabela fictícia de março e abril, com unidades."],
            ["Sem decisão definida.", "Objetivo: comparar variações e priorizar investigação."],
            ["Qualquer texto parece suficiente.", "Modelo de Entrega: prioridade, cálculos e lacunas verificáveis."],
          ], frase: "Mais texto não garante qualidade; instruções verificáveis ajudam a avaliar a entrega.",
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Execute seu pedido e ajuste o que ficou ambíguo. Guarde a versão revisada, não apenas a primeira resposta.",
          esperado: ["Um prompt em quatro blocos e uma resposta conferida."],
          confira: ["Preenchi as lacunas sem incluir dados pessoais", "Conferi números, períodos e aderência ao cartão IPO", "Marquei informações ausentes e rejeitei dados inventados"],
        },
      ],
    },
    {
      n: "2.3", titulo: "Técnicas de engenharia de prompts", curto: "Técnicas", ferramenta: "Gemini · Chat",
      objetivo: "Escolher técnicas para esclarecer pedidos, orientar o estilo e verificar alternativas.",
      voceSaiCom: "Três testes de técnicas e critérios para decidir quando usá-las.",
      fontes: [{ nome: "Gemini no Google Workspace", url: "https://workspace.google.com/learning/content/gemini-prompt-guide" }],
      passos: [
        {
          tipo: "catalogo", rotulo: "Técnicas", titulo: "Escolha pelo problema", tituloEnfase: "pelo problema",
          texto: "Clique nas técnicas. Use a que resolve uma dificuldade concreta, sem transformar todo pedido em uma lista longa de exigências.",
          itens: [
            { sigla: "?", nome: "Perguntar antes", sub: "Esclarecer o que impede a execução.", rotulo: "Esclarecimento", pergunta: "O pedido ainda está incompleto?", cuidado: "Peça uma pergunta por vez e aguarde a resposta.", itens: ["Definir público", "Confirmar restrições", "Evitar preencher lacunas por conta própria"] },
            { sigla: "EX", nome: "Dar exemplos", sub: "Demonstrar o padrão desejado.", rotulo: "Exemplos", pergunta: "O estilo está difícil de explicar?", cuidado: "Exemplo orienta formato, não autoriza copiar fatos para outro caso.", itens: ["Mostrar entrada e saída", "Explicitar o padrão", "Usar exemplos sem dados pessoais"] },
            { sigla: "AC", nome: "Alternativas e critérios", sub: "Comparar caminhos antes de escolher.", rotulo: "Alternativas", pergunta: "Há mais de uma opção defensável?", cuidado: "Inclua verificação crítica; não aceite notas sem evidência.", itens: ["Pedir opções distintas", "Comparar com critérios explícitos", "Pedir autocrítica e marcar incertezas"] },
          ],
        },
        {
          tipo: "prompt", rotulo: "Perguntar antes", titulo: "Peça perguntas antes", tituloEnfase: "perguntas antes",
          texto: "Cole no Gemini e responda às perguntas. Observe se ele espera sua resposta em vez de inventar as condições da promoção.",
          nomePrompt: "Esclarecer uma promoção",
          prompt: `# Perfil
Atue como consultor de vendas para pequenos negócios.
# Contexto
Estes são dados didáticos fictícios. Tenho uma pequena lanchonete e quero fazer uma promoção para aumentar as vendas no fim da tarde. Ainda não defini público, duração, desconto nem orçamento. Não há dados pessoais.
# Objetivo
Antes de sugerir a programação, faça até três perguntas essenciais, uma por vez, esperando minha resposta. Comece pelo resultado que quero alcançar com a promoção. Use as respostas para escolher as perguntas seguintes.
# Modelo de Entrega
Após a entrevista, entregue uma proposta de até cinco tópicos com objetivo, oferta, divulgação e o que preciso preparar. Marque o que não foi definido como “a confirmar”. Não invente custos, margens, estoque ou preços. Termine indicando o que preciso conferir antes de divulgar.`,
          observe: ["Pergunta pelo resultado desejado antes de sugerir a promoção", "Aguarda minha resposta", "Restrições ausentes continuam marcadas"],
        },
        {
          tipo: "prompt", rotulo: "Dar exemplos", titulo: "Mostre o padrão desejado", tituloEnfase: "o padrão desejado",
          texto: "Teste em outro chat. Compare a saída com o exemplo: o formato pode ser reaproveitado, mas as informações não podem ser transferidas.",
          nomePrompt: "Exemplo para orientar o registro",
          prompt: `# Perfil
Atue como redator de anotações curtas sobre o meu negócio, com linguagem clara.
# Contexto
Estes são dados didáticos fictícios e não contêm dados pessoais.
Exemplo de entrada: minha loja de moda mistura receitas da loja e despesas pessoais.
Exemplo de saída: Situação: mistura de finanças. Próximo passo sugerido: separar registros pessoais e do negócio. A confirmar: forma atual de controle.
Nova entrada: minha loja de artesanato registra vendas em caderno, mas não soma as despesas com embalagem.
# Objetivo
Reescreva apenas a nova entrada seguindo o padrão do exemplo. Use o exemplo como referência de estrutura, não como fonte de fatos do novo caso.
# Modelo de Entrega
Entregue três campos: Situação, Próximo passo sugerido e A confirmar. Não invente valores, causas ou ações já executadas. Identifique recomendações como sugestões e mantenha o registro em até 80 palavras para revisão humana.`,
          observe: ["Mantém os três campos", "Não atribui mistura de finanças ao novo caso", "Não inventa custo de embalagem"],
        },
        {
          tipo: "prompt", rotulo: "Alternativas", titulo: "Compare e peça verificação", tituloEnfase: "peça verificação",
          texto: "Envie o pedido e confira os limites da recomendação. A autocrítica ajuda a revisar, mas não substitui sua checagem dos fatos.",
          nomePrompt: "Alternativas com critérios e autocrítica",
          prompt: `# Perfil
Atue como facilitador de decisões para pequenos negócios.
# Contexto
Estes são dados didáticos fictícios. Um grupo de artesanato em São Luís quer divulgar uma feira em duas semanas. Dispõe de um catálogo digital e pode preparar três publicações. Não informou orçamento, tamanho do público nem histórico de resultados.
# Objetivo
Proponha três formas distintas de divulgação. Compare esforço de execução, dependência de orçamento e possibilidade de medir interesse. Recomende uma opção provisória, explicando quais informações podem mudar a escolha.
# Modelo de Entrega
Entregue uma tabela de alternativas, vantagens, limites e critérios. Depois revise sua recomendação: aponte uma fragilidade, uma suposição e como verificá-las. Não invente alcance, custo ou conversões. Não peça contatos pessoais. Termine com duas perguntas para validar a decisão antes de agir.`,
          observe: ["As opções diferem de fato", "Critérios estão explícitos e não viram números inventados", "A revisão identifica suposição e forma de verificá-la"],
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Adapte uma técnica ao seu prompt da aula anterior. Compare a nova resposta com a original e guarde só o que ajudou.",
          esperado: ["Uma técnica escolhida por uma necessidade real e testada no Gemini."],
          confira: ["Testei perguntas, exemplos e alternativas com critérios", "Conferi a resposta e marquei suposições ou dados inventados", "Adaptei uma técnica sem incluir dados pessoais"],
        },
      ],
    },
    {
      n: "2.4", titulo: "Skills: transformar prompts em atalhos", curto: "Skills", ferramenta: "Gemini · Skills",
      objetivo: "Transformar um prompt validado em instruções reutilizáveis e testar seu acionamento.",
      voceSaiCom: "Uma skill de resposta a clientes no WhatsApp, revisada e testada em outro caso.",
      saibaMais: "Skills guardam instruções reutilizáveis e podem ser acionadas quando um pedido combina. A migração dos Gems não dispensa revisar instruções, limites e resultados.",
      fontes: [
        { nome: "Ajuda do Gemini", url: "https://support.google.com/gemini" },
        { nome: "Notas de versão do Gemini", url: "https://gemini.google/release-notes/" },
      ],
      passos: [
        {
          tipo: "tela", tela: "skills", rotulo: "Skills", titulo: "Encontre suas skills", tituloEnfase: "suas skills",
          texto: "Clique em Skills e localize Criar skill. Observe onde a skill ativada aparece no chat; a disponibilidade pode variar por conta.",
        },
        {
          tipo: "mapa", rotulo: "Do prompt à skill", titulo: "Reaproveite o que funcionou", tituloEnfase: "o que funcionou",
          texto: "Revele o caminho. Guarde as regras do seu atendimento, não os dados de um cliente específico.",
          fluxo: "ida", rotuloSeta: "REUTILIZAR",
          nos: [
            { id: "prompt", sigla: "1", nome: "Prompt que funcionou", itens: ["Entrega conferida", "Critérios e limites ajustados"] },
            { id: "skill", sigla: "2", nome: "Skill", itens: ["Instruções reutilizáveis", "Descrição de quando usar", "Sem dados pessoais ou fatos do caso"] },
            { id: "uso", sigla: "3", nome: "Uso automático", itens: ["Novo pedido compatível", "Confira a ativação", "Revise a resposta antes de usar"] },
          ],
          quadros: [
            { legenda: "Valide o prompt e corrija os problemas antes de reutilizar.", abertos: ["prompt"], foco: "prompt" },
            { legenda: "Extraia regras estáveis e defina quando a skill deve ser usada.", abertos: ["prompt", "skill"], foco: "skill" },
            { legenda: "Teste outro caso e confira se o acionamento e a resposta são adequados.", abertos: ["prompt", "skill", "uso"], foco: "uso" },
          ],
        },
        {
          tipo: "prompt", rotulo: "Criar skill", titulo: "Transforme conversa em skill", tituloEnfase: "em skill",
          texto: "Use uma conversa com resposta já revisada. Cole o pedido, confira o rascunho e use Criar skill para salvar as instruções validadas.",
          nomePrompt: "Resposta a clientes no WhatsApp",
          prompt: `# Perfil
Atue como organizador de instruções reutilizáveis para uma skill do Gemini.
# Contexto
Quero aproveitar o padrão desta conversa já revisada: [[resuma o pedido e a resposta validada, sem dados pessoais]]. Para o teste, use este cenário: Estes são dados didáticos fictícios. Uma cliente pergunta ao meu salão de beleza se há horário para escova no sábado e quanto custa; não informou o horário que prefere.
# Objetivo
Crie a skill “Resposta a clientes no WhatsApp”. Extraia regras de redação e verificação, sem guardar fatos particulares da conversa. Defina que ela se aplica ao redigir respostas iniciais a clientes no WhatsApp, não a confirmar agendamentos ou executar envios.
# Modelo de Entrega
Entregue nome, descrição de acionamento e instruções prontas para revisar e salvar. Oriente acolher o pedido, resumir a necessidade e perguntar o essencial. Proíba inventar preços, prazos, horários disponíveis ou promoções. Marque lacunas, não solicite dados pessoais e exija revisão humana antes do envio. Inclua um pedido de teste e o comportamento esperado.`,
          recebe: {
            titulo: "Rascunho fictício de skill", texto: "Exemplo do que revisar antes de salvar.",
            secoes: [
              { rotulo: "Nome e acionamento", itens: ["Resposta a clientes no WhatsApp", "Usar ao redigir uma resposta inicial a um cliente"] },
              { rotulo: "Regras estáveis", itens: ["Acolha e resuma sem acrescentar fatos", "Pergunte objetivo e restrições essenciais", "Não prometa preço, prazo ou disponibilidade", "Não envie; entregue rascunho para revisão"] },
              { rotulo: "Teste", itens: ["Pedido fictício: responder a negócio de beleza sobre caixa", "Esperado: acolhimento e perguntas, sem promessa de serviço"] },
            ], aceite: "Salve apenas instruções revisadas e sem dados do caso; teste depois em uma nova conversa.",
          },
          dica: "Depois de salvar, peça em um novo chat uma resposta inicial a outro pedido fictício e confira a indicação de ativação da skill.",
        },
        {
          tipo: "comparacao", rotulo: "Compare", titulo: "Separe regras de dados", tituloEnfase: "regras de dados",
          texto: "Compare o prompt solto com a skill. Reutilizar instruções não autoriza reaproveitar informações de clientes nem enviar sem aprovação.",
          colunas: ["Prompt solto", "Skill"],
          linhas: [
            ["Reúne regras e dados de uma tarefa.", "Guarda regras reutilizáveis; o caso atual vem no pedido."],
            ["Precisa ser colado a cada uso.", "Pode ser acionada quando o novo pedido combina."],
            ["Uma correção pode ficar só naquele chat.", "Revise a instrução salva para melhorar usos seguintes."],
            ["Resposta exige conferência.", "Resposta também exige conferência; automatizar não é aprovar."],
          ], frase: "Se a skill não ativar ou aplicar regras inadequadas, revise sua descrição e teste novamente.",
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Salve a skill revisada e teste outro pedido fictício em um novo chat. Compare com as regras antes de usar em trabalho real.",
          esperado: ["Uma skill reutilizável, sem dados pessoais, com teste de acionamento e resposta."],
          confira: ["Salvei regras gerais sem dados de clientes", "Testei outro caso e conferi se a skill foi ativada", "Revisei lacunas, promessas e dados inventados antes de usar a resposta"],
        },
      ],
    },
  ],
};
