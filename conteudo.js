/* ============================================================
   CONTEÚDO DO SITE — CGL FUNDAÇÕES
   ------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA MUDAR
   TEXTOS, FOTOS, SERVIÇOS, OBRAS E DADOS DE CONTATO.

   Como editar:
   - Texto: troque o que está entre aspas. Mantenha as aspas.
   - Foto: troque o nome do arquivo OU substitua a imagem na
     pasta "imagens/" mantendo o mesmo nome.
   - Listas (serviços, obras): copie um bloco { ... } inteiro,
     cole logo abaixo e edite. Separe cada bloco com vírgula.

   Não apague vírgulas, chaves { } ou colchetes [ ].
   ============================================================ */

window.CONTEUDO = {

  /* ---------- IDENTIDADE ---------- */
  empresa: {
    nome: "CGL Fundações",
    desde: "1997",
    slogan: "Fundações profundas e contenções desde 1997",
    certificacao: "Empresa certificada ISO 9001",
    certificacaoTexto: "Sistema de gestão da qualidade certificado, do orçamento à execução da obra.",
  },

  /* ---------- MENU (ordem dos links) ---------- */
  menu: [
    { id: "inicio",       texto: "Início" },
    { id: "sobre",        texto: "A empresa" },
    { id: "servicos",     texto: "Serviços" },
    { id: "equipamentos", texto: "Equipamentos" },
    { id: "obras",        texto: "Obras" },
    { id: "contato",      texto: "Contato" },
  ],

  /* ---------- LINK PARA O SISTEMA (cabeçalho e rodapé) ---------- */
  sistema: { texto: "Acessar Sistema", url: "https://app.cglfundacoes.com.br" },

  /* ---------- SEÇÃO INÍCIO (HERO) ---------- */
  hero: {
    imagem: "imagens/hero.jpg",
    titulo: "Fundações que sustentam grandes obras",
    subtitulo: "Desde 1997 executando estacas hélice contínua, estaca raiz, estacas secantes e fundações especiais em todo o Brasil, com frota própria e equipe de engenheiros qualificados.",
    botaoPrimario: "Solicitar orçamento",
    botaoSecundario: "Conheça os serviços",
  },

  /* ---------- FAIXA DE NÚMEROS ---------- */
  numeros: [
    { valor: "1997", rotulo: "fundações desde" },
    { valor: "100%", rotulo: "frota de equipamentos própria" },
    { valor: "Ø1000", rotulo: "mm de diâmetro em hélice contínua" },
    { valor: "BR", rotulo: "obras em todo o território nacional" },
  ],

  /* ---------- SEÇÃO A EMPRESA ---------- */
  sobre: {
    imagem: "imagens/sobre.jpg",
    titulo: "Quem é a CGL Fundações",
    chamada: "Solidez técnica desde 1997",
    paragrafos: [
      "Sediada no Distrito Industrial de Itabira/MG, a CGL Fundações executa fundações especiais em todo o território brasileiro desde 1997, para obras industriais, de mineração, comerciais e residenciais de todos os portes.",
      "Contamos com infraestrutura completa de equipamentos próprios e equipe altamente qualificada, oferecendo liberdade de opções técnicas e econômicas para cada situação de projeto.",
      "Todos os trabalhos são planejados e executados por uma experiente equipe de engenheiros e técnicos, que presta assessoria completa — da avaliação da economia dos recursos empregados à otimização do uso dos equipamentos.",
    ],
    valores: [
      { titulo: "Qualidade", texto: "Compromisso com a excelência técnica em cada serviço executado." },
      { titulo: "Prazo", texto: "Cumprimento rigoroso dos cronogramas acordados com o cliente." },
      { titulo: "Segurança", texto: "Promoção da segurança do trabalho e preservação do meio ambiente." },
    ],
  },

  /* ---------- SEÇÃO SERVIÇOS ----------
     icone: escolha entre  estaca | raiz | secante | parede | sondagem | terra | energia | consultoria  */
  servicos: {
    titulo: "Nossos serviços",
    chamada: "Soluções completas em fundações e contenções",
    lista: [
      {
        icone: "estaca",
        nome: "Estaca Hélice Contínua Monitorada",
        descricao: "Fundação moldada in loco com trado contínuo e concreto injetado pela haste central. Execução monitorada por computador, sem vibração e possível com nível d'água. Diâmetros de Ø300 a Ø1000 mm.",
      },
      {
        icone: "raiz",
        nome: "Estaca Raiz",
        descricao: "Alto atrito lateral, com perfuratrizes para áreas restritas e para obras de maior produção. Sem vibração nem descompressão do terreno, atravessa matacões, rocha e concreto. Diâmetros de Ø250 a Ø500 mm.",
      },
      {
        icone: "secante",
        nome: "Parede Diafragma com Estacas Secantes",
        descricao: "Contenção executada a seco com perfuratriz de cabeçote duplo (trado e revestimento girando em sentidos opostos), sem lama bentonítica, com baixo ruído e alta precisão de verticalidade.",
      },
      {
        icone: "sondagem",
        nome: "Escavadas com Trado Mecanizado",
        descricao: "Estaca moldada no solo, escavada com trado helicoidal por perfuratrizes sobre caminhão ou sobre esteira (top drive) e concretada a partir da superfície. Diâmetros de Ø250 a Ø1600 mm, até 25 m.",
      },
      {
        icone: "terra",
        nome: "Locação de Bombas de Concreto",
        descricao: "Bombas estacionárias Putzmeister e Schwing, de 57 a 90 m³/h, para obras e empresas.",
      },
      {
        icone: "energia",
        nome: "Locação de Compressores e Geradores",
        descricao: "Ar comprimido e energia para a sua operação não parar. Compressores e grupos geradores de porte industrial, para obras, mineração e indústria.",
      },
    ],
  },

  /* ---------- SEÇÃO EQUIPAMENTOS ---------- */
  equipamentos: {
    titulo: "Estrutura e equipamentos",
    chamada: "Frota própria para atender qualquer projeto",
    texto: "A CGL Fundações dispõe de uma frota própria e diversificada de perfuratrizes e equipamentos de apoio, o que garante disponibilidade, agilidade e previsibilidade de prazo nas obras.",
    destaques: [
      { titulo: "Perfuratrizes de hélice contínua", texto: "CZM EM800 e EM800 Super sobre chassis Caterpillar, até 30 m de profundidade." },
      { titulo: "Perfuratrizes de estaca raiz", texto: "Soilmec SM14 e SM22, CZM ER190R e MC140 e CMV M20-10, de Ø250 a Ø500 mm, inclusive em áreas restritas." },
      { titulo: "Cabeçote duplo para secantes", texto: "CZM EM1000/32 sobre Caterpillar 336, em Ø420, Ø520 e Ø620 mm, até 19 m." },
      { titulo: "Trado mecanizado", texto: "Perfuratrizes sobre caminhão e sobre esteira, de Ø250 a Ø1600 mm, até 25 m de profundidade." },
      { titulo: "Equipamentos para locação", texto: "Bombas de concreto Putzmeister e Schwing (57 a 90 m³/h), compressores de ar e grupos geradores industriais." },
    ],
  },

  /* ---------- SEÇÃO NOSSA FROTA (fichas técnicas) ----------
     Perfuratrizes: só a TAG da CGL, nunca o modelo do fabricante (decisão do Bernardo, 18/11/2026).
     principais = linhas sempre visíveis; ficha = linhas do "Ver ficha técnica completa". */
  frota: {
    titulo: "Nossa frota",
    chamada: "Equipamentos próprios, com ficha técnica",
    texto: "Perfuratrizes com monitoramento digital da execução e equipamentos de porte industrial para locação.",
    grupos: [
      {
        titulo: "Perfuratrizes de escavada e hélice contínua",
        itens: [
          {
            tag: "CGL-65 · CGL-88",
            nome: "Trado mecanizado sobre esteira",
            imagem: "imagens/equip-cgl-65-88.jpg",
            descricao: "Perfuratriz de estaca escavada com sistema top drive, compacta e de baixo consumo. Transporte sem desmontagem completa.",
            principais: [
              ["Diâmetro", "350 a 1.200 mm"],
              ["Profundidade", "até 18 m"],
              ["Torque máximo", "8.160 kgf·m"],
              ["Potência", "74 HP"],
              ["Peso de operação", "18 t"],
            ],
            ficha: [
              ["Rotação", "12 rpm no torque máximo; 45 rpm na 2ª velocidade"],
              ["Força de extração", "24.470 kgf"],
              ["Pressão no solo", "0,71 kgf/cm²"],
              ["Tanque de combustível", "175 L"],
              ["Inclinação da torre", "5° frontal, 4° lateral, 5° para trás"],
              ["Sistema hidráulico", "320 bar; 448 L/min"],
              ["Guincho principal", "12.230 kgf; 45 m/min; cabo de 19 mm"],
              ["Guincho auxiliar", "1.325 kgf; cabo de 13 mm"],
              ["Largura das esteiras", "2.200 mm recolhida; 3.100 mm em operação"],
              ["Transporte", "3,10 m de altura × 8,30 m × 2,20 m; 16 t"],
              ["Monitoramento", "Geodigitus: profundidade, inclinação da torre e rotação"],
            ],
          },
          {
            tag: "CGL-67 · CGL-68",
            nome: "Estaca escavada e hélice contínua",
            imagem: "imagens/equip-cgl-67-68.jpg",
            descricao: "Perfuratriz top drive com torre pantografada, que executa estaca escavada de grande diâmetro e hélice contínua.",
            principais: [
              ["Escavada", "450 a 1.600 mm, até 25 m"],
              ["Hélice contínua", "300 a 600 mm, até 16 m"],
              ["Torque máximo", "10.200 kgf·m"],
              ["Potência", "210 HP"],
              ["Peso de operação", "25 t"],
            ],
            ficha: [
              ["Hélice sem prolonga", "12 m (prolonga de 4 m)"],
              ["Rotação", "14 rpm no torque máximo; 24 rpm na 2ª velocidade"],
              ["Força de extração", "30.580 kgf"],
              ["Pressão no solo", "0,55 kgf/cm²"],
              ["Tanque de combustível", "250 L"],
              ["Inclinação da torre", "5° frontal, 4° lateral, 5° para trás"],
              ["Sistema hidráulico", "320 bar; 448 L/min"],
              ["Guincho principal", "15.290 kgf; 50 m/min; cabo de 19 mm"],
              ["Guincho auxiliar", "1.530 kgf; cabo de 13 mm"],
              ["Largura das esteiras", "3.000 mm recolhida; 4.200 mm em operação"],
              ["Transporte", "3,40 m de altura × 11,50 m × 2,80 m; 20 t"],
              ["Monitoramento", "Geodigitus: torque, força nos guinchos e rotação"],
            ],
          },
          {
            tag: "CGL-66",
            nome: "Hélice contínua de médio porte",
            imagem: "imagens/equip-cgl-66.jpg",
            descricao: "Perfuratriz top drive com torre pantografada, alto torque e grande força de extração para estacas profundas.",
            principais: [
              ["Diâmetro", "até 700 mm"],
              ["Profundidade", "até 25 m"],
              ["Torque máximo", "17.340 kgf·m"],
              ["Potência", "260 HP"],
              ["Peso de operação", "40 t"],
            ],
            ficha: [
              ["Profundidade sem prolonga", "19 m (prolonga de 6 m)"],
              ["Rotação", "14 rpm no torque máximo; 24 rpm na 2ª velocidade"],
              ["Força de extração", "81.560 kgf"],
              ["Pressão no solo", "0,75 kgf/cm²"],
              ["Tanque de combustível", "370 L"],
              ["Inclinação da torre", "5° frontal, 3° a 5° lateral, 5° para trás"],
              ["Sistema hidráulico", "300 bar; 500 L/min"],
              ["Guincho principal", "20.390 kgf; 65 m/min; cabo de 19 mm"],
              ["Guincho auxiliar", "5.100 kgf; cabo de 13 mm"],
              ["Largura das esteiras", "3.000 mm recolhida; 4.200 mm em operação"],
              ["Transporte", "3,40 m de altura × 13,85 m × 3,00 m; 40 t"],
              ["Monitoramento", "Geodigitus: torque, força nos guinchos e rotação"],
            ],
          },
        ],
      },
      {
        titulo: "Perfuratrizes de estaca raiz",
        itens: [
          {
            tag: "Estaca raiz",
            nome: "Soilmec SM14",
            imagem: "imagens/equip-soilmec-sm14.jpg",
            descricao: "Perfuratriz compacta sobre esteiras para estaca raiz e tirantes em áreas restritas, com mastro que gira em quatro posições de 90°.",
            principais: [
              ["Torque da cabeça", "até 13,5 kN·m"],
              ["Força de tração", "89 kN"],
              ["Curso do mastro", "4 m"],
              ["Potência", "165 HP"],
              ["Peso", "14,3 t"],
            ],
            ficha: [
              ["Força de impulso", "45 kN"],
              ["Velocidade de avanço", "até 28 m/min"],
              ["Extrator", "100 kN; curso de 400 mm"],
              ["Morsas", "passagem de 50 a 415 mm"],
              ["Torque de desrosqueamento", "5.060 daN·m"],
              ["Extensão do mastro", "1.000 mm"],
              ["Velocidade de translação", "2,7 km/h"],
              ["Oscilação das esteiras", "±10°"],
            ],
          },
          {
            tag: "Estaca raiz",
            nome: "Soilmec SM22",
            imagem: "imagens/equip-soilmec-sm22.jpg",
            descricao: "Perfuratriz sobre esteiras para estaca raiz e microestacas com alta produção, com antena de 7,2 m ou 10,2 m de curso.",
            principais: [
              ["Força de tração e impulso", "148 kN"],
              ["Curso da antena", "7,2 m ou 10,2 m"],
              ["Potência", "260 HP"],
              ["Peso", "23,3 t"],
            ],
            ficha: [
              ["Velocidade de subida", "até 28 m/min"],
              ["Pressão no solo", "0,084 MPa"],
              ["Largura do patim", "500 mm"],
              ["Comprimento das esteiras", "2.910 mm"],
              ["Rampa máxima", "66%"],
            ],
          },
          {
            tag: "Estaca raiz",
            nome: "CZM ER190R",
            imagem: "imagens/equip-czm-er190r.jpg",
            descricao: "Perfuratriz de estaca raiz montada sobre escavadeira Caterpillar 313D2L, com morsa dupla e deslocamento lateral da cabeça.",
            principais: [
              ["Torque da caixa rotativa", "2.770 kgf·m"],
              ["Pulldown e extração", "14.000 kgf"],
              ["Altura de operação", "9,2 m (11,2 m com extensão)"],
              ["Potência", "100 HP"],
              ["Peso de operação", "20,5 t"],
            ],
            ficha: [
              ["Rotação", "43 rpm na 1ª marcha; 86 rpm na 2ª"],
              ["Morsa", "tubos de 88,9 a 457,2 mm; quebra de 6.540 kgf·m"],
              ["Deslocamento lateral da cabeça", "697 mm"],
              ["Curso do carro guia", "6.500 mm com extensão; 4.525 mm sem"],
              ["Inclinação da torre", "8° frontal, 12° lateral"],
              ["Guincho auxiliar", "3.000 kgf"],
              ["Sistema hidráulico", "350 bar; 254 L/min"],
              ["Pressão no solo", "0,44 kgf/cm²"],
              ["Tanque de combustível", "250 L"],
              ["Transporte", "3,94 m de altura × 11,00 m × 2,76 m"],
            ],
          },
        ],
      },
      {
        titulo: "Locação: compressores e geradores",
        itens: [
          {
            tag: "Locação",
            nome: "Compressor Atlas Copco X1200",
            imagem: "imagens/equip-compressor-x1200.jpg",
            descricao: "Compressor de ar diesel de alta vazão e alta pressão, para perfuração e serviços industriais.",
            principais: [
              ["Vazão", "até 1.200 pcm (567 L/s)"],
              ["Pressão de trabalho", "até 30 bar"],
              ["Motor", "diesel Scania, 6 cilindros"],
            ],
            ficha: [],
          },
          {
            tag: "Locação",
            nome: "Compressor Atlas Copco XRV 1000",
            imagem: "imagens/equip-compressor-xrv1000.jpg",
            descricao: "Compressor de ar diesel de alta pressão para obras e mineração.",
            principais: [
              ["Pressão máxima de trabalho", "25 bar"],
              ["Tanque de combustível", "565 L"],
              ["Inclinação de trabalho", "até 15°"],
              ["Peso", "5.270 kg"],
            ],
            ficha: [],
          },
          {
            tag: "Locação",
            nome: "Gerador Atlas Copco QAS 105",
            imagem: "imagens/equip-gerador-qas105.jpg",
            descricao: "Grupo gerador diesel silenciado, com chassi vedado para contenção de fluidos.",
            principais: [
              ["Potência", "95 kVA contínua; 105 kVA em emergência"],
              ["Tensão e frequência", "220 V trifásico, 60 Hz"],
              ["Motor", "diesel Perkins"],
            ],
            ficha: [],
          },
        ],
      },
    ],
  },

  /* ---------- SEÇÃO OBRAS / PORTFÓLIO ----------
     Para adicionar uma obra: copie um bloco { ... }, cole abaixo e edite. */
  obras: {
    titulo: "Obras realizadas",
    chamada: "Projetos que comprovam nossa experiência",
    lista: [
      {
        imagem: "imagens/obra-1.jpg",
        nome: "MIP / Vale",
        local: "Minas Gerais",
        descricao: "Estaca hélice contínua monitorada: 1.891 m em Ø500 mm, 9.342 m em Ø800 mm e 2.197 m em Ø1000 mm.",
      },
      {
        imagem: "imagens/obra-2.jpg",
        nome: "Estádio Independência",
        local: "Belo Horizonte/MG",
        descricao: "Cerca de 22.000 metros de estaca hélice contínua monitorada, entre contenção e fundação, de Ø400 a Ø800 mm.",
      },
      {
        imagem: "imagens/obra-3.jpg",
        nome: "Mozark",
        local: "Minas Gerais",
        descricao: "8.066 m de estacas secantes Ø420 mm e 2.605 m de hélice contínua em Ø700 e Ø800 mm.",
      },
      {
        imagem: "imagens/obra-4.jpg",
        nome: "EcoMall",
        local: "São Paulo/SP",
        descricao: "567 estacas secantes de Ø420 mm com 10 metros para o shopping, cliente MV Construções.",
      },
      {
        imagem: "imagens/obra-5.jpg",
        nome: "Vale Verde / Vale",
        local: "Itabira/MG",
        descricao: "Cravação de estacas prancha para contenção do novo tanque de decantação de rejeitos no Complexo de Itabira (Mina Cauê).",
      },
    ],
  },

  /* ---------- SEÇÃO ORÇAMENTO (conversa guiada) ----------
     O pedido de orçamento é uma conversa: primeiro os anexos, depois uma pergunta por vez.
     - Para mudar o texto de uma pergunta ou de uma opção, troque só o que está entre aspas em "texto".
     - NÃO mude "id", "name" nem "v" (são os nomes que o sistema grava). Se mudar, o formulário do
       index.html tem de mudar junto; o comando "node scripts/checar-site-orcamento.js" confere.
     - "se" diz quando a pergunta aparece (ex.: só se a resposta de P2 for "concorrencia").
     - O selo "formalizado no mesmo dia" desliga com selo.ativo: false (por exemplo, nas férias). */
  orcamento: {
    titulo: "Solicite seu orçamento",
    chamada: "Mande os documentos e responda em 1 minuto e meio",
    texto: "Comece pelos anexos: ficha cadastral da empresa, sondagem e projeto de fundações. O que eles já dizem, não perguntamos. Com os documentos, seu orçamento é formalizado no mesmo dia.",
    funcao: "https://xiirduialyewpqkwsfxx.supabase.co/functions/v1/site-orcamento",
    privacidadeVersao: "2026-11-18",
    avisoPrivacidade: "Usamos estes dados e arquivos só para preparar o seu orçamento.",
    avisoFicha: "Se a ficha tiver dados bancários ou CPF, você pode cobri-los; não precisamos deles para o orçamento.",

    selo: {
      ativo: true,
      corte: "16:00",            // igual à função site_pedido_prazo do banco (o checar-site-orcamento.js confere)
      titulo: "Orçamento formalizado no mesmo dia",
      comSeloHoje: "Seu orçamento será formalizado hoje até as 18h",
      comSeloAmanha: "Seu orçamento será formalizado até as 12h do próximo dia útil",
      semSelo: "Retorno em até 2 dias úteis.",
      falta: "Para receber no mesmo dia, falta:",
    },

    anexos: [
      { tipo: "ficha_cadastral", texto: "Ficha cadastral da empresa", ajuda: "Da empresa para quem o orçamento será feito. Dispensa as perguntas de empresa e CNPJ.", formatos: ".pdf,.jpg,.jpeg,.png" },
      { tipo: "sondagem",        texto: "Sondagem (SPT)",             ajuda: "Laudo de sondagem do terreno.", formatos: ".pdf,.jpg,.jpeg,.png" },
      { tipo: "projeto",         texto: "Projeto de fundações",       ajuda: "Planta de locação ou quadro de estacas. DWG e DXF são aceitos; mande também o PDF, se tiver.", formatos: ".pdf,.jpg,.jpeg,.png,.dwg,.dxf" },
    ],

    // Diâmetros oferecidos por método (lidos do catálogo do sistema em 18/11/2026), em mm.
    diametros: {
      helice:  [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
      secante: [300, 400, 420, 500, 520, 600, 620, 700, 800],
      raiz:    [210, 250, 310, 410, 450, 500],
      trado:   [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300],
    },

    // Ordem da conversa por ramo. "ANEXOS" é o passo dos anexos; "CONTATO" abre as perguntas de contato.
    ordem: {
      fundacao: ["P1", "ANEXOS", "P2", "P2a", "P2b", "P5", "P4", "P3", "F1", "F1a", "F1b", "F1c", "F2", "F3", "F4", "F5", "F6", "F6a", "F7", "F8", "CONTATO"],
      locacao:  ["P1", "P2", "P2a", "P2b", "P5", "P4", "P3", "L1", "L2", "L3", "L4", "CONTATO"],
      nao_sei:  ["P1", "ANEXOS", "N1", "F1", "F1a", "F1b", "F1c", "F7", "P2", "P2a", "P2b", "P5", "P4", "CONTATO"],
      contato:  ["C1", "C2", "C3", "C4", "C5", "C5a", "C6"],
    },

    perguntas: [
      { id: "P1", name: "servico", tipo: "opcoes", texto: "O que você precisa?", obrigatoria: true, opcoes: [
        { v: "helice", texto: "Estaca hélice contínua" },
        { v: "raiz", texto: "Estaca raiz" },
        { v: "secante", texto: "Estaca secante / parede diafragma" },
        { v: "trado", texto: "Trado mecanizado" },
        { v: "pre_moldada", texto: "Estaca pré-moldada" },
        { v: "bomba", texto: "Locação de bomba de concreto" },
        { v: "compressor_gerador", texto: "Locação de compressor ou gerador" },
        { v: "nao_sei", texto: "Ainda não sei" } ] },
      { id: "P2", name: "tipo_pedido", tipo: "opcoes", texto: "Este pedido é para quê?", opcoes: [
        { v: "concorrencia", texto: "Concorrência (vários fornecedores, com data para entregar a proposta)" },
        { v: "cotacao", texto: "Cotação ou estimativa (obra em estudo)" },
        { v: "contratacao", texto: "Obra confirmada, quero contratar" } ] },
      { id: "P2a", name: "data_entrega_proposta", tipo: "data", texto: "Até quando precisa da proposta?", se: { P2: "concorrencia" } },
      { id: "P2b", name: "licitacao_publica", tipo: "opcoes", texto: "É licitação pública?", se: { P2: "concorrencia" },
        extra: { name: "edital", quando: "sim", texto: "Número do edital (opcional)", max: 80 }, opcoes: [
        { v: "sim", texto: "Sim" }, { v: "nao", texto: "Não" } ] },
      { id: "P3", name: "solicitante_tipo", tipo: "opcoes", texto: "Você é...", opcoes: [
        { v: "dono", texto: "Dono da obra" }, { v: "construtora", texto: "Construtora" },
        { v: "projetista", texto: "Projetista ou consultor" }, { v: "outro", texto: "Outro" } ] },
      { id: "P4", name: "cidade", tipo: "cidade", texto: "Onde é a obra?", nameUf: "uf" },
      { id: "P5", name: "inicio_previsto", tipo: "opcoes", texto: "Quando a obra deve começar?",
        extra: { name: "inicio_mes", quando: "data", tipo: "mes", texto: "Mês e ano de início" }, opcoes: [
        { v: "ate_30_dias", texto: "Em até 30 dias" }, { v: "1_a_3_meses", texto: "De 1 a 3 meses" },
        { v: "mais_3_meses", texto: "Mais de 3 meses" }, { v: "data", texto: "Já tem data" },
        { v: "sem_previsao", texto: "Ainda sem previsão" } ] },

      { id: "N1", name: "N1", tipo: "texto", texto: "Conte em poucas palavras o que vai construir.", max: 1000, longo: true },

      { id: "F1", name: "segmento", tipo: "opcoes", texto: "Que tipo de obra?", opcoes: [
        { v: "industrial", texto: "Industrial ou mineração (dentro de planta, com regras de segurança)" },
        { v: "comercial", texto: "Comercial ou residencial (prédio, galpão, loja)" },
        { v: "infraestrutura", texto: "Infraestrutura (ponte, contenção, saneamento)" },
        { v: "casa", texto: "Casa" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F1a", name: "F1a", tipo: "texto", texto: "Em qual empresa ou planta?", max: 160, se: { F1: "industrial" } },
      { id: "F1b", name: "F1b", tipo: "opcoes", texto: "A planta exige integração de segurança e documentação (PGR, PCMSO, ASO)?", se: { F1: "industrial" }, opcoes: [
        { v: "sim", texto: "Sim" }, { v: "nao", texto: "Não" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F1c", name: "F1c", tipo: "opcoes", texto: "O trabalho será em horário restrito, à noite ou no fim de semana?", se: { F1: "industrial" }, opcoes: [
        { v: "sim", texto: "Sim" }, { v: "nao", texto: "Não" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F2", name: "F2", tipo: "opcoes", texto: "Quantas estacas, mais ou menos?", se: { semAnexo: "projeto" },
        numero: { min: 1, max: 100000, texto: "Ou digite o número de estacas" }, opcoes: [
        { v: "ate_20", texto: "Até 20" }, { v: "21_100", texto: "21 a 100" }, { v: "101_300", texto: "101 a 300" },
        { v: "mais_300", texto: "Mais de 300" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F3", name: "F3", tipo: "diametros", texto: "Qual o diâmetro? Pode marcar mais de um.", se: { semAnexo: "projeto" } },
      { id: "F4", name: "F4", tipo: "opcoes", texto: "Profundidade média estimada?", se: { semAnexo: "projeto" },
        numero: { min: 1, max: 150, texto: "Ou digite a profundidade em metros" }, opcoes: [
        { v: "ate_10", texto: "Até 10 m" }, { v: "10_20", texto: "10 a 20 m" }, { v: "20_30", texto: "20 a 30 m" },
        { v: "mais_30", texto: "Mais de 30 m" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F5", name: "F5", tipo: "opcoes", texto: "O projeto de fundações está...", se: { semAnexo: "projeto" }, opcoes: [
        { v: "em_elaboracao", texto: "Em elaboração" }, { v: "nao_existe", texto: "Não existe ainda" } ] },
      { id: "F6", name: "F6", tipo: "opcoes", texto: "Tem sondagem (SPT)?", se: { semAnexo: "sondagem" }, opcoes: [
        { v: "sim", texto: "Sim, mando depois" }, { v: "nao", texto: "Não" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F6a", name: "F6a", tipo: "opcoes", texto: "Alguma camada muito dura (SPT acima de 35) ou rocha?", se: { F6: "sim" }, opcoes: [
        { v: "sim", texto: "Sim" }, { v: "nao", texto: "Não" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F7", name: "F7", tipo: "opcoes", texto: "O terreno já está pronto para a máquina?", opcoes: [
        { v: "sim", texto: "Sim, platô nivelado e acesso para caminhão" }, { v: "nao", texto: "Não" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "F8", name: "F8", tipo: "multipla", texto: "Alguma restrição no local? Pode marcar mais de uma.", opcoes: [
        { v: "pe_direito", texto: "Pé-direito baixo ou área coberta" },
        { v: "vibracao", texto: "Vizinho sensível a vibração ou barulho" },
        { v: "espaco", texto: "Espaço apertado" }, { v: "nenhuma", texto: "Nenhuma" } ] },

      { id: "L1", name: "L1", tipo: "opcoes", texto: "Qual equipamento?", se: { P1: "compressor_gerador" }, opcoes: [
        { v: "compressor", texto: "Compressor" }, { v: "gerador", texto: "Gerador" }, { v: "ambos", texto: "Os dois" } ] },
      { id: "L2", name: "L2", tipo: "opcoes", texto: "Por quanto tempo?",
        extra: { name: "L2n", quando: "*", tipo: "numero", min: 1, max: 1000, texto: "Quantos dias, semanas ou meses? (opcional)" }, opcoes: [
        { v: "dias", texto: "Alguns dias" }, { v: "semanas", texto: "Semanas" }, { v: "meses", texto: "Meses" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "L3", name: "L3", tipo: "opcoes", texto: "Com operador?", opcoes: [
        { v: "sim", texto: "Sim" }, { v: "nao", texto: "Não" }, { v: "nao_sei", texto: "Não sei" } ] },
      { id: "L4", name: "L4", tipo: "opcoes", texto: "Volume de concreto estimado?", se: { P1: "bomba" },
        numero: { min: 1, max: 100000, texto: "Digite o volume em m³" }, opcoes: [
        { v: "nao_sei", texto: "Não sei" } ] },

      { id: "C1", name: "nome", tipo: "texto", texto: "Seu nome", obrigatoria: true, max: 120, autocomplete: "name" },
      { id: "C2", name: "empresa", tipo: "texto", texto: "Empresa", max: 160, autocomplete: "organization", se: { semAnexo: "ficha_cadastral" },
        extra: { name: "cnpj", quando: "*", tipo: "texto", texto: "CNPJ (opcional)", max: 18 } },
      { id: "C3", name: "email", tipo: "email", texto: "E-mail", obrigatoria: true, max: 160, autocomplete: "email" },
      { id: "C4", name: "telefone", tipo: "telefone", texto: "Telefone ou WhatsApp, com DDD", obrigatoria: true, autocomplete: "tel" },
      { id: "C5", name: "canal_proposta", tipo: "opcoes", texto: "Como quer receber a proposta?", obrigatoria: true, opcoes: [
        { v: "whatsapp", texto: "WhatsApp" }, { v: "email", texto: "E-mail" }, { v: "ambos", texto: "Os dois" } ] },
      { id: "C5a", name: "whatsapp_mesmo", tipo: "opcoes", texto: "O telefone que você informou é o WhatsApp?", se: { C5: ["whatsapp", "ambos"] },
        extra: { name: "whatsapp", quando: "nao", tipo: "telefone", texto: "Número do WhatsApp, com DDD" }, opcoes: [
        { v: "sim", texto: "Sim" }, { v: "nao", texto: "Não, é outro" } ] },
      { id: "C6", name: "C6", tipo: "texto", texto: "Mais alguma coisa que devemos saber?", max: 1000, longo: true },
    ],
  },

  /* ---------- CONTATO ---------- */
  contato: {
    titulo: "Fale com a CGL Fundações",
    chamada: "Estamos prontos para atender sua obra",
    endereco: "Avenida Hematita, 562 — Distrito Industrial, Itabira/MG — CEP 35903-051",
    telefone: "(31) 3833-4100",
    celular: "(31) 9963-7452",
    whatsapp: "553199637452",             // só números, com 55 na frente
    email: "orcamento@cglfundacoes.com.br",
    horario: "Segunda a sexta, 8h às 18h",
    // Link do mapa: abra o Google Maps no endereço e cole o link "Incorporar mapa".
    mapaIncorporar: "https://www.google.com/maps?q=Avenida+Hematita+562+Distrito+Industrial+Itabira+MG&output=embed",
  },

  /* ---------- RODAPÉ ---------- */
  rodape: {
    texto: "CGL Fundações — Engenharia de fundações desde 1997.",
    cnpj: "CNPJ 25.290.743/0001-74",
  },
};
