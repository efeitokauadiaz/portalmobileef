export const cliente = {
  nome: "BR SuperShop",
  plano: "Plano Growth",
  desde: "Mar/2024",
  inicial: "B",
};

export const faturamento = {
  total: 184320.5,
  variacao: 12.4,
  periodo: "vs. período anterior (30 dias)",
  pedidos: { valor: 1248, variacao: 8.2 },
  ticket: { valor: 147.69, variacao: 3.1 },
  conversao: { valor: 3.8, variacao: -0.6 },
};

export const faturamentoDetalhe = {
  bruto: 198450.0,
  liquido: 184320.5,
  taxas: 8420.3,
  reembolsos: 5709.2,
  meta: 220000,
  metaProgresso: 83.8,
  canais: [
    { nome: "Shopify (Loja)", valor: 102340.2, share: 55.5, variacao: 14.2 },
    { nome: "Marketplace", valor: 48210.4, share: 26.2, variacao: 6.8 },
    { nome: "Social Commerce", valor: 21450.9, share: 11.6, variacao: 22.5 },
    { nome: "Atacado / B2B", valor: 12319.0, share: 6.7, variacao: -3.1 },
  ],
  topProdutos: [
    { nome: "Kit Skincare Premium", pedidos: 184, receita: 32450.0 },
    { nome: "Tênis Runner X3", pedidos: 142, receita: 28490.0 },
    { nome: "Mochila Urban Pro", pedidos: 121, receita: 18120.0 },
    { nome: "Camiseta Oversized", pedidos: 318, receita: 15890.0 },
  ],
  formasPagamento: [
    { nome: "Pix", share: 48 },
    { nome: "Cartão de crédito", share: 41 },
    { nome: "Boleto", share: 11 },
  ],
};

export const adsDetalhe = {
  campanhas: [
    { nome: "Black Friday — Retargeting", canal: "Meta Ads", investido: 6840, retorno: 31250, roas: 4.57, status: "ativa" as const },
    { nome: "Performance Max — Catálogo", canal: "Google Ads", investido: 5210, retorno: 22480, roas: 4.31, status: "ativa" as const },
    { nome: "Prospecção — Lookalike 1%", canal: "Meta Ads", investido: 4980, retorno: 17820, roas: 3.58, status: "ativa" as const },
    { nome: "Search Marca", canal: "Google Ads", investido: 2120, retorno: 14210, roas: 6.70, status: "ativa" as const },
    { nome: "TikTok Criativos UGC", canal: "TikTok Ads", investido: 3210, retorno: 8950, roas: 2.79, status: "teste" as const },
    { nome: "Reengajamento 30d", canal: "Meta Ads", investido: 2220, retorno: 3610, roas: 1.63, status: "pausada" as const },
  ],
  proximasAcoes: [
    "Escalar campanha de Search Marca em +20% de budget",
    "Pausar grupo de criativos com CTR < 0,8%",
    "Testar 3 novos públicos de interesse no Meta Ads",
  ],
};

export const ads = {
  investimento: { valor: 24580, variacao: -5.4 },
  retorno: { valor: 98320, variacao: 18.7 },
  roas: { valor: 4.0, variacao: 12.3 },
  cpa: { valor: 34.5, variacao: -4.2 },
  impressoes: { valor: 1284500, variacao: 9.1 },
  cliques: { valor: 18420, variacao: 6.4 },
  ctr: { valor: 1.43, variacao: 2.1 },
  campanhasAtivas: 7,
};

export const equipe = [
  {
    nome: "Marina Lopes",
    cargo: "Consultora",
    funcao: "Estratégia & Performance",
    email: "marina@efeitovendas.com",
    telefone: "+55 11 99821-4410",
    status: "online" as const,
    inicial: "M",
  },
  {
    nome: "Rafael Souza",
    cargo: "Analista de Ads",
    funcao: "Meta & Google Ads",
    email: "rafael@efeitovendas.com",
    telefone: "+55 11 99105-7732",
    status: "online" as const,
    inicial: "R",
  },
];

export type DemandaStatus = "aberta" | "em_andamento" | "revisao" | "concluida";
export type DemandaPrioridade = "baixa" | "media" | "alta";

export interface Demanda {
  id: string;
  titulo: string;
  categoria: string;
  responsavel: string;
  status: DemandaStatus;
  prioridade: DemandaPrioridade;
  criadaEm: string;
  prazo: string;
  progresso: number;
  descricao: string;
  atualizacoes: { quando: string; autor: string; texto: string }[];
}

export const demandas: Demanda[] = [
  {
    id: "DEM-1042",
    titulo: "Novo criativo para campanha Black Friday",
    categoria: "Criativos",
    responsavel: "Rafael Souza",
    status: "em_andamento",
    prioridade: "alta",
    criadaEm: "28/05/2026",
    prazo: "05/06/2026",
    progresso: 65,
    descricao:
      "Produção de 3 variações de criativos estáticos e 1 vídeo curto para campanha de Black Friday focada em retargeting.",
    atualizacoes: [
      { quando: "01/06 14:20", autor: "Rafael Souza", texto: "Primeira rodada de artes enviada para revisão." },
      { quando: "30/05 09:10", autor: "Marina Lopes", texto: "Briefing alinhado com o cliente." },
    ],
  },
  {
    id: "DEM-1039",
    titulo: "Otimização da campanha de Performance Max",
    categoria: "Tráfego pago",
    responsavel: "Rafael Souza",
    status: "revisao",
    prioridade: "media",
    criadaEm: "26/05/2026",
    prazo: "03/06/2026",
    progresso: 85,
    descricao:
      "Revisão dos públicos, exclusões e novos sinais de audiência para reduzir CPA em 15%.",
    atualizacoes: [
      { quando: "02/06 10:45", autor: "Rafael Souza", texto: "Ajustes finais aplicados, aguardando aprovação." },
    ],
  },
  {
    id: "DEM-1036",
    titulo: "Relatório mensal de maio",
    categoria: "Relatório",
    responsavel: "Marina Lopes",
    status: "concluida",
    prioridade: "media",
    criadaEm: "20/05/2026",
    prazo: "01/06/2026",
    progresso: 100,
    descricao: "Relatório consolidado com leitura estratégica e próximos passos.",
    atualizacoes: [
      { quando: "01/06 18:00", autor: "Marina Lopes", texto: "Relatório entregue e apresentado." },
    ],
  },
  {
    id: "DEM-1045",
    titulo: "Landing page nova coleção inverno",
    categoria: "Landing page",
    responsavel: "Marina Lopes",
    status: "aberta",
    prioridade: "alta",
    criadaEm: "01/06/2026",
    prazo: "12/06/2026",
    progresso: 10,
    descricao: "Nova LP para coleção inverno com foco em conversão mobile.",
    atualizacoes: [
      { quando: "01/06 16:30", autor: "Cliente", texto: "Demanda aberta pelo portal." },
    ],
  },
];

export const categoriasDemanda = [
  "Criativos",
  "Tráfego pago",
  "Landing page",
  "Relatório",
  "Estratégia",
  "Outro",
];