import { createFileRoute, Link } from "@tanstack/react-router";
import type { MouseEvent, TouchEvent } from "react";
import { useState, useMemo } from "react";
import { Search, Plus, Inbox, Loader2, Eye, CheckCircle2 } from "lucide-react";
import { demandas, type DemandaStatus } from "@/lib/data/mock";
import { PriorityDot, StatusBadge } from "@/components/app/ui";

export const Route = createFileRoute("/_app/demandas/")({
  component: DemandasList,
});

const filtros: { key: "todas" | DemandaStatus; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "aberta", label: "Abertas" },
  { key: "em_andamento", label: "Em andamento" },
  { key: "revisao", label: "Em revisão" },
  { key: "concluida", label: "Concluídas" },
];

const statusOrdem: { key: DemandaStatus; label: string; icon: typeof Inbox; color: string }[] = [
  { key: "aberta", label: "Abertas", icon: Inbox, color: "text-warning" },
  { key: "em_andamento", label: "Em andamento", icon: Loader2, color: "text-primary" },
  { key: "revisao", label: "Em revisão", icon: Eye, color: "text-foreground" },
  { key: "concluida", label: "Concluídas", icon: CheckCircle2, color: "text-success" },
];

function DemandasList() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]["key"]>("todas");
  const [q, setQ] = useState("");
  const scrollRef = useState<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useState({ startX: 0, scrollLeft: 0 });

  const lista = demandas.filter((d) => {
    if (filtro !== "todas" && d.status !== filtro) return false;
    if (q && !d.titulo.toLowerCase().includes(q.toLowerCase()) && !d.id.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const contagem = useMemo(() => {
    const c: Record<DemandaStatus, number> = { aberta: 0, em_andamento: 0, revisao: 0, concluida: 0 };
    demandas.forEach((d) => { c[d.status]++; });
    return c;
  }, []);

  const agrupadas = useMemo(() => {
    return statusOrdem.map((s) => ({
      ...s,
      itens: lista.filter((d) => d.status === s.key),
    }));
  }, [lista]);

  return (
    <div className="space-y-4 px-5 pt-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Minhas</p>
        <h1 className="font-display text-2xl font-bold tracking-tight">Demandas</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {demandas.length} no total · {demandas.filter((d) => d.status !== "concluida").length} em aberto
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {statusOrdem.map((s) => {
          const Icon = s.icon;
          const active = filtro === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setFiltro(active ? "todas" : s.key)}
              className={`rounded-2xl border p-3 text-center transition ${
                active ? "border-primary bg-primary/10" : "border-border bg-card"
              }`}
            >
              <Icon className={`mx-auto h-4 w-4 ${s.color}`} />
              <div className="mt-1 font-display text-lg font-bold leading-none text-foreground">
                {contagem[s.key]}
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título ou ID..."
          className="w-full rounded-full border border-border bg-card py-3 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
      </div>

      <div className="-mx-5 overflow-x-auto px-5">
        <div className="flex gap-2">
          {filtros.map((f) => (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                filtro === f.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Link
        to="/demandas/nova"
        className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-primary/5 py-3 text-sm font-semibold text-primary"
      >
        <Plus className="h-4 w-4" /> Nova demanda
      </Link>

      <div className="space-y-5">
        {agrupadas.map((g) => {
          if (g.itens.length === 0) return null;
          const Icon = g.icon;
          return (
            <div key={g.key}>
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${g.color}`} />
                  <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {g.label}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">{g.itens.length}</span>
              </div>
              <div className="space-y-2">
                {g.itens.map((d) => (
                  <Link
                    key={d.id}
                    to="/demandas/$id"
                    params={{ id: d.id }}
                    className="block rounded-2xl border border-border bg-card p-4 transition active:bg-elevated"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <PriorityDot p={d.prioridade} />
                        <span className="text-[11px] font-mono text-muted-foreground">{d.id}</span>
                        <span className="text-[11px] text-muted-foreground">· {d.categoria}</span>
                      </div>
                      <StatusBadge status={d.status} />
                    </div>
                    <h3 className="mt-1.5 font-display text-sm font-semibold leading-snug">{d.titulo}</h3>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Resp. {d.responsavel}</span>
                      <span>Prazo {d.prazo}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-elevated">
                        <div className="h-full bg-primary" style={{ width: `${d.progresso}%` }} />
                      </div>
                      <span className="text-[11px] font-semibold text-muted-foreground">{d.progresso}%</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        {lista.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            Nenhuma demanda encontrada.
          </div>
        )}
      </div>
    </div>
  );
}