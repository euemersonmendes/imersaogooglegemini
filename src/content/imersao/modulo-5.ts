import type { Modulo } from "./tipos";

export const modulo5: Modulo = {
  "id": "modulo-5",
  "glifo": "bot",
  "nome": "Agentes",
  "nomeCompleto": "Agentes e automação para o seu negócio",
  "aulas": [
    {
      "n": "5.1",
      "titulo": "Do assistente ao agente",
      "curto": "Agentes",
      "ferramenta": "Gemini · Agentes",
      "objetivo": "Distinguir uma resposta de uma execução e definir os limites de uma delegação.",
      "voceSaiCom": "Um primeiro briefing com objetivo, insumos, limites e entrega verificável.",
      "saibaMais": "Instruções orientam o trabalho; fontes fornecem evidências; skills reutilizam procedimentos. Nenhum desses elementos, sozinho, concede acesso a ferramentas ou autorização para agir.",
      "fontes": [
        {
          "nome": "Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        }
      ],
      "passos": [
        {
          "tipo": "comparacao",
          "rotulo": "Resposta ou ação",
          "titulo": "Diferencie responder de executar",
          "tituloEnfase": "de executar",
          "texto": "Compare os pedidos. Delegar uma sequência exige definir onde o agente deve parar.",
          "colunas": [
            "Assistente responde",
            "Agente executa"
          ],
          "linhas": [
            [
              "Sugere uma pauta de reunião com meu fornecedor.",
              "Consulta os arquivos autorizados e prepara a pauta para minha revisão."
            ],
            [
              "Explica como montar um resumo de vendas.",
              "Consulta fontes autorizadas e prepara um rascunho verificável."
            ],
            [
              "Você conduz cada próximo passo.",
              "Você define o escopo e aprova ações sensíveis antes da execução."
            ]
          ]
        },
        {
          "tipo": "mapa",
          "rotulo": "Fluxo",
          "titulo": "Revele o caminho da delegação",
          "tituloEnfase": "da delegação",
          "fluxo": "ida",
          "texto": "Revele as etapas. A aprovação vem antes de qualquer envio, compra ou alteração sensível.",
          "nos": [
            {
              "id": "objetivo",
              "sigla": "O",
              "nome": "Objetivo",
              "itens": [
                "Preparar um resumo mensal de vendas"
              ]
            },
            {
              "id": "plano",
              "sigla": "P",
              "nome": "Plano",
              "itens": [
                "Conferir fontes e calcular totais"
              ]
            },
            {
              "id": "ferramentas",
              "sigla": "F",
              "nome": "Ferramentas",
              "itens": [
                "Usar somente recursos autorizados"
              ]
            },
            {
              "id": "aprovacao",
              "sigla": "A",
              "nome": "Aprovação",
              "itens": [
                "Parar antes de compartilhar"
              ]
            },
            {
              "id": "entrega",
              "sigla": "E",
              "nome": "Entrega",
              "itens": [
                "Rascunho com fontes e pendências"
              ]
            }
          ],
          "quadros": [
            {
              "legenda": "Defina o resultado antes dos recursos.",
              "abertos": [
                "objetivo"
              ],
              "foco": "objetivo"
            },
            {
              "legenda": "Confira o plano e as permissões necessárias.",
              "abertos": [
                "objetivo",
                "plano",
                "ferramentas"
              ],
              "foco": "ferramentas"
            },
            {
              "legenda": "Aprovar não substitui conferir a entrega.",
              "abertos": [
                "objetivo",
                "plano",
                "ferramentas",
                "aprovacao",
                "entrega"
              ],
              "foco": "aprovacao"
            }
          ]
        },
        {
          "tipo": "catalogo",
          "rotulo": "Quatro elementos",
          "titulo": "Monte um briefing verificável",
          "tituloEnfase": "um briefing verificável",
          "texto": "Clique nos quatro elementos. Substitua pedidos vagos por critérios que você consiga conferir.",
          "itens": [
            {
              "sigla": "O",
              "nome": "Objetivo",
              "sub": "Resultado e público",
              "rotulo": "Para quê",
              "pergunta": "Que trabalho deve ficar pronto?",
              "cuidado": "Não confunda atividade com resultado.",
              "itens": [
                "Preparar um resumo para eu avaliar as vendas",
                "Definir mês e negócio"
              ]
            },
            {
              "sigla": "I",
              "nome": "Insumos",
              "sub": "Fontes e versões",
              "rotulo": "Com o quê",
              "pergunta": "Quais evidências podem ser consultadas?",
              "cuidado": "Citar um arquivo não concede acesso a ele.",
              "itens": [
                "Anexar dados agregados fictícios",
                "Identificar versão e período de cada fonte"
              ]
            },
            {
              "sigla": "L",
              "nome": "Limites",
              "sub": "Permissões e paradas",
              "rotulo": "Até onde",
              "pergunta": "O que depende de aprovação?",
              "cuidado": "Não cole dados pessoais: siga a LGPD.",
              "itens": [
                "Não enviar nem alterar registros",
                "Marcar lacunas e pedir esclarecimento"
              ]
            },
            {
              "sigla": "E",
              "nome": "Entrega",
              "sub": "Formato e aceite",
              "rotulo": "Como conferir",
              "pergunta": "Como reconhecer uma entrega correta?",
              "cuidado": "Confira cálculos e referências antes de usar.",
              "itens": [
                "Tabela com totais e fontes",
                "Pendências separadas das conclusões"
              ]
            }
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Teste o briefing",
          "titulo": "Experimente uma delegação pequena",
          "tituloEnfase": "uma delegação pequena",
          "nomePrompt": "Planejar antes de agir",
          "texto": "Cole o pedido e confira se o Gemini respeita a fronteira entre planejar e executar.",
          "prompt": "# Objetivo\nPrepare o plano de um resumo mensal de serviços da minha [[pequena oficina]]. Quero conferir o movimento antes de decidir as ações do próximo mês. Estes são dados didáticos fictícios.\n# Insumos\nConsidere apenas estes totais: manutenção preventiva, 24 serviços; reparos, 16. Não há valores de vendas nem dados de meses anteriores disponíveis.\n# Limites\nNão consulte sistemas, não envie mensagens e não altere arquivos. Não peça dados pessoais nem dados de clientes. Não invente receitas ou tendências; marque as lacunas. Antes de qualquer ação externa, peça minha aprovação explícita.\n# Entrega\nApresente o plano em três etapas, os recursos necessários e uma tabela preliminar com tipo de serviço e quantidade. Confira a soma e indique o que falta para comparar o movimento com o mês anterior. Aguarde minha revisão antes de prosseguir.",
          "observe": [
            "O total é 40 serviços, sem receita ou comparação inventada.",
            "O plano diferencia recursos necessários de recursos já disponíveis.",
            "Não há alegação de envio ou acesso a sistemas."
          ]
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Teste uma delegação pequena e revise a entrega antes de ampliar as permissões.",
          "esperado": [
            "Um briefing testado, sem autorizar ações externas."
          ],
          "confira": [
            "Defini objetivo, insumos, limites e entrega",
            "Conferi o total e as lacunas sem usar dados pessoais",
            "Confirmei que nenhuma ação externa foi executada"
          ],
          "visual": {
            "tipo": "lista",
            "legenda": "Seu contrato de delegação",
            "itens": [
              "Objetivo definido",
              "Fontes identificadas",
              "Aprovação antes de agir",
              "Entrega conferida"
            ]
          }
        }
      ]
    },
    {
      "n": "5.2",
      "titulo": "Ações programadas: a rotina que roda sozinha",
      "curto": "Ações programadas",
      "ferramenta": "Gemini · Ações programadas",
      "objetivo": "Programar rotinas recorrentes e conferir horário, escopo e próxima execução.",
      "voceSaiCom": "Dois pedidos de rotina: resumo semanal e lembrete mensal de metas.",
      "fontes": [
        {
          "nome": "Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        }
      ],
      "passos": [
        {
          "tipo": "tela",
          "tela": "agendadas",
          "rotulo": "Onde conferir",
          "titulo": "Confira as ações programadas",
          "tituloEnfase": "as ações programadas",
          "texto": "Veja a recorrência e a próxima execução. A disponibilidade depende da conta; confira o agendamento confirmado, não apenas a resposta do chat."
        },
        {
          "tipo": "prompt",
          "rotulo": "Toda segunda",
          "titulo": "Programe o resumo semanal",
          "tituloEnfase": "o resumo semanal",
          "nomePrompt": "Segunda às 8h",
          "texto": "Cole o pedido. Confira o fuso e a próxima segunda antes de considerar a rotina criada.",
          "prompt": "# Perfil\nAtue como assistente de organização da minha pequena loja.\n# Contexto\nEstes são dados didáticos fictícios. A base desta semana registra 12 vendas de camisetas e 8 de calças, sem nomes, contatos ou dados de clientes. Não há valores de faturamento informados.\n# Objetivo\nPrograme um resumo toda segunda-feira às 8h, no fuso America/Fortaleza. Use apenas informações autorizadas e disponíveis na execução. Se só houver esta base fictícia, identifique-a como estática e não a apresente como resultado de uma nova semana.\n# Modelo de Entrega\nEntregue até cinco tópicos: período, totais de vendas, destaques, lacunas e próximos passos sugeridos. Não invente faturamento nem envie o resumo a terceiros. Peça minha revisão. Confirme recorrência, fuso e próxima execução; se não puder agendar, informe a limitação sem simular sucesso.",
          "observe": [
            "A próxima execução corresponde a segunda, 8h, no fuso solicitado.",
            "A rotina não promete acessar dados que não foram autorizados.",
            "A base estática não vira uma atualização fictícia."
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Toda semana",
          "titulo": "Lembre de revisar as cobranças",
          "tituloEnfase": "as cobranças",
          "nomePrompt": "Revisão das contas a receber",
          "texto": "Cole o lembrete e ajuste o dia. Agendar uma revisão não autoriza enviar cobranças aos clientes.",
          "prompt": "# Perfil\nAjude a organizar as contas a receber do meu pequeno negócio de prestação de serviços.\n# Contexto\nEstes são dados didáticos fictícios. Preciso lembrar de conferir pagamentos antes de preparar cobranças. Nenhum saldo ou atraso foi informado. Não use nomes, contatos, dados bancários ou outros dados de clientes.\n# Objetivo\nCrie um lembrete recorrente toda [[terça-feira]] às [[9h]], no fuso America/Fortaleza, para eu revisar as contas a receber no meu controle financeiro.\n# Modelo de Entrega\nNo lembrete, peça para conferir vencimentos e pagamentos recebidos antes de preparar qualquer mensagem. Não invente dívidas, não altere registros e não envie cobranças. Qualquer rascunho deve passar pela minha revisão, sem dados de clientes neste exercício. Confirme a próxima execução e a recorrência. Se a conta não permitir programar, explique a limitação e entregue somente o texto do lembrete.",
          "dica": "Confira a primeira execução e revise ou desative a rotina quando ela deixar de fazer sentido."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Confira as duas rotinas na lista. Se a função não estiver disponível, guarde os pedidos sem registrar o agendamento como concluído.",
          "esperado": [
            "Duas rotinas conferidas ou uma limitação de disponibilidade claramente registrada."
          ],
          "confira": [
            "Conferi recorrência, fuso e próxima execução",
            "Limitei as fontes e evitei dados pessoais",
            "Revisei a primeira entrega sem aceitar números inventados"
          ],
          "visual": {
            "tipo": "tela",
            "tela": "agendadas",
            "legenda": "Recorrência e próxima execução"
          }
        }
      ]
    },
    {
      "n": "5.3",
      "titulo": "Gemini no Chrome: pesquisar e comparar páginas",
      "curto": "Chrome",
      "ferramenta": "Gemini · Chrome",
      "objetivo": "Comparar páginas abertas com fontes verificáveis e limites para a navegação autônoma.",
      "voceSaiCom": "Uma tabela de editais ou crédito com referências, lacunas e decisões reservadas à pessoa.",
      "saibaMais": "O painel pode considerar a página e várias abas autorizadas. O auto browse está em prévia nos EUA para Pro e Ultra; não confunda comparar conteúdo com ter permissão para enviar formulários.",
      "fontes": [
        {
          "nome": "Gemini no Chrome",
          "url": "https://gemini.google/overview/gemini-in-chrome/"
        }
      ],
      "passos": [
        {
          "tipo": "tela",
          "tela": "chrome",
          "rotulo": "Painel lateral",
          "titulo": "Abra as páginas para comparar",
          "tituloEnfase": "para comparar",
          "texto": "Abra duas páginas oficiais e o painel do Gemini. Confira quais abas estão no contexto; não inclua páginas com dados pessoais."
        },
        {
          "tipo": "prompt",
          "rotulo": "Compare as abas",
          "titulo": "Peça uma tabela com evidências",
          "tituloEnfase": "com evidências",
          "nomePrompt": "Editais e crédito lado a lado",
          "texto": "Use abas oficiais autorizadas. A situação do exercício é fictícia; as condições de cada página precisam ser conferidas.",
          "prompt": "# Perfil\nAtue como assistente de pesquisa para mim, que sou dono de um pequeno restaurante.\n# Contexto\nEstes são dados didáticos fictícios: quero avaliar recursos para comprar equipamentos para meu pequeno restaurante. Não há cadastro ou documentos pessoais neste exercício. Compare os editais ou linhas de crédito nas abas oficiais que autorizei.\n# Objetivo\nIdentifique opções potencialmente pertinentes, sem recomendar contratação nem garantir elegibilidade. Diferencie página aberta no navegador de inscrição efetivamente aberta. Confira o prazo informado e sinalize quando a vigência não puder ser determinada.\n# Modelo de Entrega\nMonte uma tabela com opção, público, finalidade, valor ou faixa, juros e custos quando aplicáveis, prazo, requisitos, URL e trecho de apoio. Marque informação ausente como “não localizado”; não invente condições. Separe dúvidas para confirmar na instituição. Não faça login, não preencha formulários, não envie inscrições nem contrate nada. Termine com três verificações para revisão humana.",
          "observe": [
            "Cada condição relevante tem uma referência que você consegue abrir.",
            "Prazo não localizado não vira inscrição aberta.",
            "Não houve envio, contratação ou promessa de aprovação."
          ]
        },
        {
          "tipo": "comparacao",
          "rotulo": "Limites do browse",
          "titulo": "Delegue pesquisa, confirme as ações",
          "tituloEnfase": "confirme as ações",
          "texto": "Use o auto browse apenas se disponível. Em prévia nos EUA, para Pro/Ultra, ele não elimina a necessidade de aprovação humana.",
          "colunas": [
            "O que delegar ao auto browse",
            "O que sempre confirmar"
          ],
          "linhas": [
            [
              "Navegar por páginas públicas autorizadas.",
              "Domínio oficial, atualidade e escopo de acesso."
            ],
            [
              "Reunir condições e preparar comparação.",
              "Taxas, prazos, elegibilidade e lacunas na fonte."
            ],
            [
              "Preparar informações para uma etapa posterior.",
              "Antes de compras ou envios, aprovar explicitamente ação e conteúdo."
            ],
            [
              "Listar documentos exigidos sem coletá-los.",
              "LGPD: não colar dados pessoais nem autorizar compartilhamento desnecessário."
            ]
          ]
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Compare duas opções e abra as referências. Sem o painel, compare trechos públicos no chat e registre essa limitação.",
          "esperado": [
            "Uma comparação revisada, sem envio de dados nem contratação."
          ],
          "confira": [
            "Conferi as abas autorizadas e os links oficiais",
            "Revisei prazos, condições e lacunas da tabela",
            "Mantive compras, inscrições e compartilhamentos sob aprovação humana"
          ],
          "visual": {
            "tipo": "lista",
            "legenda": "Antes de decidir",
            "itens": [
              "Fonte oficial",
              "Condições vigentes",
              "Lacunas explícitas",
              "Decisão humana"
            ]
          }
        }
      ]
    },
    {
      "n": "5.4",
      "titulo": "Briefing de agente: delegar com segurança",
      "curto": "Briefing",
      "ferramenta": "Gemini · Briefing de agente",
      "objetivo": "Escrever e testar um briefing de resumo mensal do negócio com fontes, limites e minha aprovação antes de qualquer ação externa.",
      "voceSaiCom": "Um briefing reutilizável para Gemini Spark ou qualquer agente compatível.",
      "saibaMais": "O Gemini Spark está disponível no Ultra, para maiores de 18 anos, em inglês e em países selecionados. Este briefing serve para qualquer agente; no Spark, adapte-o ao inglês e confirme os recursos disponíveis. Uma skill reutiliza instruções, mas não concede permissões nem conecta fontes sozinha.",
      "fontes": [
        {
          "nome": "Notas de versão do Gemini",
          "url": "https://gemini.google/release-notes/"
        },
        {
          "nome": "Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        }
      ],
      "passos": [
        {
          "tipo": "anatomia",
          "rotulo": "Quatro blocos",
          "titulo": "Desmonte o briefing do relatório",
          "tituloEnfase": "do relatório",
          "nomePrompt": "Relatório mensal com revisão",
          "texto": "Leia os quatro blocos e observe onde o agente deve parar. O modelo serve para qualquer agente, não só para o Spark.",
          "intro": {
            "titulo": "Teste sem dados reais",
            "texto": "Estes são dados didáticos fictícios: em abril, meu salão realizou 30 cortes e 20 escovas; a previsão usada neste exercício era de 60 serviços no total."
          },
          "blocos": [
            {
              "titulo": "Objetivo",
              "pergunta": "Qual decisão a entrega apoia?",
              "texto": "Prepare um rascunho mensal para eu revisar o volume de serviços do meu salão e a diferença para a previsão do exercício."
            },
            {
              "titulo": "Insumos",
              "pergunta": "Que fonte sustenta cada número?",
              "texto": "Use somente os totais agregados e a previsão fictícia fornecidos nesta conversa. Identifique período e origem; sem histórico, não conclua tendência.",
              "nota": "Em uso real, confira versão, acesso autorizado e atualização. Mencionar uma fonte não a conecta."
            },
            {
              "titulo": "Limites",
              "pergunta": "Quando deve parar?",
              "texto": "Não use dados pessoais, não invente metas e não altere registros. Marque lacunas; peça esclarecimento se faltar um dado indispensável. Não compartilhe nada sem aprovação humana."
            },
            {
              "titulo": "Entrega",
              "pergunta": "Como testar o aceite?",
              "texto": "Entregue resumo, tabela por setor, total, diferença para a meta e pendências. O total esperado é 50 e faltam 10 para a meta de treino. Aguarde revisão antes de enviar."
            }
          ],
          "fecho": {
            "titulo": "Transforme em rotina só depois",
            "texto": "Teste com dados fictícios, confira cálculos e ajuste critérios. Se criar uma skill, descreva quando usá-la e mantenha explícitas as paradas para aprovação."
          }
        },
        {
          "tipo": "prompt",
          "rotulo": "Sua vez",
          "titulo": "Preencha seu briefing de agente",
          "tituloEnfase": "seu briefing de agente",
          "nomePrompt": "Sua vez: relatório mensal",
          "texto": "Troque as lacunas, cole e confira o rascunho. No Spark, adapte o briefing ao inglês; não presuma acesso a fontes ou ferramentas.",
          "prompt": "# Objetivo\nPrepare um rascunho de relatório de atendimentos de [[abril]] para a coordenação da unidade de [[Balsas]], apoiando a revisão do resultado mensal.\n# Insumos\nEstes são dados didáticos fictícios. Use somente esta base agregada: [[alimentação: 30; moda: 20; meta total: 60]]. Identifique a origem como base de treino desta conversa. Não há dados pessoais nem histórico de outros meses. Confira se o período e as definições permitem comparar os números.\n# Limites\nNão invente resultados ou fontes. Marque lacunas e pergunte quando faltar informação indispensável. Siga a LGPD: não solicite nomes, contatos ou documentos pessoais. Não altere registros e não envie mensagens ou arquivos. Solicite aprovação humana explícita antes de compartilhar qualquer conteúdo; este pedido não autoriza envio.\n# Entrega\nApresente resumo executivo, tabela por setor, total conferido, diferença para a meta e pendências. Separe fatos de sugestões. Mostre os cálculos e as referências disponíveis. Aguarde minha revisão antes de qualquer próxima ação.",
          "observe": [
            "O total e a diferença para a meta podem ser recalculados.",
            "O texto não cria tendência sem histórico nem fonte inexistente.",
            "Compartilhamento continua bloqueado até aprovação humana."
          ]
        },
        {
          "tipo": "comparacao",
          "rotulo": "Riscos e proteção",
          "titulo": "Antecipe riscos, escreva salvaguardas",
          "tituloEnfase": "escreva salvaguardas",
          "texto": "Compare seu briefing com as salvaguardas. Uma instrução escrita não substitui permissões técnicas e revisão da pessoa responsável.",
          "colunas": [
            "Riscos",
            "Salvaguardas"
          ],
          "linhas": [
            [
              "Expor dados pessoais em fontes e relatórios.",
              "LGPD: usar dados agregados, minimizar acessos e não colar dados pessoais."
            ],
            [
              "Preencher lacunas com números plausíveis.",
              "Marcar ausências, pedir esclarecimento e conferir cálculos nas fontes."
            ],
            [
              "Enviar relatório sem revisão ou ao destino errado.",
              "Exigir aprovação humana explícita do conteúdo e dos destinatários antes de enviar."
            ],
            [
              "Reutilizar uma base antiga como resultado atual.",
              "Conferir período, versão e atualização a cada execução."
            ],
            [
              "Uma página consultada tentar mudar as instruções.",
              "Tratar conteúdo externo como fonte, não como autorização para mudar limites."
            ]
          ]
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Teste o briefing e depois retire a meta da base. Confira se o agente marca a lacuna em vez de inventar uma comparação.",
          "esperado": [
            "Um briefing revisado e testado com dados completos e com uma lacuna."
          ],
          "confira": [
            "Preenchi os quatro blocos sem dados pessoais",
            "Recalculei os totais e testei a ausência da meta",
            "Mantive aprovação humana antes de compartilhar e conferi a entrega"
          ],
          "visual": {
            "tipo": "lista",
            "legenda": "Aceite do briefing",
            "itens": [
              "Fontes e período conferidos",
              "Cálculos reproduzíveis",
              "Lacunas visíveis",
              "Envio depende de aprovação"
            ]
          }
        }
      ]
    }
  ]
};
