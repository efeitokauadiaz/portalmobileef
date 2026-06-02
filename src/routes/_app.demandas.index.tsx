import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus } from "lucide-react";
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

function DemandasList() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]["key"]>("todas");
  const [q, setQ] = useState("");

  const lista = demandas.filter((d) => {
    if (filtro !== "todas" && d.status !== filtro) return false;
    if (q && !d.titulo.toLowerCase().includes(q.toLowerCase()) && !d.id.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4 px-5 pt-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Minhas</p>
        <h1 className="font-display text-2xl font-bold tracking-tight">Demandas</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {demandas.length} no total · {demandas.filter((d) => d.status !== "concluida").length} em aberto
        </p>
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

      <div className="space-y-2">
        {lista.map((d) => (
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
        {lista.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            Nenhuma demanda encontrada.
          </div>
        )}
      </div>
    </div>
  );
}