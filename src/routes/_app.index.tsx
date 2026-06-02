import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp,
  ShoppingBag,
  Receipt,
  Target,
  DollarSign,
  LineChart,
  Gauge,
  Crosshair,
  Eye,
  MousePointerClick,
  Percent,
  Megaphone,
  ClipboardList,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { ads, equipe, faturamento, demandas, cliente } from "@/lib/data/mock";
import { SectionTitle, StatCard, Trend, fmtBRL, fmtInt, StatusBadge } from "@/components/app/ui";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

function Dashboard() {
  const abertas = demandas.filter((d) => d.status !== "concluida").slice(0, 2);

  return (
    <div className="space-y-6 px-5 pt-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Olá, cliente</p>
        <h1 className="font-display text-2xl font-bold tracking-tight">{cliente.nome}</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {cliente.plano} · Cliente desde {cliente.desde}
        </p>
      </div>

      {/* Hero faturamento */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Faturamento total da loja
            </div>
            <Trend value={faturamento.variacao} />
          </div>
          <div className="mt-3 font-display text-4xl font-bold tracking-tight">
            {fmtBRL(faturamento.total)}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{faturamento.periodo}</p>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
            <MiniStat
              icon={<ShoppingBag className="h-3.5 w-3.5" />}
              label="Pedidos"
              value={fmtInt(faturamento.pedidos.valor)}
              trend={faturamento.pedidos.variacao}
            />
            <MiniStat
              icon={<Receipt className="h-3.5 w-3.5" />}
              label="Ticket médio"
              value={fmtBRL(faturamento.ticket.valor)}
              trend={faturamento.ticket.variacao}
            />
            <MiniStat
              icon={<Target className="h-3.5 w-3.5" />}
              label="Conversão"
              value={`${faturamento.conversao.valor}%`}
              trend={faturamento.conversao.variacao}
            />
          </div>
        </div>
      </div>

      {/* Ads */}
      <section>
        <SectionTitle action={<span className="text-[11px] text-muted-foreground">{ads.campanhasAtivas} campanhas ativas</span>}>
          Desempenho dos Ads
        </SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<DollarSign className="h-4 w-4" />}
            label="Investimento em Ads"
            value={fmtBRL(ads.investimento.valor)}
            trend={ads.investimento.variacao}
            inverseTrend
          />
          <StatCard
            icon={<LineChart className="h-4 w-4" />}
            label="Retorno em vendas"
            value={fmtBRL(ads.retorno.valor)}
            trend={ads.retorno.variacao}
          />
          <StatCard
            icon={<Gauge className="h-4 w-4" />}
            label="ROAS"
            value={`${ads.roas.valor.toFixed(2)}x`}
            trend={ads.roas.variacao}
          />
          <StatCard
            icon={<Crosshair className="h-4 w-4" />}
            label="CPA"
            value={fmtBRL(ads.cpa.valor)}
            trend={ads.cpa.variacao}
            inverseTrend
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <StatCard icon={<Eye className="h-4 w-4" />} label="Impressões" value={`${(ads.impressoes.valor / 1000).toFixed(0)}k`} trend={ads.impressoes.variacao} />
          <StatCard icon={<MousePointerClick className="h-4 w-4" />} label="Cliques" value={fmtInt(ads.cliques.valor)} trend={ads.cliques.variacao} />
          <StatCard icon={<Percent className="h-4 w-4" />} label="CTR" value={`${ads.ctr.valor}%`} trend={ads.ctr.variacao} />
        </div>
      </section>

      {/* CTA demanda */}
      <div className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-base font-semibold">Precisa de algo?</h3>
            <p className="text-xs text-muted-foreground">
              Abra uma demanda e nossa equipe irá te ajudar. Respondemos em até 4h em horário comercial.
            </p>
          </div>
        </div>
        <Link
          to="/demandas/nova"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-95"
        >
          + Abrir demanda
        </Link>
      </div>

      {/* Demandas em andamento */}
      <section>
        <SectionTitle
          action={
            <Link to="/demandas" className="text-xs font-semibold text-primary">
              Ver todas
            </Link>
          }
        >
          Demandas em andamento
        </SectionTitle>
        <div className="space-y-2">
          {abertas.map((d) => (
            <Link
              key={d.id}
              to="/demandas/$id"
              params={{ id: d.id }}
              className="block rounded-2xl border border-border bg-card p-4 transition active:bg-elevated"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-muted-foreground">{d.id}</span>
                <StatusBadge status={d.status} />
              </div>
              <h4 className="mt-1 font-display text-sm font-semibold leading-snug">{d.titulo}</h4>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{d.responsavel}</span>
                <span>Prazo {d.prazo}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated">
                <div className="h-full bg-primary" style={{ width: `${d.progresso}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Equipe */}
      <section>
        <SectionTitle>Nossos responsáveis</SectionTitle>
        <div className="space-y-2">
          {equipe.map((m) => (
            <div key={m.nome} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-elevated font-display text-sm font-bold text-foreground">
                  {m.inicial}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                    m.status === "online" ? "bg-success" : "bg-warning"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.cargo}</p>
                <p className="font-display text-sm font-semibold leading-tight">{m.nome}</p>
                <p className="text-xs text-muted-foreground">{m.funcao}</p>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-elevated text-primary" aria-label={`Falar com ${m.nome}`}>
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Anúncio rodapé */}
      <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/60 p-4 text-xs text-muted-foreground">
        <Megaphone className="h-4 w-4 text-primary" />
        Próxima reunião estratégica: <span className="font-semibold text-foreground">12/06, 15h</span>
        <ChevronRight className="ml-auto h-4 w-4" />
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-display text-sm font-bold">{value}</div>
      <div className="mt-0.5">
        <Trend value={trend} />
      </div>
    </div>
  );
}