import type { Modulo } from "./tipos";

export const modulo5: Modulo = {
  id: "modulo-5", glifo: "bot", nome: "Agentes", nomeCompleto: "Agentes e automação com Gemini",
  aulas: [
    {
      n: "5.1", titulo: "Do assistente ao agente", curto: "Agentes", ferramenta: "Gemini · Agentes",
      objetivo: "Distinguir uma resposta de uma execução e definir os limites de uma delegação.",
      voceSaiCom: "Um primeiro briefing com objetivo, insumos, limites e entrega verificável.",
      saibaMais: "Instruções orientam o trabalho; fontes fornecem evidências; skills reutilizam procedimentos. Nenhum desses elementos, sozinho, concede acesso a ferramentas ou autorização para agir.",
      fontes: [{ nome: "Ajuda do Gemini", url: "https://support.google.com/gemini" }],
      passos: [
        {
          tipo: "comparacao", rotulo: "Resposta ou ação", titulo: "Diferencie responder de executar", tituloEnfase: "de executar",
          texto: "Compare os pedidos. Delegar uma sequência exige definir onde o agente deve parar.",
          colunas: ["Assistente responde", "Agente executa"],
          linhas: [
            ["Sugere uma pauta de atendimento.", "Planeja etapas e usa ferramentas disponíveis para preparar a pauta."],
            ["Explica como montar um relatório.", "Consulta fontes autorizadas e prepara um rascunho verificável."],
            ["Você conduz cada próximo passo.", "Você define o escopo e aprova ações sensíveis antes da execução."],
          ],
        },
        {
          tipo: "mapa", rotulo: "Fluxo", titulo: "Revele o caminho da delegação", tituloEnfase: "da delegação", fluxo: "ida",
          texto: "Revele as etapas. A aprovação vem antes de qualquer envio, compra ou alteração sensível.",
          nos: [
            { id: "objetivo", sigla: "O", nome: "Objetivo", itens: ["Preparar um relatório mensal"] },
            { id: "plano", sigla: "P", nome: "Plano", itens: ["Conferir fontes e calcular totais"] },
            { id: "ferramentas", sigla: "F", nome: "Ferramentas", itens: ["Usar somente recursos autorizados"] },
            { id: "aprovacao", sigla: "A", nome: "Aprovação", itens: ["Parar antes de compartilhar"] },
            { id: "entrega", sigla: "E", nome: "Entrega", itens: ["Rascunho com fontes e pendências"] },
          ],
          quadros: [
            { legenda: "Defina o resultado antes dos recursos.", abertos: ["objetivo"], foco: "objetivo" },
            { legenda: "Confira o plano e as permissões necessárias.", abertos: ["objetivo", "plano", "ferramentas"], foco: "ferramentas" },
            { legenda: "Aprovar não substitui conferir a entrega.", abertos: ["objetivo", "plano", "ferramentas", "aprovacao", "entrega"], foco: "aprovacao" },
          ],
        },
        {
          tipo: "catalogo", rotulo: "Quatro elementos", titulo: "Monte um briefing verificável", tituloEnfase: "um briefing verificável",
          texto: "Clique nos quatro elementos. Substitua pedidos vagos por critérios que você consiga conferir.",
          itens: [
            { sigla: "O", nome: "Objetivo", sub: "Resultado e público", rotulo: "Para quê", pergunta: "Que trabalho deve ficar pronto?", cuidado: "Não confunda atividade com resultado.", itens: ["Preparar relatório para a coordenação", "Definir mês e unidade"] },
            { sigla: "I", nome: "Insumos", sub: "Fontes e versões", rotulo: "Com o quê", pergunta: "Quais evidências podem ser consultadas?", cuidado: "Citar um arquivo não concede acesso a ele.", itens: ["Anexar dados agregados fictícios", "Identificar versão e período de cada fonte"] },
            { sigla: "L", nome: "Limites", sub: "Permissões e paradas", rotulo: "Até onde", pergunta: "O que depende de aprovação?", cuidado: "Não cole dados pessoais: siga a LGPD.", itens: ["Não enviar nem alterar registros", "Marcar lacunas e pedir esclarecimento"] },
            { sigla: "E", nome: "Entrega", sub: "Formato e aceite", rotulo: "Como conferir", pergunta: "Como reconhecer uma entrega correta?", cuidado: "Confira cálculos e referências antes de usar.", itens: ["Tabela com totais e fontes", "Pendências separadas das conclusões"] },
          ],
        },
        {
          tipo: "prompt", rotulo: "Teste o briefing", titulo: "Experimente uma delegação pequena", tituloEnfase: "uma delegação pequena", nomePrompt: "Planejar antes de agir",
          texto: "Cole o pedido e confira se o Gemini respeita a fronteira entre planejar e executar.",
          prompt: `# Objetivo
Prepare o plano de um relatório mensal de atendimentos para a coordenação de [[unidade de Caxias]]. Estes são dados didáticos fictícios.
# Insumos
Considere apenas estes totais: alimentação, 24 atendimentos; beleza, 16. Não há metas nem dados de meses anteriores disponíveis.
# Limites
Não consulte sistemas, não envie mensagens e não altere arquivos. Não peça dados pessoais. Não invente metas ou tendências; marque as lacunas. Antes de qualquer ação externa, peça minha aprovação explícita.
# Entrega
Apresente o plano em três etapas, os recursos necessários e uma tabela preliminar com setor e quantidade. Confira a soma e indique o que falta para comparar o resultado com uma meta. Aguarde minha revisão antes de prosseguir.`,
          observe: ["O total é 40, sem comparação inventada com metas.", "O plano diferencia recursos necessários de recursos já disponíveis.", "Não há alegação de envio ou acesso a sistemas."],
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Teste uma delegação pequena e revise a entrega antes de ampliar as permissões.",
          esperado: ["Um briefing testado, sem autorizar ações externas."],
          confira: ["Defini objetivo, insumos, limites e entrega", "Conferi o total e as lacunas sem usar dados pessoais", "Confirmei que nenhuma ação externa foi executada"],
          visual: { tipo: "lista", legenda: "Seu contrato de delegação", itens: ["Objetivo definido", "Fontes identificadas", "Aprovação antes de agir", "Entrega conferida"] },
        },
      ],
    },
    {
      n: "5.2", titulo: "Ações programadas: a rotina que roda sozinha", curto: "Ações programadas", ferramenta: "Gemini · Ações programadas",
      objetivo: "Programar rotinas recorrentes e conferir horário, escopo e próxima execução.",
      voceSaiCom: "Dois pedidos de rotina: resumo semanal e lembrete mensal de metas.",
      fontes: [{ nome: "Ajuda do Gemini", url: "https://support.google.com/gemini" }],
      passos: [
        {
          tipo: "tela", tela: "agendadas", rotulo: "Onde conferir", titulo: "Confira as ações programadas", tituloEnfase: "as ações programadas",
          texto: "Veja a recorrência e a próxima execução. A disponibilidade depende da conta; confira o agendamento confirmado, não apenas a resposta do chat.",
        },
        {
          tipo: "prompt", rotulo: "Toda segunda", titulo: "Programe o resumo semanal", tituloEnfase: "o resumo semanal", nomePrompt: "Segunda às 8h",
          texto: "Cole o pedido. Confira o fuso e a próxima segunda antes de considerar a rotina criada.",
          prompt: `# Perfil
Atue como apoio à organização de uma unidade do Sebrae Maranhão.
# Contexto
Estes são dados didáticos fictícios. A unidade de Imperatriz acompanha alimentação e moda. A base de treino desta semana registra 12 atendimentos em alimentação e 8 em moda, sem nomes ou contatos.
# Objetivo
Programe um resumo toda segunda-feira às 8h, no fuso America/Fortaleza. Use apenas informações autorizadas e disponíveis na execução. Se só houver esta base de treino, identifique-a como estática e não a apresente como resultado de uma nova semana.
# Modelo de Entrega
Entregue até cinco tópicos: período, totais, destaques, lacunas e próximos passos sugeridos. Não invente dados nem envie o resumo a terceiros. Peça revisão humana. Confirme recorrência, fuso e próxima execução; se não puder agendar, informe a limitação sem simular sucesso.`,
          observe: ["A próxima execução corresponde a segunda, 8h, no fuso solicitado.", "A rotina não promete acessar dados que não foram autorizados.", "A base estática não vira uma atualização fictícia."],
        },
        {
          tipo: "prompt", rotulo: "Todo mês", titulo: "Lembre de revisar as metas", tituloEnfase: "as metas", nomePrompt: "Revisão mensal da unidade",
          texto: "Cole o lembrete e ajuste o dia. Agendar uma revisão não autoriza mudar metas ou enviar cobranças.",
          prompt: `# Perfil
Ajude a organizar a revisão de metas de uma unidade.
# Contexto
Estes são dados didáticos fictícios. A unidade de Bacabal tem uma meta de treino de 100 atendimentos mensais. Não há realizado atualizado informado. Não use nomes, contatos ou outros dados pessoais.
# Objetivo
Crie um lembrete recorrente no dia [[5]] de cada mês às [[9h]], no fuso America/Fortaleza, para revisar as metas do mês anterior. Não trate a meta de treino como uma meta oficial.
# Modelo de Entrega
No lembrete, peça para conferir a fonte vigente da meta, obter o realizado agregado e revisar a diferença antes de decidir encaminhamentos. Não invente resultados, não altere metas e não envie cobranças. Confirme a próxima execução e a recorrência. Se a conta não permitir programar, explique a limitação e entregue somente o texto do lembrete.`,
          dica: "Confira a primeira execução e revise ou desative a rotina quando ela deixar de fazer sentido.",
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Confira as duas rotinas na lista. Se a função não estiver disponível, guarde os pedidos sem registrar o agendamento como concluído.",
          esperado: ["Duas rotinas conferidas ou uma limitação de disponibilidade claramente registrada."],
          confira: ["Conferi recorrência, fuso e próxima execução", "Limitei as fontes e evitei dados pessoais", "Revisei a primeira entrega sem aceitar números inventados"],
          visual: { tipo: "tela", tela: "agendadas", legenda: "Recorrência e próxima execução" },
        },
      ],
    },
    {
      n: "5.3", titulo: "Gemini no Chrome: pesquisar e comparar páginas", curto: "Chrome", ferramenta: "Gemini · Chrome",
      objetivo: "Comparar páginas abertas com fontes verificáveis e limites para a navegação autônoma.",
      voceSaiCom: "Uma tabela de editais ou crédito com referências, lacunas e decisões reservadas à pessoa.",
      saibaMais: "O painel pode considerar a página e várias abas autorizadas. O auto browse está em prévia nos EUA para Pro e Ultra; não confunda comparar conteúdo com ter permissão para enviar formulários.",
      fontes: [{ nome: "Gemini no Chrome", url: "https://gemini.google/overview/gemini-in-chrome/" }],
      passos: [
        {
          tipo: "tela", tela: "chrome", rotulo: "Painel lateral", titulo: "Abra as páginas para comparar", tituloEnfase: "para comparar",
          texto: "Abra duas páginas oficiais e o painel do Gemini. Confira quais abas estão no contexto; não inclua páginas com dados pessoais.",
        },
        {
          tipo: "prompt", rotulo: "Compare as abas", titulo: "Peça uma tabela com evidências", tituloEnfase: "com evidências", nomePrompt: "Editais e crédito lado a lado",
          texto: "Use abas oficiais autorizadas. A situação do exercício é fictícia; as condições de cada página precisam ser conferidas.",
          prompt: `# Perfil
Atue como apoio à pesquisa para atendimento de pequenos negócios.
# Contexto
Estes são dados didáticos fictícios: uma pequena empresa de alimentação de São Luís busca recursos para equipamentos. Não há cadastro ou documentos pessoais neste exercício. Compare os editais ou linhas de crédito nas abas oficiais que autorizei.
# Objetivo
Identifique opções potencialmente pertinentes, sem recomendar contratação nem garantir elegibilidade. Diferencie página aberta no navegador de inscrição efetivamente aberta. Confira o prazo informado e sinalize quando a vigência não puder ser determinada.
# Modelo de Entrega
Monte uma tabela com opção, público, finalidade, valor ou faixa, juros e custos quando aplicáveis, prazo, requisitos, URL e trecho de apoio. Marque informação ausente como “não localizado”; não invente condições. Separe dúvidas para confirmar na instituição. Não faça login, não preencha formulários, não envie inscrições nem contrate nada. Termine com três verificações para revisão humana.`,
          observe: ["Cada condição relevante tem uma referência que você consegue abrir.", "Prazo não localizado não vira inscrição aberta.", "Não houve envio, contratação ou promessa de aprovação."],
        },
        {
          tipo: "comparacao", rotulo: "Limites do browse", titulo: "Delegue pesquisa, confirme as ações", tituloEnfase: "confirme as ações",
          texto: "Use o auto browse apenas se disponível. Em prévia nos EUA, para Pro/Ultra, ele não elimina a necessidade de aprovação humana.",
          colunas: ["O que delegar ao auto browse", "O que sempre confirmar"],
          linhas: [
            ["Navegar por páginas públicas autorizadas.", "Domínio oficial, atualidade e escopo de acesso."],
            ["Reunir condições e preparar comparação.", "Taxas, prazos, elegibilidade e lacunas na fonte."],
            ["Preparar informações para uma etapa posterior.", "Antes de compras ou envios, aprovar explicitamente ação e conteúdo."],
            ["Listar documentos exigidos sem coletá-los.", "LGPD: não colar dados pessoais nem autorizar compartilhamento desnecessário."],
          ],
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Compare duas opções e abra as referências. Sem o painel, compare trechos públicos no chat e registre essa limitação.",
          esperado: ["Uma comparação revisada, sem envio de dados nem contratação."],
          confira: ["Conferi as abas autorizadas e os links oficiais", "Revisei prazos, condições e lacunas da tabela", "Mantive compras, inscrições e compartilhamentos sob aprovação humana"],
          visual: { tipo: "lista", legenda: "Antes de recomendar", itens: ["Fonte oficial", "Condições vigentes", "Lacunas explícitas", "Decisão humana"] },
        },
      ],
    },
    {
      n: "5.4", titulo: "Briefing de agente: delegar com segurança", curto: "Briefing", ferramenta: "Gemini · Briefing de agente",
      objetivo: "Escrever e testar um briefing de relatório mensal com fontes, limites e aprovação humana.",
      voceSaiCom: "Um briefing reutilizável para Gemini Spark ou qualquer agente compatível.",
      saibaMais: "O Gemini Spark está disponível no Ultra, para maiores de 18 anos, em inglês e em países selecionados. Este briefing serve para qualquer agente; no Spark, adapte-o ao inglês e confirme os recursos disponíveis. Uma skill reutiliza instruções, mas não concede permissões nem conecta fontes sozinha.",
      fontes: [{ nome: "Notas de versão do Gemini", url: "https://gemini.google/release-notes/" }, { nome: "Ajuda do Gemini", url: "https://support.google.com/gemini" }],
      passos: [
        {
          tipo: "anatomia", rotulo: "Quatro blocos", titulo: "Desmonte o briefing do relatório", tituloEnfase: "do relatório", nomePrompt: "Relatório mensal com revisão",
          texto: "Leia os quatro blocos e observe onde o agente deve parar. O modelo serve para qualquer agente, não só para o Spark.",
          intro: { titulo: "Teste sem dados reais", texto: "Estes são dados didáticos fictícios: em abril, Balsas registrou 30 atendimentos em alimentação e 20 em moda; a meta total de treino era 60." },
          blocos: [
            { titulo: "Objetivo", pergunta: "Qual decisão a entrega apoia?", texto: "Prepare um rascunho mensal para a coordenação de Balsas revisar o volume de atendimentos por setor e a diferença para a meta total." },
            { titulo: "Insumos", pergunta: "Que fonte sustenta cada número?", texto: "Use somente os totais agregados e a meta de treino fornecidos nesta conversa. Identifique período e origem; sem histórico, não conclua tendência.", nota: "Em uso real, confira versão, acesso autorizado e atualização. Mencionar uma fonte não a conecta." },
            { titulo: "Limites", pergunta: "Quando deve parar?", texto: "Não use dados pessoais, não invente metas e não altere registros. Marque lacunas; peça esclarecimento se faltar um dado indispensável. Não compartilhe nada sem aprovação humana." },
            { titulo: "Entrega", pergunta: "Como testar o aceite?", texto: "Entregue resumo, tabela por setor, total, diferença para a meta e pendências. O total esperado é 50 e faltam 10 para a meta de treino. Aguarde revisão antes de enviar." },
          ],
          fecho: { titulo: "Transforme em rotina só depois", texto: "Teste com dados fictícios, confira cálculos e ajuste critérios. Se criar uma skill, descreva quando usá-la e mantenha explícitas as paradas para aprovação." },
        },
        {
          tipo: "prompt", rotulo: "Sua vez", titulo: "Preencha seu briefing de agente", tituloEnfase: "seu briefing de agente", nomePrompt: "Sua vez: relatório mensal",
          texto: "Troque as lacunas, cole e confira o rascunho. No Spark, adapte o briefing ao inglês; não presuma acesso a fontes ou ferramentas.",
          prompt: `# Objetivo
Prepare um rascunho de relatório de atendimentos de [[abril]] para a coordenação da unidade de [[Balsas]], apoiando a revisão do resultado mensal.
# Insumos
Estes são dados didáticos fictícios. Use somente esta base agregada: [[alimentação: 30; moda: 20; meta total: 60]]. Identifique a origem como base de treino desta conversa. Não há dados pessoais nem histórico de outros meses. Confira se o período e as definições permitem comparar os números.
# Limites
Não invente resultados ou fontes. Marque lacunas e pergunte quando faltar informação indispensável. Siga a LGPD: não solicite nomes, contatos ou documentos pessoais. Não altere registros e não envie mensagens ou arquivos. Solicite aprovação humana explícita antes de compartilhar qualquer conteúdo; este pedido não autoriza envio.
# Entrega
Apresente resumo executivo, tabela por setor, total conferido, diferença para a meta e pendências. Separe fatos de sugestões. Mostre os cálculos e as referências disponíveis. Aguarde minha revisão antes de qualquer próxima ação.`,
          observe: ["O total e a diferença para a meta podem ser recalculados.", "O texto não cria tendência sem histórico nem fonte inexistente.", "Compartilhamento continua bloqueado até aprovação humana."],
        },
        {
          tipo: "comparacao", rotulo: "Riscos e proteção", titulo: "Antecipe riscos, escreva salvaguardas", tituloEnfase: "escreva salvaguardas",
          texto: "Compare seu briefing com as salvaguardas. Uma instrução escrita não substitui permissões técnicas e revisão da pessoa responsável.",
          colunas: ["Riscos", "Salvaguardas"],
          linhas: [
            ["Expor dados pessoais em fontes e relatórios.", "LGPD: usar dados agregados, minimizar acessos e não colar dados pessoais."],
            ["Preencher lacunas com números plausíveis.", "Marcar ausências, pedir esclarecimento e conferir cálculos nas fontes."],
            ["Enviar relatório sem revisão ou ao destino errado.", "Exigir aprovação humana explícita do conteúdo e dos destinatários antes de enviar."],
            ["Reutilizar uma base antiga como resultado atual.", "Conferir período, versão e atualização a cada execução."],
            ["Uma página consultada tentar mudar as instruções.", "Tratar conteúdo externo como fonte, não como autorização para mudar limites."],
          ],
        },
        {
          tipo: "resultado", rotulo: "Faça na sua conta", titulo: "Agora faça na sua conta", tituloEnfase: "na sua conta",
          texto: "Teste o briefing e depois retire a meta da base. Confira se o agente marca a lacuna em vez de inventar uma comparação.",
          esperado: ["Um briefing revisado e testado com dados completos e com uma lacuna."],
          confira: ["Preenchi os quatro blocos sem dados pessoais", "Recalculei os totais e testei a ausência da meta", "Mantive aprovação humana antes de compartilhar e conferi a entrega"],
          visual: { tipo: "lista", legenda: "Aceite do briefing", itens: ["Fontes e período conferidos", "Cálculos reproduzíveis", "Lacunas visíveis", "Envio depende de aprovação"] },
        },
      ],
    },
  ],
};
