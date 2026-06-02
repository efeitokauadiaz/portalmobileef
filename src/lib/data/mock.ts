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
  {
    nome: "Camila Reis",
    cargo: "Designer",
    funcao: "Criativos & Landing pages",
    email: "camila@efeitovendas.com",
    telefone: "+55 11 98770-2210",
    status: "ausente" as const,
    inicial: "C",
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
    responsavel: "Camila Reis",
    status: "em_andamento",
    prioridade: "alta",
    criadaEm: "28/05/2026",
    prazo: "05/06/2026",
    progresso: 65,
    descricao:
      "Produção de 3 variações de criativos estáticos e 1 vídeo curto para campanha de Black Friday focada em retargeting.",
    atualizacoes: [
      { quando: "01/06 14:20", autor: "Camila Reis", texto: "Primeira rodada de artes enviada para revisão." },
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
    responsavel: "Camila Reis",
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