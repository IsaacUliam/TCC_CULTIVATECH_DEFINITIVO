/**
 * Referências agronômicas pesquisadas para o catálogo Cultiva Tech.
 * Faixas são orientativas, não metas automáticas para sensores nem garantias
 * de desempenho hidropônico. Cada fonte informa a evidência que sustenta o registro.
 */
export interface PlantResearchSource {
  title: string;
  publisher: string;
  url: string;
  supports: string;
}

export interface PlantReferenceData {
  airHumidityRange: string;
  temperatureRangeC: string;
  growthCycleDays: string;
  cycleBasis: string;
  confidence: "high" | "medium" | "low";
  referenceNotes: string;
  sources: PlantResearchSource[];
}

export const plantReferenceData: Record<string, PlantReferenceData> = {
  alface: {
    airHumidityRange: "50–70% RH (umidade relativa do ar)",
    temperatureRangeC:
      "16–25 °C (faixa orientativa; varia com cultivar e sistema)",
    growthCycleDays: "35–80 dias",
    cycleBasis:
      "Semeadura até colheita/maturidade comercial. Em hidroponia controlada, o manual Cornell descreve colheita aos 35 dias da semeadura; NC State informa 50–60 dias da semeadura para alface de folhas e 70–80 dias para alface de cabeça. Em cultivo de campo da crespa, a Embrapa relata 62–65 dias incluindo fase de muda e cultivo após transplante.",
    confidence: "medium",
    referenceNotes:
      "A faixa de RH refere-se explicitamente ao ar da área de cultivo, não à umidade do solo nem à umidade de armazenamento pós-colheita; Cornell indica mínimo de 50% e máximo de 70%, faixa também atribuída a especialista de CEA da Cornell em publicação técnica. Temperatura varia por ambiente, cultivar e manejo: NC State cita 15,6–18,3 °C como ótimo para crescimento vegetativo; a Embrapa cita 20–25 °C como ideal; e estudo de cultivo controlado observou máximo de produção próximo de 24 °C. Calor persistente pode induzir pendoamento e reduzir qualidade. O ciclo depende do tipo (folhosa versus cabeça), cultivar, clima, luz e sistema; os extremos não são uma previsão única para todas as variedades listadas.",
    sources: [
      {
        publisher:
          "Cornell University Controlled Environment Agriculture Program",
        supports:
          "Set-points de RH do ar: mínimo 50% e máximo 70%; temperatura do ar 24 °C dia/19 °C noite; protocolo hidropônico semeia no dia 0 e colhe no dia 35.",
        title: "Hydroponic Lettuce Handbook",
        url: "https://cea.cals.cornell.edu/files/2019/06/Cornell-CEA-Lettuce-Handbook-.pdf",
      },
      {
        publisher:
          "Hort Americas (entrevista com Neil Mattson, Cornell University) ",
        supports:
          "Recomenda 50–70% de umidade relativa do ar para alface e folhosas e explica riscos associados a RH elevada ou abaixo de 50%.",
        title:
          "Monitoring is crucial for growing lettuce and leafy greens year-round",
        url: "https://hortamericas.com/blog/news/monitoring-is-crucial-for-growing-lettuce-and-leafy-greens-year-round/",
      },
      {
        publisher: "NC State Extension",
        supports:
          "Temperatura ótima para crescimento vegetativo em torno de 60–65 °F (15,6–18,3 °C); colheita de alface de folhas em 50–60 dias da semeadura e de cabeça em 70–80 dias da semeadura, com variação por cultivar e condições.",
        title: "Lettuce Production in North Carolina",
        url: "https://content.ces.ncsu.edu/lettuce",
      },
      {
        publisher: "Embrapa",
        supports:
          "Identifica tipos de alface, informa ciclo de produção geral de 45–60 dias e considera 20–25 °C ideal; menciona RH de armazenamento separadamente, não usada como faixa de cultivo.",
        title: "Manual de boas práticas agrícolas na produção de alface",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1009227/1/DOC142.pdf",
      },
      {
        publisher: "Embrapa Semiárido",
        supports:
          "Para alface crespa, documenta 62 dias de ciclo sob temperaturas elevadas e 65 dias sob temperaturas amenas, contando 30 dias de muda desde a semeadura e cultivo após transplante; registra as condições de temperatura locais.",
        title: "Cultivo de alface-crespa no Submédio do Vale do São Francisco",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1092024/1/Alface-Crespa.2018.pdf",
      },
      {
        publisher:
          "Frontiers in Plant Science (artigo revisado por pares; disponível no PubMed Central)",
        supports:
          "Experimento de cultivo controlado testa temperaturas do ar de 20, 24, 28 e 32 °C; produção atingiu máximo próximo de 24 °C. O ciclo experimental foi de 29 dias após transplante, com mudas transplantadas aos 19 dias após semeadura.",
        title:
          "Plant Factories Are Heating Up: Hunting for the Best Combination of Light Intensity, Air Temperature and Root-Zone Temperature in Lettuce Production",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7876451/",
      },
    ],
  },
  rucula: {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para uma faixa recomendada de umidade relativa do ar (% RH).",
    temperatureRangeC: "10–18 °C",
    growthCycleDays: "35–49 dias (referência central: aproximadamente 42 dias)",
    cycleBasis:
      "Da semeadura à primeira colheita comercial de folhas. Em cultivo hidropônico NFT, estudo brasileiro colheu aos 42 dias após semeadura (30 dias após transplante); Oregon State relata 6–7 semanas após semeadura. Cultivares e sistemas podem antecipar ou atrasar a colheita. Para baby leaf, a literatura relata colheita aos 21 dias após transplante (o marco não é a semeadura).",
    confidence: "medium",
    referenceNotes:
      "Faixa térmica orientativa: UF/IFAS informa melhor crescimento entre 10–18 °C e autores agrônomos da UFRRJ apontam produção melhor sob temperaturas amenas de 15–18 °C. Temperaturas mais altas favorecem pendoamento e folhas menores/mais rígidas. O intervalo de UR não foi apresentado como recomendação: estudos hidropônicos reportam umidades observadas em seus ambientes experimentais, mas isso não estabelece faixa ótima generalizável. O ciclo depende de cultivar, ambiente, sistema e tamanho de folha desejado; Cornell descreve folhas colhíveis já a partir de cerca de quatro semanas em condições favoráveis.",
    sources: [
      {
        publisher: "UF/IFAS Extension, University of Florida",
        supports:
          "Recomenda 10–18 °C como faixa em que a rúcula cresce melhor; observa risco de pendoamento no calor.",
        title: "Arugula: Planting and Care",
        url: "https://blogs.ifas.ufl.edu/leonco/2023/11/09/arugula-planting-and-care/",
      },
      {
        publisher:
          "Campo & Negócios (artigo assinado por agrônomos vinculados à UFRRJ)",
        supports:
          "Indica melhor produção em temperaturas amenas de 15–18 °C e ciclo relativamente curto de 30–40 dias; comenta queda de qualidade sob calor.",
        title: "Produção de rúcula sob telados em regiões quentes",
        url: "https://campoenegocios.com/producao-de-rucula-sob-telados-em-regioes-quentes/",
      },
      {
        publisher:
          "Horticultura Brasileira / SciELO; Universidade Federal Rural do Rio de Janeiro",
        supports:
          "Ensaio NFT colheu aos 42 dias após semeadura ou 30 dias após transplante; descreve UR medida no experimento, sem estabelecer faixa recomendada.",
        title:
          "Produtividade de rúcula hidropônica cultivada em diferentes épocas do ano e vazões de solução nutritiva",
        url: "https://www.scielo.br/j/hb/a/VQPVyMpPR58ZfhB8VWc3BSR/?format=pdf&lang=pt",
      },
      {
        publisher: "Oregon State University, Department of Horticulture",
        supports:
          "Informa maturação aproximada de 40–50 dias e colheita geralmente 6–7 semanas após semeadura em campo; registra 90–95% RH apenas como condição temporária de armazenamento pós-colheita, não como recomendação de cultivo.",
        title: "Arugula",
        url: "https://horticulture.oregonstate.edu/oregon-vegetables/arugula-0",
      },
      {
        publisher: "Cornell University, Garden-Based Learning",
        supports:
          "Informa que a cultura pode estar pronta para colheita já em cerca de quatro semanas após semeadura, qualificando essa duração como precoce.",
        title: "Arugula growing guide",
        url: "https://gardening.cals.cornell.edu/garden-guidance/foodgarden/vegetable-growing-guides/arugula/",
      },
      {
        publisher: "Horticulturae (MDPI), artigo revisado por pares",
        supports:
          "Compara colheita baby leaf a 21 dias após transplante e colheita tradicional a 42 dias após transplante; relata condições experimentais de temperatura e UR, sem prescrever alvo de UR.",
        title:
          "Influence of the Culture System and Harvest Time on the Specialized Metabolite Composition of Eruca sativa",
        url: "https://www.mdpi.com/2311-7524/9/2/235",
      },
    ],
  },
  agriao: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "15–26 °C (orientativo; noite: 15–20 °C; dia: aproximadamente 20–25/26 °C).",
    growthCycleDays:
      "35–50 dias para o primeiro corte, como faixa orientativa para agrião-d'água; em hidroponia DFT, estudo avaliou colheita aos 35 e 56 dias após transplante.",
    cycleBasis:
      "A faixa de 35–50 dias conta do plantio/semeadura até a primeira colheita, conforme referências de produção. Em sistema hidropônico com mudas de duas semanas, 35–56 dias após transplante equivalem aproximadamente a 49–70 dias desde a semeadura. Ciclos subsequentes de rebrota são distintos.",
    confidence: "medium",
    referenceNotes:
      "Os dados técnicos localizados referem-se principalmente ao agrião-d'água (Nasturtium officinale, também tratado na literatura como Rorippa nasturtium-aquaticum), não validam automaticamente o agrião-da-terra. A duração varia com estação, cultivar, sistema e critério de corte; em DFT hidropônico, a colheita aos 35 DAT favoreceu rendimento, enquanto 56 DAT foi avaliado para outros objetivos de qualidade. A UR de 90–95% mencionada em uma fonte é para armazenamento/pós-colheita, não recomendação de umidade do ar durante o cultivo, portanto não foi usada.",
    sources: [
      {
        publisher: "Utah State University Extension",
        supports:
          "Cultivo de agrião-d'água; germinação em condições frescas e preferência por períodos mais frios; sabor piora acima de 85 °F. Não fornece recomendação de UR de cultivo nem ciclo fixo.",
        title: "How to Grow Watercress in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/watercress-in-the-garden",
      },
      {
        publisher: "West Virginia University Research Repository (tese) ",
        supports:
          "Temperaturas de crescimento citadas: 20–25 °C de dia e 15–20 °C à noite; colheita por volta de 35 dias no verão e 50 dias na primavera/outono, ou 6–7 semanas após semeadura. A UR de 90–95% citada é para armazenamento do produto.",
        title:
          "Watercress (Nasturtium officinale) production utilizing brook water in a flow-through aquaponic system",
        url: "https://researchrepository.wvu.edu/cgi/viewcontent.cgi?article=5373&context=etd",
      },
      {
        publisher: "University of Hawaii at Mānoa, CTAHR",
        supports:
          "Guia técnico de hidroponia: ciclo normal da semeadura à colheita de 5–7 semanas; cultivos semeados colhidos em média aos 36 e 45 dias nos dois locais avaliados; muda de 2–3 semanas reduz o tempo nos tanques.",
        title:
          "Growing Direct-Seeded Watercress by Two Non-Circulating Hydroponic Methods",
        url: "https://www3.ctahr.hawaii.edu/oc/freepubs/pdf/vc-7.pdf",
      },
      {
        publisher:
          "Horticultural Science and Technology (artigo revisado por pares)",
        supports:
          "Experimento hidropônico DFT avaliou colheitas aos 35 e 56 dias após transplante, com mudas de duas semanas, mostrando dependência do objetivo de produção e do manejo.",
        title:
          "Optimizing Plant Spacing and Harvest Time for Yield and Glucosinolate Accumulation in Watercress (Nasturtium officinale L.) Grown in a Hydroponic System",
        url: "https://www.hst-j.org/articles/xml/Rm0o/",
      },
      {
        publisher: "Pesquisa Agropecuária Brasileira / SciELO",
        supports:
          "Estudo brasileiro revisado por pares: primeira colheita aos 38 dias após transplante; caracteriza o agrião-d'água como adaptado a clima ameno e observa estresse em condições de máximas de 30–39 °C.",
        title:
          "Desempenho produtivo do agrião d'água cultivado em solo sob telas de sombreamento",
        url: "https://www.scielo.br/j/pab/a/SwVrYHBHDbxCCV5VQCgKkQn/?lang=pt",
      },
      {
        publisher: "CABI Compendium",
        supports:
          "Compêndio de espécie reporta temperatura de crescimento de aproximadamente 20–26 °C durante o dia e 15–20 °C à noite, corroborando a orientação térmica; conteúdo integral sujeito a acesso.",
        title: "Nasturtium officinale (watercress)",
        url: "https://www.cabidigitallibrary.org/doi/full/10.1079/cabicompendium.35646",
      },
    ],
  },
  espinafre: {
    airHumidityRange:
      "60–70% RH (orientativa durante o crescimento; não é umidade do solo)",
    temperatureRangeC:
      "15–25 °C para crescimento; faixa mais amena favorece qualidade e reduz florescimento precoce",
    growthCycleDays: "37–50 dias",
    cycleBasis:
      "Semeadura direta até colheita de folhas comercializáveis; em hidroponia convencional, a UGA informa 2–3 semanas da semeadura ao transplante e mais 3–4 semanas até a colheita. Sistemas de baby leaf podem colher mais cedo (14–16 dias, conforme o protocolo Cornell).",
    confidence: "medium",
    referenceNotes:
      "Faixas variam conforme cultivar, estação, estágio, densidade e sistema. A faixa de UR 60–70% corresponde ao intervalo comum às recomendações técnicas consultadas: Cornell estabelece 50–70% para produção hidropônica de baby spinach e estudo com Viroflay apresenta 60–75% como condição agroclimática adequada (embora relate cerca de 75% para esse cultivar/sistema). Para germinação, o manual Cornell recomenda ambiente próximo de 100% UR até a emergência; esse valor não é a recomendação para o ciclo de crescimento. Temperatura 15–25 °C é uma faixa ampla orientativa; a extensão da UGA especifica 15–25 °C para crescimento, e as fontes indicam preferência por condições frescas e risco de pendoamento/queda de qualidade no calor. O ciclo informado é para folhas de tamanho comercial, não para produção de sementes; baby leaf hidropônico pode completar-se em cerca de 14–16 dias conforme o protocolo.",
    sources: [
      {
        publisher: "University of Georgia Cooperative Extension",
        supports:
          "Temperatura ótima de crescimento 15–25 °C; mudas em geral ficam 2–3 semanas após semeadura antes do transplante e a colheita ocorre 3–4 semanas depois.",
        title:
          "How to Grow Greenhouse Spinach During Georgia Summers Using Hydroponics",
        url: "https://fieldreport.caes.uga.edu/publications/C1304/how-to-grow-greenhouse-spinach-during-georgia-summers-using-hydroponics/",
      },
      {
        publisher: "Sensors (MDPI), via PubMed Central",
        supports:
          "Tabela de condições agroclimáticas indica temperatura de crescimento 15–25 °C e UR 60–75%; contextualiza as recomendações para cultivar Viroflay e cultivo controlado.",
        title:
          "Spinach (Spinacia oleracea L.) Growth Model in Indoor Controlled Environment Using Agriculture 4.0",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11944551/",
      },
      {
        publisher: "Cornell University Controlled Environment Agriculture",
        supports:
          "Setpoint de UR mínima 50% e máxima 70% no sistema hidropônico descrito; colheita de baby spinach aproximadamente 14–16 dias após o início do protocolo de produção; UR próxima de 100% indicada apenas para germinação até emergência.",
        title:
          "Hydroponic Spinach Handbook: A Guide to Growing Baby Spinach in a Controlled Environment",
        url: "https://cea.cals.cornell.edu/files/2019/06/Cornell-CEA-baby-spinach-handbook.pdf",
      },
      {
        publisher: "UMass Extension / New England Vegetable Management Guide",
        supports:
          "Colheita geralmente 37–45 dias após semeadura, podendo demorar mais no fim do outono e inverno; descreve espinafre como cultura de clima fresco.",
        title: "Spinach",
        url: "https://nevegetable.org/crops/spinach",
      },
      {
        publisher:
          "UC Master Gardener Program of Sonoma County, University of California Agriculture and Natural Resources",
        supports:
          "Mostra variedades com maturidade usual em 40–50 dias e ressalta influência de variedade e época de cultivo.",
        title: "Spinach",
        url: "https://ucanr.edu/site/mg-sonoma/spinach",
      },
    ],
  },
  "couve-manteiga": {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "16–25 °C (faixa orientativa de temperatura do ar para crescimento).",
    growthCycleDays: "60–90 dias",
    cycleBasis:
      "Do transplante da muda ao início da colheita das primeiras folhas. A couve-manteiga brasileira é frequentemente propagada vegetativamente; o período refere-se à primeira colheita, não à duração total da produção, que pode se estender por vários meses.",
    confidence: "medium",
    referenceNotes:
      "As fontes para temperatura usam contextos e métricas distintos: o IAC relata melhor produção em São Paulo com temperaturas médias mensais de 16–22 °C e aponta possíveis danos acima de 28 °C; estudo sobre collards indica faixa ótima de crescimento de 10–25 °C. A faixa apresentada é uma síntese orientativa, não um setpoint validado especificamente para hidroponia. O ciclo varia conforme cultivar, forma de propagação e manejo: para couve de folha propagada por mudas, o IAC situa a primeira colheita em 2–3 meses após transplante; valores de collards semeados diretamente não são equivalentes. Não foi encontrada faixa recomendada confiável de umidade relativa do ar para esta espécie; não se trata de umidade do solo.",
    sources: [
      {
        publisher:
          "Instituto Agronômico (IAC), Secretaria de Agricultura e Abastecimento do Estado de São Paulo",
        supports:
          "Espécie brasileira: produção melhor com médias mensais de 16–22 °C, temperaturas máximas de 28 °C; início da colheita 2–3 meses após transplante; ciclo de produção prolongado por 6–8 meses.",
        title:
          "Couve de folha: do plantio à pós-colheita (Boletim Técnico 214)",
        url: "https://www.iac.sp.gov.br/media/publicacoes/iacbt214.pdf",
      },
      {
        publisher:
          "Professional Agricultural Workers Journal / Tuskegee University Scholarly Publications (2022)",
        supports:
          "Artigo de pesquisa sobre collards: indica temperatura ótima de crescimento entre 10 e 25 °C e crescimento mais lento ou interrompido acima de 27 °C; referência comparativa para temperatura, não ensaio hidropônico de couve-manteiga brasileira.",
        title:
          "Two Inter-Row Spacing and Staggered Planting on Collard Greens in Wiregrass Tunnel House",
        url: "https://tuspubs.tuskegee.edu/cgi/viewcontent.cgi?article=1190&context=pawj",
      },
      {
        publisher: "Embrapa Hortaliças / Embrapa",
        supports:
          "Tabela registra couve plantada por muda/cova e colheita em 80–90 dias após o plantio; apoio independente para a ordem de grandeza do ciclo.",
        title:
          "Tabela 1: Informações gerais sobre plantio de hortaliças — Curso online Hortas em Pequenos Espaços",
        url: "https://www.embrapa.br/documents/1355126/2502095/tabela+de+informa%C3%A7%C3%B5es+para+o+plantio.docx+%281%29.pdf/66c01c27-30bf-8de4-9691-0dd365746d3f",
      },
      {
        publisher: "Oklahoma State University Extension",
        supports:
          "Tabela de collard recomenda 70–85 dias até colheita desde semeadura direta, reduzindo 10–14 dias quando transplantado; corroborativo para ciclo, com sistema de propagação explicitado.",
        title:
          "Cool Season Greens Production (Spinach, Collard, Kale, Mustard, Turnip, Leaf Lettuce) (HLA-6031)",
        url: "https://extension.okstate.edu/fact-sheets/cool-season-greens-production-spinach-collard-kale-mustard-turnip-leaf-lettuce",
      },
      {
        publisher:
          "Clemson Cooperative Extension, Home & Garden Information Center",
        supports:
          "Indica colheita de collards 60–80 dias após semeadura direta, conforme cultivar; fonte independente de apoio comparativo para ciclo.",
        title: "Collards (HGIC 1307)",
        url: "https://hgic.clemson.edu/factsheet/collards/",
      },
    ],
  },
  "couve-chinesa": {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para cultivo. Não confundir com umidade relativa de armazenamento: uma fonte de extensão informa 95–100% RH para conservação pós-colheita.",
    temperatureRangeC:
      "15–20 °C (faixa orientativa de crescimento; fontes consultadas indicam ótimo em 15–20 °C e 18–20 °C).",
    growthCycleDays:
      "40–60 dias (orientativo para colheita comercial; o intervalo pode se estender conforme cultivar e tamanho de colheita).",
    cycleBasis:
      "Da semeadura ou do transplante à maturidade/colheita comercial, conforme Rutgers; UF/IFAS especifica 40–50 dias após a semeadura. RHS informa 8–10 semanas para plantas semi-maduras ou de tamanho completo. Colheita como folhas baby pode ocorrer mais cedo (cerca de 4 semanas), mas não representa o ciclo de uma roseta madura.",
    confidence: "medium",
    referenceNotes:
      "As temperaturas ótimas reportadas por Rutgers e UF/IFAS convergem para clima fresco (15–20 °C). O ciclo varia com cultivar, condições de cultivo e estágio/tamanho na colheita; os 40–60 dias são uma faixa geral, não uma previsão específica para hidroponia. Embora as fontes descrevam condições frescas e úmidas, não foi localizada faixa confiável de umidade relativa do ar para o cultivo desta espécie; a RH de armazenamento citada por Rutgers é pós-colheita e não deve ser usada como recomendação de cultivo.",
    sources: [
      {
        publisher:
          "Rutgers Cooperative Extension / New Jersey Agricultural Experiment Station",
        supports:
          "Ótimo de temperatura para crescimento de 15–20 °C; maturidade em 35–60 dias após semeadura/transplante, conforme cultivar; 95–100% RH indicado somente para armazenamento pós-colheita.",
        title:
          "Bok Choys (Chinese Cabbages) (Brassica rapa chinensis), Fact Sheet 1113",
        url: "https://njaes.rutgers.edu/pubs/download.php?strPubID=FS1113",
      },
      {
        publisher: "UF/IFAS Extension, University of Florida",
        supports:
          "Crescimento melhor a 18–20 °C; colheita normalmente 40–50 dias após semeadura, no estágio de 10–15 folhas; data depende de temperatura, fertilidade e umidade do solo.",
        title:
          "Bok Choy, an Asian Leafy Green Vegetable Emerging in Florida (HS1337)",
        url: "https://ask.ifas.ufl.edu/publication/HS1337",
      },
      {
        publisher: "Royal Horticultural Society (RHS)",
        supports:
          "Contextualiza como cultura de estação fresca; indica cerca de quatro semanas para folhas baby e oito a dez semanas para plantas semi-maduras ou de tamanho completo, mostrando variação conforme estágio de colheita.",
        title: "How to Grow Pak choi",
        url: "https://www.rhs.org.uk/vegetables/pak-choi/grow-your-own",
      },
    ],
  },
  almeirao: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "12–24 °C (faixa orientativa para a cultura; não específica a hidroponia).",
    growthCycleDays: "50–75 dias",
    cycleBasis:
      "Da semeadura até a colheita/maturidade comercial. A faixa varia com cultivar e sistema: estudo protegido com Folha Larga e Pão-de-Açúcar recomenda colher até 64 dias após semeadura; outro ensaio colheu aos 50 dias após transplante, realizado aos 25 dias após semeadura (aprox. 75 dias da semeadura).",
    confidence: "medium",
    referenceNotes:
      "A faixa de temperatura de 12–24 °C consta em manual técnico para almeirão, que cita Folha-larga e Pão-de-açúcar. Ensaio de germinação com Cichorium intybus observou bons resultados em temperaturas moderadas, mas germinação não equivale a temperatura ótima durante todo o cultivo. Os dados de ciclo vêm de ensaios em canteiro/cultivo protegido, não de uma recomendação hidropônica uniforme; ajustar conforme cultivar, clima e sistema. A informação de umidade é de UMIDADE RELATIVA DO AR, não umidade do solo; não foi encontrada recomendação confiável específica para a espécie.",
    sources: [
      {
        publisher: "Embrapa (cópia digital hospedada pela Biblioteca AGPTEA)",
        supports:
          "Faixa ideal de temperatura 12–24 °C; lista cultivares Folha-larga e Pão-de-açúcar e indica colheita das folhas 50–60 dias após semeadura.",
        title: "Hortaliças – Coleção Plantar Embrapa (seção Almeirão)",
        url: "https://www.bibliotecaagptea.org.br/agricultura/olericultura/livros/HORTALICAS%20COLECAO%20PLANTAR%20EMBRAPA.pdf",
      },
      {
        publisher:
          "Horticultura Brasileira / Instituto Agronômico (IAC) e USP-ESALQ",
        supports:
          "Ensaio com Folha Larga e Pão-de-Açúcar; avaliações aos 50, 57, 64 e 71 dias após semeadura; recomenda colheita até 64 dias com base na área foliar.",
        title:
          "Desempenho de três cultivares de almeirão sob cultivo protegido",
        url: "https://www.scielo.br/j/hb/a/8CcgwKV6LZgyRMncYfPj63k/",
      },
      {
        publisher: "Horticultura Brasileira / Instituto Agronômico (IAC)",
        supports:
          "Inclui Folha Larga e Pão-de-Açúcar; mudas transplantadas 25 dias após semeadura e colheita/avaliação aos 50 dias após transplante, equivalente a cerca de 75 dias após semeadura.",
        title: "Desempenho agronômico de quatro cultivares de almeirão",
        url: "https://www.scielo.br/j/hb/a/mFDQCD75ThNyRzS3mrLdyQM/?lang=pt",
      },
      {
        publisher:
          "Revista Brasileira de Agroecologia / Universidade de Brasília (periódico)",
        supports:
          "Estudo experimental com Cichorium intybus: germinação e vigor favoráveis a 20–25 °C, informação útil como evidência complementar de temperatura, mas restrita à germinação.",
        title:
          "Germinação de sementes e formação de plântulas de almeirão em diferentes temperaturas e substratos",
        url: "https://periodicos.unb.br/index.php/rbagroecologia/article/download/49859/37864",
      },
      {
        publisher: "Embrapa Hortaliças",
        supports:
          "Tabela técnica indica almeirão como muda/canteiro e colheita em 60–70 dias após o plantio; não esclarece explicitamente no trecho se o marco temporal é semeadura ou transplante.",
        title: "Tabela 1: Informações gerais sobre plantio de hortaliças",
        url: "https://www.embrapa.br/documents/1355126/2502095/tabela+de+informa%C3%A7%C3%B5es+para+o+plantio.docx+%281%29.pdf/66c01c27-30bf-8de4-9691-0dd365746d3f",
      },
    ],
  },
  "chicoria-escarola": {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para cultivo. As faixas de 95–100% RH encontradas referem-se ao armazenamento pós-colheita, não à umidade do ar recomendada durante o cultivo.",
    temperatureRangeC:
      "15–21 °C (faixa orientativa; ótimo próximo de 15–18 °C)",
    growthCycleDays: "70–100 dias",
    cycleBasis:
      "Semeadura até colheita/maturidade comercial. É uma faixa orientativa para folhas/cabeças maduras: estudo de campo com cultivar Escarola Lisa® registrou 71–93 dias da semeadura à colheita conforme estação; extensões universitárias indicam cerca de 70–100 dias ou cultivares em torno de 85–98 dias. O ciclo pode mudar com cultivar, temperatura, estação e sistema.",
    confidence: "medium",
    referenceNotes:
      "Fontes tratam principalmente do cultivo convencional em campo, não de hidroponia; use como referência inicial, não como valor validado para cada sistema hidropônico. A faixa térmica sintetiza indicação de ótimo de 15–18 °C e faixa de cultivo amena até cerca de 21 °C. A umidade relativa citada por fontes para escarola é de conservação pós-colheita e foi excluída como recomendação de cultivo.",
    sources: [
      {
        publisher:
          "Semina: Ciências Agrárias / Universidade Estadual de Londrina (artigo científico, 2018)",
        supports:
          "Tabela 1 informa datas de semeadura e colheita de quatro ciclos; diferença calculada entre essas datas corresponde a 71–93 dias. O estudo relata efeito de estação e temperatura no ciclo.",
        title: "Growth of escarole in different seasons of year, RS, Brazil",
        url: "https://ojs.uel.br/revistas/uel/index.php/semagrarias/article/download/28513/23181/151582",
      },
      {
        publisher: "NC State Extension, North Carolina State University",
        supports:
          "Descreve escarola e endívia como variedades da espécie, período de crescimento aproximado de 70–100 dias e melhor crescimento entre 60–65 °F (aprox. 15,6–18,3 °C).",
        title: "Cichorium endivia",
        url: "https://plants.ces.ncsu.edu/plants/cichorium-endivia/",
      },
      {
        publisher:
          "University of Georgia, College of Agricultural and Environmental Sciences",
        supports:
          "Cultivares listadas levam 85–98 dias até maturidade; recomenda cultivo ameno, com temperaturas de crescimento entre 60–70 °F (aprox. 15,6–21,1 °C).",
        title: "Endive, Escarole Dress Up Winter Salads",
        url: "https://fieldreport.caes.uga.edu/news/endive-escarole-dress-up-winter-salads/",
      },
      {
        publisher: "Oregon State University, Department of Horticulture",
        supports:
          "Indica ciclo aproximado de 90 dias para variedades de endívia e informa que a cultura se desenvolve melhor em temperaturas frescas. A umidade relativa de 95–100% descrita nesta página é para armazenamento pós-colheita, não para cultivo.",
        title: "Endive and Escarole",
        url: "https://horticulture.oregonstate.edu/oregon-vegetables/endive-and-escarole-0",
      },
      {
        publisher:
          "Penn State PlantVillage (referências indicadas incluem University of Arkansas Division of Agriculture)",
        supports:
          "Indica temperatura ótima de crescimento de 15–18 °C para endívia (Cichorium endivia).",
        title: "Endive",
        url: "https://plantvillage.psu.edu/topics/endive/infos",
      },
      {
        publisher: "UF/IFAS Extension, University of Florida",
        supports:
          "Confirma a identidade botânica das formas de escarola e endívia e cita 95–100% RH somente para armazenamento após colheita, não como faixa de umidade para cultivo.",
        title:
          "Escarole and Endive: Nutritious Leafy Vegetables with High Potential for Floridians",
        url: "https://ask.ifas.ufl.edu/publication/HS1489",
      },
    ],
  },
  acelga: {
    airHumidityRange: "60–80% RH",
    temperatureRangeC: "15–25 °C",
    growthCycleDays: "60–70 dias",
    cycleBasis:
      "Dias do plantio no canteiro/local de cultivo até o início da colheita; a referência Embrapa descreve plantio por muda ou diretamente no canteiro e informa início da colheita após 60–70 dias. Não contabiliza explicitamente o período de viveiro quando se transplantam mudas.",
    confidence: "medium",
    referenceNotes:
      "As faixas são orientativas e não uma receita hidropônica validada por cultivar. A faixa de UR de 60–80% foi localizada em uma única fonte técnica consultada que trata explicitamente da acelga; não foi encontrada confirmação independente suficiente para RH. Não confundir com a umidade relativa de 95% citada por Maryland para armazenamento pós-colheita. Temperatura varia conforme clima, cultivar e sistema: a Embrapa aponta 15–25 °C para acelga, enquanto Campo & Negócios reporta respostas produtivas entre 15–30 °C e Utah State indica melhor crescimento quando a temperatura não excede 75 °F (≈24 °C). O ciclo varia com cultivar e ponto/tipo de colheita; outras extensões apresentam aproximadamente 50–70 dias da semeadura ou cerca de dois meses para colheita em maço.",
    sources: [
      {
        publisher:
          "Campo & Negócios (artigo técnico com autores ligados à UFMT e agronomia)",
        supports:
          "Atribui à acelga respostas produtivas com UR do ar de 60–80%; também reporta temperatura entre 15 e 30 °C. Fonte localizada para a faixa de RH, sem segunda confirmação independente suficiente.",
        title: "Como cultivar acelgas",
        url: "https://campoenegocios.com/como-cultivar-acelgas/",
      },
      {
        publisher: "Embrapa Hortaliças / Sebrae",
        supports:
          "Para Beta vulgaris L. var. cicla, recomenda 15–25 °C e início de colheita 60–70 dias após o plantio; menciona semeadura em bandejas ou diretamente no canteiro.",
        title: "Catálogo Brasileiro de Hortaliças",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/887213/1/Catalogohortalicas.pdf",
      },
      {
        publisher: "Embrapa, Curso Hortas em Pequenos Espaços",
        supports:
          "Para acelga plantada como muda/canteiro, indica colheita 60–70 dias após o plantio.",
        title: "Tabela 1: Informações gerais sobre plantio de hortaliças",
        url: "https://www.embrapa.br/documents/1355126/2502095/tabela+de+informa%C3%A7%C3%B5es+para+o+plantio.docx+%281%29.pdf/66c01c27-30bf-8de4-9691-0dd365746d3f",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "Indica melhor crescimento quando temperaturas não excedem 75 °F (aprox. 24 °C); contextualiza que calor reduz crescimento e qualidade.",
        title: "How to Grow Swiss Chard in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/swiss-chard-in-the-garden",
      },
      {
        publisher: "University of Wisconsin–Madison Extension",
        supports:
          "Descreve preferência por temperaturas amenas; informa colheita em maço geralmente por volta de dois meses, variável por variedade, e maturidade de cultivares em 55–65 dias.",
        title: "Swiss Chard",
        url: "https://hort.extension.wisc.edu/articles/swiss-chard/",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Indica 50–70 dias para maturidade a partir de semeadura direta; os 95% RH mencionados são para armazenamento refrigerado, não recomendação de umidade do ar durante o cultivo.",
        title: "Growing Swiss Chard in a Home Garden",
        url: "https://extension.umd.edu/resource/growing-swiss-chard-home-garden",
      },
    ],
  },
  "mostarda-folhas": {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "Não localizada em fonte técnica suficiente como faixa completa; recomenda-se cultivo em condições frescas, sem exceder aproximadamente 24 °C.",
    growthCycleDays:
      "35–50 dias (referência orientativa; cultivares/condições podem variar aproximadamente de 25 a 60 dias).",
    cycleBasis:
      "Da semeadura ao ponto de colheita/maturidade das folhas. A faixa varia com cultivar e sistema; colheita de folhas jovens pode ocorrer antes da maturidade plena.",
    confidence: "medium",
    referenceNotes:
      "As fontes consultadas descrevem mostarda folhosa cultivada em campo/jardim, não estabelecem parâmetros específicos para hidroponia. Para temperatura, fontes de extensão convergem em classificá-la como cultura de estação fresca e recomendam crescimento abaixo de cerca de 24 °C (75 °F); não foi possível confirmar um limite mínimo apropriado para compor uma faixa completa. UR relativa do ar em produção não foi localizada; valores de alta UR encontrados referem-se à conservação pós-colheita e não foram usados como recomendação de cultivo. O ciclo depende da cultivar: Clemson informa 25–50 dias da semeadura, Arkansas lista 35–50 dias por cultivar e UF/IFAS informa 45–50 dias após plantio para cultivares recomendadas.",
    sources: [
      {
        publisher: "University of Florida, IFAS Extension",
        supports:
          "Brassica juncea para folhas; a germinação estagna acima de 29,4 °C ou abaixo de 4,4 °C; colheita em geral 45–50 dias após plantio para cultivares recomendadas; cultura de estação fresca.",
        title: "Chinese Mustard Cultivation Guide for Florida (HS1402)",
        url: "https://ask.ifas.ufl.edu/publication/HS1402",
      },
      {
        publisher: "Clemson Cooperative Extension",
        supports:
          "Mostardas (Brassica juncea) atingem maturidade entre 25 e 50 dias da semeadura, variando conforme cultivar; plantios de primavera podem florescer com temperaturas mais quentes.",
        title: "Arugula, Kale, Mesclun, Mustard, and Swiss Chard (HGIC 1329)",
        url: "https://hgic.clemson.edu/factsheet/arugula-kale-mesclun-mustard-and-swiss-chard/",
      },
      {
        publisher:
          "University of Arkansas System Division of Agriculture Cooperative Extension",
        supports:
          "Ciclo de maturidade por cultivar: Savannah Hybrid 35, Tendergreen 40, Florida Broadleaf/Red Giant 45 e Southern Giant Curled 50 dias; descreve a mostarda como cultura de estação fresca.",
        title: "Mustard Greens (FSA6072)",
        url: "https://www.uaex.uada.edu/publications/PDF/FSA-6072.pdf",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "A mostarda cresce melhor quando as temperaturas não excedem 75 °F (23,9 °C); plantas jovens toleram até 32 °F (0 °C) sem dano sério. O limite inferior indica tolerância ao frio, não temperatura ótima mínima.",
        title: "How to Grow Mustard in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/mustard-in-the-garden",
      },
      {
        publisher: "Texas A&M AgriLife Extension Service",
        supports:
          "Cultura de estação fresca; temperaturas prolongadas acima de 75 °F (23,9 °C) reduzem crescimento/qualidade e a colheita comercial é indicada em 40–60 dias após plantio. UR de 90–95% citada somente para condições de trânsito/pós-colheita, não para cultivo.",
        title: "Mustard Greens",
        url: "https://aggie-horticulture.tamu.edu/vegetable/wp-content/uploads/sites/10/2011/10/mustardgreens1.pdf",
      },
    ],
  },
  radicchio: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "15,5–24 °C (faixa orientativa; melhor desempenho em clima fresco, com ótimo citado de 15,5–18,3 °C)",
    growthCycleDays: "75–85 dias",
    cycleBasis:
      "Do plantio/semeadura à maturidade/colheita do repolho: orientação para cultivo de outono. As referências consultadas não padronizam claramente o marco inicial em todos os sistemas; em cultivo por mudas, o período após transplante pode diferir. Não é um ciclo hidroponicamente validado.",
    confidence: "medium",
    referenceNotes:
      "Radicchio é cultura de clima fresco. Johnny's indica crescimento ótimo a 15,5–18,3 °C; Utah State recomenda que temperaturas não excedam 23,9 °C e informa que calor reduz crescimento/qualidade e pode induzir florescimento. O ciclo varia por cultivar, época, tipo (forçante ou não) e sistema; UC ANR informa 80–85 dias em Salinas e Oregon State cerca de 80 dias. As fontes localizadas são principalmente de cultivo no solo/campo, não validação hidropônica específica. Os valores de 95–100% RH encontrados nas páginas UC ANR/Oregon State são para armazenamento pós-colheita, não umidade relativa do ar recomendada durante o cultivo, portanto não foram usados como recomendação de cultivo.",
    sources: [
      {
        publisher: "Utah State University Extension",
        supports:
          "Radicchio prefere temperaturas que não excedam 75°F (23,9°C); calor reduz crescimento e qualidade. Para plantio de outono, indica plantar 75–85 dias antes da maturidade esperada. RH de 95% é apresentada apenas como condição de armazenamento.",
        title: "How to Grow Chicory in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/chicory-in-the-garden",
      },
      {
        publisher:
          "UC ANR Small Farms Network / University of California Agriculture and Natural Resources",
        supports:
          "Indica período de crescimento de 80–85 dias em Salinas Valley; descreve tolerância a frio e variação por cultivar/época. RH 95–100% é recomendação pós-colheita/armazenamento, não do ar durante o cultivo.",
        title: "Radicchio: Specialty Crop",
        url: "https://ucanr.edu/program/uc-small-farms-network/radicchio-specialty-crop",
      },
      {
        publisher: "Oregon State University, Department of Horticulture",
        supports:
          "Indica aproximadamente 80 dias e melhor desempenho em temperaturas frescas; informa RH de 98–100% especificamente para armazenamento.",
        title: "Radicchio",
        url: "https://horticulture.oregonstate.edu/oregon-vegetables/radicchio-0",
      },
      {
        publisher: "Johnny's Selected Seeds Grower's Library",
        supports:
          "Indica cultura de clima fresco com melhor crescimento a 60–65°F (15,5–18,3°C), identifica ciclo contado desde transplante de primavera/clima fresco e acrescenta cerca de 14 dias para semeadura direta; informa variação sazonal/cultivar.",
        title: "Radicchio - Key Growing Information",
        url: "https://www.johnnyseeds.com/growers-library/vegetables/chicory/radicchio-key-growing-information.html",
      },
    ],
  },
  mentrasto: {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente. Um estudo brasileiro descreve 80% de umidade relativa média anual no local experimental, mas isso é caracterização ambiental, não recomendação para a espécie.",
    temperatureRangeC:
      "20–25 °C (faixa de crescimento mais favorável; sobrevivência reportada entre 15–30 °C)",
    growthCycleDays:
      "60–130 dias (faixa orientativa, não específica de hidroponia)",
    cycleBasis:
      "Da germinação/semeadura à floração: uma ficha técnica relata menos de 2 meses. Para produção de biomassa/parte aérea, estudo brasileiro transplantou mudas aos 44 dias da semeadura e coletou material aos 84 dias após transplante, na floração (aprox. 128 dias da semeadura); por isso a faixa contempla ambos os marcos e propósitos. O ciclo pode variar com acesso, ambiente e objetivo de colheita.",
    confidence: "low",
    referenceNotes:
      "Mentrasto é uma erva anual medicinal/espontânea, não uma hortaliça folhosa com recomendação comercial de cultivo hidropônico bem estabelecida. As faixas são apenas referências preliminares extrapoladas de ecologia e ensaios em campo/vaso; não foram localizadas recomendações hidropônicas específicas. A temperatura ótima tem respaldo em revisão e compêndio, mas a faixa de ciclo varia conforme a definição do ponto de colheita. A umidade mencionada em estudo de local de cultivo não deve ser interpretada como faixa-alvo de RH.",
    sources: [
      {
        publisher: "Plants (MDPI), revisão revisada por pares",
        supports:
          "Indica crescimento mais favorável entre 20–25 °C e sobrevivência entre 15–30 °C; relata ciclos curtos em contextos regionais.",
        title:
          "Ecology, Biology, Environmental Impacts, and Management of an Agro-Environmental Weed Ageratum conyzoides",
        url: "https://www.mdpi.com/2223-7747/12/12/2329",
      },
      {
        publisher: "CABI Compendium",
        supports:
          "Ficha técnica informa crescimento ótimo em torno de 20–25 °C e ciclo de vida inferior a dois meses; valida a ordem de grandeza térmica e ciclo curto.",
        title: "Ageratum conyzoides (billy goat weed)",
        url: "https://www.cabidigitallibrary.org/doi/full/10.1079/cabicompendium.3572",
      },
      {
        publisher:
          "Revista Brasileira de Plantas Medicinais / Redalyc; estudo experimental com acessos da UFV",
        supports:
          "Relata 80% de RH média anual e 21 °C de temperatura média no local (não recomendação); mudas transplantadas aos 44 dias da semeadura, material aéreo coletado aos 84 dias após transplante na floração, com avaliações até 105 dias após transplante.",
        title:
          "Análise do crescimento de acessos de mentrasto (Ageratum conyzoides L.) em dois ambientes",
        url: "https://www.redalyc.org/pdf/1953/195317425008.pdf",
      },
      {
        publisher: "e-AFRINET / Lucidcentral",
        supports:
          "Relata que o ciclo de germinação a floração pode completar-se em menos de dois meses.",
        title: "Factsheet - Ageratum conyzoides (Billygoat Weed)",
        url: "https://keys.lucidcentral.org/keys/v3/eafrinet/weeds/key/weeds/Media/Html/Ageratum_conyzoides_(Billygoat_Weed).htm",
      },
    ],
  },
  serralha: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "Não localizado em fonte técnica suficiente para uma faixa numérica recomendada; fontes técnicas descrevem apenas preferência por clima ameno.",
    growthCycleDays: "50–60 dias",
    cycleBasis:
      "Da semeadura até o início da colheita; a Embrapa descreve colheitas sucessivas de folhas mais velhas ou corte da planta inteira antes do florescimento. O período não representa necessariamente o encerramento de múltiplos cortes.",
    confidence: "low",
    referenceNotes:
      "A identificação como Sonchus oleraceus L. e o ciclo são explicitados em publicação técnica da Embrapa; a página da Unifesp repete o período citando a Embrapa, portanto não é confirmação independente. O manual da Embrapa também descreve melhor desenvolvimento em clima ameno, sem estabelecer limites de temperatura. Um estudo hidropônico revisado por pares registrou, naquele ensaio específico, médias diurnas de 27,1 °C e 46,8% RH (mínimos–máximos: 19,0–33,4 °C e 27,9–66,6%); são condições observadas de um experimento, não faixas recomendadas para a cultura, e não foram usadas como recomendação. Dados técnicos encontrados referem-se à serralha como hortaliça em cultivo convencional e a um estudo hidropônico experimental; não há recomendação confiável específica para RH ou faixa térmica numérica.",
    sources: [
      {
        publisher: "Embrapa",
        supports:
          "Identidade; clima ameno sem faixa numérica; semeadura, transplante e colheita iniciada 50–60 dias após semeadura, com cortes sucessivos possíveis.",
        title:
          "Manual de produção de hortaliças tradicionais — seção 3.36, Serralha (Sonchus oleraceus)",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/983087/1/MANUAL-DE-PRODUCAO-DE-HORTALICAS-TRADICIONAIS.pdf",
      },
      {
        publisher: "Embrapa Hortaliças",
        supports:
          "Identidade Sonchus oleraceus; clima ameno sem limites numéricos; início da colheita entre 50 e 60 dias após semeadura e possibilidade de cortes sucessivos.",
        title:
          "Hortaliças não convencionais. Hortaliças tradicionais: serralha",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1071191/1/fserralha.pdf",
      },
      {
        publisher: "VISURB — Universidade Federal de São Paulo (Unifesp)",
        supports:
          "Confirma a identificação e descreve preferência por clima ameno; informa colheita entre 50–60 dias após semeadura, citando a Embrapa (confirmação secundária, não independente).",
        title: "Serralha",
        url: "https://visurb-unifesp.com.br/serralha/",
      },
      {
        publisher: "Agricultural Water Management / ScienceDirect",
        supports:
          "Estudo hidropônico revisado por pares; relata ambiente do ensaio (temperatura e umidade relativas médias e limites durante o cultivo), não recomenda faixas de temperatura/RH.",
        title:
          "Optimising fertigation of hydroponically grown sowthistle (Sonchus oleraceus L.): The impact of the nitrogen source and supply concentration",
        url: "https://www.sciencedirect.com/science/article/pii/S0378377423003931",
      },
      {
        publisher:
          "Cornell University, College of Agriculture and Life Sciences",
        supports:
          "Informações ecológicas sobre germinação/emergência de Sonchus oleraceus em diversas temperaturas; esses dados não são recomendação de temperatura para produção da hortaliça.",
        title: "Annual sowthistles — Weed Profiles",
        url: "https://cals.cornell.edu/weed-science/weed-profiles/annual-sowthistles",
      },
    ],
  },
  manjericao: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC: "25–30 °C (faixa orientativa para crescimento).",
    growthCycleDays:
      "30–49 dias (aproximadamente 40 dias, como referência entre estudos hidropônicos).",
    cycleBasis:
      "Dias após o transplantio até a colheita de folhas/parte aérea: estudo da UFRB colheu aos 30 e 45 DAT e outro estudo hidropônico colheu aos 49 DAT, no início da floração. O intervalo não é um ciclo fixo da semeadura: fase de muda, cultivar e critério de colheita variam.",
    confidence: "medium",
    referenceNotes:
      "A faixa térmica 25–30 °C corresponde à faixa ótima reportada em estudo revisado por pares e é compatível com a orientação comercial da Rutgers (21–32 °C). Ciclo varia conforme cultivar, sistema e ponto de corte; os experimentos hidropônicos citados utilizaram cultivares diferentes, não cobrem igualmente todas as variedades nomeadas. Não foi encontrada recomendação suficientemente corroborada para umidade relativa do ar (RH); os valores de RH em estudos são condições observadas, não recomendações. Um produtor hidropônico relata manter 40–60% RH e problemas com >70% por períodos prolongados, mas esse relato isolado não sustenta uma faixa universal recomendada. Trata-se de erva folhosa/aromática, não cultura experimental de fruto ou raiz.",
    sources: [
      {
        publisher:
          "Horticulturae / PubMed Central (artigo revisado por pares, 2021)",
        supports:
          "Reporta faixa ótima de temperatura de 25–30 °C para crescimento do manjericão; estudo contempla cultivar Genovese.",
        title:
          "Yield, Physiological Performance, and Phytochemistry of Basil (Ocimum basilicum L.) under Temperature and CO2 Levels",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8226578/",
      },
      {
        publisher: "US Basil Consortium, Rutgers University",
        supports:
          "Faixa comercial de temperatura de 70–90 °F (aprox. 21–32 °C); corrobora a faixa térmica orientativa, embora mais ampla.",
        title: "Growing Basil in a Commercial Setting",
        url: "https://usbasilconsortium.rutgers.edu/grower-research-resources/grower-resources/growing-basil-in-a-commercial-setting/",
      },
      {
        publisher:
          "Revista Brasileira de Engenharia Agrícola e Ambiental (Bione et al., 2014)",
        supports:
          "Estudo NFT com Ocimum basilicum; colheita aos 49 dias após transplantio, no início da floração. Apresenta clima regional médio de 24,5 °C e 80% RH como contexto climático, não como recomendação.",
        title:
          "Cultivo de manjericão em sistema hidropônico NFT sob diferentes níveis de salinidade",
        url: "https://pdfs.semanticscholar.org/3ed4/09dfb1311cc67968643abbbb858a752136cc.pdf",
      },
      {
        publisher:
          "Universidade Federal do Recôncavo da Bahia (tese, capítulo experimental)",
        supports:
          "Experimento hidropônico NFT/DFT com cultivares Grecco a Palla e Alfavaca Basilicão; colheitas aos 30 e 45 dias após transplantio e, em outro ensaio, aos 35 DAT.",
        title:
          "Cultivo de manjericão em sistemas hidropônicos com uso de efluente doméstico tratado sob diferentes espaçamentos",
        url: "https://www1.ufrb.edu.br/pgea/images/Teses/LUCYLIA_SUZART_ALVES.pdf",
      },
      {
        publisher:
          "Upstart University / Upstart Farmers (orientação prática de produção hidropônica)",
        supports:
          "Relato prático de produtor: mantém RH de estufa em 40–60% e descreve problemas quando acima de 70% por períodos prolongados; cronograma indica primeira colheita em planta com 8–10 semanas, usualmente cerca de 6 semanas após o transplantio, com variação varietal. Evidência única e não suficiente para fixar recomendação geral de RH.",
        title: "Growing Hydroponic Basil? Read This First",
        url: "https://university.upstartfarmers.com/blog/hydroponic-basil",
      },
    ],
  },
  cebolinha: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "13–25 °C (faixa orientativa de temperatura média diária mais adequada ao crescimento).",
    growthCycleDays:
      "60–120 dias; como referência mais específica, 60–65 dias em campo.",
    cycleBasis:
      "Da semeadura à colheita. O estudo com A. fistulosum indica obtenção de tamanho colhível em 60–65 dias após a semeadura em campo; a faixa ampliada de 60–120 dias é de produção de green onions em diferentes épocas/sistemas e inclui tipos/cultivares variados.",
    confidence: "medium",
    referenceNotes:
      "A temperatura varia com cultivar, época, sistema e estágio: revisão técnica de Welsh onion (A. fistulosum) informa 7–30 °C para crescimento efetivo e 13–25 °C como média diária mais adequada; a faixa apresentada prioriza o intervalo mais adequado, não os limites de sobrevivência/crescimento. A extensão da UC relata crescimento foliar ótimo a 20–25 °C, mas seu guia abrange também A. cepa e híbridos. Não foi encontrada recomendação técnica confiável de umidade relativa do ar para o cultivo da espécie. Valores de UR citados para armazenamento pós-colheita ou para desenvolvimento de doenças não são recomendação de RH de cultivo e não foram usados.",
    sources: [
      {
        publisher:
          "Plants (MDPI), artigo revisado por pares; disponível no PubMed Central",
        supports:
          "Temperatura média diária efetiva (7–30 °C) e faixa mais adequada para crescimento (13–25 °C), especificamente para Welsh onion/Allium fistulosum.",
        title:
          "Welsh Onion (Allium fistulosum L.) Seed Physiology, Breeding, Production and Uses",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8839942/",
      },
      {
        publisher:
          "HortScience / American Society for Horticultural Science, artigo revisado por pares",
        supports:
          "Informa que A. fistulosum em campo atinge tamanho colhível 60–65 dias após a semeadura; reporta variação de dias até colheita por cultivar, data de plantio e sistema protegido.",
        title: "Bunching Onion Culture in Greenhouse and Hoop House",
        url: "https://doi.org/10.21273/HORTSCI.47.11.1564",
      },
      {
        publisher:
          "University of California Agriculture and Natural Resources (Cooperative Extension)",
        supports:
          "Relata colheita 60–120 dias após plantio para green onions em diferentes épocas e temperatura ótima de crescimento foliar de 20–25 °C; guia trata de green onions em geral, incluindo A. cepa e híbridos com A. fistulosum, por isso usado como confirmação contextual e não como parâmetro exclusivo da espécie.",
        title: "Green Onion Production in California (UC ANR Publication 7243)",
        url: "https://my.ucanr.edu/repository/a/?a=54051",
      },
    ],
  },
  salsa: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "13–21 °C (faixa orientativa para cultivo; o limite superior é apoiado por ensaio controlado, não por recomendação universal).",
    growthCycleDays:
      "60–90 dias (orientativo, de semeadura à primeira colheita); em ensaio controlado houve colheita aos 42 dias.",
    cycleBasis:
      "Conta da semeadura à primeira colheita de folhas/planta colhível. O tempo depende de cultivar, sistema e critério de corte. Para mudas transplantadas, as fontes indicam aproximadamente 40–70 dias após o transplante; não somar esse prazo como se fosse contado da semeadura.",
    confidence: "medium",
    referenceNotes:
      "O Ministério da Agricultura de Ontário (OMAFRA) indica 13–18 °C como faixa ótima e 60–80 dias da semeadura à colheita (40–60 após transplante). Outras referências de extensão informam 70–90 ou 90–100 dias para semeadura direta; portanto, 60–90 dias é uma faixa geral, não uma previsão específica para todo sistema hidropônico. Um ensaio controlado com salsa ‘Frise vert Fonce-Rina’ realizou primeira colheita após 42 dias; o crescimento foi maior a 21/19 °C do que a 25/23 °C. O estudo também relata RH experimental de aproximadamente 76–89%, mas não estabelece faixa recomendada de RH para cultivo. Valores de 95–100% RH encontrados em perfil agronômico referem-se somente à conservação pós-colheita, não ao ambiente de cultivo.",
    sources: [
      {
        publisher:
          "Ontario Ministry of Agriculture, Food and Rural Affairs (OMAFRA), Governo de Ontário",
        supports:
          "Espécie Petroselinum crispum; tipos folha lisa italiana e crespa; faixa ótima de temperatura de 13–18 °C; ciclo de 60–80 dias da semeadura e 40–60 dias após transplante. RH de 95–100% consta apenas como armazenamento pós-colheita.",
        title: "parsley — Specialty Cropportunities",
        url: "https://www.omafra.gov.on.ca/CropOp/en/herbs/culinary/pars.html",
      },
      {
        publisher:
          "University of Arkansas System Division of Agriculture, Cooperative Extension Service",
        supports:
          "Indica 70–90 dias da semeadura até planta colhível e redução acentuada do crescimento após períodos prolongados acima de 90 °F (~32 °C).",
        title: "Parsley, a Versatile Herb",
        url: "https://www.uaex.uada.edu/counties/white/news/horticulture/parsley.aspx",
      },
      {
        publisher:
          "University of California, Davis, Western Institute for Food Safety and Security",
        supports:
          "Relata 90–100 dias da semeadura direta e 60–70 dias após transplante até colheita; a colheita começa quando as plantas alcançam pelo menos seis polegadas.",
        title: "Parsley",
        url: "https://www.wifss.ucdavis.edu/wp-content/uploads/2016/10/Parsley_PDF.pdf",
      },
      {
        publisher:
          "Wageningen University & Research / artigo científico disponível em PubMed Central",
        supports:
          "Ensaio controlado com salsa ‘Frise vert Fonce-Rina’: primeira colheita aos 42 dias; clima realizado de 20,8/18,9 °C e RH 76/81% versus 24,8/22,9 °C e RH 81/89%; maior produção a 21/19 °C do que a 25/23 °C. Os níveis de RH são condições experimentais, não recomendação de cultivo.",
        title:
          "Growing fresh food on future space missions: environmental conditions and cultivation strategies for growth of vegetables in space",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5894456/",
      },
    ],
  },
  coentro: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "17–27 °C (faixa orientativa para cultivo; varia com cultivar e estágio).",
    growthCycleDays: "40–80 dias",
    cycleBasis:
      "Da semeadura ao ponto de colheita das folhas (folhas/buquê comercializável), conforme referências de campo; em hidroponia, o marco pode variar se a contagem começar no transplante. Estudos hidropônicos específicos podem colher em marcos experimentais distintos, portanto o intervalo não é uma garantia para todos os sistemas.",
    confidence: "medium",
    referenceNotes:
      "Coentro para folhas é uma cultura de clima fresco; temperaturas elevadas e dias longos aceleram o pendoamento e reduzem o desenvolvimento foliar. A faixa de 17–27 °C é uma orientação para a cultura, não uma recomendação validada exclusivamente para solução nutritiva ou todos os sistemas hidropônicos. As fontes consultadas apresentam ciclos que variam conforme cultivar, região e definição do ponto de colheita: aproximadamente 40–45 dias em produção comercial, 45–70 dias em orientação geral e 45–80 dias em extensão universitária. Um ensaio hidropônico avalia colheita aos 25 dias após o transplante, mas em condições experimentais específicas; não é base suficiente para generalizar esse prazo. Nenhuma faixa confiável de umidade relativa do ar específica para coentro foi localizada; não confundir com umidade do solo/substrato.",
    sources: [
      {
        publisher: "Penn State University, PlantVillage",
        supports:
          "Informa temperatura ótima de 17–27 °C dependendo da variedade, risco de pendoamento com calor e colheita de 45–70 dias após o plantio.",
        title: "Coriander (Cilantro) — Propagation and Harvest",
        url: "https://plantvillage.psu.edu/topics/coriander-cilantro/infos",
      },
      {
        publisher:
          "Western Institute for Food Safety and Security, University of California, Davis",
        supports:
          "Apresenta condições ótimas de 50–85 °F (aprox. 10–29 °C), pendoamento e menor desenvolvimento foliar no calor, e maturação de 40–45 dias em produção comercial.",
        title: "Cilantro — Production Summary",
        url: "https://www.wifss.ucdavis.edu/wp-content/uploads/2016/10/Cilantro_PDF.pdf",
      },
      {
        publisher: "University of Wisconsin–Madison, Division of Extension",
        supports:
          "Descreve coentro como cultura de estação fresca que tende a pendoar no calor e informa colheita de folhas em 45–80 dias; há variação por cultivar.",
        title: "Cilantro / Coriander, Coriandrum sativum",
        url: "https://hort.extension.wisc.edu/articles/cilantro-coriander-coriandrum-sativum/",
      },
      {
        publisher: "Oregon State University Extension Service",
        supports:
          "Corrobora que calor acelera o ciclo e o pendoamento; ciclos sazonais e duração até colheita dependem de temperatura e comprimento do dia.",
        title: "How to grow cilantro for leaves — or coriander seeds",
        url: "https://extension.oregonstate.edu/news/how-grow-cilantro-leaves-or-coriander-seeds",
      },
      {
        publisher: "Artigo científico, página de registro ScienceOpen",
        supports:
          "Contextualiza a limitação de transpor prazos experimentais: o resumo relata avaliação de cultivares em hidroponia e resultados aos 25 dias após transplante sob tratamentos de temperatura da solução nutritiva; não estabelece uma faixa geral de umidade relativa do ar.",
        title:
          "Hydroponic Cultivation of Coriander Using Fresh and Brackish Waters with Different Temperatures of the Nutrient Solution",
        url: "https://www.scienceopen.com/document?vid=53ead918-ce24-48bf-9a09-79ad8c1b3247",
      },
    ],
  },
  hortela: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "20–26 °C (faixa orientativa; varia entre espécies, cultivares, estágio e sistema).",
    growthCycleDays: "77–120 dias",
    cycleBasis:
      "Estimativa da semeadura/plantio até a primeira colheita: estudo hidropônico com Mentha spicata reportou colheita aos 77 dias da semeadura (49 dias após transplante); referências para cultivo de campo mencionam cerca de 90–95 dias após plantio para M. spicata e 100–120 dias após plantio de estolões para hortelã-japonesa (M. arvensis). O intervalo não representa um ciclo universal para todo o gênero.",
    confidence: "medium",
    referenceNotes:
      "A faixa térmica é uma síntese orientativa: revisão relata crescimento vegetativo de M. arvensis em torno de 20–25 °C e ótimo de 21–26 °C para crescimento/floração de hortelã-pimenta; estudo hidropônico com M. spicata descreve cerca de 23 °C nos componentes e cita 15–25 °C como faixa ótima, mas esse valor se refere aos componentes hidropônicos/água e não deve ser tratado como faixa medida de temperatura do ar. Não foi localizada recomendação técnica confiável e específica de umidade relativa do ar para Mentha; não confundir com umidade do solo ou do substrato.",
    sources: [
      {
        publisher: "Molecules (revisão científica; PubMed Central)",
        supports:
          "Requisitos agroclimáticos: crescimento vegetativo de M. arvensis em torno de 20–25 °C e faixa ótima de 21–26 °C para crescimento e floração de peppermint; não fornece faixa específica de RH do ar.",
        title: "Plants of Genus Mentha: From Farm to Food Factory",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6161068/",
      },
      {
        publisher: "Sustainability (MDPI; artigo revisado por pares)",
        supports:
          "Ensaio hidropônico/aquapônico com M. spicata; reporta primeira colheita aos 77 dias da semeadura (49 dias após transplante) e temperatura média dos componentes hidropônicos de aproximadamente 23 °C. Também compara com colheita de campo aos 90–95 dias após plantio.",
        title: "Spearmint (Mentha spicata) Cultivation in Decoupled Aquaponics",
        url: "https://www.mdpi.com/2071-1050/14/1/305",
      },
      {
        publisher: "National Horticulture Board, Government of India",
        supports:
          "Para hortelã-japonesa, indica temperatura média de 20–40 °C durante a maior parte do período de crescimento e primeira colheita 100–120 dias após plantio de estolões; referência comparativa de campo, não universal para o gênero.",
        title:
          "Mint (Production Technology: Agro-climatic Requirements; Harvesting and Yield)",
        url: "https://nhb.gov.in/model-project-reports/Horticulture%20Crops/Mint/Mint1.htm",
      },
    ],
  },
  oregano: {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para cultivo (umidade relativa do ar, % RH).",
    temperatureRangeC:
      "18–22 °C (faixa orientativa de ótimo citada em revisão; referências produtivas abrangem valores mais amplos, aproximadamente 5–28 °C).",
    growthCycleDays: "45–56 dias até a primeira colheita.",
    cycleBasis:
      "Contado do transplante até a primeira colheita de ramos/folhas: perfil técnico do governo de Ontário informa 45 dias; guia de produção hidropônica informa cerca de 8 semanas (56 dias). Não é ciclo desde a semeadura até maturidade. Orégano é perene e permite cortes subsequentes.",
    confidence: "medium",
    referenceNotes:
      "A faixa térmica varia por cultivar, sistema e condições: a revisão reporta ótimo de 18–22 °C; o perfil de produção de Ontário lista 5–28 °C como faixa ótima ampla, e guia hidropônico indica 55–70 °F (cerca de 13–21 °C). Use 18–22 °C como referência orientativa, não como limite universal. O ciclo de 45–56 dias é uma estimativa de transplante à primeira colheita, não de semeadura; colhe-se conforme estabelecimento e estágio, frequentemente antes do florescimento, e a planta pode rebrotar. O valor de 95–100% RH exibido pelo perfil de Ontário é exclusivamente para armazenamento pós-colheita, portanto não é uma recomendação de umidade do ar durante o cultivo.",
    sources: [
      {
        publisher:
          "Ontario Ministry of Agriculture, Food and Rural Affairs (OMAFRA), Governo de Ontário",
        supports:
          "Perfil de produção: perene, faixa de temperatura listada de 5–28 °C, 45 dias do transplante à colheita; 95–100% RH aparece especificamente sob armazenamento pós-colheita.",
        title: "Oregano and Marjoram",
        url: "https://www.omafra.gov.on.ca/CropOp/en/herbs/culinary/orega.html",
      },
      {
        publisher:
          "Notulae Botanicae Horti Agrobotanici Cluj-Napoca; Universidade de Thessaly e Hellenic Agricultural Organization ‘Demeter’",
        supports:
          "Revisão sobre ecologia e cultivo de Origanum vulgare; cita faixa de 18–22 °C para ótimo crescimento e desenvolvimento do orégano.",
        title:
          "Ecology, Cultivation and Utilization of the Aromatic Greek Oregano (Origanum vulgare L.): A Review",
        url: "https://www.notulaebotanicae.ro/index.php/nbha/article/view/11296",
      },
      {
        publisher: "Upstart University / Upstart Farmers",
        supports:
          "Guia específico de hidroponia: primeira colheita aproximadamente 8 semanas após transplante, cortes subsequentes a cada 3–4 semanas e temperatura recomendada 55–70 °F (cerca de 13–21 °C).",
        title: "Growing Oregano in Hydroponics? Read This First!",
        url: "https://university.upstartfarmers.com/blog/growing-oregano-in-hydroponics",
      },
      {
        publisher: "University of Illinois Extension",
        supports:
          "Identifica o orégano grego verdadeiro como Origanum vulgare var. hirtum, trata-o como perene e recomenda iniciar a colheita pouco antes da floração, deixando folhas para rebrote.",
        title: "Oregano",
        url: "https://extension.illinois.edu/herbs/oregano",
      },
    ],
  },
  manjerona: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "6–28 °C (faixa hortícola geral reportada; em estufa, referência de maior rendimento: 24 °C diurnos/12 °C noturnos).",
    growthCycleDays: "70–150 dias",
    cycleBasis:
      "Da semeadura/germinação até maturidade ou primeira colheita. A CTAHR informa maturidade em 70 dias, sem explicitar o marco inicial; o CABI especifica 120–150 dias desde a germinação até a primeira colheita em estufa. Considerar a faixa orientativa, não um ciclo hidropônico validado.",
    confidence: "medium",
    referenceNotes:
      "A faixa térmica combina a faixa em que a espécie cresce melhor indicada pela extensão da University of Hawaiʻi (43–82 °F, convertidos para aproximadamente 6–28 °C) com referência do CABI para maior rendimento em estufa (24 °C dia/12 °C noite). O estudo em estufa da ARC-VIMP registrou médias de 20,8–28,9 °C e umidades relativas médias de 77,6–86,8%, mas esses são valores de regimes experimentais, não uma recomendação de UR para cultivo; por isso não foram apresentados como faixa recomendada. A evidência consultada não valida especificamente produção hidropônica; cultivar, ambiente e critério de colheita podem alterar o ciclo.",
    sources: [
      {
        publisher: "CABI Compendium",
        supports:
          "Referência de produção em estufa: maior rendimento a 24 °C de dia e 12 °C à noite; 120–150 dias da germinação à primeira colheita.",
        title: "Origanum majorana (sweet marjoram)",
        url: "https://www.cabidigitallibrary.org/doi/full/10.1079/cabicompendium.32294",
      },
      {
        publisher: "University of Hawaiʻi at Mānoa, CTAHR",
        supports:
          "Indica crescimento melhor entre 43 e 82 °F (aprox. 6–28 °C) e maturidade em 70 dias; não explicita o marco inicial do ciclo.",
        title:
          "Marjoram, Sweet Marjoram, Knot Marjoram — Specialty and Minor Crops Handbook",
        url: "https://gms.ctahr.hawaii.edu/gs/handler/getmedia.ashx?moid=3211&dt=3&g=12",
      },
      {
        publisher:
          "Plants (artigo revisado por pares; pesquisa conduzida na Agricultural Research Council–Vegetable, Industrial and Medicinal Plants, África do Sul)",
        supports:
          "Registra regimes experimentais de temperatura média diária de 20,8, 24,4 e 28,9 °C e UR média de 77,6–86,8%; esses valores são condições experimentais, não recomendação de umidade relativa.",
        title:
          "Biomass, Essential Oil Yield, and Composition of Marjoram as Affected by Temperature, Irrigation, and Fertilization",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9824495/",
      },
      {
        publisher: "True Leaf Market",
        supports:
          "Referência horticultural comercial complementar: indica maturidade em 70–80 dias e colheita a partir de 50–60 dias após o transplante, ilustrando a variação conforme o marco e o critério de colheita.",
        title: "Marjoram Herb Growing Guide",
        url: "https://trueleafmarket.com/pages/marjoram-herb-growing-guide",
      },
    ],
  },
  tomilho: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "20–25 °C (faixa orientativa; não é um ótimo universal comprovado).",
    growthCycleDays: "140–180 dias (referência central: cerca de 160 dias).",
    cycleBasis:
      "Da semeadura à primeira colheita de erva na primeira estação de cultivo. Estudos de campo colheram aos 140, 160 e 180 dias após a semeadura, com 160 dias considerado o melhor compromisso entre rendimento e qualidade; um estudo de estufa em vasos também colheu plantas cerca de 168 dias após a semeadura. A faixa é extrapolada para cultivo hidropônico, não validada como ciclo hidropônico padrão.",
    confidence: "medium",
    referenceNotes:
      "Os valores variam com cultivar, luz, ambiente e sistema. A faixa de 20–25 °C é uma orientação prática hidropônica; estudos experimentais com tomilho hidropônico usaram 25/15 °C (dia/noite), e cultivo em estufa teve médias próximas de 20–21 °C, sem estabelecer ótimo. Não foi encontrada recomendação técnica suficiente de umidade relativa do ar para a espécie: estudos reportam condições experimentais de 55–65% RH em hidroponia e 39–47% RH em estufa, mas esses valores são condições observadas/definidas, não recomendações. O tomilho é perene e as referências de ciclo são para primeira colheita, não para maturidade final da planta.",
    sources: [
      {
        publisher: "Scientific Reports (Nature Portfolio)",
        supports:
          "Estudo hidropônico experimental com tomilho; condições controladas de 25/15 °C dia/noite e 55–65% RH. Não define esses parâmetros como faixa ótima nem relata ciclo até colheita.",
        title:
          "Time course of physiological and biochemical responses of Thymus vulgaris L. to salinity stress",
        url: "https://www.nature.com/articles/s41598-025-00768-y",
      },
      {
        publisher: "Plants (MDPI) / National Library of Medicine (PMC)",
        supports:
          "Estudo de estufa em vasos: temperatura média de 20,4–21,1 °C, RH medida de 38,8–47,2%; sementes foram semeadas e plantas colhidas aproximadamente 24 semanas depois (cerca de 168 dias). Dados de RH são observacionais, não uma recomendação.",
        title:
          "Increased Plant Quality, Greenhouse Productivity and Energy Efficiency with Broad-Spectrum LED Systems: A Case Study for Thyme (Thymus vulgaris L.)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8150821/",
      },
      {
        publisher: "Turkish Journal of Field Crops",
        supports:
          "Estudo de dois cultivares em campo: colheitas aos 140, 160 e 180 dias após semeadura; 160 DAS foi o momento ótimo avaliado para rendimento e qualidade da erva.",
        title:
          "YIELD AND HERB QUALITY OF THYME (Thymus vulgaris L.) DEPENDING ON HARVEST TIME",
        url: "https://dergipark.org.tr/en/pub/tjfc/article/179353",
      },
      {
        publisher: "LetPot",
        supports:
          "Guia prático hidropônico recomenda 20–25 °C e menciona colheita em 21–42 dias, sem detalhar claramente o marco temporal ou apresentar validação experimental; usado apenas como referência auxiliar para temperatura, não para definir o ciclo.",
        title: "How to grow thyme hydroponically: A Detailed Guide",
        url: "https://letpot.com/blogs/hydroponic-plant-growing-knowledge-and-tips/how-to-grow-thyme-hydroponically-a-comprehensive-guide",
      },
    ],
  },
  alecrim: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC: "20–30 °C (faixa orientativa).",
    growthCycleDays: "90–240 dias",
    cycleBasis:
      "Do transplante de muda/estaca enraizada ao primeiro corte de folhas. A variação reflete diferenças de cultivar e sistema: há referência de cerca de 3 meses para muda de viveiro e de 215 dias a 8 meses após o plantio de mudas em cultivo de campo. Não é uma contagem desde a semeadura.",
    confidence: "medium",
    referenceNotes:
      "Alecrim é uma erva perene; após o primeiro corte, fontes agrícolas indicam colheitas sucessivas, por exemplo a cada 3–4 meses, conforme vigor e manejo. O intervalo de ciclo é uma orientação para primeiro corte de plantas estabelecidas, não um ciclo universal nem uma validação específica para hidroponia. Fontes consultadas não fornecem faixa numérica confiável de umidade relativa do ar; Illinois Extension menciona apenas que a planta pode preferir umidade elevada em ambiente interno, sem percentual. Temperatura e ciclo podem variar com cultivar, clima, estágio e sistema de produção.",
    sources: [
      {
        publisher: "Wikifarmer",
        supports:
          "Faixa de 20–30 °C como temperaturas médias primaveris/veranis do clima de origem mediterrâneo; diz que prefere clima quente e moderadamente seco.",
        title: "Condições de Cultivo do Alecrim",
        url: "https://wikifarmer.com/library/pt-br/article/condicoes-de-cultivo-alecrim",
      },
      {
        publisher: "Tamil Nadu Agricultural University (TNAU), Agritech Portal",
        supports:
          "Para a cultivar Ooty-1, informa primeira colheita aos 215 dias após plantio das mudas; em outra seção, primeira colheita aos 8 meses e seguintes a cada 3–4 meses; indica clima tropical/subtropical com temperatura inferior a 30 °C como adequado/ótimo.",
        title: "Horticulture :: Aromatic Crops :: Rosemary",
        url: "https://agritech.tnau.ac.in/horticulture/horti_aromatic%20crops_rosemary.html",
      },
      {
        publisher: "Texas A&M AgriLife Extension Service",
        supports:
          "Tabela indica intervalo usual do plantio à colheita de 3 meses para planta de viveiro, 1 ano para estacas e 15 meses para semente; exemplifica estacas a 60–70 °F (aprox. 16–21 °C) durante o enraizamento.",
        title: "Easy Gardening – Rosemary (E-623)",
        url: "https://aggie-horticulture.tamu.edu/vegetable/wp-content/uploads/sites/10/2010/10/E-623-Easty-Gardening-Rosemary.pdf",
      },
      {
        publisher: "University of Massachusetts Amherst Extension",
        supports:
          "Guia de produção em estufa mantém temperatura mínima noturna de 65 °F (aprox. 18 °C) e informa tolerância a temperaturas de estufa elevadas; contexto de planta ornamental em vaso, não faixa ótima universal.",
        title: "Rosemary: Container Production for December Market",
        url: "https://www.umass.edu/agriculture-food-environment/greenhouse-floriculture/fact-sheets/rosemary-container-production-for-december-market",
      },
      {
        publisher: "University of Illinois Extension",
        supports:
          "Para umidade, recomenda qualitativamente ambiente interno de alta umidade, mas não apresenta percentual de RH; colheita de pontas e folhas conforme necessário, sem ciclo em dias.",
        title: "Rosemary",
        url: "https://extension.illinois.edu/herbs/rosemary",
      },
    ],
  },
  salvia: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "18–32 °C (faixa de operação observada em estufa; temperatura média reportada de 25 ± 7 °C, não um ótimo definido).",
    growthCycleDays: "70–75 dias",
    cycleBasis:
      "Da semeadura/plantio até a primeira colheita de folhas: referências de extensão informam cerca de 75 dias desde o plantio de sementes; um estudo relata colheita antes da floração aos 70 dias após o plantio. O marco de plantio e o sistema variam entre fontes; não representa ciclo total de uma planta perene nem intervalo para colheitas sucessivas.",
    confidence: "medium",
    referenceNotes:
      "Interpretei “sálvia” como sálvia-comum/culinária (S. officinalis), não outras espécies de Salvia. Temperatura: 18–32 °C deriva de experimento de cultivo em estufa que reportou média de 25 ± 7 °C; é uma faixa orientativa observada, não uma faixa ótima validada, e as fontes não a estabelecem especificamente para hidroponia. Não encontrei recomendação técnica confiável de umidade relativa do ar para a espécie; o valor de 80% RH encontrado em um estudo foi apenas durante exposição térmica experimental de 30 minutos, não deve ser tratado como meta de cultivo. O ciclo depende da cultivar, propagação, sistema e do que se considera “plantio”.",
    sources: [
      {
        publisher: "University of Wisconsin–Madison Division of Extension",
        supports:
          "Identifica a sálvia-comum e estima cerca de 75 dias do plantio à primeira colheita; recomenda colher antes da floração.",
        title: "Sage – Wisconsin Horticulture",
        url: "https://hort.extension.wisc.edu/articles/sage-salvia-officinalis/",
      },
      {
        publisher: "University of Florida IFAS Extension, Pasco County",
        supports:
          "Identifica Common Sage como Salvia officinalis e informa cerca de 75 dias do plantio de sementes à primeira colheita.",
        title: "Spice Up You Life: A Beginners Guide to Growing Sage",
        url: "https://blogs.ifas.ufl.edu/pascoco/2024/06/06/spice-up-you-life-a-beginners-guide-to-growing-sage/",
      },
      {
        publisher: "Peer-reviewed research article (PMC)",
        supports:
          "Relata colheitas de folhagem antes da floração aos 70 dias após o plantio em experimento de campo; esse marco experimental não é necessariamente equivalente ao ciclo de semeadura em cultivo hidropônico.",
        title:
          "Phytochemical and physiological changes in Salvia officinalis under water deficit stress and putrescine application",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8626343/",
      },
      {
        publisher:
          "Saudi Journal of Biological Sciences / Elsevier; peer-reviewed research article",
        supports:
          "Estudo de cultivo em estufa de S. officinalis relata temperatura média de 25 ± 7 °C, correspondente a aproximadamente 18–32 °C; sustenta faixa observada em cultivo, não ótimo recomendado.",
        title:
          "Growth responses and essential oil profile of Salvia officinalis L. Influenced by water deficit and various nutrient sources in the greenhouse",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8626272/",
      },
      {
        publisher: "Plants (Basel), MDPI; peer-reviewed research article",
        supports:
          "Confirma a espécie S. officinalis e relata um protocolo de estresse térmico com 80% RH por 30 minutos seguido de ambiente a 30 °C; contextualiza por que o RH do protocolo não é uma recomendação de cultivo.",
        title:
          "Protective Effects of Salicylic Acid and Calcium Chloride on Sage Plants (Salvia officinalis L. and Salvia elegans Vahl) under High-Temperature Stress",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8540575/",
      },
      {
        publisher: "North Carolina State University Extension",
        supports:
          "Confirma a identidade da espécie como sálvia-comum/culinária e informa que folhas de novos plantios devem ser colhidas levemente no primeiro ano, ressaltando a variação entre primeira colheita e estabelecimento da planta.",
        title: "Salvia officinalis (Common Sage, Culinary Sage, Garden Sage)",
        url: "https://plants.ces.ncsu.edu/plants/salvia-officinalis/",
      },
    ],
  },
  "salvia-da-horta": {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "23–28 °C (faixa média diária orientativa; o ótimo modelado para massa fresca variou aproximadamente de 23,5 a 27,5 °C conforme a luz disponível).",
    growthCycleDays: "46–75 dias",
    cycleBasis:
      "Da semeadura à primeira colheita/maturidade para corte de folhas. Em estudo hidropônico, a sálvia foi colhida aos 46 dias após semeadura (21 dias até transplante + 25 dias após transplante); outro ensaio hidropônico registrou 33 dias até transplante + 28 dias até primeira colheita (61 dias). Wisconsin Extension informa cerca de 75 dias do plantio à primeira colheita, sem especificar se plantio significa semeadura ou transplante. Portanto, a faixa contempla sistemas e referências de cultivo diferentes, não um ciclo fixo.",
    confidence: "medium",
    referenceNotes:
      "A temperatura é uma orientação para cultivo foliar e não um limite universal: o estudo hidropônico em Tennessee empregou média de 23 ± 0,8 °C; modelagem de sálvia ‘Extrakta’ estimou temperatura média diária ótima variável com a integral de luz (cerca de 23,5–27,5 °C). Os ciclos variam com sistema, cultivar, ambiente e marco de contagem; estudos hidropônicos citados foram em casa de vegetação e colheita de folhas. As fontes consultadas não forneceram faixa recomendada de umidade relativa do ar específica para Salvia officinalis; uma delas mediu temperatura e RH, mas não informa um alvo de RH. Boa circulação de ar é indicada para reduzir problemas foliares, mas isso não equivale a uma faixa de umidade relativa.",
    sources: [
      {
        publisher:
          "HortTechnology / American Society for Horticultural Science (ASHS), University of Tennessee researchers",
        supports:
          "Estudo hidropônico de Salvia officinalis: média diária de 23 ± 0,8 °C; transplante aos 21 dias da semeadura e colheita 25 dias depois (46 dias da semeadura); descreve sistema e cultivar/condições experimentais.",
        title:
          "Optimizing Sowing Density for Parsley, Cilantro, and Sage in Controlled Environment Production: Balancing Productivity and Plant Quality",
        url: "https://journals.ashs.org/view/journals/horttech/34/3/article-p305.xml",
      },
      {
        publisher: "PLOS ONE",
        supports:
          "Experimento e modelo para sálvia ‘Extrakta’ (Salvia officinalis): temperatura média diária ótima estimada para massa fresca muda com a luz, de cerca de 27,5 °C sob DLI 6 a 23,5 °C sob DLI 18 mol·m⁻²·d⁻¹; sustenta faixa orientativa, não valor universal.",
        title:
          "Modeling purple basil, sage, spearmint, and sweet basil responses to daily light integral and mean daily temperature",
        url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0294905",
      },
      {
        publisher:
          "Proceedings of the Florida State Horticultural Society / University of Florida IFAS",
        supports:
          "Ensaio hidropônico em casa de vegetação, com sálvia semeada 33 dias antes do transplante e primeira colheita 28 dias após transplante (61 dias da semeadura); ambiente mantido entre aproximadamente 15,5–24 °C no inverno, com picos mais altos em períodos quentes.",
        title: "Fresh-cut herbs in vertical hydroponic systems",
        url: "https://svaec.ifas.ufl.edu/media/svaecifasufledu/docs/pdf/svreports/crops/leafygreens/Fresh-cut-herbs-in-Vertical-hydroponic-Systems.pdf",
      },
      {
        publisher:
          "University of Wisconsin–Madison Division of Extension, Wisconsin Horticulture",
        supports:
          "Informa cerca de 75 dias do plantio à primeira colheita; recomenda boa circulação de ar para reduzir problemas foliares. Referência de cultivo hortícola, não especificamente hidropônico.",
        title: "Sage, Salvia officinalis",
        url: "https://hort.extension.wisc.edu/articles/sage-salvia-officinalis/",
      },
      {
        publisher: "North Carolina State Extension, Plant Toolbox",
        supports:
          "Confirma identidade e uso como sálvia culinária; folhas colhidas na primavera/verão e recomendação de colher levemente no primeiro ano enquanto a planta se estabelece; não fornece faixa de RH ou ciclo numérico.",
        title: "Salvia officinalis (Common Sage, Culinary Sage, Garden Sage)",
        url: "https://plants.ces.ncsu.edu/plants/salvia-officinalis/",
      },
    ],
  },
  estragao: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "4–20 °C (faixa orientativa; apenas uma das fontes consultadas informa uma faixa numérica explícita).",
    growthCycleDays: "42–60 dias (orientativo).",
    cycleBasis:
      "Da retomada do crescimento ativo até a primeira colheita de ramos/folhas: a extensão da Utah State informa 6–8 semanas após o início do crescimento; outra referência informa colheita por volta de 60 dias após o plantio, sem esclarecer cultivar ou marco fenológico. Não contar da semeadura: o estragão-francês é propagado vegetativamente; o estragão-russo pode ser propagado por sementes.",
    confidence: "low",
    referenceNotes:
      "As referências consultadas são principalmente guias de cultivo em jardim, não ensaios de hidroponia; a faixa de temperatura é uma orientação geral, não um ótimo validado para sistema hidropônico. A Utah State descreve o estragão-francês como adaptado a clima quente, mas não quente demais, recomendando sombreamento quando o verão excede 32 °C; não fornece faixa numérica de temperatura. A distinção entre estragão-francês (var. sativa, normalmente propagado por estacas/divisão) e russo importa, pois as fontes não especificam o tipo em todas as recomendações. Menções a solo úmido ou drenagem não foram tratadas como umidade relativa do ar.",
    sources: [
      {
        publisher: "Utah State University Extension",
        supports:
          "Cultivo de estragão-francês; prefere condições quentes, porém não excessivamente quentes; sombreamento acima de 90 °F; primeira colheita para secagem 6–8 semanas após o crescimento começar; propagação vegetativa.",
        title: "How to Grow French Tarragon in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/french-tarragon-in-the-garden",
      },
      {
        publisher:
          "CPT (artigo atribuído a Andréa Oliveira; informa como fonte hortas.info)",
        supports:
          "Informa preferência por 4–20 °C e colheita cerca de 60 dias após o plantio; diferencia propagação por sementes do tipo russo e propagação vegetativa do francês. Não fornece umidade relativa do ar.",
        title: "Plantas aromáticas: como plantar estragão?",
        url: "https://www.cpt.com.br/cursos-plantasmedicinais/artigos/plantas-aromaticas-como-plantar-estragao",
      },
      {
        publisher: "University of Illinois Extension",
        supports:
          "Confirma a identificação do estragão-francês como perene, sua propagação por estacas/divisão e a colheita de pontas jovens e folhas conforme necessário; não informa faixa numérica de temperatura, umidade relativa ou dias até a primeira colheita.",
        title: "Tarragon: French",
        url: "https://extension.illinois.edu/herbs/tarragon-french",
      },
      {
        publisher: "North Carolina State University Extension, Plant Toolbox",
        supports:
          "Confirma a espécie e registra declínio possível em verões úmidos e invernos frios e úmidos; não estabelece umidade relativa do ar recomendada nem faixa numérica de temperatura ou ciclo de colheita.",
        title: "Tarragon - Artemisia dracunculus",
        url: "https://plants.ces.ncsu.edu/plants/artemisia-dracunculus/common-name/tarragon/",
      },
    ],
  },
  camomila: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "15–20 °C (temperatura diurna indicada para a fase vegetativa); 10–20 °C para germinação.",
    growthCycleDays:
      "Aproximadamente 70–240 dias até o início da colheita de flores.",
    cycleBasis:
      "Da semeadura à primeira colheita de capítulos florais próximos da plena floração. A amplitude reflete sistemas e climas diferentes: ensaios de primavera em Montana colheram cerca de 68–93 dias após semeadura; cultivo de sequeiro/estação fria no norte da Índia, semeadura em setembro e colheita de março ao meio de maio, corresponde a cerca de 180–240 dias. Pode haver várias colheitas sucessivas.",
    confidence: "medium",
    referenceNotes:
      "Referência é camomila-alemã (Matricaria chamomilla, também chamada M. recutita/Chamomilla recutita), não camomila-romana. A revisão científica fornece os valores numéricos de temperatura; fontes independentes concordam que a espécie prefere condições frescas e que calor pode prejudicar florescimento/desempenho, mas não confirmam o mesmo intervalo numérico. Ciclo altamente dependente de época, cultivar, clima e método (semeadura direta ou transplante); portanto, faixa ampla e orientativa, não específica para hidroponia. A umidade relativa do ar foi procurada separadamente de umidade do solo e não se encontrou recomendação percentual técnica confiável para a espécie.",
    sources: [
      {
        publisher:
          "Plants (MDPI) / PubMed Central; revisão científica revisada por pares",
        supports:
          "Indica 15–20 °C diurnos na fase vegetativa e 10–20 °C para germinação; descreve semeadura de setembro e colheita entre fim de março e meados de maio no norte da Índia, e colheita em várias floradas.",
        title:
          "A Comprehensive Review on Biology, Genetic Improvement, Agro and Process Technology of German Chamomile (Matricaria chamomilla L.)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8747680/",
      },
      {
        publisher:
          "Montana State University, Western Agricultural Research Center",
        supports:
          "Caracteriza a cultura como preferente de clima mais fresco; ensaios de campo mostram colheitas de flores aproximadamente 68–93 dias após semeadura de primavera (ou cerca de 52–56 dias após transplante em um ensaio). Datas e número de colheitas variaram por cultivar e ano.",
        title: "German Chamomile",
        url: "https://agresearch.montana.edu/warc/research_current/research_past/herbsandoils/chamomile.html",
      },
      {
        publisher: "Visão Acadêmica, Universidade Federal do Paraná (UFPR)",
        supports:
          "Estudo técnico de produção brasileira: classifica a cultura como de clima temperado; relata sensibilidade a temperaturas altas nos primeiros 30 dias e que florescimento sob cerca de 30 °C encurta a floração, corroborando a preferência por condições frescas.",
        title:
          "Aspectos do processo de produção agrícola na cultura da camomila [Chamomilla recutita (L.) Rauschert] no município de Mandirituba, Paraná",
        url: "https://revistas.ufpr.br/academica/article/download/500/413/964",
      },
      {
        publisher: "University of Wisconsin–Madison Division of Extension",
        supports:
          "Fonte universitária para identidade, cultivo a partir de sementes, florescimento de início a meio do verão e colheita das flores próximas da plena floração; não fornece temperatura numérica nem umidade relativa.",
        title: "German Chamomile, Matricaria chamomilla",
        url: "https://hort.extension.wisc.edu/articles/chamomile-matricaria-chamomilla/",
      },
    ],
  },
  "erva-cidreira": {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para uma faixa recomendada de umidade relativa do ar (% RH) durante o cultivo.",
    temperatureRangeC:
      "15–30 °C como faixa orientativa; revisão técnica relata crescimento possível entre 15–35 °C.",
    growthCycleDays:
      "60–160 dias (orientativo; primeiro corte pode ocorrer antes).",
    cycleBasis:
      "Do transplante/plantio de mudas até o primeiro ou principal corte de folhas. O guia de OMAFRA indica 60 dias até a primeira colheita; ensaio de campo encontrou maiores rendimentos aos 160 dias após o plantio. Há também cortes experimentais precoces e rebrota, portanto não é um ciclo fixo.",
    confidence: "medium",
    referenceNotes:
      "As referências consultadas são majoritariamente de cultivo em campo, não validações específicas para hidroponia; o ciclo pode variar com cultivar, clima, manejo e objetivo (folhas/biomassa ou óleo essencial). Os 15–30 °C são faixa recomendada por guia agrícola público; a revisão cita 15–35 °C como faixa em que a espécie pode crescer, não como ótimo hidropônico. A menção de RH >80% da OMAFRA refere-se à conservação pós-colheita de folhas frescas, não à umidade do ar no cultivo, e foi excluída da recomendação.",
    sources: [
      {
        publisher:
          "Ontario Ministry of Agriculture, Food and Rural Affairs (OMAFRA), Governo de Ontário",
        supports:
          "Faixa ótima de temperatura indicada como 15–30 °C e primeira colheita em 60 dias; também registra colheitas múltiplas. RH >80% é para armazenamento pós-colheita de folhas frescas, não cultivo.",
        title: "Lemon Balm",
        url: "https://www.omafra.gov.on.ca/CropOp/en/herbs/culinary/lemba.html",
      },
      {
        publisher: "Journal of Medicinal Plants Research / Academic Journals",
        supports:
          "Revisão informa que a espécie cresce rapidamente em faixa de temperatura de 15–35 °C; dá suporte independente à tolerância térmica, não a uma faixa ótima específica.",
        title: "Melissa officinalis L., a valuable medicine plant: A review",
        url: "https://academicjournals.org/journal/JMPR/article-full-text-pdf/A84A76F22866",
      },
      {
        publisher:
          "Indian Journal of Pharmaceutical Sciences (artigo revisado por pares; disponível no PubMed Central/NLM)",
        supports:
          "Ensaio de campo comparou colheitas aos 120, 140, 160 e 180 dias após o plantio; o maior rendimento de biomassa e óleo foi aos 160 dias.",
        title:
          "Effect of Time of Harvesting on Yield and Quality of Melissa Officinalis L. in Doon Valley, India",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4243263/",
      },
      {
        publisher: "Revista Biociências, Universidade de Taubaté (UNITAU)",
        supports:
          "Estudo brasileiro de produção de folhas: período de maior produção estimado em 150 dias; plantas foram originadas de sementes e levadas ao campo após dois meses, mostrando que o marco de contagem depende do protocolo.",
        title:
          "Produção de folhas em Melissa officinalis L. (Lamiaceae) em Taubaté, São Paulo",
        url: "https://periodicos.unitau.br/biociencias/article/download/1239/839/3897",
      },
      {
        publisher:
          "Revista Biotemas, Universidade Federal de Santa Catarina; autores da Universidade Federal de Minas Gerais",
        supports:
          "Ensaio em vasos avaliou cortes aos 40–85 dias após transplante e rebrota 30 dias depois; resumo relata benefício de corte inicial aos 33 dias, ilustrando variação de ciclo e manejo.",
        title:
          "Crescimento e produção de óleo essencial de Melissa officinalis L. nas condições climáticas de Montes Claros – MG",
        url: "https://pdfs.semanticscholar.org/1473/6b42b39c1c0fac383848bb66361fd134e529.pdf",
      },
      {
        publisher: "Agronomy (MDPI), estudo de campo revisado por pares",
        supports:
          "Demonstra variação do calendário por método de colheita: mudas transplantadas em 20 de maio e cortes em meados de julho e início de setembro, ou colheita única em setembro; sustenta que ciclo depende do sistema e do manejo.",
        title:
          "Agronomic Practices in Lemon Balm Production under Temperate Climate Conditions: Raw Material Yield and Active Substances Content",
        url: "https://www.mdpi.com/2073-4395/13/5/1433",
      },
    ],
  },
  "capim-limao": {
    airHumidityRange:
      "80–100% RH (faixa técnica localizada; recomendação de alta umidade, sem segunda fonte independente com faixa numérica específica).",
    temperatureRangeC:
      "20–30 °C; faixa mais favorável indicada por algumas fontes: 25–30 °C.",
    growthCycleDays: "90–180 dias (≈135 dias como ponto médio orientativo).",
    cycleBasis:
      "Do plantio de mudas/perfilhos ou transplante até a primeira colheita/corte; não contado desde a semeadura. Fontes técnicas relatam 3–6 meses ou, em guia de produção, 4–6 meses após transplantar mudas.",
    confidence: "medium",
    referenceNotes:
      "As faixas são orientativas: podem variar com cultivar/espécie comercial, clima, manejo e critério de colheita; os dados consultados são predominantemente de cultivo convencional, não de ensaios hidropônicos específicos. A faixa numérica de umidade relativa foi encontrada em uma fonte técnica institucional; outras fontes sustentam qualitativamente a preferência por clima úmido, mas não foi localizada confirmação independente da faixa em % RH. Valores de temperatura se sobrepõem entre fontes, embora o intervalo ótimo seja expresso mais estreitamente em algumas delas.",
    sources: [
      {
        publisher:
          "University of California Agriculture and Natural Resources (UC ANR), Small Farms Network",
        supports:
          "Indica cultivo em condições quentes e alta umidade de 80–100% RH; apresenta manejo/colheita por maturidade do talo e calendário regional de plantio e colheita.",
        title:
          "Lemongrass Production Guidelines for Small-scale Growers in California",
        url: "https://ucanr.edu/program/uc-small-farms-network/article/lemongrass",
      },
      {
        publisher: "Penn State PlantVillage",
        supports:
          "Identifica Cymbopogon citratus; indica temperaturas de cultivo de 10–33 °C e ótimo de 25–30 °C, clima quente e úmido; a colheita começa quando os talos atingem cerca de 1,3 cm de diâmetro.",
        title:
          "Lemon grass | Diseases and Pests, Description, Uses, Propagation",
        url: "https://plantvillage.psu.edu/topics/lemon-grass/infos",
      },
      {
        publisher: "National Horticulture Board, Government of India",
        supports:
          "Indica clima quente e úmido e temperatura de 20–30 °C; informa primeira colheita geralmente 4–6 meses após transplantar mudas. O relatório aborda diferentes tipos de capim-limão, portanto considerado como apoio geral, não evidência exclusiva da espécie em todos os trechos.",
        title: "Lemongrass (model project report)",
        url: "https://nhb.gov.in/model-project-reports/Horticulture%20Crops/Lemongrass/Lemongrass1.htm",
      },
      {
        publisher: "Department of Export Agriculture, Sri Lanka",
        supports:
          "Distingue Cymbopogon citratus de C. flexuosus e informa primeira colheita 3–6 meses após plantio; valoriza clima quente tropical. Guia contempla ambas as espécies em partes do conteúdo.",
        title: "Lemon Grass",
        url: "https://deasrilanka.com/crop/lemongrass/",
      },
      {
        publisher:
          "Universidade de Brasília, Horto de Espécies Medicinais, Alimentícias e Condimentares",
        supports:
          "Identifica especificamente Cymbopogon citratus; informa adaptação ao clima quente, plantio com mudas/perfilhos e colheita 3–6 meses após plantio.",
        title: "Capim-Limão",
        url: "https://fcts.unb.br/hemac/especies/capim-limao/",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "Identifica Cymbopogon citratus e confirma preferência por condições quentes e úmidas; contextualiza a colheita pela espessura dos talos, sem faixa numérica de RH ou ciclo em dias.",
        title: "How to Grow Lemongrass in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/lemongrass-in-the-garden",
      },
    ],
  },
  endro: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "6–26 °C (faixa ótima informada para cultivo; orientação geral)",
    growthCycleDays: "30–55 dias",
    cycleBasis:
      "Da semeadura direta até a primeira colheita de folhas (dill weed), geralmente antes do desenvolvimento das flores; fontes de extensão situam a colheita em cerca de 6 semanas. Não representa o ciclo até sementes, que é mais longo.",
    confidence: "medium",
    referenceNotes:
      "A referência de Ontario informa 30–55 dias para dill weed e colheita com plantas de 15–20 cm antes do florescimento; Utah State cita aproximadamente 6 semanas até a colheita. O ciclo depende da cultivar, temperatura, sistema e produto colhido: Ontario informa 60–80 dias para cabeças florais e 100–115 dias para sementes, enquanto a fonte brasileira consultada descreve 90–120 dias para o ciclo geral. A faixa térmica 6–26 °C vem da orientação de cultivo de Ontario; NC State indica crescimento melhor em torno de 70 °F (aprox. 21 °C). Para umidade relativa, não confundir com a umidade de armazenamento pós-colheita: Ontario informa 95–100% RH somente para armazenamento, não como recomendação para o ar durante o cultivo. As referências são de cultivo geral, não parâmetros validados especificamente para hidroponia.",
    sources: [
      {
        publisher:
          "Ontario Ministry of Agriculture, Food and Rural Affairs (OMAFRA), Government of Ontario",
        supports:
          "Faixa ótima de temperatura 6–26 °C; 30–55 dias para dill weed, 60–80 dias para cabeças florais e 100–115 para sementes. RH de 95–100% é explicitamente condição de armazenamento pós-colheita, não de cultivo.",
        title: "Dill",
        url: "https://www.omafra.gov.on.ca/CropOp/en/herbs/culinary/dill.html",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "Afirma que leva aproximadamente 6 semanas para colher; descreve semeadura direta e colheita de folhas após emergência, com melhor sabor quando começa a floração.",
        title: "Dill in the Garden",
        url: "https://digitalcommons.usu.edu/cgi/viewcontent.cgi?article=1253&context=extension_curall",
      },
      {
        publisher: "North Carolina State University Extension",
        supports:
          "Afirma que o endro cresce melhor em temperaturas em torno de 70 °F (aprox. 21 °C); informa germinação em 10–14 dias e aspectos de colheita de sementes.",
        title:
          "Anethum graveolens (Anet, Dill, Dill-Oil Plant, East Indian Dill ...)",
        url: "https://plants.ces.ncsu.edu/plants/anethum-graveolens/",
      },
      {
        publisher:
          "Campo & Negócios (artigo técnico de pesquisadoras/professoras de agronomia e entomologia da UniCerrado e UFU)",
        supports:
          "Relata ciclo geral de 90 dias no verão a 120 dias no inverno, contrastando a finalidade de colheita de ciclo curto de folhas com o ciclo completo até maturidade/sementes.",
        title: "Cultivo do endro",
        url: "https://campoenegocios.com/cultivo-do-endro/",
      },
    ],
  },
  salsao: {
    airHumidityRange:
      "60–80% RH (faixa orientativa para cultivo hidropônico; fonte técnica consultada recomenda manter abaixo de 80% durante o crescimento)",
    temperatureRangeC:
      "15–24 °C (faixa orientativa geral; em hidroponia, a fonte técnica consultada indica 15–26 °C durante o dia, com temperaturas noturnas dependentes do estágio e sistema)",
    growthCycleDays:
      "80–120 dias; em hidroponia NFT de alto rack, cerca de 50–60 dias após o transplante",
    cycleBasis:
      "Do transplante até a colheita/maturidade comercial. No exemplo hidropônico NFT, o transplante ocorre quando as mudas têm aproximadamente cinco folhas. Não inclui a fase de produção de mudas; fontes de extensão dão 80–120 dias após transplante, enquanto o artigo de hidroponia em alto rack relata aproximadamente 50–60 dias.",
    confidence: "medium",
    referenceNotes:
      "Temperatura converge entre orientações de campo (Rutgers: 13–24 °C; UC ANR: melhor crescimento a aproximadamente 16–18 °C) e hidroponia (15–26 °C diurnos); 15–24 °C é uma faixa prática comum, não um ótimo universal. A duração depende de cultivar, época e sistema: a recomendação universitária geral é 80–120 dias após transplantio, ao passo que o artigo de NFT em alto rack reporta 50–60 dias. Para umidade relativa, foi localizada uma faixa numérica de 60–80% RH em fonte técnica de hidroponia, mas não uma segunda fonte independente com faixa percentual específica para a cultura; Rutgers apenas descreve umidade relativamente alta sem número. Os valores de RH aqui são do ar durante o cultivo, não umidade do solo nem condições de armazenamento.",
    sources: [
      {
        publisher:
          "Technology in Horticulture (Maxa Press); autores afiliados à Nanjing Agricultural University e institutos de pesquisa agrícola",
        supports:
          "Faixa hidropônica de 60–80% RH após transplante e recomendação de RH abaixo de 80% no período de crescimento; temperatura diurna 15–26 °C; colheita cerca de 50–60 dias após transplante em NFT de alto rack.",
        title:
          "Simple, rapid, efficient hydroponic cultivation technology on elevated racks of celery",
        url: "https://www.maxapress.com/article/id/68fad735fa6c587a1f97cc06",
      },
      {
        publisher: "Rutgers New Jersey Agricultural Experiment Station (NJAES)",
        supports:
          "Aipo cresce e produz melhor com temperaturas moderadamente frescas de 55–75 °F (13–24 °C), umidade relativamente alta e chega a tamanho utilizável em 85–100 dias após transplante.",
        title:
          "Celery — 2026/2027 Mid-Atlantic Commercial Vegetable Production Recommendations",
        url: "https://njaes.rutgers.edu/pubs/commercial-veg-rec/celery.pdf",
      },
      {
        publisher: "Michigan State University Extension",
        supports:
          "Indica colheita 80–120 dias após transplantes; confirma que o prazo reportado é contado do transplante.",
        title: "How to Grow Celery",
        url: "https://www.canr.msu.edu/resources/how_to_grow_celery",
      },
      {
        publisher: "Michigan State University Extension",
        supports:
          "Temperaturas de 60–80 °F (aprox. 16–27 °C) associadas a melhor produção e qualidade; maturidade em 80–110 dias, variando com época de plantio.",
        title: "Celery: Commercial Vegetable Recommendations (E1308)",
        url: "https://www.canr.msu.edu/resources/celery_commercial_vegetable_recommendations_e1308",
      },
      {
        publisher:
          "University of California Agriculture and Natural Resources (UC ANR), UC Marin Master Gardeners",
        supports:
          "Indica que aipo cresce melhor a 60–65 °F (aprox. 16–18 °C), referência adicional para temperatura fresca da cultura.",
        title: "Celery",
        url: "https://ucanr.edu/site/uc-marin-master-gardeners/document/celery",
      },
      {
        publisher:
          "Campo & Negócios; texto de Talita de Santana Matos (UFRRJ), Elisamara Caldeira do Nascimento (UFMT) e Glaucio da Cruz Genuncio (UFMT)",
        supports:
          "Referência em português informa temperatura ideal de 10–25 °C e colheita iniciando 150–180 dias após o cultivo; usada como evidência de variação e não para fixar o ciclo, pois o marco inicial é descrito de forma ambígua.",
        title: "Manejo e ambiente ideal para cultivo de salsão",
        url: "https://campoenegocios.com/manejo-e-ambiente-ideal-para-cultivo-de-salsao/",
      },
    ],
  },
  morango: {
    airHumidityRange:
      "40–75% RH (umidade relativa do ar, sobretudo diurna; faixa orientativa, não umidade do substrato/solo).",
    temperatureRangeC:
      "18–24 °C (orientativa para o ar: cerca de 20–24 °C durante o dia e média de 24 h próxima de 18 °C; ajustar a temperatura noturna e ao cultivar).",
    growthCycleDays: "60–80 dias",
    cycleBasis:
      "Do plantio/transplante das mudas até o início da colheita; não contado desde a semeadura. A Embrapa indica aproximadamente 60–80 dias após o plantio das mudas, com variação por clima, cultivar e manejo.",
    confidence: "medium",
    referenceNotes:
      "As recomendações disponíveis variam com cultivar, estação e estágio: a Ohio State indica 40–60% RH durante o dia e adverte contra umidade noturna persistentemente alta; experimento de estufa com ‘Elsanta’ encontrou 65–75% RH como ótimo para produção de verão. A faixa de 40–75% resume essas referências, não é um setpoint universal. Temperaturas diurnas de 20–24 °C e média de 24 h próxima a 18 °C são recomendações de ambiente controlado, não uma faixa única para todo o ciclo. O ciclo de 60–80 dias é uma referência geral da Embrapa para mudas e não especificamente de hidroponia; sistema, cultivar, estágio da muda e ambiente podem alterar a primeira colheita. Em cultivo hidropônico day-neutral, a Illinois Extension documenta diferenças entre cultivares e produção prolongada, portanto o valor de ciclo representa início da colheita, não duração total da produção.",
    sources: [
      {
        publisher: "The Ohio State University, Kubota Lab",
        supports:
          "Recomenda 20–24 °C durante o dia, média de 24 h em torno de 18 °C; informa RH diurna de 40–60% e sensibilidade a clima seco e à umidade noturna persistente.",
        title:
          "Environment — Controlled Environment Berry Production Information",
        url: "https://u.osu.edu/indoorberry/environment/",
      },
      {
        publisher:
          "International Society for Horticultural Science (Acta Horticulturae 567)",
        supports:
          "Experimentos de estufa com ‘Elsanta’ compararam 50%, 70% e 90% RH; 65–75% foi considerado ótimo para produção de verão quanto a rendimento, tamanho e pegamento dos frutos.",
        title:
          "THE EFFECT OF HUMIDITY ON THE PERFORMANCE OF GREENHOUSE GROWN STRAWBERRY",
        url: "https://ishs.org/ishs-article/567_101/",
      },
      {
        publisher:
          "Artigo científico revisado por pares, disponível no PubMed Central",
        supports:
          "Experimento de morango hidropônico em estufa controlada registrou médias de 23,3 °C de dia e 18,2 °C à noite; demonstra condições efetivamente utilizadas, não uma recomendação universal.",
        title:
          "Substrate system outperforms water-culture systems for strawberry production in controlled environment agriculture",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11860082/",
      },
      {
        publisher: "Embrapa Clima Temperado / Embrapa",
        supports:
          "Informa que a colheita começa aproximadamente 60–80 dias após o plantio das mudas e aponta dependência de clima, cultivar, manejo, método de produção das mudas e outros fatores.",
        title: "Colheita — Site Ageitec: Morango",
        url: "https://www.embrapa.br/en/web/agencia-de-informacao-tecnologica/cultivos/morango/producao/colheita",
      },
      {
        publisher: "Illinois Extension, University of Illinois",
        supports:
          "Descreve morango day-neutral em sistema hidropônico de túnel, transplantio e colheitas de múltiplas cultivares; documenta variação varietal e colheita prolongada, não estabelece um ciclo fixo de dias.",
        title: "Hydroponic day-neutral strawberry production observations",
        url: "https://extension.illinois.edu/blogs/commercial-fruit-and-vegetable-growers/2023-10-27-hydroponic-day-neutral-strawberry",
      },
    ],
  },
  tomate: {
    airHumidityRange:
      "50–70% RH (umidade relativa do ar; faixa geral recomendada). Em cultivo protegido, outra orientação técnica relata 60–80% durante o dia.",
    temperatureRangeC:
      "18–27 °C (faixa geral orientativa); em estufa, aproximadamente 21–24 °C de dia e mínimo de 17–18 °C à noite.",
    growthCycleDays: "65–100 dias",
    cycleBasis:
      "Da transplantação ao início da maturação/primeiros frutos colhíveis, não da semeadura. As fontes descrevem variação por cultivar: precoces podem levar cerca de 55–65 dias após transplante; cultivares tardias, aproximadamente 85–100 dias. Em tipos indeterminados, a produção continua por período prolongado.",
    confidence: "medium",
    referenceNotes:
      "Faixas orientativas para tomate em geral; as fontes não estabelecem necessidades distintas para cereja, italiano, salada e grape. Temperatura e umidade ótimas variam com estágio, luminosidade e sistema. A faixa de umidade é de UMIDADE RELATIVA DO AR, não do solo. Recomendações de ciclo são referências de produção geral/estufa, não uma garantia específica para cada cultivar ou sistema hidropônico; o ciclo real pode mudar com manejo e ambiente.",
    sources: [
      {
        publisher: "International Agrophysics (artigo de revisão científica)",
        supports:
          "Aponta 50–70% RH como faixa ótima de umidade relativa para os estágios do tomateiro; resume faixa geral ótima de temperatura do ar de 18,5–26,5 °C e 17–27 °C em todas as fases; informa duração variável, em geral 65–100 dias após transplante até frutificação madura, com cultivares precoces e tardias diferindo.",
        title:
          "Review of optimum temperature, humidity, and vapour pressure deficit for microclimate evaluation and control in greenhouse cultivation of tomato: A review",
        url: "https://www.international-agrophysics.org/pdf-104321-35388?controller=index&action=magazine&magSubpage=pdf&articleId=104321&pdfId=35388&filename=Review-of-optimum-tempera.pdf",
      },
      {
        publisher:
          "HortScience / American Society for Horticultural Science (ASHS), artigo de pesquisa revisado por pares",
        supports:
          "Relata como referência citada para tomate 18,3–32,2 °C e 50–70% RH; o estudo experimental examina a interação de temperatura alta e RH em mudas, portanto a faixa geral citada não deve ser confundida com um ótimo universal para cada estádio.",
        title:
          "The Interactive Effects of Daytime High Temperature and Humidity on Growth and Endogenous Hormone Concentration of Tomato Seedlings",
        url: "https://journals.ashs.org/view/journals/hortsci/55/10/article-p1575.xml",
      },
      {
        publisher: "Oregon State University, Department of Horticulture",
        supports:
          "Recomenda 60–80% de umidade durante o dia em cultivo protegido e temperaturas de 70–75 °F (21–24 °C) de dia e mínimas noturnas de 62–65 °F (17–18 °C); descreve calendário de cultivo em estufa a partir de transplantes/semeadura.",
        title: "Tomato, Greenhouse",
        url: "https://horticulture.oregonstate.edu/oregon-vegetables/tomato-greenhouse",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Indica 65–90 dias até a maturidade a partir do transplante e cultivares precoces com 55–65 dias após transplante; também caracteriza tipos cereja, paste/italiano e grape.",
        title: "Growing Tomatoes in a Home Garden",
        url: "https://extension.umd.edu/resource/growing-tomatoes-home-garden",
      },
      {
        publisher: "Cornell University, Cornell Garden-Based Learning",
        supports:
          "Define dias até colheita como aproximadamente o tempo após o transplante até o primeiro fruto maduro; classifica cultivares como precoces (65 dias ou menos), meio de estação (65–80) e tardias (80 ou mais), e ressalta que clima fresco/nublado atrasa a maturação.",
        title: "Tomato growing guide",
        url: "https://gardening.cals.cornell.edu/garden-guidance/foodgarden/vegetable-growing-guides/tomato-growing-guide/",
      },
    ],
  },
  pimentao: {
    airHumidityRange:
      "50–70% RH (umidade relativa do ar), especialmente durante a floração e o desenvolvimento dos frutos.",
    temperatureRangeC:
      "21–30 °C como faixa orientativa; priorizar aproximadamente 21–27 °C na floração e pegamento dos frutos.",
    growthCycleDays: "55–80 dias",
    cycleBasis:
      "Do transplante ao início da colheita: cerca de 55–60 dias para frutos verdes; frutos coloridos maduros podem demandar cerca de mais 20 dias (aproximadamente 75–80 dias no total). Não conta o período de produção das mudas antes do transplante.",
    confidence: "medium",
    referenceNotes:
      "Faixas orientativas, não exclusivas de hidroponia: as referências variam por cultivar, ambiente e estágio. A Embrapa informa médias mensais ideais de 21–30 °C, faixa de 21–27 °C para floração e 50–70% RH durante floração/desenvolvimento dos frutos; temperaturas acima de 35 °C prejudicam a formação de frutos. O ciclo depende da cor de colheita e do cultivar; em cultivo protegido/sem solo a colheita pode se prolongar em várias passadas. A evidência disponível não permite fixar um ciclo específico para mini-pimentão nem um calendário universal para todos os sistemas hidropônicos.",
    sources: [
      {
        publisher: "Embrapa (Embrapa Hortaliças)",
        supports:
          "Recomenda umidade relativa do ar de 50–70% durante floração e desenvolvimento dos frutos; informa temperatura média mensal ideal de 21–30 °C, floração em 21–27 °C e efeitos de temperaturas altas.",
        title: "Clima – Ageitec Pimenta",
        url: "https://www.embrapa.br/en/web/agencia-de-informacao-tecnologica/cultivos/pimenta/pre-producao/caracteristicas/clima",
      },
      {
        publisher: "Campo & Negócios",
        supports:
          "Relata para pimentão em cultivo protegido temperatura não superior a 27 °C, sobretudo na floração, e umidade relativa do ar de 50–70%. Fonte técnica setorial complementar à Embrapa.",
        title: "Cultivo protegido: Garantia de mais produtividade ao pimentão",
        url: "https://campoenegocios.com/cultivo-protegido-garantia-de-mais-produtividade-ao-pimentao/",
      },
      {
        publisher: "Oklahoma State University Extension",
        supports:
          "Informa que a maioria dos pimentões tipo bell leva 75–80 dias do transplante à colheita; fornece contexto de temperaturas associadas ao pegamento de frutos.",
        title: "Pepper Production (HLA-6030)",
        url: "https://extension.okstate.edu/fact-sheets/pepper-production",
      },
      {
        publisher:
          "New England Vegetable Management Guide / University of Massachusetts Amherst",
        supports:
          "Informa 55–60 dias do transplante para começar a produzir frutos verdes e aproximadamente mais 20 dias para frutos coloridos; orienta sobre temperaturas de mudas e condições que prejudicam o pegamento.",
        title: "Pepper",
        url: "https://nevegetable.org/crops/pepper",
      },
      {
        publisher: "University of Florida IFAS Extension",
        supports:
          "Documenta cultivo de pimentão em substrato sem solo com solução nutritiva hidropônica; transplants instalados em 1º de abril e colheitas iniciadas em 16 de junho, como referência experimental do sistema, não como ciclo universal.",
        title:
          "Growing Bell Peppers in Soilless Culture under Open Shade Structures",
        url: "https://ask.ifas.ufl.edu/publication/HS368",
      },
    ],
  },
  pimentas: {
    airHumidityRange:
      "50–70% RH durante a floração e o desenvolvimento dos frutos (recomendação da Embrapa); não localizada faixa de RH específica para todo o ciclo hidropônico.",
    temperatureRangeC:
      "21–30 °C (faixa orientativa de temperatura média mensal ideal para Capsicum spp.).",
    growthCycleDays: "90–120 dias",
    cycleBasis:
      "Da semeadura até as primeiras colheitas, conforme orientação geral da Embrapa para pimentas precoces e tardias. O marco não representa o fim da colheita, que pode se estender por vários meses. Para a cultivar BRS Moema (biquinho), a Embrapa especifica início da colheita de frutos maduros cerca de 90 dias após o transplantio.",
    confidence: "medium",
    referenceNotes:
      "Dados agregados para Capsicum spp., não validados especificamente em sistema hidropônico nem para cada uma das cinco variedades listadas. A faixa de temperatura da Embrapa é de médias mensais; temperatura de florescimento pode diferir (21–27 °C), e temperaturas acima de 35 °C prejudicam a formação/pegamento dos frutos. Ciclo varia com cultivar, clima, manejo e ponto de colheita; a Embrapa informa que colheitas podem iniciar aos 90 dias da semeadura em materiais precoces e após 120 dias nos mais tardios. A indicação de RH de 50–70% aplica-se à floração e ao desenvolvimento dos frutos, não é recomendação para armazenamento nem umidade do solo. Limitação: cultura de fruto e referências gerais de Capsicum; não foi localizada validação integrada específica para produção hidropônica das variedades deste cadastro.",
    sources: [
      {
        publisher: "Embrapa",
        supports:
          "Informa RH de 50–70% na floração e desenvolvimento dos frutos; temperaturas médias mensais ideais de 21–30 °C, faixa para florescimento e efeitos de calor excessivo.",
        title: "Clima – Pimenta (Ageitec)",
        url: "https://www.embrapa.br/web/agencia-de-informacao-tecnologica/cultivos/pimenta/pre-producao/caracteristicas/clima",
      },
      {
        publisher: "Embrapa Hortaliças",
        supports:
          "Confirma médias mensais ideais de 21–30 °C; descreve faixas para germinação e mudas, sensibilidade a temperaturas extremas e exemplos para dedo-de-moça, malagueta e jalapeño.",
        title: "Clima – Sistema de produção de pimenta Capsicum",
        url: "https://www.embrapa.br/en/web/hortalicas/pimenta/clima",
      },
      {
        publisher: "Embrapa (Ageitec)",
        supports:
          "Ciclo geral: primeiras colheitas a partir de 90 dias após semeadura em materiais precoces e após 120 dias nos mais tardios; afirma que ciclo e período de colheita variam com tipo, clima e manejo.",
        title: "Colheita – Pimenta",
        url: "https://www.embrapa.br/web/hortalicas/pimenta/colheita",
      },
      {
        publisher: "Embrapa",
        supports:
          "Referência específica do grupo biquinho: início da colheita de frutos maduros cerca de 90 dias após transplante nas condições do Brasil Central; colheita média por seis meses.",
        title: "Pimenta BRS Moema",
        url: "https://www.embrapa.br/en/busca-de-solucoes-tecnologicas/-/produto-servico/418/pimenta-brs-moema",
      },
      {
        publisher: "Clemson Cooperative Extension",
        supports:
          "Referência independente para Capsicum annuum: 70–85 dias após transplante, ou 100–120 dias desde sementes até maturidade; temperatura diurna e noturna de cultivo.",
        title: "Pepper (HGIC 1316)",
        url: "https://hgic.clemson.edu/factsheet/pepper/",
      },
      {
        publisher: "Oregon State University Extension Service",
        supports:
          "Referência independente para temperatura diurna/noturna e colheita das primeiras pimentas 8–10 semanas após transplante; alerta de variação por cultivar e temperatura.",
        title: "Grow your own peppers (EC 1227)",
        url: "https://extension.oregonstate.edu/catalog/ec-1227-grow-your-own-peppers",
      },
    ],
  },
  pepino: {
    airHumidityRange: "60–80% RH (umidade relativa do ar)",
    temperatureRangeC:
      "20–29 °C (faixa orientativa; ajustar entre dia/noite e estágio)",
    growthCycleDays: "50–70 dias",
    cycleBasis:
      "Da semeadura até a primeira colheita de frutos comercializáveis. Extensões universitárias indicam início de colheita em cerca de 7 semanas ou 50–70 dias após semeadura; o ciclo efetivo varia com cultivar, luz, temperatura e sistema.",
    confidence: "medium",
    referenceNotes:
      "Referências de estufa diferem por clima e manejo: extensão do Alabama recomenda 60–70% RH; estudo revisado por pares cita 60–80% como faixa ótima e menciona regimes diurnos/noturnos mais úmidos. Use 60–80% como orientação ampla, com ventilação para evitar umidade persistentemente alta (acima de 90% favorece doenças). Temperatura: estudos e guias citam cerca de 20–25 °C como ótima, enquanto extensões indicam dias mais quentes, aproximadamente 24–29 °C, e noites mais frescas; evitar frio persistente e calor extremo. Os dados de ciclo são para pepino de estufa em geral, não estabelecem diferenças confiáveis específicas entre japonês e mini-pepino. UF/IFAS confirma que mini-pepinos são cultivados em estufa e colhidos conforme cultivar/mercado, mas não fornece ciclo separado.",
    sources: [
      {
        publisher: "Alabama Extension, Auburn University",
        supports:
          "Pepino de estufa: temperatura de melhor crescimento 80–85 °F (aprox. 27–29 °C), umidade relativa 60–70%, e primeira colheita em até 7 semanas da semeadura.",
        title: "Greenhouse Cucumber Production",
        url: "https://www.aces.edu/blog/topics/crop-production/greenhouse-cucumber-production/",
      },
      {
        publisher:
          "University of Alaska Fairbanks Cooperative Extension Service",
        supports:
          "Pepino em estufa/hidroponia: 75–80 °F de dia (aprox. 24–27 °C), noite não abaixo de 60 °F para produção precoce; colheita começa 50–70 dias após semeadura.",
        title: "Growing Cucumbers in Greenhouses",
        url: "https://www.uaf.edu/ces/publications/database/gardening/growing-cucumbers-greenhouses.php",
      },
      {
        publisher: "Heliyon (artigo revisado por pares; 2024)",
        supports:
          "Estudo sobre cultivo de pepino em estufa cita 20–25 °C como temperatura ótima de crescimento e 60–80% RH como faixa ótima referenciada; discute também regimes distintos de umidade dia/noite.",
        title:
          "Increasing the productivity and quality of cucumber crop by improving the performance of the evaporative cooling system",
        url: "https://www.sciencedirect.com/science/article/pii/S2405844024130289",
      },
      {
        publisher: "UF/IFAS Extension, University of Florida",
        supports:
          "Produção hidropônica/sem solo de pepino, inclusive mini-pepino: cultura de clima quente, mínimo recomendado acima de 65 °F (aprox. 18 °C), evitar períodos prolongados acima de 95 °F (35 °C); confirma tipos e dimensões de colheita de mini-pepino, sem ciclo específico por tipo.",
        title:
          "Greenhouse Production of Cucumber—Florida Greenhouse Vegetable Production Handbook, Vol. 3",
        url: "https://ask.ifas.ufl.edu/publication/CV268",
      },
      {
        publisher: "New Mexico State University Cooperative Extension Service",
        supports:
          "Para pepino em estufa, recomenda temperatura diurna de 80–85 °F (aprox. 27–29 °C) e noturna de 65–75 °F (aprox. 18–24 °C); indica que umidade relativa acima de 90% favorece doenças e condensação.",
        title: "Greenhouse Vegetable Production",
        url: "https://pubs.nmsu.edu/_circulars/CR556/index.html",
      },
    ],
  },
  berinjela: {
    airHumidityRange: "70–90% RH (umidade relativa do ar; faixa orientativa)",
    temperatureRangeC:
      "25–35 °C durante o dia e 20–27 °C à noite (preferencial, conforme Embrapa)",
    growthCycleDays:
      "45–90 dias até a primeira colheita após o transplante; referência geral de campo: 65–80 dias.",
    cycleBasis:
      "Transplante de muda até primeira colheita de frutos em tamanho comercial/maturidade de colheita — não é duração total da cultura nem da colheita. Embrapa informa 45–60 dias sob cultivo protegido, dependente de cultivar e ambiente; fontes de extensão indicam aproximadamente 65–90 dias em condições de campo. Para partir da semeadura, acrescentar aproximadamente 6–10 semanas de formação de muda, conforme prática/cultivar.",
    confidence: "medium",
    referenceNotes:
      "A Embrapa descreve 80% RH como condição preferencial; artigo revisado por pares afirma que umidade ambiente de 70–90% é desejável, justificando a faixa orientativa sem confundir umidade do ar com a do solo. A Embrapa recomenda temperaturas médias diurnas de 25–35 °C e noturnas de 20–27 °C; Clemson Extension dá uma faixa mais moderada de crescimento ótimo (aprox. 21–29 °C). Calor prolongado acima de 35 °C pode comprometer o pólen e a frutificação, e acima de 32 °C acelera maturação. As faixas de ciclo variam por cultivar, clima e sistema; não foi localizada recomendação universal específica para mini versus tradicional. Limitação para hidroponia: há estudo revisado por pares em berinjela hidropônica de estufa que observou início da colheita cerca de 7 semanas após transplante, mas em cultivares e ambiente experimental específicos; dados de cultivo protegido da Embrapa não equivalem a validação de uma receita hidropônica universal. A variedade tradicional normalmente requer suporte; ciclo informado se refere à primeira colheita, não ao período total produtivo.",
    sources: [
      {
        publisher: "Embrapa Hortaliças",
        supports:
          "Condição preferencial: temperatura média diurna de 25–35 °C, noturna de 20–27 °C e umidade relativa do ar de 80%; informa limites térmicos que prejudicam crescimento e frutificação.",
        title: "Clima propício para plantio da berinjela",
        url: "https://www.embrapa.br/en/web/hortalicas/berinjela/clima",
      },
      {
        publisher: "Embrapa Hortaliças — Sistemas de Produção, 3",
        supports:
          "Primeira colheita de frutos comerciais 45–60 dias após transplante, variando conforme cultivar e ambiente; registra abortamento de flores acima de 37 °C ou abaixo de 40% de umidade relativa.",
        title: "Cultivo Protegido",
        url: "https://www.embrapa.br/en/web/hortalicas/berinjela/cultivo-protegido",
      },
      {
        publisher: "University of Missouri Extension",
        supports:
          "Primeira colheita geralmente 65–90 dias após transplante; recomenda suporte/tutoramento; dias para colheita variam entre cultivares.",
        title: "Eggplant Production",
        url: "https://extension.missouri.edu/publications/g6369",
      },
      {
        publisher:
          "Clemson Cooperative Extension, Home & Garden Information Center",
        supports:
          "Temperatura de crescimento ótimo indicada como 70–85 °F (aprox. 21–29 °C); colheita em cerca de 65–80 dias após transplante ou 100–120 dias a partir da semeadura, dependente da variedade.",
        title: "Eggplant",
        url: "https://hgic.clemson.edu/factsheet/eggplant/",
      },
      {
        publisher: "Horticulturae (MDPI), artigo revisado por pares",
        supports:
          "Artigo declara umidade ambiente de 70–90% desejável; descreve ensaio de berinjela hidropônica em estufa controlada e colheita a partir de cerca de sete semanas após transplante, ressaltando dependência do sistema e das cultivares testadas.",
        title:
          "Physiological and Yield Performance Is Partially Linked to Photosynthetic Parameters in Greenhouse Eggplant Cultivars",
        url: "https://www.mdpi.com/2311-7524/9/1/19",
      },
    ],
  },
  abobrinha: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "18–24 °C (faixa orientativa de temperatura de cultivo do ar)",
    growthCycleDays: "50–70 dias",
    cycleBasis:
      "Da semeadura/plantio até a primeira colheita de frutos imaturos. A faixa sintetiza fontes que indicam 60 dias para zucchini, 60–70 dias do plantio à primeira colheita para abóboras de verão e 50–65 dias até a maturidade; o marco e as condições variam entre publicações e cultivares.",
    confidence: "medium",
    referenceNotes:
      "A faixa de temperatura é apoiada por recomendações gerais para abóbora de verão; em cultivo protegido, recomendações para zucchini variam por fase e estação (por exemplo, temperaturas diurnas de 18–25 °C e noturnas de 16–20 °C em diferentes etapas). Ciclo depende da cultivar, temperatura, sistema e de se a contagem começa com semeadura ou transplante. Zucchini e tipos de verão são colhidos imaturos, não quando o fruto alcança maturidade botânica. As faixas de umidade relativa encontradas nas fontes referem-se à conservação pós-colheita, não à umidade do ar durante o cultivo; por isso não foram usadas como recomendação de RH de cultivo.",
    sources: [
      {
        publisher:
          "University of California Agriculture and Natural Resources (UC ANR), UC Small Farms Network, Publication 7245",
        supports:
          "Indica temperatura ótima de cultivo de 65–75 °F (18–24 °C), zucchini com maturação em cerca de 60 dias e colheita do fruto imaturo; a RH de 95% descrita é explicitamente para armazenamento pós-colheita.",
        title: "Summer Squash",
        url: "https://ucanr.edu/program/uc-small-farms-network/summer-squash-0",
      },
      {
        publisher: "Washington State University Extension",
        supports:
          "Informa 60–70 dias do plantio à primeira colheita para abóboras de verão, grupo que inclui zucchini; as instruções descrevem semeadura direta ou transplante.",
        title: "Growing Squash in Home Gardens (Home Garden Series), FS087E",
        url: "https://pubs.extension.wsu.edu/product/growing-squash-in-home-gardens-home-garden-series/",
      },
      {
        publisher:
          "Virginia Cooperative Extension (Virginia Tech e Virginia State University)",
        supports:
          "Recomenda 65–75 °F (aprox. 18–24 °C) para squash e informa 50–65 dias à maturidade para abóbora de verão; 90% RH é indicada para armazenamento, não para produção.",
        title: "Cucumbers, Melons and Squash – VCE Publications",
        url: "https://pubs.ext.vt.edu/426/426-406/426-406.html",
      },
      {
        publisher: "Bayer Vegetables",
        supports:
          "Dá temperaturas específicas de cultivo protegido conforme fase/estação e relata efeitos qualitativos de umidade elevada, mas não estabelece faixa recomendada de RH do ar para a cultura.",
        title: "Growing Zucchini in Protected Culture",
        url: "https://www.vegetables.bayer.com/language-masters/en-us/resources/growing-tips-and-innovation-articles/cultivation-insights/growing-zucchini-in-protected-culture.html",
      },
    ],
  },
  melao: {
    airHumidityRange: "65–75% RH (umidade relativa do AR)",
    temperatureRangeC:
      "25–30 °C (faixa ótima orientativa para desenvolvimento)",
    growthCycleDays: "60–75 dias",
    cycleBasis:
      "Do plantio/semeadura direta até a colheita/maturidade conforme referências Embrapa; em cultivo por mudas, referência universitária informa cerca de 70–75 dias após o transplante, sem incluir o período de viveiro. O início e a duração da colheita dependem de cultivar e sistema.",
    confidence: "medium",
    referenceNotes:
      "Dados são para Cucumis melo em geral, não exclusivamente para mini-cultivares treliçadas em hidroponia. A faixa de RH de 65–75% é recomendação climática da Embrapa para a cultura; umidade persistentemente acima de 75% é associada a pior qualidade e maior risco de doenças. A temperatura varia por estágio: a Embrapa indica 25–30 °C como ótima para desenvolvimento e 20–23 °C para floração; outra publicação Embrapa indica 25–32 °C ao longo do ciclo e a extensão da Universidade de Missouri 70–85 °F (aprox. 21–29 °C) como ótima para melões. O ciclo depende de cultivar, região, temperatura e sistema; valores de campo/túnel são orientação, não validação específica de hidroponia. Treliçamento muda o manejo, não fornece por si só uma faixa de ciclo distinta.",
    sources: [
      {
        publisher: "Embrapa Semiárido",
        supports:
          "Faixa ótima de umidade relativa do ar de 65–75%; temperaturas ótimas de 25–30 °C para desenvolvimento e 20–23 °C para floração.",
        title: "Sistema de Produção de Melão — Clima",
        url: "http://www.cpatsa.embrapa.br:8080/sistema_producao/spmelao/clima.html",
      },
      {
        publisher: "Embrapa Meio-Norte",
        supports:
          "Temperatura mais adequada de 25–32 °C ao longo do ciclo; colheita inicia 55–60 e termina 67–75 dias após plantio.",
        title: "Melão: recomendações técnicas",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/61410/1/FDMelao.pdf",
      },
      {
        publisher: "Embrapa",
        supports:
          "Temperaturas de 20–30 °C favoráveis ao desenvolvimento e produtividade; 65–75 dias do plantio à maturação completa; dados regionais de umidade relativa do ar, não uma recomendação universal de RH.",
        title: "Cultivo do Meloeiro para o Norte de Minas Gerais",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/769737/1/CNPHDOCUMENTOS20CULTIVODOMELOEIROPARAONORTEDEMINASGERAISFL07830.pdf",
      },
      {
        publisher: "University of Missouri Extension",
        supports:
          "Temperatura ótima de cultivo de 70–85 °F (aprox. 21–29 °C); orientações para treliçar melões e colheita de frutos 45–60 dias após a floração.",
        title: "High Tunnel Melon and Watermelon Production",
        url: "https://extension.missouri.edu/publications/m173",
      },
      {
        publisher: "Oregon State University Extension",
        supports:
          "Muskmelões com maturidade aproximada de 70 dias após transplante na região Lower Columbia Basin e 75 dias no Willamette Valley.",
        title:
          "Melons: Cantaloupe, Muskmelon, Honeydew, Crenshaw, Casaba, Etc.",
        url: "https://horticulture.oregonstate.edu/oregon-vegetables/melons-cantaloupe-muskmelon-honeydew-crenshaw-casaba-etc-0",
      },
    ],
  },
  melancia: {
    airHumidityRange: "60–80% RH (umidade relativa do ar)",
    temperatureRangeC: "23–28 °C (faixa orientativa; temperatura do ar)",
    growthCycleDays: "80–110 dias",
    cycleBasis:
      "Da semeadura/plantio à colheita/maturidade. Em sistema de mudas, uma fonte universitária relata 60–90 dias do transplante à maturidade, conforme a variedade.",
    confidence: "medium",
    referenceNotes:
      "Valores de referência para a espécie em cultivo convencional; não há validação específica para cultivo hidropônico nem para a variedade mini com frutos conduzidos em suporte. A duração depende de cultivar, temperatura, luminosidade e manejo. Fontes técnicas recomendam sustentar frutos pequenos em treliça com sling que seque rapidamente. A faixa de 23–28 °C representa condição favorável/ótima de desenvolvimento vegetativo citada para melancia, não um setpoint universal para todos os estágios; UF/IFAS informa faixa mais ampla de crescimento de 21–29 °C. Umidade alta favorece doenças e pode afetar a qualidade dos frutos.",
    sources: [
      {
        publisher: "Embrapa Semiárido",
        supports:
          "UR do ar ótima geral de 60–80%; desenvolvimento vegetativo favorecido por 23–28 °C; maturação varia com cultivar e condições.",
        title: "Sistema de Produção de Melancia — Clima",
        url: "https://sistemasdeproducao.cnptia.embrapa.br/FontesHTML/Melancia/SistemaProducaoMelancia/clima.htm",
      },
      {
        publisher: "ESALQ/USP",
        supports:
          "Publicação técnica relata UR favorável em torno de 60–80% e temperatura de desenvolvimento em torno de 20–30 °C; corrobora a indicação de umidade relativa.",
        title: "A Cultura da Melancia",
        url: "https://www.esalq.usp.br/biblioteca/sites/default/files/publicacoes-a-venda/pdf/SPR54.pdf",
      },
      {
        publisher: "AGRAER / CEPAER, Governo de Mato Grosso do Sul",
        supports:
          "Cita ciclo de vida de 80–110 dias e faixa de temperatura de desenvolvimento de 23–28 °C; informa colheita 40–45 dias após abertura das flores.",
        title: "CULTURA DA MELANCIA",
        url: "https://www.agraer.ms.gov.br/wp-content/uploads/2023/12/Boletim-Melancia.pdf",
      },
      {
        publisher: "Embrapa Informação Tecnológica",
        supports:
          "Informa que a melancia fica pronta para colheita 80–110 dias depois do plantio.",
        title: "Como produzir melancia",
        url: "https://www.infoteca.cnptia.embrapa.br/bitstream/doc/100114/1/00078770.pdf",
      },
      {
        publisher: "University of Florida IFAS Extension",
        supports:
          "Informa crescimento melhor a 21–29 °C; maturidade em 80–100 dias da semente ou 60–90 dias do transplante, conforme a variedade.",
        title: "Florida Crop/Pest Management Profile: Watermelon",
        url: "https://ask.ifas.ufl.edu/publication/PI031",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Relata 80–100 dias da transplantação até a maturidade; recomenda sling de material de secagem rápida para sustentar frutos pequenos em treliças.",
        title: "Growing Melons in a Home Garden",
        url: "https://extension.umd.edu/resource/growing-melons-home-garden",
      },
    ],
  },
  "broto-girassol": {
    airHumidityRange:
      "40–60% RH (umidade relativa do ar); faixa orientativa observada/estabelecida em cultivo, não um ótimo universal validado.",
    temperatureRangeC:
      "18–22,5 °C (faixa orientativa para o ambiente de cultivo).",
    growthCycleDays: "9–10 dias.",
    cycleBasis:
      "Da semeadura das sementes pré-embebidas até a colheita dos brotos/microgreens. Em experimento com girassol, a colheita foi no dia 10; a extensão da Utah State indica 9–10 dias. A embebição prévia (6–12 h, conforme protocolo) ocorre antes da semeadura e não está incluída na contagem.",
    confidence: "medium",
    referenceNotes:
      "As fontes variam conforme cultivar, sistema, luz, temperatura e estágio desejado; a faixa de ciclo é indicativa, não uma duração fixa. O estudo revisado por pares usou sementes de girassol black oil em sistema sem solo, cultivadas por 10 dias, e registrou temperatura ambiente de 17,8–22,5 °C e RH medida de 21–72,5%, com médias de 45,2–52,1%; portanto, a faixa de RH indicada como alvo (40–60%) é apoiada pelo alvo usado nesse ensaio, e não por consenso específico de ótimo para a espécie. Um produtor comercial também declara alvo de 45–55% RH, embora opere frequentemente a 65–72%. RH refere-se à umidade do ar, não à umidade do substrato. Colheita como microgreen/shoot, ao início da emergência das folhas verdadeiras ou conforme preferência de tamanho.",
    sources: [
      {
        publisher: "Horticulturae (artigo revisado por pares, MDPI)",
        supports:
          "Estudo específico com girassol black oil: colheita no dia 10; RH-alvo de 40–60%; temperaturas médias de 20,4–20,8 °C e faixas medidas de 17,8–22,5 °C; RH média de 45,2–52,1%.",
        title:
          "Persistence and transfer of foodborne pathogens to sunflower and pea shoot microgreens during production in soil-free cultivation matrix",
        url: "https://www.mdpi.com/2311-7524/7/11/446",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "Tabela específica para girassol: 9–10 dias estimados até a colheita; presoak de 12 horas; condições gerais de temperatura para microgreens.",
        title: "Grow Your Own Microgreens",
        url: "https://extension.usu.edu/yardandgarden/research/grow-your-own-microgreens",
      },
      {
        publisher: "Penn State Extension",
        supports:
          "Faixa geral de ar de 60–70 °F (aprox. 15,6–21,1 °C) e produção geral de 7–21 dias da semeadura à colheita; contextualiza a faixa orientativa para microgreens, não é específica de girassol.",
        title: "Growing Microgreens",
        url: "https://extension.psu.edu/growing-microgreens/",
      },
      {
        publisher:
          "Microgreen Manager / Piedmont Microgreens (guia de produtor comercial)",
        supports:
          "Protocolo comercial específico de sunflower shoots: colheita no dia 8 ou 9 após germinação/plantio; alvo declarado de RH 45–55%, com ambiente médio de 24 °C e RH operacional frequentemente 65–72%.",
        title: "How to Grow Sunflower Microgreens",
        url: "https://microgreenmanager.com/blog/growing-sunflower-microgreens",
      },
    ],
  },
  "broto-ervilha": {
    airHumidityRange:
      "50–70% RH como faixa orientativa geral para microgreens; não localizada recomendação validada especificamente para broto de ervilha. Em estudo controlado com ervilha, foi mantida RH do ar de 50–60%.",
    temperatureRangeC:
      "17–23 °C (orientativa; inclui condições de cultivo diretamente estudadas em ervilha; Penn State recomenda 16–21 °C para microgreens em geral).",
    growthCycleDays:
      "7–14 dias; referência central orientativa de aproximadamente 10–11 dias.",
    cycleBasis:
      "Da germinação/emergência até o corte para colheita: extensão relata 7–10 dias para pea shoots. Um estudo de cultivar de ervilha contabilizou 14 dias de cultivo após a semeadura (sementes previamente embebidas). Não há transplante; variações de cultivar e sistema podem alterar o ponto de corte.",
    confidence: "medium",
    referenceNotes:
      "A temperatura e a RH da faixa observada em ervilha vêm de experimento controlado com a cultivar Boogie, não de uma recomendação universal; o estudo manteve 23 °C até emergência e 21/17 ±2 °C dia/noite durante o cultivo, com RH 50–60%, colhendo após 14 dias de cultivo. A faixa geral de RH 50–70% é sintetizada para microgreens, não é específica da ervilha. A extensão Mississippi State informa colheita de pea shoots em 7–10 dias. Aqui 'broto' é tratado como microgreen/pea shoot colhido acima da raiz, conforme a categoria informada; brotos germinados consumidos inteiros podem seguir outro sistema e ciclo.",
    sources: [
      {
        publisher: "Mississippi State University Extension Service",
        supports:
          "Informa colheita de pea shoots em 7–10 dias; contextualiza colheita de microgreens a partir da germinação e distingue shoots de sprouts.",
        title: "Grow microgreens inside for fresh winter produce",
        url: "https://extension.msstate.edu/news/southern-gardening/2022/grow-microgreens-inside-for-fresh-winter-produce",
      },
      {
        publisher: "Penn State Extension",
        supports:
          "Recomenda temperatura do ar de 60–70 °F (aprox. 16–21 °C) para microgreens em geral e informa ciclo geral de 7–21 dias da semeadura à colheita, variável conforme ambiente e cultura.",
        title: "Growing Microgreens",
        url: "https://extension.psu.edu/growing-microgreens/",
      },
      {
        publisher: "Agriculture (MDPI), artigo científico revisado por pares",
        supports:
          "Experimento com Pisum sativum cv. Boogie: 23 °C até emergência; durante o cultivo, 21/17 ±2 °C dia/noite e 50–60% de RH do ar; cultivo por 14 dias.",
        title:
          "The Suitability of Algae Solution in Pea Microgreens Cultivation under Different Light Intensities",
        url: "https://www.mdpi.com/2077-0472/14/10/1665",
      },
      {
        publisher: "Plants (MDPI), revisão científica",
        supports:
          "Revisão informa que 50–70% é a faixa de RH mais frequentemente usada em produção de microgreens; é evidência geral, não específica para ervilha.",
        title:
          "Microgreens Production: Exploiting Environmental and Cultural Factors for Enhanced Agronomical Benefits",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11435253/",
      },
    ],
  },
  "broto-alfalfa": {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "20–27 °C (faixa orientativa para germinação/crescimento de brotos; fontes técnicas dão recomendações gerais para brotos, não uma faixa experimental exclusiva para alfafa).",
    growthCycleDays:
      "4–5 dias (média orientativa); pode variar conforme sistema e comprimento desejado.",
    cycleBasis:
      "Da imersão/início da germinação até o ponto de colheita como broto comestível; não se refere à alfafa forrageira nem a microgreens desenvolvidos em bandeja. Extensões informam 4–5 dias em condições adequadas e 3–6 dias conforme espécie e comprimento desejado.",
    confidence: "medium",
    referenceNotes:
      "Oregon State University indica 21–27 °C para brotação de melhor qualidade, aplicando os princípios a outras espécies e citando a alfafa entre os brotos cultivados; Nebraska Extension recomenda temperatura ambiente de 20–22 °C e 3–6 dias para brotos, incluindo alfalfa, sem discriminar duração por espécie. Portanto, 20–27 °C e 4–5 dias são valores orientativos, não uma faixa específica validada para todas as cultivares/sistemas. Uma pesquisa revisada por pares empregou 25 ± 2 °C na fase de cultivo de brotos de alfafa já germinados, corroborando a ordem de temperatura, mas não informa o ciclo total até a colheita. A umidade relativa do ar não deve ser inferida da umidade de irrigação ou de valores de armazenamento pós-colheita.",
    sources: [
      {
        publisher: "Oregon State University, Department of Horticulture",
        supports:
          "Temperatura de brotação indicada como 70–80 °F (aprox. 21–27 °C) para melhor qualidade e colheita em 4–5 dias; texto inclui alfalfa entre os brotos e declara aplicabilidade geral dos princípios a outras culturas de brotos.",
        title: "Sprout Production",
        url: "https://horticulture.oregonstate.edu/oregon-vegetables/sprout-production-0",
      },
      {
        publisher: "Nebraska Extension, University of Nebraska–Lincoln",
        supports:
          "Inclui alfafa entre as sementes para brotos; orienta manter em temperatura ambiente de 68–72 °F (20–22 °C) e informa 3–6 dias até o comprimento desejado, dependendo do tipo de semente e do comprimento.",
        title: "Growing Edible Sprouts At Home",
        url: "https://lancaster.unl.edu/growing-edible-sprouts-home/",
      },
      {
        publisher: "Horticulturae (artigo revisado por pares; MDPI), 2024",
        supports:
          "Experimento com brotos de Medicago sativa cultivados a 25 ± 2 °C após germinação; valida temperatura de cultivo nesse estudo, mas não fornece ciclo completo até colheita.",
        title:
          "Effect of Red and Blue Light on the Growth and Antioxidant Activity of Alfalfa Sprouts",
        url: "https://www.mdpi.com/2311-7524/10/1/76",
      },
      {
        publisher:
          "Clemson Cooperative Extension, Home & Garden Information Center",
        supports:
          "Confirma que alfalfa está entre os brotos comumente consumidos, que brotos são geralmente colhidos de 1 a 8 dias após germinação e que o ambiente de crescimento é quente, aproximadamente 70 °F; referência geral, sem especificação de ciclo ou temperatura exclusiva para alfafa.",
        title: "The Food Safety of Sprouts",
        url: "https://hgic.clemson.edu/factsheet/the-food-safety-of-sprouts/",
      },
    ],
  },
  "broto-trevo": {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "18–25 °C (faixa orientativa; não é uma faixa ótima validada especificamente para produção de brotos).",
    growthCycleDays: "5–6 dias (ciclo culinário orientativo até colheita).",
    cycleBasis:
      "Contado após o molho inicial das sementes até a colheita, quando a maioria dos brotos está com folhas abertas; instruções técnicas de cultivo descrevem cerca de 6 dias após o molho. Incluindo o molho inicial de 4–12 horas, o tempo desde a semente seca é ligeiramente maior.",
    confidence: "medium",
    referenceNotes:
      "A identificação como Trifolium pratense é representativa do trevo-vermelho, variedade comumente usada para brotos; ‘trevo’ pode também designar outras espécies. A faixa térmica combina temperaturas de 18 e 25 °C usadas em estudo com brotos de T. pratense e cultivo à temperatura ambiente (~21 °C) recomendada por produtor especializado; portanto, é orientativa, não um ótimo agronômico estabelecido. O estudo científico cultivou por 10 dias para maximizar isoflavonas, enquanto as instruções de brotos culinários indicam colheita em 5–6 dias; o estágio de colheita depende do objetivo/sistema. Não foi encontrada recomendação confiável de umidade relativa do ar específica para a espécie; não confundir com umidade/água de enxágue.",
    sources: [
      {
        publisher: "Food Chemistry / PubMed (artigo revisado por pares)",
        supports:
          "Relata cultivo experimental de brotos a 18 e 25 °C e duração de 10 dias; sustenta temperaturas utilizadas experimentalmente e a variação de ciclo conforme o objetivo do cultivo.",
        title:
          "Evaluation of estrogenic activity of red clover (Trifolium pratense L.) sprouts cultivated under different conditions",
        url: "https://pubmed.ncbi.nlm.nih.gov/29287378/",
      },
      {
        publisher: "Sproutpeople",
        supports:
          "Instrução específica de brotos de trevo-vermelho: temperatura ambiente, cerca de 70 °F (~21 °C) como ideal, e colheita em aproximadamente 6 dias após o molho, quando as folhas estão abertas e verdes.",
        title: "Clover Sprouts - Red Clover",
        url: "https://sproutpeople.org/products/red-clover-sprouts",
      },
      {
        publisher: "Country Creek Acres / Organic Heirloom Seed",
        supports:
          "Indica colheita em 5–6 dias e colheita no dia 6 com folhas abertas; reforça a faixa de ciclo culinário.",
        title: "Clover Sprouting Instructions",
        url: "https://www.organic-heirloom-seed.com/pages/clover-sprouting-instructions",
      },
    ],
  },
  "micro-repolho-roxo": {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "17–22 °C (faixa orientativa para crescimento; varia com estágio e sistema)",
    growthCycleDays: "9–12 dias",
    cycleBasis:
      "Da semeadura à colheita/corte. Ensaios de microgreen de repolho roxo registraram colheita aos 9–11 dias após a semeadura em sistema recirculante e aos 12 dias em câmara de crescimento.",
    confidence: "medium",
    referenceNotes:
      "A faixa de temperatura é orientativa, não uma recomendação universal para todos os cultivares/sistemas: revisão de produção de microgreens reporta condições ótimas gerais em torno de 17–20 °C; um estudo controlado com repolho roxo trabalhou a 18 ou 21 °C após germinação e outro colheu aos 12 dias, após cultivo a 21 °C com tratamentos a 16 °C. Em experimento brasileiro com repolho roxo, a temperatura média ambiente foi 22,1 °C e a umidade relativa observada foi 74%; esse valor de RH descreve as condições do ensaio, não uma faixa recomendada. A recomendação confiável de RH para a espécie não foi localizada.",
    sources: [
      {
        publisher: "Revista Caatinga (artigo científico revisado por pares)",
        supports:
          "Espécie exata; sistema recirculante; colheita aos 9–11 dias após a semeadura; temperatura média observada de 22,1 °C e RH média de 74% no ambiente de cultivo (condição experimental, não recomendação).",
        title:
          "Purple cabbage microgreens grown in different substrates and nutritive solution concentrations",
        url: "https://doi.org/10.1590/1983-21252019v32n414rc",
      },
      {
        publisher:
          "Current Developments in Nutrition / Colorado State University",
        supports:
          "Estudo com microgreens de repolho roxo: crescimento sob setpoint de 21 °C e redução para 16 °C em tratamentos; colheita 12 dias após a semeadura.",
        title:
          "Controlled Environment Agriculture Increases Anthocyanin Content in Red Cabbage Microgreens",
        url: "https://doi.org/10.1016/j.cdnut.2024.102270",
      },
      {
        publisher:
          "Colorado State University, Mountain Scholar (dissertação de pesquisa)",
        supports:
          "Estudo de repolho roxo em sistema hidropônico ebb-and-flow; microgreens submetidos a 18 ou 21 °C após germinação e ensaio adicional com 21 °C por 12 dias ou transferências a 16 °C.",
        title:
          "Dynamic manipulation of far-red light and temperature for the production of microgreens in controlled environments",
        url: "https://mountainscholar.org/items/584a338d-db41-46ed-9f3b-8295e8b24f9b",
      },
      {
        publisher:
          "Plants (MDPI; revisão científica), disponível no PubMed Central",
        supports:
          "Contexto geral de temperatura para microgreens: estudos citados reportam condições ótimas em torno de 17–20 °C; não estabelece recomendação específica de RH para repolho roxo.",
        title:
          "Microgreens Production: Exploiting Environmental and Cultivation Factors for Enhanced Growth and Quality",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11435253/",
      },
      {
        publisher: "Penn State Extension",
        supports:
          "Referência de extensão para parâmetros gerais de microgreens: faixa de produção de 7–21 dias desde a semeadura até a colheita, temperaturas do ar de 60–70 °F (aprox. 16–21 °C) e dados de produção incluindo microgreens de repolho roxo; não é recomendação específica de RH durante o cultivo.",
        title: "Growing Microgreens",
        url: "https://extension.psu.edu/growing-microgreens/",
      },
    ],
  },
  "micro-beterraba": {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para a espécie (beterraba microgreen).",
    temperatureRangeC:
      "16–24 °C (faixa orientativa geral para microgreens; não é um ótimo específico validado para beterraba).",
    growthCycleDays: "12–25 dias",
    cycleBasis:
      "Da semeadura à colheita, no estágio de microgreen (cotilédones e primeiras folhas verdadeiras em formação/emergindo). A faixa é orientativa: Virginia Tech explicita dias desde a semeadura para beterraba; Mississippi State informa 16–25 dias para beterraba, sem explicitar nesse trecho o marco inicial.",
    confidence: "medium",
    referenceNotes:
      "Não confundir umidade do substrato com umidade relativa do ar. Não foi encontrada recomendação confiável de RH especificamente para beterraba microgreen; Virginia Tech e uma revisão científica apontam 50–70% RH como faixa geral/comumente usada para microgreens, não específica para beterraba. Temperatura também é recomendação geral: Virginia Tech sugere 16–21 °C e Maryland Extension 21–24 °C. Para ciclo, as extensões consultadas indicam 12–23 dias (Virginia Tech) e 16–25 dias (Mississippi State); a publicação da EMATER-MG informa 8–12 dias, sem esclarecer marco de contagem, evidenciando variação por cultivar, sistema e manejo. Estudo revisado por pares de beterraba microgreen reporta pregerminação a 20 °C e produção hidropônica, mas avalia crescimento/rendimento aos 15 dias após plantio, não estabelece um ótimo universal de temperatura ou RH.",
    sources: [
      {
        publisher: "Virginia Cooperative Extension, Virginia Tech",
        supports:
          "Temperatura geral 16–21 °C; RH geral 50–70%; beterraba com estimativa de 12–23 dias da semeadura à colheita.",
        title:
          "Introduction to Microgreen Production in Indoor Vertical Farms: Environmental Settings and Monitoring; Table 2",
        url: "https://pubs.ext.vt.edu/SPES/spes-756.html",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Microgreens em geral germinam e crescem bem a 70–75 °F (aprox. 21–24 °C); beterraba é adequada para microgreens e a família da beterraba cresce mais lentamente que Brassicaceae; faixa genérica de colheita de 7–21 dias.",
        title: "Growing Microgreens and Baby Greens Indoors",
        url: "https://extension.umd.edu/resource/growing-microgreens-and-baby-greens-indoors",
      },
      {
        publisher: "Mississippi State University Extension Service",
        supports:
          "Beterrabas estão entre os microgreens com janela de colheita de 16–25 dias; microgreens em geral colhidos com 1–3 polegadas, após germinação.",
        title: "Grow microgreens inside for fresh winter produce",
        url: "https://extension.msstate.edu/news/southern-gardening/2022/grow-microgreens-inside-for-fresh-winter-produce",
      },
      {
        publisher:
          "Plants (revisão científica revisada por pares; Dubey et al., 2024)",
        supports:
          "A seção de RH relata 50–70% como faixa mais usada em produção de microgreens em geral; não fornece recomendação específica para beterraba.",
        title:
          "Microgreens Production: Exploiting Environmental and Cultural Factors for Enhanced Agronomical Benefits",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11435253/",
      },
      {
        publisher: "EMATER-MG",
        supports:
          "Tabela específica de beterraba informa colheita em 8–12 dias, germinação em 2–3 dias e pré-molho de 8–12 horas; não explicita o marco inicial do prazo de colheita.",
        title: "Microverdes",
        url: "https://www.emater.mg.gov.br/download.do?id=89477",
      },
      {
        publisher:
          "International Journal of Vegetable Science; Murphy, Llort & Pill (2010)",
        supports:
          "Estudo revisado por pares específico para Beta vulgaris microgreen; descreve pregerminação por 5 dias a 20 °C e avalia rendimento aos 15 dias após plantio, incluindo produção por sistema NFT; não define RH recomendada nem ótimo universal de temperatura.",
        title: "Factors Affecting the Growth of Microgreen Table Beet",
        url: "https://doi.org/10.1080/19315261003648241",
      },
    ],
  },
  "micro-rabano": {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente como faixa recomendada específica para rábano microgreen. Uma revisão relata 50–70% RH como intervalo frequentemente usado em produção de microgreens, e um estudo com rábano usou 65–75% RH experimentalmente; estes dados não estabelecem recomendação específica para a espécie.",
    temperatureRangeC:
      "18–22 °C (faixa orientativa para o ar durante o crescimento)",
    growthCycleDays: "8–10 dias (orientativo; média aproximada: 9 dias)",
    cycleBasis:
      "Da semeadura até a colheita, no estágio de cotilédones plenamente desenvolvidos, antes ou perto da emergência das primeiras folhas verdadeiras. Estudos com rábano reportaram colheita no 8º ou 10º dia; o resultado depende da cultivar e do sistema.",
    confidence: "medium",
    referenceNotes:
      "A faixa de temperatura combina a orientação geral da Penn State Extension para temperatura do ar de microgreens (60–70 °F, aproximadamente 16–21 °C) com ensaio específico em rábano conduzido a 20 ± 2 °C; foi arredondada para 18–22 °C como intervalo prático, não como ótimo universal. Os ensaios diferem em cultivares, substrato/sistema e manejo; portanto, o ciclo varia. RH de ensaio não equivale a faixa recomendada. Trata-se de microgreen colhido jovem, não de produção de raiz comercial.",
    sources: [
      {
        publisher: "Penn State Extension",
        supports:
          "Orientação geral: temperatura do ar de 60–70 °F (aprox. 16–21 °C); período genérico de 7–21 dias da semeadura à colheita conforme espécie e ambiente. Não fornece faixa de RH específica para rábano.",
        title: "Growing Microgreens",
        url: "https://extension.psu.edu/growing-microgreens/",
      },
      {
        publisher: "Frontiers in Plant Science",
        supports:
          "Ensaio com cinco cultivares de rábano a 20 ± 2 °C; colheita no 10º dia após semeadura quando cotilédones estavam plenamente desenvolvidos, antes da emergência de folhas verdadeiras.",
        title:
          "Radish microgreens produced without substrate in a vertical multi-layered growing unit are rich in nutritional metabolites",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10536316/",
      },
      {
        publisher: "Agriculture (MDPI)",
        supports:
          "Inclui rábano vermelho: cotilédones atingiram estágio de colheita no 8º dia após semeadura; experimento reportou RH ambiente de 65–75% e condições de temperatura entre 20–30 °C, além de germinação máxima do rábano a 26 °C. Condições experimentais não constituem por si só recomendação geral.",
        title:
          "Evaluation of Growth Conditions, Antioxidant Potential, and Sensory Attributes of Six Diverse Microgreens Species",
        url: "https://www.mdpi.com/2077-0472/13/3/676",
      },
      {
        publisher: "Plants (MDPI)",
        supports:
          "Revisão sobre produção de microgreens: indica que 50–70% RH é o intervalo mais utilizado em sistemas avaliados; não identifica essa faixa como recomendação específica para rábano.",
        title:
          "Microgreens Production: Exploiting Environmental and Cultural Factors for Enhanced Agronomical Benefits",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11435253/",
      },
    ],
  },
  "micro-mostarda": {
    airHumidityRange:
      "50–70% RH (orientativa para microgreens; não localizada faixa técnica específica para mostarda)",
    temperatureRangeC:
      "16–21 °C (orientativa; referências relatam condições ótimas próximas de 17–20 °C)",
    growthCycleDays: "7–19 dias",
    cycleBasis:
      "Da semeadura até a colheita no estágio de microgreen (cotilédones expandidos e/ou início/emergência das primeiras folhas verdadeiras; colheita cortada acima do substrato).",
    confidence: "medium",
    referenceNotes:
      "As faixas ambientais são orientativas para microgreens em geral, não valores validados especificamente para todos os cultivares de Brassica juncea. Um ensaio com mostarda reportou colheitas aos 6, 8 e 10 dias; outro colheu no 8º dia; ensaio em estufa indicou 11–19 dias conforme a temperatura média do ar (aprox. 14–22 °C). Assim, o ciclo depende de cultivar, temperatura, sistema e ponto de colheita. Umidade informada é umidade relativa do ar, não do solo/substrato; não foi localizada recomendação confiável específica da espécie.",
    sources: [
      {
        publisher: "Virginia Cooperative Extension, Virginia Tech",
        supports:
          "Recomenda temperatura geral de 16–21 °C e 50–70% RH para microgreens; explica que variam por espécie/cultivar/sistema e que ciclo é contado da semeadura à colheita.",
        title:
          "Introduction to Microgreen Production in Indoor Vertical Farms and Greenhouses",
        url: "https://pubs.ext.vt.edu/SPES/spes-756.html",
      },
      {
        publisher: "Plants (MDPI), revisão revisada por pares",
        supports:
          "Revisão relata temperatura ótima referida de 17–20 °C e faixa de RH mais utilizada de 50–70% para microgreens; não estabelece valores próprios para mostarda.",
        title:
          "Microgreens Production: Exploiting Environmental and Cultural Factors for Enhanced Agronomical Benefits",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11435253/",
      },
      {
        publisher: "PLOS ONE, artigo revisado por pares",
        supports:
          "Ensaio específico de mostarda indiana a 21/18 °C (dia/noite) avaliou colheita nos dias 6, 8 e 10 após a semeadura; outro conjunto colheu mostarda no 8º dia.",
        title:
          "Yield optimization, microbial load analysis, and sensory evaluation of mungbean (Vigna radiata L.), lentil (Lens culinaris subsp. culinaris), and Indian mustard (Brassica juncea L.) microgreens grown under greenhouse conditions",
        url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0268085",
      },
      {
        publisher: "Agriculture (MDPI), artigo revisado por pares",
        supports:
          "Ensaio controlado de mostarda reportou colheita no 8º dia após semeadura, quando os cotilédones estavam totalmente expandidos; as condições do estudo incluíram 20–30 °C e RH 65–75%, sem validar tais faixas como ótimas gerais.",
        title:
          "Evaluation of Growth Conditions, Antioxidant Potential, and Sensory Attributes of Six Diverse Microgreens Species",
        url: "https://www.mdpi.com/2077-0472/13/3/676",
      },
      {
        publisher: "Greenhouse Product News (GPN), artigo técnico de produção",
        supports:
          "Relata dias da semeadura à colheita para mostarda entre 11 e 19 dias em ensaio com temperaturas médias do ar de cerca de 14–22 °C, demonstrando efeito da temperatura sobre o ciclo.",
        title: "Growing Better Greenhouse Microgreens",
        url: "https://gpnmag.com/article/growing-better-greenhouse-microgreens/",
      },
    ],
  },
  rabanete: {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para recomendar uma faixa de umidade relativa do ar durante o cultivo. Não confundir com 95–100% RH citado por algumas fontes para armazenamento refrigerado pós-colheita.",
    temperatureRangeC:
      "10–18 °C (faixa orientativa para cultivo fresco e qualidade da raiz; fontes situam o ótimo em torno de 10–15,5 °C ou 10–18 °C).",
    growthCycleDays: "21–35 dias",
    cycleBasis:
      "Da semeadura direta à colheita/maturidade comercial da raiz, para rabanetes comuns de mesa em condições favoráveis. Variedades maiores/de inverno, como daikon, levam mais tempo; algumas fontes indicam aproximadamente 40–70 dias, conforme cultivar e estação.",
    confidence: "medium",
    referenceNotes:
      "Faixas orientativas: cultivar, temperatura e sistema de cultivo alteram o desenvolvimento e o momento de colheita. A faixa de temperatura é coerente com recomendações para rabanete de clima fresco, mas não representa um setpoint validado especificamente para todo cultivo hidropônico. Há estudo de produção em sistema floating, porém a evidência hidropônica consultada é experimental e não estabelece recomendação geral de ciclo para todos os cultivares/sistemas. O ciclo informado sintetiza orientações de cultivo convencional para raiz de mesa; não é para brotos/microgreens. RH de armazenamento pós-colheita não foi usada como recomendação de umidade do ar durante o crescimento.",
    sources: [
      {
        publisher:
          "University of Massachusetts Amherst, New England Vegetable Guide",
        supports:
          "Radishes prefer cool growing conditions (50–65 °F, aproximadamente 10–18 °C); maturação de 21–28 dias em condições ideais e 40–50 dias em frio; raízes de mesa colhidas cerca de 3–4 semanas após semeadura. 95% RH é indicado para armazenamento pós-colheita, não como faixa ambiental de cultivo.",
        title: "Radish",
        url: "https://nevegetable.org/crops/radish",
      },
      {
        publisher:
          "Plants (MDPI) / PubMed Central, artigo de revisão revisado por pares",
        supports:
          "Revisão informa que, embora seja cultura de estação fria, a melhor qualidade de raízes é obtida em torno de 10–15,5 °C; dá suporte ao limite inferior da faixa térmica orientativa.",
        title:
          "Role of Different Abiotic Factors in Inducing Pre-Harvest Physiological Disorders in Radish (Raphanus sativus L.)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8537296/",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "Fact sheet revisado por pares: radishes crescem melhor quando temperaturas não excedem 80 °F; raízes geralmente maduras em 25–45 dias desde a semeadura, conforme variedade; embasa variação no ciclo e limite de calor.",
        title: "How to Grow Radishes in Your Home Garden",
        url: "https://extension.usu.edu/yardandgarden/research/radishes-in-the-garden",
      },
      {
        publisher: "University of Florida, IFAS Extension",
        supports:
          "Recomenda colheita de variedades comuns 20–30 dias após semeadura; variedades maiores demoram mais, com daikon colhido após cerca de 7 semanas na primavera ou 10 semanas no outono.",
        title: "Radishes",
        url: "https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/radishes/",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Indica 25–35 dias para maturidade e distingue 95% RH como condição de armazenamento refrigerado, não como recomendação de RH durante o cultivo.",
        title: "Growing Radishes in a Home Garden",
        url: "https://extension.umd.edu/resource/growing-radishes-home-garden",
      },
      {
        publisher:
          "International Society for Horticultural Science (ISHS), Acta Horticulturae",
        supports:
          "Estudo experimental de rabanete vermelho em sistema floating, com dois cultivares e ciclos experimentais de 20 dias; demonstra pesquisa em sistema sem solo, mas não fornece uma recomendação geral de maturidade ou RH para hidroponia.",
        title:
          "FLOATING SYSTEM CULTIVATION OF RADISH (RAPHANUS SATIVUS L.): PRODUCTION AND QUALITY",
        url: "https://ishs.org/ishs-article/697_9/",
      },
      {
        publisher: "Oregon State University, Oregon Vegetables",
        supports:
          "Fonte técnica específica da espécie; informa 95–100% RH para armazenamento refrigerado pós-colheita, corroborando que esse valor não deve ser tratado como faixa de RH do ar durante o cultivo.",
        title: "Radish",
        url: "https://horticulture.oregonstate.edu/oregon-vegetables/radish-0",
      },
    ],
  },
  cenoura: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "16–24 °C (faixa orientativa para crescimento; depende da cultivar e do estágio).",
    growthCycleDays: "40–90 dias",
    cycleBasis:
      "Da semeadura direta à colheita: cerca de 40 dias para raízes baby (WVU); 50–60 dias para finger carrots (Illinois Extension); até cerca de 90 dias para processamento de minicenouras da cultivar BRS Esplanada (Embrapa). A faixa reflete diferentes cultivares, tamanho-alvo e sistemas de produção, não um ciclo único para todas as mini/curtas.",
    confidence: "medium",
    referenceNotes:
      "A faixa térmica é apoiada por recomendações de crescimento ótimo de 16–24 °C (UF/IFAS) e 15,6–21,1 °C (University of Georgia); a Embrapa observa que resposta e formato da raiz variam com cultivar e temperatura, e que calor acima de 21 °C pode favorecer raízes curtas em cultivares sensíveis. Umidade relativa do ar não deve ser confundida com umidade do solo nem com UR de armazenamento; a Embrapa apenas alerta que UR alta junto de temperaturas elevadas favorece doenças, sem recomendar faixa percentual para cultivo. Cenoura é uma cultura de raiz normalmente cultivada em solo; a adequação e o ciclo em hidroponia são experimentais/não padronizados, portanto estes valores são referências de cultivo geral, não validação de sistema hidropônico. Minicenoura de processamento e raiz baby/finger colhida jovem não são necessariamente a mesma classe de produto.",
    sources: [
      {
        publisher: "UF/IFAS Extension, University of Florida",
        supports:
          "Crescimento e cor ótimos com temperatura do ar de 16–24 °C; descreve estágios e ressalta que a colheita depende de cultivar e mercado.",
        title:
          "Carrot (Daucus carota) Production in the Sandy Soils of North Florida",
        url: "https://ask.ifas.ufl.edu/publication/AE588",
      },
      {
        publisher: "University of Georgia Cooperative Extension",
        supports:
          "Temperatura ótima geral de 60–70 °F (aprox. 15,6–21,1 °C); mostra que cenouras de lavoura podem levar 3–5 meses, contextualizando a variação por sistema/mercado.",
        title: "Commercial Production and Management of Carrots",
        url: "https://fieldreport.caes.uga.edu/publications/B1175/commercial-production-and-management-of-carrots/",
      },
      {
        publisher: "Embrapa Hortaliças / Embrapa",
        supports:
          "Efeitos da temperatura na formação e coloração das raízes, variação por cultivar e alerta de que alta umidade relativa combinada a calor favorece doenças, sem recomendar faixa de UR.",
        title: "Clima – Cenoura, Ageitec",
        url: "https://www.embrapa.br/en/web/agencia-de-informacao-tecnologica/cultivos/cenoura/pre-producao/clima",
      },
      {
        publisher: "Embrapa Hortaliças / Embrapa",
        supports:
          "Descreve BRS Esplanada, cultivar destinada à produção de minicenouras, com colheita para processamento aos 90 dias após o plantio.",
        title:
          "Cultivares desenvolvidas em outras instituições ou unidades da Embrapa com participação da Embrapa Hortaliças (Portfólio de Cultivares)",
        url: "https://www.infoteca.cnptia.embrapa.br/bitstream/doc/991167/1/Portifolio27dez.pdf",
      },
      {
        publisher: "University of Illinois Extension",
        supports:
          "Informa colheita de finger carrots em 50–60 dias e distingue colheita jovem de variedades que crescem até tamanho maior.",
        title: "Carrots",
        url: "https://extension.illinois.edu/gardening/carrots",
      },
      {
        publisher: "West Virginia University Extension",
        supports:
          "Indica baby carrots colhidas aproximadamente 40 dias após semeadura e mostra que maturidade e tamanho dependem da variedade.",
        title: "Growing Carrots in West Virginia",
        url: "https://extension.wvu.edu/lawn-gardening-pests/gardening/wv-garden-guide/growing-carrots-in-west-virginia",
      },
    ],
  },
  beterraba: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "15–24 °C (faixa orientativa para crescimento; temperaturas noturnas mais baixas são compatíveis).",
    growthCycleDays: "50–110 dias",
    cycleBasis:
      "Da semeadura direta até a colheita/maturidade comercial da raiz. A variação entre fontes reflete cultivar, época, sistema e tamanho comercial visado; uma fonte brasileira especifica 70–110 dias após a semeadura.",
    confidence: "medium",
    referenceNotes:
      "A faixa térmica sintetiza referências que indicam melhor desenvolvimento perto de 20 °C, evitam calor acima de 25 °C, ou recomendam aproximadamente 16–24 °C durante o dia e 7–13 °C à noite. Os valores de ciclo variam entre fontes e condições: 50–60, 50–70 e 70–110 dias. Não confundir umidade relativa de armazenamento pós-colheita citada em alguns guias com umidade recomendada do ar durante o cultivo; não foi encontrada faixa técnica confiável de RH para cultivo. As referências são principalmente de cultivo em solo; aplicação a beterraba em hidroponia, cultura de raiz experimental, tem limitação e não foi validada por estas fontes.",
    sources: [
      {
        publisher:
          "Instituto Agronômico (IAC); arquivo disponível via Embrapa Ainfo",
        supports:
          "Melhor desenvolvimento da parte aérea em torno de 20 °C, evitar períodos acima de 25 °C; colheita 70–110 dias após semeadura, dependente do sistema, época e cultivar/híbrido. Menciona alta UR associada a doença, mas não recomenda faixa de UR para cultivo.",
        title: "Beterraba: do plantio à comercialização (Boletim Técnico 210)",
        url: "https://ainfo.cnptia.embrapa.br/digital/bitstream/item/48016/1/Andre-May-Boletim-Tec-IAC.pdf",
      },
      {
        publisher:
          "Texas A&M AgriLife Extension Service, Department of Horticultural Sciences",
        supports:
          "Condições de crescimento: dias 60–75 °F (15,6–23,9 °C), noites 45–55 °F (7,2–12,8 °C); colheita 50–70 dias após plantio.",
        title: "Beets",
        url: "https://aggie-horticulture.tamu.edu/vegetable/wp-content/uploads/sites/10/2011/10/beets1.pdf",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Colheita em 50–60 dias a partir da semeadura direta; não apresenta faixa de temperatura de crescimento nem RH recomendada.",
        title: "Growing Beets in a Home Garden",
        url: "https://extension.umd.edu/resource/growing-beets-home-garden",
      },
      {
        publisher:
          "UC Agriculture and Natural Resources (UC Master Gardeners of Sacramento County)",
        supports:
          "Colheita começa aproximadamente 45–65 dias após semeadura; beterraba é cultura de estação fresca, sem faixa numérica de temperatura de crescimento ou RH recomendada.",
        title: "Growing Beets in Sacramento",
        url: "https://ucanr.edu/site/uc-master-gardeners-sacramento-county/growing-beets-sacramento",
      },
      {
        publisher: "Department of Agriculture, Republic of South Africa",
        supports:
          "Corrobora cultura de clima fresco e descreve 18–24 °C como ótimo para germinação da semente (não como faixa de temperatura de crescimento); não fornece RH de cultivo nem ciclo em dias.",
        title: "Production guidelines for Beetroot",
        url: "https://www.nda.gov.za/phocadownloadpap/Brochures_and_Production_Guidelines/Production%20Guidelines%20%20Beetroot.pdf",
      },
    ],
  },
  nabo: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "10–18 °C (faixa orientativa de temperatura do ar para crescimento; fontes técnicas situam o cultivo em condições frescas, aproximadamente 10–18 °C).",
    growthCycleDays:
      "40–60 dias, como faixa média orientativa; fontes consultadas apresentam variação mais ampla, de 30 a 80 dias, dependendo da cultivar e das condições.",
    cycleBasis:
      "Da semeadura direta à colheita/maturidade da raiz. Não é ciclo contado do transplante; as orientações consultadas recomendam semear diretamente no local definitivo.",
    confidence: "medium",
    referenceNotes:
      "Os dados são de recomendações de cultivo convencional, não de ensaios hidropônicos específicos com nabo; trate temperatura e ciclo como referências iniciais, e valide no sistema/cultivar utilizado. O ciclo varia conforme cultivar, estação e tamanho de raiz desejado. Valores de umidade relativa de 95% encontrados em algumas referências dizem respeito ao armazenamento pós-colheita, não à umidade do ar durante o cultivo, e por isso não foram usados como recomendação de cultivo.",
    sources: [
      {
        publisher:
          "University of California Statewide Integrated Pest Management Program (UC IPM; University of California Agriculture and Natural Resources)",
        supports:
          "Espécie/cultura de nabo: melhor crescimento entre 50–65 °F (aprox. 10–18 °C); raízes prontas 50–80 dias após semeadura, dependendo da variedade. Conteúdo arquivado, disponibilizado pela UC IPM.",
        title: "Cultural Tips for Growing Turnip",
        url: "https://ipm.ucanr.edu/home-and-landscape/turnip/cultural-tips/index.html",
      },
      {
        publisher: "Virginia Cooperative Extension, Virginia Tech",
        supports:
          "Para nabo e rutabaga, temperatura fresca indicada de 60–65 °F (aprox. 16–18 °C) e 30–60 dias até maturidade; inclui também valores de armazenamento que não foram tratados como UR de cultivo.",
        title: "Root Crops",
        url: "https://pubs.ext.vt.edu/426/426-422/426-422.html",
      },
      {
        publisher: "UF/IFAS Gardening Solutions, University of Florida",
        supports:
          "Identifica nabo como Brassica rapa, cultura de clima fresco; raízes amadurecem em 40–60 dias e recomenda colheita jovem.",
        title: "Turnips",
        url: "https://gardeningsolutions.ifas.ufl.edu/plants/edibles/vegetables/turnips/",
      },
      {
        publisher: "Cornell University Home Gardening",
        supports:
          "Confirma que a maioria das variedades de nabo amadurece em 30–60 dias; guia recomenda semeadura direta e condições frescas.",
        title: "Turnips",
        url: "http://www.gardening.cornell.edu/homegardening/scene0f7d.html",
      },
      {
        publisher: "University of Minnesota Extension",
        supports:
          "Confirma Brassica rapa para nabo, preferência de qualidade por clima fresco, semeadura direta e colheita das raízes com cerca de 2–3 polegadas; útil para contextualizar diferenças entre nabo e rutabaga.",
        title: "Growing Turnips and Rutabagas in Home Gardens",
        url: "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/growing-turnips-and-rutabagas",
      },
    ],
  },
  "alho-cebola": {
    airHumidityRange:
      "Cebola: 40–50% RH, faixa usada em cultivo controlado de pesquisa (não é recomendação universal de campo). Alho: Não localizado em fonte técnica suficiente. Estes valores são umidade relativa do ar, não do substrato/solo.",
    temperatureRangeC:
      "Cebola: aproximadamente 18–25 °C (crescimento foliar ótimo de 18–20 °C em guia de extensão; 20–25 °C em cultivo controlado). Alho: 9–28 °C, faixa de temperatura em que o crescimento é reportado como possível; depende de cultivar, fotoperíodo e estágio.",
    growthCycleDays:
      "Cebola para folhas/cebolinha: cerca de 50 dias; cebola de bulbo: cerca de 90–120 dias. Alho para bulbo: aproximadamente 90–270 dias (3–9 meses; em regiões temperadas, usualmente 250–270 dias).",
    cycleBasis:
      "Cebola: semeadura até colheita, para cebolinha/folhas ou bulbo maduro, conforme o produto. Alho: plantio do dente até colheita do bulbo maduro; a faixa mais longa corresponde a alho de inverno em regiões temperadas. Os dias variam por cultivar, latitude, época e sistema.",
    confidence: "medium",
    referenceNotes:
      "O registro agrupa duas espécies e produtos distintos, por isso temperatura, umidade e ciclo foram discriminados para cebola e alho. A RH de 40–50% vem de protocolo de cultivo controlado para cebola (não de ensaio que compare/faça otimização de várias faixas); não foi localizada faixa confiável de RH do ar para alho. O ciclo do alho varia fortemente: CABI reporta 3–4 meses nos trópicos até cerca de 9 meses para alho de inverno em região temperada, compatível com extensões que informam 8–9 meses. Bulbos de alho e cebola em substrato leve/hidroponia são uma aplicação experimental: as fontes de ciclo e produção são majoritariamente de cultivo em solo, e os resultados não garantem o mesmo ciclo ou rendimento nesse sistema.",
    sources: [
      {
        publisher:
          "HortScience / American Society for Horticultural Science (ASHS), artigo de pesquisa, 2018",
        supports:
          "Cebola: 20–25 °C e 40–50% RH usados nas instalações de crescimento controlado; alerta para efeito de temperatura/RH e variação de bulbing por cultivar.",
        title:
          "A Guide for the Cultivation of Onion under Controlled Environment Conditions",
        url: "https://journals.ashs.org/view/journals/hortsci/53/12/article-p1746.xml",
      },
      {
        publisher: "Michigan State University Extension",
        supports:
          "Cebola: crescimento foliar ótimo a 65–68 °F (cerca de 18–20 °C); cultivares precoces amadurecem em 90–100 dias e tardias em 110–120 dias após semeadura, com variação por local/clima/cultivar.",
        title: "Onions: Commercial Vegetable Recommendations (Bulletin E1307)",
        url: "https://www.canr.msu.edu/resources/onions_commercial_vegetable_recommendations_e1307",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "Cebola: cebolinha pode ser colhida a partir de cerca de 50 dias após semeadura; cebola de bulbo requer 100–120 dias até maturidade.",
        title: "How to Grow Onions in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/onions-in-the-garden",
      },
      {
        publisher: "CABI Compendium",
        supports:
          "Alho: crescimento reportado entre 9 e 28 °C; ciclo total de 3–4 meses nos trópicos até cerca de 9 meses para alho de inverno temperado; destaca efeito de temperatura/fotoperíodo.",
        title: "Allium sativum (garlic)",
        url: "https://www.cabidigitallibrary.org/doi/full/10.1079/cabicompendium.4250",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Alho plantado no outono: 250–270 dias até maturidade; época de colheita varia com cultivar e estação.",
        title: "Growing Garlic in a Home Garden",
        url: "https://extension.umd.edu/resource/growing-garlic-home-garden",
      },
      {
        publisher: "University of Georgia Cooperative Extension",
        supports:
          "Alho: requer até 8 meses para maturar; plantio no outono e maturidade no início do verão; bulbing influenciado por dias longos e temperaturas quentes.",
        title: "Garlic Production for the Gardener (C854)",
        url: "https://fieldreport.caes.uga.edu/publications/C854/garlic-production-for-the-gardener/",
      },
      {
        publisher: "Agronomy (MDPI), artigo revisado por pares, 2019",
        supports:
          "Confirma que a resposta de crescimento e bulbing do alho varia com cultivar, fotoperíodo e temperatura; ensaiou regimes térmicos distintos, apoiando a cautela contra uma faixa ótima universal.",
        title:
          "Influence of Different Photoperiod and Temperature Combinations on Growth and Bulb Development of Garlic",
        url: "https://www.mdpi.com/2073-4395/9/12/879",
      },
    ],
  },
  batatas: {
    airHumidityRange:
      "Não localizada em fonte técnica suficiente uma faixa recomendada de umidade relativa do ar durante o cultivo. A FAO menciona cerca de 80% RH como condição favorável ao desenvolvimento vegetativo, mas não define faixa; não confundir com RH de cura/armazenamento pós-colheita.",
    temperatureRangeC:
      "20–30 °C (faixa orientativa); Embrapa indica 30/20 °C (dia/noite) como ideal de crescimento e desenvolvimento e temperatura média ótima próxima de 25,5 °C para biomassa/raízes; a FAO descreve 15–33 °C como faixa de cultivo, com ótimo geral de 20–25 °C.",
    growthCycleDays:
      "90–150 dias (orientativo; em algumas cultivares/condições pode ser mais curto ou longo).",
    cycleBasis:
      "Do plantio das ramas/mudas (propagação vegetativa) até a colheita das raízes tuberosas; não conta da semeadura. A maturidade/colheita depende de cultivar, época, ambiente e finalidade. Em cultivo hidropônico experimental, o prazo deve ser validado no sistema usado.",
    confidence: "medium",
    referenceNotes:
      "Os intervalos de temperatura e ciclo são apoiados por fontes técnicas independentes, mas variam conforme cultivar, fotoperíodo, ambiente e manejo. A Embrapa registra ciclo de 90–150 dias; FAO, normalmente 100–150 dias, e extensão universitária dos EUA, 85–120 dias após o plantio. A faixa térmica recomendada combina o ótimo diurno/noturno da Embrapa e os valores da FAO; 15–33 °C é uma faixa mais ampla de cultivo, não um alvo uniforme. Para RH, a única indicação encontrada para a fase vegetativa foi o valor aproximado de 80% da FAO, sem faixa validada; valores de alta RH de outras fontes consultadas referem-se à cura ou armazenamento das raízes. Batata-doce é uma cultura de raízes de cultivo hidropônico experimental/técnico: recomendações consultadas são majoritariamente para cultivo convencional, portanto produtividade e calendário em hidroponia não estão garantidos.",
    sources: [
      {
        publisher: "Embrapa Hortaliças",
        supports:
          "Ciclo plantio-colheita de 90–150 dias, dependência de cultivar/ambiente e temperaturas ideais 30/20 °C dia/noite e média ótima de cerca de 25,5 °C para desenvolvimento de biomassa/raízes.",
        title: "Ecofisiologia e exigências climáticas da batata-doce",
        url: "https://www.embrapa.br/en/web/hortalicas/batata-doce/ecofisiologia-e-exigencias-climaticas",
      },
      {
        publisher: "FAO (G. Paneque Ramirez)",
        supports:
          "Temperatura vegetativa de 15–33 °C, ótimo geral de 20–25 °C e 20–30 °C para desenvolvimento das raízes; ciclo normalmente 100–150 dias; menciona 80% RH como condição favorável à parte vegetativa, sem recomendar faixa.",
        title: "Cultivation, harvesting and storage of sweet potato products",
        url: "https://www.fao.org/4/t0554e/T0554E14.htm",
      },
      {
        publisher: "University of Maryland Extension",
        supports:
          "Maturidade/colheita em geral 85–120 dias após o plantio; distingue RH de cura (80–90%) e armazenamento da fase de cultivo.",
        title: "Growing Sweet Potatoes in a Home Garden",
        url: "https://extension.umd.edu/resource/growing-sweet-potatoes-home-garden",
      },
      {
        publisher: "Embrapa (Infoteca-e; publicação técnica em PDF)",
        supports:
          "Confirma variação do ciclo por cultivar e condições: colheita para consumo normalmente 110–165 dias após plantio; apresenta exemplos de cultivares e limitações da generalização.",
        title: "A cultura da batata-doce",
        url: "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/100650/1/Aculturadabatatadoce.pdf",
      },
      {
        publisher: "Plants (artigo revisado por pares, via PubMed Central)",
        supports:
          "Revisão indica clima quente, média de aproximadamente 24 °C e período de maturação de três a cinco meses, como contexto corroborativo geral.",
        title: "Sweet Potato as a Key Crop for Food Security under...",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10346279/",
      },
    ],
  },
  aipim: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "25–35 °C (faixa orientativa para crescimento em condições tropicais convencionais; não validada especificamente para hidroponia)",
    growthCycleDays: "210–365 dias (orientativo; aproximadamente 7–12 meses)",
    cycleBasis:
      "Conta do plantio das manivas/estacas até a colheita das raízes. A faixa cobre cultivares precoces e a janela comum de colheita; não é um ciclo hidropônico validado.",
    confidence: "low",
    referenceNotes:
      "Mandioca é uma cultura de raízes, e o cultivo hidropônico para produção de raízes é experimental; não foi localizada recomendação técnica consolidada específica para sistema hidropônico. As fontes consultadas são de cultivo convencional. A Embrapa cita colheita de 7 a 22 meses após o plantio; a FAO aponta 8–10 meses como época preferida para raízes destinadas à alimentação, embora algumas variedades possam ser colhidas desde 6 meses e outras permaneçam no campo por até 2 anos. Estudo revisado por pares confirma diferenças entre cultivares precoces (cerca de 7 meses) e tardias (cerca de 12 meses ou mais). Temperatura de 25–35 °C é uma orientação para crescimento e fotossíntese, não um setpoint demonstrado para hidroponia. Umidade relativa do ar foi distinguida da umidade do solo e não foi preenchida com dados climáticos locais ou valores não recomendados.",
    sources: [
      {
        publisher: "Embrapa — Agência de Informação Tecnológica",
        supports:
          "Temperatura de 25–35 °C e colheita desde 7 até 22 meses após a semeadura/plantio.",
        title: "Mandioca - Site Ageitec",
        url: "https://www.embrapa.br/en/web/agencia-de-informacao-tecnologica/territorios/territorio-mata-sul-pernambucana/atividades-economicas/cultivos/raizes-e-tuberculos/mandioca",
      },
      {
        publisher: "FAO",
        supports:
          "Recomenda colheita de raízes para alimentação por volta de 8–10 meses após o plantio; menciona que variedades podem ser colhidas entre 6 meses e 2 anos. Também descreve condições de crescimento e estabelecimento.",
        title: "Save and Grow: Cassava",
        url: "https://www.fao.org/4/i3278e/i3278e.pdf",
      },
      {
        publisher:
          "Frontiers in Plant Science (texto disponível no PubMed Central)",
        supports:
          "Mostra que maturação depende de cultivar e ambiente: algumas variedades precoces podem ser colhidas aos 7 meses; tardias em torno de 12 meses ou mais, com intervalos de colheita distintos entre materiais.",
        title:
          "Screening cassava for time of maturity to respond to various market needs: Case study in African sub-tropical zones",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9299893/",
      },
      {
        publisher: "Plants (MDPI; texto disponível no PubMed Central)",
        supports:
          "Revisão/estudo informa faixa ótima geral de 25–35 °C para crescimento e fotossíntese da mandioca; abaixo de 17 °C ou acima de 37 °C pode haver atraso na brotação.",
        title:
          "Physiological and Proteomic Responses of Cassava to Short-Term Low-Temperature Stress",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9460903/",
      },
      {
        publisher: "USDA, Natural Resources Conservation Service",
        supports:
          "Corrobora a adaptação a clima quente e registra produção de raízes mais alta em baixadas tropicais com temperaturas médias de 25–27 °C; não fornece uma faixa recomendada de umidade relativa do ar.",
        title: "Cassava Plant Guide",
        url: "https://plants.sc.egov.usda.gov/DocumentLibrary/plantguide/pdf/pg_maes.pdf",
      },
    ],
  },
  capuchinha: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "15–20 °C (faixa associada à melhor qualidade de plantas floridas em ensaio controlado; não é um setpoint hidropônico validado).",
    growthCycleDays: "40–60 dias",
    cycleBasis:
      "Da semeadura até a primeira floração/colheita das flores, não até o fim do período produtivo. O estudo brasileiro transplantou mudas aos 25 dias após a semeadura e começou a colher flores aos 30 dias após o transplante (~55 dias da semeadura); estudo controlado de outro cultivar encontrou floração em cerca de 41 dias sob 25 °C e efeito de fotoperíodo. Faixa orientativa, sujeita a cultivar e ambiente.",
    confidence: "medium",
    referenceNotes:
      "Dados publicados são de cultivo em campo ou ensaios ornamentais controlados, não de sistema hidropônico; trate as faixas como orientação para planejamento, não como receita hidropônica validada. A temperatura de 15–20 °C diz respeito à qualidade da planta florida no cultivar ‘Empress of India’; germinação/crescimento inicial foi favorecida em ensaio brasileiro por 20–25 °C, sem isso definir a temperatura ótima do ciclo inteiro. Fotoperíodo, sombreamento e cultivar alteram o tempo até florir. Não foi encontrada faixa técnica confiável de umidade relativa do ar para a espécie.",
    sources: [
      {
        publisher:
          "Songklanakarin Journal of Science and Technology, 37(3), 247–254 (2015)",
        supports:
          "Ensaio controlado com temperaturas de 10–30 °C; relata melhor qualidade de planta florida entre 15–20 °C e diferenças no tempo de floração por temperatura/fotoperíodo no cultivar testado.",
        title:
          "Flowering time response of Nasturtium (Tropaeolum majus L.) cultivar ‘Empress of India’ to photoperiod, light integral and temperature using photo-thermal model",
        url: "https://www.researchgate.net/publication/282683957_Flowering_time_response_of_Nasturtium_Tropaeolum_majus_L_cultivar_'Empress_of_India'_to_photoperiod_light_integral_and_temperature_using_photo-thermal_model",
      },
      {
        publisher: "Ciência e Agrotecnologia / SciELO, 32(4), 1195–1202 (2008)",
        supports:
          "Estudo de cultivo de capuchinha Jewel: transplante aos 25 dias após a semeadura e colheita de flores iniciada aos 30 dias após o transplante, com colheitas subsequentes até 155 DAT; sustenta cerca de 55 dias da semeadura à primeira colheita neste ensaio.",
        title:
          "Produção da capuchinha em cultivo solteiro e consorciado com os repolhos verde e roxo sob dois arranjos de plantas",
        url: "https://www.scielo.br/j/cagro/a/sQN7xgygcgwwhnPqS3gSdHC/?lang=pt",
      },
      {
        publisher: "Revista Brasileira de Agroecologia, 13(5), 239–246 (2018)",
        supports:
          "Estudo experimental de germinação e crescimento inicial; obteve respostas favoráveis em temperaturas de 20–25 °C, mas não estabelece temperatura ótima do ciclo de produção de flores.",
        title:
          "Germinação e crescimento inicial de capuchinha em diferentes condições de cultivo",
        url: "https://periodicos.unb.br/index.php/rbagroecologia/article/view/50103",
      },
      {
        publisher: "University of Wisconsin–Madison Extension",
        supports:
          "Fonte de extensão confirma flores e folhas comestíveis e germinação geralmente em 7–10 dias; não especifica faixa recomendada de umidade relativa nem dias até a primeira colheita.",
        title: "Nasturtium, Tropaeolum species",
        url: "https://hort.extension.wisc.edu/articles/nasturtium-tropaeolum-majus/",
      },
    ],
  },
  "amor-perfeito": {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "13–20 °C (faixa orientativa de crescimento/acabamento; depende do estágio e da cultivar)",
    growthCycleDays: "56–91 dias",
    cycleBasis:
      "Da semeadura até planta florida/adequada à colheita das flores: faixa convertida de 8–13 semanas reportada para produção comercial. Guias de cultivares corroboram aproximadamente 10–12 semanas até plantas em floração/comercializáveis. Não é uma duração específica de hidroponia.",
    confidence: "medium",
    referenceNotes:
      "Temperatura varia entre estágios: há guias que recomendam crescimento fresco em torno de 13–18 °C, acabamento com dias de 18–20 °C e noites mais frescas; cultivares, luz e época alteram o ciclo. A RH indicada em um guia Sakata (100%) é apenas para câmara de germinação, não uma recomendação de umidade relativa do ar durante o cultivo; portanto, não foi usada como faixa de RH. As referências são principalmente de produção ornamental em bandejas/vasos ou jardins, não ensaios hidropônicos nem estudos voltados especificamente à colheita alimentar; usar os valores como orientação e validar no sistema/cultivar local.",
    sources: [
      {
        publisher:
          "J. Raymond Kessler Jr., Austin Hagan e Pat Cobb, Auburn University (Southeastern Floriculture; hospedado no repositório HortScans da NC State University)",
        supports:
          "Produção a partir de semente até comercialização em 8–13 semanas; recomenda temperaturas frescas, com noites de 60–65 °F e dias em torno de 68 °F após transplante; detalha variação por época e tamanho do recipiente.",
        title: "Pansy Production and Marketing",
        url: "https://hortscans.ces.ncsu.edu/uploads/p/a/pansy_pr_51e448e796b25.pdf",
      },
      {
        publisher: "Syngenta Flowers",
        supports:
          "Guia de cultivar: 5–6 semanas de produção de muda e 4–7 semanas de acabamento após transplante, conforme recipiente; acabamento a ADT de 65 °F (18,5 °C), com variação de calendário por formato de vaso.",
        title: "Pansy Delta Pro Culture Guide",
        url: "https://www.syngentaflowers.com/ams/sites/g/files/kgtney2381/files/media/document/2022/12/15/culture_seed_pansy_deltapro.pdf",
      },
      {
        publisher: "Sakata Ornamentals Asia",
        supports:
          "Guia técnico de cultivares: crescimento a 13–18 °C, acabamento com temperatura diurna ótima de 18–20 °C e noturna de 10–13 °C; ciclo de 10–12 semanas para recipientes, com diferenças entre séries. Os 100% RH mencionados são apenas para câmara de germinação.",
        title: "Cultural Guide: Pansy",
        url: "https://global-sakata.com/sakataornamentals-asia/cultural_guide/uh5sg800000001fj-att/SAKATA_culturalguide_Pansy.pdf",
      },
      {
        publisher: "Iowa State University Extension and Outreach",
        supports:
          "Confirma que amor-perfeito (Viola ×wittrockiana) é cultura de estação fresca e prefere 55–65 °F (aprox. 13–18 °C); informa semeadura 8–10 semanas antes do plantio externo.",
        title: "Growing Pansies & Violas",
        url: "https://yardandgarden.extension.iastate.edu/how-to/growing-pansies-violas",
      },
      {
        publisher: "University of Florida IFAS Extension",
        supports:
          "Confirma identidade botânica e preferência por condições frescas; descreve germinação em 10–14 dias a 65–75 °F, sem recomendar faixa de RH de cultivo.",
        title: "Viola x wittrockiana Pansy (FPS-609)",
        url: "https://ask.ifas.ufl.edu/publication/FP609",
      },
    ],
  },
  calendula: {
    airHumidityRange:
      "Não localizado em fonte técnica suficiente para recomendar uma faixa de umidade relativa do ar (% RH).",
    temperatureRangeC:
      "15–25 °C (faixa orientativa, não um ótimo universal validado)",
    growthCycleDays: "30–70 dias; orientação média aproximada: 50–60 dias",
    cycleBasis:
      "Da semeadura até as primeiras flores/cabeças florais colhíveis ou maturidade inicial. OMAFRA informa cerca de 70 dias para cabeças florais; UNH Extension informa 30–50 dias para maturidade. A calêndula floresce repetidamente, portanto isso não representa o fim de toda a colheita.",
    confidence: "medium",
    referenceNotes:
      "Temperatura: faixa indicativa sintetizada para cultivo, não uma recomendação numérica consensual para todos os cultivares e sistemas. É uma espécie de clima temperado/fresco; um ensaio hidropônico PFAL manteve 23 ± 2 °C, e extensão universitária observa redução/interrupção da floração sob calor intenso (acima de 85 °F, cerca de 29,4 °C). O ótimo de 16–17 °C relatado em pesquisa é para germinação da semente, não para todo o ciclo. Um ensaio hidropônico registrou 50–70% RH como condição ambiental experimental, mas não a estabeleceu como faixa recomendada; por isso não foi convertida em recomendação. Ciclo varia com cultivar, clima, semeadura/transplante e sistema; o intervalo reúne referências distintas, não uma média experimental única.",
    sources: [
      {
        publisher: "University of New Hampshire Extension",
        supports:
          "Informa maturidade de 30–50 dias e recomenda semeadura na primavera; base para o extremo inicial do ciclo.",
        title: "How to grow calendula (Calendula officinalis)",
        url: "https://extension.unh.edu/resource/how-grow-calendula-calendula-officinalis",
      },
      {
        publisher:
          "Ontario Ministry of Agriculture, Food and Rural Affairs (OMAFRA), Governo de Ontário",
        supports:
          "Informa 70 dias até colheita de cabeças florais, clima temperado e múltiplas colheitas; não fornece RH recomendada para plantas em cultivo.",
        title: "Specialty Cropportunities – Calendula",
        url: "https://www.omafra.gov.on.ca/CropOp/en/indus_misc/oil_crops/calen.html",
      },
      {
        publisher: "Utah State University Extension",
        supports:
          "Indica preferência por temperaturas frescas (<85 °F, ≈29,4 °C) e redução/parada da floração sob calor extremo; informa colheita dos capítulos em plena floração.",
        title: "How to Grow Calendula in Your Garden",
        url: "https://extension.usu.edu/yardandgarden/research/calendula-in-the-garden",
      },
      {
        publisher: "Biology (MDPI), via PubMed Central",
        supports:
          "Ensaio hidropônico de cultivar ‘Orange Gem’ manteve temperatura a 23 ± 2 °C e RH a 50–70%; estas são condições experimentais, não recomendação geral de RH.",
        title:
          "Effect of Far-Red Light and Nutrient Solution Formulas on Calendula Production in a Plant Factory",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12189887/",
      },
      {
        publisher:
          "Industrial Crops and Products (Elsevier), artigo revisado por pares",
        supports:
          "Pesquisa com sementes de C. officinalis cv. ‘Carola’ relata temperatura ótima de germinação de 16–17 °C; sustenta apenas a contextualização térmica da fase de germinação, não um ótimo de cultivo do ciclo inteiro.",
        title: "Seed germination of calendula in response to temperature",
        url: "https://www.sciencedirect.com/science/article/abs/pii/S0926669013005839",
      },
    ],
  },
  borragem: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "21–25 °C (faixa orientativa; estudo experimental observou melhor crescimento vegetativo próximo de 24 °C e redução a 27 °C).",
    growthCycleDays: "50–80 dias",
    cycleBasis:
      "Da semeadura direta até o início da floração/primeiras flores comestíveis colhíveis. A faixa vem de guias de cultivo, não de ensaios de ciclo em hidroponia; a duração varia conforme ambiente e condições de cultivo.",
    confidence: "medium",
    referenceNotes:
      "A evidência de temperatura inclui estudo revisado por pares conduzido em câmaras a 21, 24 e 27 °C, com crescimento estimulado a 24 °C e prejudicado a 27 °C; faixa recomendada é orientativa, não validada especificamente em hidroponia. A faixa de ciclo de 50–80 dias é sustentada por guias de cultivo, não por estudos institucionais comparativos. OMAFRA informa cerca de 100 dias até colheita para produção de sementes oleaginosas — marco e finalidade diferentes, não adotados como ciclo de flores comestíveis. Umidade citada em experimento foi condição controlada (80 ± 10% RH), não recomendação agronômica; por isso não foi convertida em faixa recomendada.",
    sources: [
      {
        publisher: "Ecology and Evolution (artigo revisado por pares; PMC)",
        supports:
          "Condições experimentais de 21/19, 24/22 e 27/25 °C; crescimento vegetativo estimulado a 24 °C e prejudicado a 27 °C; umidade relativa de 80 ± 10% apenas como condição do experimento, não recomendação.",
        title:
          "Temperature and water stress affect plant–pollinator interactions in Borago officinalis (Boraginaceae)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5869376/",
      },
      {
        publisher: "Hortas.info",
        supports:
          "Indica cultivo em clima ameno/frio, com temperaturas de 4–25 °C; orientação geral de cultivo, usada como referência complementar para a faixa térmica.",
        title: "Como plantar borragem",
        url: "https://hortas.info/como-plantar-borragem",
      },
      {
        publisher: "Urban Farmer (guia de cultivo de fornecedor de sementes)",
        supports:
          "Informa que a floração começa em cerca de 50–80 dias após a semeadura, dependendo do clima e das condições de cultivo; sustenta o ciclo até as flores.",
        title: "How to grow borage",
        url: "https://www.ufseeds.com/pages/how-to-grow-borage",
      },
      {
        publisher:
          "True Leaf Market (guia de cultivo de fornecedor de sementes)",
        supports:
          "Informa 50–60 dias até colheita e cerca de 60 dias até maturidade, corroborando a ordem de grandeza do ciclo de flores/folhas.",
        title: "Borage Herb Growing Guide",
        url: "https://www.trueleafmarket.com/pages/grow-borage",
      },
      {
        publisher:
          "Ontario Ministry of Agriculture, Food and Rural Affairs (OMAFRA), Governo de Ontário",
        supports:
          "Recomenda semeadura na primavera quando temperaturas estão acima de 10 °C, caracteriza a cultura como de clima temperado/fresco e informa 100 dias até colheita de sementes; esse ciclo de sementes é distinto da colheita de flores comestíveis.",
        title: "Borage",
        url: "https://www.omafra.gov.on.ca/CropOp/en/indus_misc/oil_crops/borage.html",
      },
    ],
  },
  violas: {
    airHumidityRange: "Não localizado em fonte técnica suficiente.",
    temperatureRangeC:
      "Aproximadamente 4–16 °C para crescimento/floração de plantas estabelecidas (orientativo; noites próximas de 4 °C e dias próximos de 16 °C).",
    growthCycleDays: "70–91 dias",
    cycleBasis:
      "Da semeadura à primeira flor aberta/colheita: guias de cultivo hidropônico indicam cerca de 50–70 dias; estudo de produção de Viola cornuta relata 10 semanas de cultivo até plantas adultas e mais 15–20 dias após transplante ao canteiro aquecido antes da colheita (aprox. 85–90 dias); relatório técnico de produção hidropônica considera período de cultivo de 13 semanas (91 dias). Marco e duração variam conforme cultivar, ambiente e sistema.",
    confidence: "medium",
    referenceNotes:
      "A faixa térmica é baseada em orientação para pansies/Viola de clima fresco, não em ensaio de otimização hidropônica para todas as espécies de Viola. A UF/IFAS informa germinação a 18–24 °C; essa faixa é para germinação, não para crescimento/floração de plantas estabelecidas. O estudo de Texas Tech sobre cultivo hidropônico encontrou mortalidade elevada inclusive nos controles de cultura em água profunda e recomenda mais pesquisa para definir condições ótimas; portanto, os valores não devem ser interpretados como parâmetros hidropônicos universais. Umidade relativa do ar não foi confundida com umidade do substrato.",
    sources: [
      {
        publisher: "Utah State University Extension",
        supports:
          "Faixa ideal de cultivo de pansies de cerca de 40 °F à noite a 60 °F durante o dia (aprox. 4–16 °C); fonte para faixa térmica orientativa.",
        title: "Growing Pansies",
        url: "https://extension.usu.edu/yardandgarden/research/growing-pansies.pdf",
      },
      {
        publisher: "University of Florida IFAS Extension",
        supports:
          "Caracteriza a espécie como melhor adaptada às estações frescas de primavera e outono e informa germinação em 10–14 dias a 65–75 °F (aprox. 18–24 °C), distinção relevante entre germinação e crescimento da planta estabelecida.",
        title: "Viola × wittrockiana Pansy (FPS-609)",
        url: "https://ask.ifas.ufl.edu/publication/FP609",
      },
      {
        publisher: "Agronomy (MDPI), estudo revisado por pares",
        supports:
          "Descreve produção comercial de Viola cornuta: 10 semanas de cultivo na estufa e, após transplante ao canteiro, 15–20 dias antes da colheita; sustenta ciclo aproximado de 85–90 dias da semeadura à colheita no sistema descrito.",
        title: "Environmental Impact of Edible Flower Production: A Case Study",
        url: "https://www.mdpi.com/2073-4395/10/4/579",
      },
      {
        publisher: "Fork Farms",
        supports:
          "Guia de cultivo hidropônico informa florescimento de violas em aproximadamente 50–70 dias após semeadura; referência de ciclo, não fonte universitária.",
        title: "Edible Flowers Grow Guide",
        url: "https://www.forkfarms.com/knowledge/edible-flowers-grow-guide",
      },
      {
        publisher: "Texas Tech University, Electronic Theses and Dissertations",
        supports:
          "Pesquisa com cultivares de Viola cornuta em vasos e hidroponia; relata elevada mortalidade nos sistemas de cultura em água profunda e conclui que ainda são necessários estudos para determinar fatores ótimos de produção hidropônica.",
        title:
          "Effect of different production systems on productivity and phytochemical contents of Viola spp.",
        url: "https://ttu-ir.tdl.org/items/be5d6def-795f-4ea2-9a5c-a1ea2d079ad2",
      },
    ],
  },
};
