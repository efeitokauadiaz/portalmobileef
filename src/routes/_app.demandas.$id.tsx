import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User as UserIcon, AlertCircle, MessageSquare } from "lucide-react";
import { demandas } from "@/lib/data/mock";
import { StatusBadge, PriorityDot } from "@/components/app/ui";

export const Route = createFileRoute("/_app/demandas/$id")({
  component: DetalheDemanda,
  notFoundComponent: () => (
    <div className="p-8 text-center text-sm text-muted-foreground">Demanda não encontrada.</div>
  ),
});

function DetalheDemanda() {
  const { id } = useParams({ from: "/_app/demandas/$id" });
  const d = demandas.find((x) => x.id === id);

  if (!d) {
    return (
      <div className="px-5 pt-8 text-center">
        <p className="text-sm text-muted-foreground">Demanda não encontrada.</p>
        <Link to="/demandas" className="mt-4 inline-block text-sm font-semibold text-primary">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-5 pt-5">
      <Link to="/demandas" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Demandas
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <PriorityDot p={d.prioridade} />
          <span className="font-mono text-[11px] text-muted-foreground">{d.id}</span>
          <StatusBadge status={d.status} />
        </div>
        <h1 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight">{d.titulo}</h1>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progresso</span>
          <span className="font-semibold text-foreground">{d.progresso}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-elevated">
          <div className="h-full bg-primary" style={{ width: `${d.progresso}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoCell icon={<UserIcon className="h-3.5 w-3.5" />} label="Responsável" value={d.responsavel} />
        <InfoCell icon={<Tag className="h-3.5 w-3.5" />} label="Categoria" value={d.categoria} />
        <InfoCell icon={<Calendar className="h-3.5 w-3.5" />} label="Aberta em" value={d.criadaEm} />
        <InfoCell icon={<AlertCircle className="h-3.5 w-3.5" />} label="Prazo" value={d.prazo} />
      </div>

      <section>
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Descrição
        </h2>
        <p className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground">
          {d.descricao}
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Atualizações
        </h2>
        <div className="space-y-2">
          {d.atualizacoes.map((a, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{a.autor}</span>
                <span className="text-muted-foreground">{a.quando}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{a.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-semibold text-foreground">
        <MessageSquare className="h-4 w-4" /> Adicionar comentário
      </button>
    </div>
  );
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}