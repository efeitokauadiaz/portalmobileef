import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between px-1">
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Trend({ value, inverse = false }: { value: number; inverse?: boolean }) {
  const positive = inverse ? value < 0 : value > 0;
  const color = positive ? "text-success bg-success/10" : "text-destructive bg-destructive/10";
  const Icon = value >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${color}`}>
      <Icon className="h-3 w-3" />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export function StatCard({
  icon,
  label,
  value,
  trend,
  inverseTrend,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  trend?: number;
  inverseTrend?: boolean;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-elevated text-muted-foreground">
          {icon}
        </div>
        {typeof trend === "number" && <Trend value={trend} inverse={inverseTrend} />}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-xl font-bold tracking-tight text-foreground">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

export const fmtInt = (n: number) => n.toLocaleString("pt-BR");

export function StatusBadge({ status }: { status: "aberta" | "em_andamento" | "revisao" | "concluida" }) {
  const map = {
    aberta: { label: "Aberta", cls: "bg-warning/15 text-warning" },
    em_andamento: { label: "Em andamento", cls: "bg-primary/15 text-primary" },
    revisao: { label: "Em revisão", cls: "bg-elevated text-foreground" },
    concluida: { label: "Concluída", cls: "bg-success/15 text-success" },
  } as const;
  const s = map[status];
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${s.cls}`}>{s.label}</span>;
}

export function PriorityDot({ p }: { p: "baixa" | "media" | "alta" }) {
  const c = p === "alta" ? "bg-destructive" : p === "media" ? "bg-warning" : "bg-muted-foreground";
  return <span className={`inline-block h-2 w-2 rounded-full ${c}`} />;
}