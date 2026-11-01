import type { Modulo } from "./tipos";

export const modulo4: Modulo = {
  id: "modulo-4",
  glifo: "grid",
  nome: "Workspace",
  nomeCompleto: "O Gemini no dia a dia do trabalho",
  aulas: [
    {
      n: "4.1",
      titulo: "Gmail: caixa de entrada sob controle",
      curto: "Gmail",
      ferramenta: "Gemini · Gmail",
      objetivo: "Resumir conversas e revisar respostas antes de enviar.",
      voceSaiCom: "Um resumo com pendências e uma resposta acolhedora revisada.",
      saibaMais:
        "A IA organiza a conversa, mas não confirma compromissos por você. Confira as mensagens originais, preserve dados pessoais e revise cada envio. Os recursos disponíveis dependem da conta.",
      fontes: [{ nome: "Gemini no Gmail", url: "https://workspace.google.com/products/gmail/ai/" }],
      passos: [
        {
          tipo: "tela",
          tela: "gmail",
          rotulo: "Na caixa de entrada",
          titulo: "Encontre o apoio no Gmail",
          tituloEnfase: "no Gmail",
          texto:
            "Abra uma conversa e localize o painel do Gemini. Depois, encontre Escrever com ajuda; a disponibilidade depende da sua conta.",
        },
        {
          tipo: "prompt",
          rotulo: "Resumo e pendências",
          titulo: "Separe decisões de pendências",
          tituloEnfase: "de pendências",
          texto:
            "Cole o pedido no painel da conversa. Para treinar, use uma troca fictícia longa, sem nomes, contatos ou outros dados pessoais.",
          nomePrompt: "Ler a conversa antes de responder",
          prompt: `# Perfil
Atue como apoio ao atendimento de pequenos negócios.
# Contexto
Estes são dados didáticos fictícios. A conversa aberta trata da inscrição de um negócio de alimentação de Caxias em uma oficina. Há mensagens sobre documentos, mudança de horário e confirmação de vaga. Considere somente o conteúdo desta conversa, preparada sem dados pessoais.
# Objetivo
Resuma a sequência dos acontecimentos e separe decisões confirmadas, dúvidas e pendências. Se mensagens se contradisserem, mostre a divergência e indique quais trechos precisam de conferência.
# Modelo de Entrega
Entregue um resumo de até cinco linhas e uma tabela: pendência | responsável informado | prazo informado | mensagem de origem. Use [A CONFIRMAR] quando faltar informação. Não invente nomes, datas ou confirmação de vaga. Termine com três pontos que devo verificar na conversa original antes de responder.`,
          observe: [
            "Cada pendência aponta para uma mensagem da conversa.",
            "Pedidos não aparecem como decisões já confirmadas.",
            "Responsáveis e prazos ausentes estão marcados.",
          ],
          dica: "Volte às mensagens citadas. Um resumo útil não substitui a leitura dos trechos que sustentam uma decisão.",
        },
        {
          tipo: "prompt",
          rotulo: "Escrever com ajuda",
          titulo: "Responda sem prometer demais",
          tituloEnfase: "sem prometer demais",
          texto: "Clique em Responder e abra Escrever com ajuda. Cole o pedido, gere o rascunho e revise antes de inserir ou enviar.",
          nomePrompt: "Acolher uma reclamação",
          prompt: `# Perfil
Atue como assistente de redação de atendimento do Sebrae Maranhão.
# Contexto
Estes são dados didáticos fictícios. Um empresário de Caxias escreveu: “Enviei os documentos e ainda não recebi confirmação. Assim fica difícil organizar minha participação”. O recebimento foi registrado, mas a vaga ainda está em análise. Não há prazo de retorno autorizado. Não use dados pessoais.
# Objetivo
Escreva uma resposta respeitosa que reconheça a dificuldade, informe apenas o que está confirmado e proponha verificar a situação com a equipe responsável. Não culpe o empresário nem prometa vaga, desconto ou prazo.
# Modelo de Entrega
Produza um rascunho de até 120 palavras, com saudação, acolhimento, situação atual e próximo passo. Se precisar de informação ausente, use [A CONFIRMAR]. Não apresente uma verificação futura como já realizada. Deixe o texto pronto para revisão humana, sem enviar a mensagem.`,
          observe: [
            "A resposta reconhece o impacto da espera.",
            "A vaga continua descrita como não confirmada.",
            "Nenhum prazo ou benefício foi inventado.",
          ],
        },
        {
          tipo: "comparacao",
          rotulo: "Antes de enviar",
          titulo: "Compare antes de enviar",
          tituloEnfase: "antes de enviar",
          texto: "Leia as duas versões fictícias. Escolha a que acolhe o empresário e mantém os limites do que você sabe.",
          colunas: ["Resposta apressada", "Resposta revisada"],
          linhas: [
            ["Sua vaga está garantida.", "O recebimento dos documentos foi registrado; a vaga segue em análise."],
            ["Amanhã estará tudo resolvido.", "Vou verificar a situação com a equipe responsável."],
            ["Você precisa aguardar.", "Entendo que a falta de confirmação dificulta sua organização."],
          ],
          frase: "Revise fatos, tom e compromissos: um texto educado também pode conter uma promessa indevida.",
        },
        {
          tipo: "resultado",
          rotulo: "Faça na sua conta",
          titulo: "Agora faça na sua conta",
          tituloEnfase: "na sua conta",
          texto: "Repita com uma conversa fictícia ou autorizada. Remova dados pessoais e mantenha o envio sob seu controle.",
          esperado: ["Um resumo rastreável e um rascunho de resposta sem compromissos inventados."],
          confira: [
            "Conferi decisões e pendências nas mensagens originais",
            "Revisei o tom e retirei promessas sem autorização",
            "Verifiquei dados pessoais e revisei antes de enviar",
          ],
          visual: { tipo: "tela", tela: "gmail", legenda: "Gemini no Gmail" },
        },
      ],
    },
    {
      n: "4.2",
      titulo: "Docs e Apresentações: do rascunho ao slide",
      curto: "Docs e Slides",
      ferramenta: "Gemini · Docs e Apresentações",
      objetivo: "Criar um relatório fundamentado em arquivos e transformá-lo em uma apresentação.",
      voceSaiCom: "Um relatório com fontes e uma estrutura de slides para revisar.",
      saibaMais:
        "Defina qual decisão o relatório precisa apoiar antes de pedir um documento. Uma apresentação deve destacar evidências e próximos passos, não apenas repartir parágrafos em slides.",
      fontes: [
        { nome: "Gemini no Docs", url: "https://workspace.google.com/products/docs/ai/" },
        { nome: "Gemini nas Apresentações", url: "https://workspace.google.com/products/slides/ai/" },
      ],
      passos: [
        {
          tipo: "tela",
          tela: "docs",
          rotulo: "No documento",
          titulo: "Comece pelas fontes no Docs",
          tituloEnfase: "no Docs",
          texto: "Abra um documento e localize o painel do Gemini. Use @ para selecionar arquivos do Drive aos quais você tenha acesso autorizado.",
        },
        {
          tipo: "anatomia",
          rotulo: "Pedido em blocos",
          titulo: "Monte um relatório com evidências",
          tituloEnfase: "com evidências",
          texto: "Leia os blocos na ordem e reúna-os no painel do Docs. Troque as referências pelos arquivos fictícios selecionados com @.",
          nomePrompt: "Relatório de uma ação",
          intro: {
            titulo: "Primeiro, a decisão",
            texto: "O relatório deve ajudar a decidir se uma oficina precisa de ajustes antes de uma nova edição.",
          },
          blocos: [
            {
              titulo: "Perfil",
              pergunta: "Qual apoio você espera?",
              texto: "Atue como apoio à elaboração de relatórios de ações para pequenos negócios do Maranhão.",
            },
            {
              titulo: "Contexto",
              pergunta: "Quais fontes sustentam o trabalho?",
              ipo: "I",
              texto:
                "Estes são dados didáticos fictícios. Use somente @[[Plano da oficina de moda em Imperatriz]] e @[[Balanço agregado da oficina]]. Os arquivos não contêm dados pessoais. O público é a equipe que decidirá sobre uma nova edição.",
              nota: "Selecione os arquivos no menu de @; apenas digitar o nome não garante que eles foram anexados.",
            },
            {
              titulo: "Objetivo",
              pergunta: "Que decisão o relatório deve apoiar?",
              ipo: "PO",
              texto:
                "Produza um relatório da ação que compare o planejado com o realizado e indique ajustes possíveis. Não invente resultados nem atribua causas sem evidência. Marque lacunas como [A CONFIRMAR].",
            },
            {
              titulo: "Modelo de Entrega",
              pergunta: "Como você vai conferir?",
              texto:
                "Organize em objetivo, execução, resultados, limitações e próximos passos. Identifique o arquivo e o trecho que sustentam cada resultado. Separe fatos de recomendações e destaque divergências entre as fontes.",
            },
          ],
          fecho: {
            titulo: "Confira antes de aproveitar",
            texto: "Abra os arquivos citados, confira números e mantenha no relatório somente conclusões sustentadas pelas fontes.",
          },
        },
        {
          tipo: "prompt",
          rotulo: "Do texto ao slide",
          titulo: "Transforme o relatório em slides",
          tituloEnfase: "em slides",
          texto: "Salve o relatório revisado no Drive. Nas Apresentações, abra o Gemini e selecione esse documento com @ para pedir a estrutura.",
          nomePrompt: "Uma apresentação para decidir",
          prompt: `# Perfil
Atue como apoio à criação de apresentações de trabalho.
# Contexto
Estes são dados didáticos fictícios. Use somente @[[Relatório revisado da oficina de moda em Imperatriz]], sem dados pessoais. A apresentação será usada em uma reunião de dez minutos para decidir quais ajustes fazer antes da próxima edição.
# Objetivo
Transforme o relatório em uma estrutura de cinco slides. Preserve os números e as limitações da fonte. Não acrescente estatísticas, depoimentos, imagens de participantes ou resultados não documentados.
# Modelo de Entrega
Para cada slide, entregue título, mensagem principal, até três tópicos e uma nota de fala curta. Organize em contexto, execução, resultados, limitações e decisão solicitada. Indique o trecho do relatório que sustenta cada resultado. Diferencie recomendação de fato e use [A CONFIRMAR] nas lacunas. Sugira gráficos apenas quando houver dados suficientes, sem criar valores. Não declare a nova edição aprovada.`,
          recebe: {
            titulo: "Estrutura dos slides",
            texto: "Exemplo ilustrativo, não um resultado validado.",
            secoes: [
              { rotulo: "1 · Contexto", itens: ["Objetivo da oficina e decisão a apoiar"] },
              { rotulo: "2 · Execução", itens: ["Planejado e realizado conforme o relatório"] },
              { rotulo: "3 · Resultados", itens: ["Evidências com indicação do trecho de origem"] },
              { rotulo: "4 · Limitações", itens: ["Lacunas e limites das conclusões"] },
              { rotulo: "5 · Decisão", itens: ["Ajustes propostos para avaliação da equipe"] },
            ],
            aceite: "Confira cada dado no relatório e revise a legibilidade antes de apresentar.",
          },
        },
        {
          tipo: "resultado",
          rotulo: "Faça na sua conta",
          titulo: "Agora faça na sua conta",
          tituloEnfase: "na sua conta",
          texto: "Crie um relatório curto com fontes autorizadas e transforme a versão revisada em uma apresentação para decisão.",
          esperado: ["Um relatório fundamentado e cinco slides que distinguem evidências de propostas."],
          confira: [
            "Selecionei os arquivos corretos com @ e protegi dados pessoais",
            "Conferi números, fontes e lacunas no relatório",
            "Revisei os slides sem transformar sugestões em decisões",
          ],
          visual: { tipo: "tela", tela: "docs", legenda: "Gemini no Docs" },
        },
      ],
    },
    {
      n: "4.3",
      titulo: "Meet e Drive: reuniões que viram ação",
      curto: "Meet e Drive",
      ferramenta: "Gemini · Meet e Drive",
      objetivo: "Organizar anotações em uma ata verificável e acompanhar mudanças nos arquivos.",
      voceSaiCom: "Uma minuta de ata com tarefas e um resumo de alterações com limites explícitos.",
      saibaMais:
        "Quando disponível na sua conta, Faça anotações para mim ajuda a registrar reuniões no Meet. Informe os participantes e siga as regras da organização. Anotações automáticas não substituem a validação da ata.",
      fontes: [
        { nome: "Gemini no Meet", url: "https://workspace.google.com/products/meet/ai/" },
        { nome: "Gemini no Drive", url: "https://workspace.google.com/products/drive/ai/" },
      ],
      passos: [
        {
          tipo: "mapa",
          rotulo: "Da fala à tarefa",
          titulo: "Veja o caminho até a ação",
          tituloEnfase: "até a ação",
          texto: "Revele o fluxo e confira cada passagem. Só transforme uma fala em compromisso quando houver confirmação.",
          fluxo: "ida",
          rotuloSeta: "Conferir",
          nos: [
            { id: "reuniao", sigla: "1", nome: "Reunião", itens: ["Informe sobre o registro e siga as regras internas"] },
            { id: "anotacoes", sigla: "2", nome: "Anotações", itens: ["Confira o registro do Meet e retire dados pessoais"] },
            { id: "ata", sigla: "3", nome: "Ata", itens: ["Separe decisões, propostas e pontos em aberto"] },
            { id: "tarefas", sigla: "4", nome: "Tarefas", itens: ["Confirme responsáveis e prazos antes de distribuir"] },
          ],
          quadros: [
            { legenda: "Comece com um registro autorizado.", abertos: ["reuniao"], foco: "reuniao" },
            { legenda: "Confira as anotações antes de resumir.", abertos: ["reuniao", "anotacoes"], foco: "anotacoes" },
            { legenda: "Produza uma minuta, não uma aprovação automática.", abertos: ["reuniao", "anotacoes", "ata"], foco: "ata" },
            { legenda: "Valide os compromissos com a equipe.", abertos: ["reuniao", "anotacoes", "ata", "tarefas"], foco: "tarefas" },
          ],
        },
        {
          tipo: "prompt",
          rotulo: "Minuta da ata",
          titulo: "Organize decisões e responsáveis",
          tituloEnfase: "e responsáveis",
          texto: "Abra as anotações do Meet no Docs e use o painel do Gemini. No treino, cole apenas o exemplo fictício do pedido.",
          nomePrompt: "Das anotações à minuta",
          prompt: `# Perfil
Atue como apoio à documentação de reuniões.
# Contexto
Estes são dados didáticos fictícios, sem dados pessoais. Anotações de uma reunião sobre uma oficina em Bacabal: a equipe aprovou revisar o material; a área de conteúdo assumiu essa revisão, sem prazo definido; foi sugerida uma nova data para o evento, mas não houve decisão; a área de atendimento enviará o convite depois da validação do material.
# Objetivo
Transforme as anotações em uma minuta de ata fiel ao registro. Separe decisões tomadas, sugestões e dúvidas. Não transforme a data sugerida em data aprovada nem suponha quem validará o material.
# Modelo de Entrega
Entregue síntese, decisões e tabela de tarefas com ação | responsável | prazo | dependência. Marque qualquer lacuna com [A CONFIRMAR]. Finalize com perguntas para validar a minuta com os participantes. Não invente nomes, datas ou compromissos e não distribua tarefas automaticamente.`,
          observe: [
            "A nova data aparece como sugestão, não como decisão.",
            "O prazo da revisão está como [A CONFIRMAR].",
            "O convite depende da validação do material.",
          ],
        },
        {
          tipo: "prompt",
          rotulo: "Mudanças no Drive",
          titulo: "Confira o que mudou no Drive",
          tituloEnfase: "no Drive",
          texto: "Abra a pasta de treino e peça o resumo no painel do Gemini. Para comparar, selecione também as versões anteriores disponíveis.",
          nomePrompt: "Mudanças com evidências",
          prompt: `# Perfil
Atue como apoio à organização de documentos de uma ação.
# Contexto
Estes são dados didáticos fictícios. Analise a pasta [[Oficina Bacabal — treino]], com arquivos sem dados pessoais, e os registros de comparação disponíveis: @[[Plano anterior]] e @[[Plano atual]]. O período de interesse é [[período da revisão]].
# Objetivo
Resuma mudanças comprováveis no escopo, no cronograma e nas tarefas. Use somente arquivos e versões a que você tenha acesso. Se não houver histórico ou referência anterior suficiente, explique que não é possível determinar o que mudou; não trate o estado atual como uma alteração comprovada.
# Modelo de Entrega
Entregue uma tabela: arquivo | mudança identificada | evidência anterior e atual | impacto possível | ponto a conferir. Diferencie alteração comprovada de hipótese. Marque lacunas com [A CONFIRMAR] e indique quais arquivos preciso abrir para conferir. Não atribua autoria ou aprovação sem evidência.`,
          dica: "Um resumo de pasta não garante acesso ao histórico completo. Abra as versões relevantes e confirme as diferenças.",
        },
        {
          tipo: "resultado",
          rotulo: "Faça na sua conta",
          titulo: "Agora faça na sua conta",
          tituloEnfase: "na sua conta",
          texto: "Use anotações fictícias ou autorizadas e compare dois documentos. Valide a minuta antes de compartilhar compromissos.",
          esperado: ["Uma minuta verificável e um resumo que distingue mudanças comprovadas de lacunas."],
          confira: [
            "Retirei dados pessoais e conferi a minuta com o registro",
            "Confirmei responsáveis e prazos ou marquei [A CONFIRMAR]",
            "Comparei as versões citadas antes de aceitar as mudanças",
          ],
          visual: {
            tipo: "lista",
            legenda: "Da reunião à ação",
            itens: ["Reunião registrada com aviso", "Anotações conferidas", "Minuta de ata validada", "Tarefas com responsável e prazo"],
          },
        },
      ],
    },
    {
      n: "4.4",
      titulo: "Onde a IA ajuda no seu trabalho",
      curto: "Diagnóstico",
      ferramenta: "Gemini · Chat e Workspace",
      objetivo: "Escolher uma rotina útil para testar IA com critérios de qualidade e segurança.",
      voceSaiCom: "Um plano pessoal de 30 dias com teste pequeno, revisão e medida de resultado.",
      saibaMais:
        "Nota baixa indica uma dificuldade percebida, não uma obrigação de automatizar. Primeiro defina o resultado necessário, examine etapas dispensáveis e escolha um teste reversível. A decisão continua humana.",
      fontes: [
        { nome: "Gemini no Workspace", url: "https://workspace.google.com/solutions/ai/" },
        { nome: "Central de Ajuda do Gemini", url: "https://support.google.com/gemini" },
      ],
      passos: [
        {
          tipo: "avaliacao",
          rotulo: "Suas cinco rotinas",
          titulo: "Qual rotina te trava hoje?",
          tituloEnfase: "te trava hoje?",
          texto: "Dê uma nota de 1 a 5 para cada rotina. As notas ficam só no navegador.",
          min: "1 · Trava muito",
          max: "5 · Funciona bem",
          itens: [
            {
              nome: "E-mails e mensagens",
              sub: "Compreender pedidos e responder com clareza",
              sugestao: "Comece pela aula 4.1: resumo de conversas e revisão de respostas no Gmail.",
            },
            {
              nome: "Reuniões",
              sub: "Registrar decisões e acompanhar compromissos",
              sugestao: "Comece pela aula 4.3: anotações do Meet e minuta de ata com validação.",
            },
            {
              nome: "Relatórios e documentos",
              sub: "Transformar fontes em textos úteis para decidir",
              sugestao: "Comece pela aula 4.2: relatório no Docs e estrutura de slides.",
            },
            {
              nome: "Dados e planilhas",
              sub: "Conferir informações e explicar resultados",
              sugestao: "Comece pela aula 3.4: Gemini nas Planilhas com dados fictícios, conferindo fórmulas e totais.",
            },
            {
              nome: "Pesquisa e preparação",
              sub: "Reunir fontes e preparar um atendimento",
              sugestao: "Comece pela aula 3.1: Deep Research, conferindo fontes, datas e adequação ao caso.",
            },
          ],
        },
        {
          tipo: "comparacao",
          rotulo: "Limites da delegação",
          titulo: "Escolha o que vale delegar",
          tituloEnfase: "vale delegar",
          texto:
            "Compare os pares e escolha uma tarefa pequena. Não acelere uma etapa inútil nem delegue decisões que exigem responsabilidade humana.",
          colunas: ["Não delegue à IA", "Vale pedir como apoio"],
          linhas: [
            ["Enviar uma promessa ao empresário sem revisão.", "Rascunhar uma resposta com fatos confirmados."],
            ["Inventar um responsável ou aprovar um prazo.", "Organizar decisões registradas em reunião."],
            ["Concluir causa sem evidência ou expor dados pessoais.", "Comparar dados agregados de uma ação."],
            ["Remover controles obrigatórios sem autorização.", "Sugerir como eliminar uma etapa duplicada."],
          ],
          frase: "Escolha pelo resultado necessário, pela possibilidade de conferir e pelo risco — não só pela velocidade.",
        },
        {
          tipo: "prompt",
          rotulo: "Plano de 30 dias",
          titulo: "Planeje um teste de 30 dias",
          tituloEnfase: "de 30 dias",
          texto: "Anote suas cinco notas e substitua os campos. Cole no Gemini sem dados pessoais e escolha apenas uma rotina para começar.",
          nomePrompt: "Meu plano pessoal de uso",
          prompt: `# Perfil
Atue como facilitador de melhoria de rotinas de trabalho.
# Contexto
Estes são dados didáticos fictícios para um exercício; adapte o plano às notas informadas, sem dados pessoais. Notas de 1 a 5, em que 1 significa muita dificuldade e 5 significa rotina sob controle: e-mails [[nota]]; reuniões [[nota]]; relatórios [[nota]]; dados [[nota]]; pesquisa [[nota]]. Minha rotina prioritária é [[rotina]] e disponho de [[minutos por semana]].
# Objetivo
Monte um plano de 30 dias. Antes de sugerir IA, explicite o resultado necessário, questione etapas dispensáveis e compare manter, simplificar ou apoiar a tarefa com IA. Não suponha que a menor nota exige automação.
# Modelo de Entrega
Organize quatro semanas: observar o processo; testar com dados fictícios; revisar resultados; decidir se continuo. Para cada semana, indique tarefa, ferramenta, entrega, tempo estimado e revisão humana. Proponha medir tempo incluindo conferência e quantidade de correções, sem inventar ganhos. Defina critério de interrupção se houver erro crítico ou risco de privacidade. Marque lacunas como [A CONFIRMAR].`,
          observe: [
            "O plano começa por um resultado, não pela ferramenta.",
            "O teste cabe no tempo disponível e inclui revisão.",
            "Há critérios para continuar, ajustar ou interromper.",
          ],
          dica: "Meça a rotina antes do teste. Economizar tempo só conta se a qualidade e a segurança forem preservadas.",
        },
        {
          tipo: "resultado",
          rotulo: "Faça na sua conta",
          titulo: "Agora faça na sua conta",
          tituloEnfase: "na sua conta",
          texto: "Escolha uma rotina e agende o primeiro teste. Compare o resultado com a forma atual antes de ampliar o uso.",
          esperado: ["Um plano de 30 dias com tarefa prioritária, medida inicial e pontos de revisão."],
          confira: [
            "Registrei as cinco notas e justifiquei a prioridade escolhida",
            "Defini um teste sem dados pessoais e com revisão humana",
            "Agendei a comparação de tempo, correções e riscos",
          ],
          visual: {
            tipo: "lista",
            legenda: "Seu plano em 4 semanas",
            itens: ["Semana 1 · Observar o processo", "Semana 2 · Testar com dados fictícios", "Semana 3 · Revisar resultados", "Semana 4 · Decidir se continua"],
          },
        },
      ],
    },
  ],
};
