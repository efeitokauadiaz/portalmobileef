import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { categoriasDemanda } from "@/lib/data/mock";

export const Route = createFileRoute("/_app/demandas/nova")({
  component: NovaDemanda,
});

function NovaDemanda() {
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    categoria: categoriasDemanda[0],
    prioridade: "media" as "baixa" | "media" | "alta",
    descricao: "",
    prazo: "",
  });

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-xl font-bold">Demanda enviada!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sua equipe foi notificada e responderá em até 4 horas em horário comercial.
        </p>
        <button
          onClick={() => navigate({ to: "/demandas" })}
          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Ver minhas demandas
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEnviado(true);
      }}
      className="space-y-5 px-5 pt-5"
    >
      <button
        type="button"
        onClick={() => navigate({ to: "/demandas" })}
        className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Nova solicitação</p>
        <h1 className="font-display text-2xl font-bold tracking-tight">Abrir demanda</h1>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Descreva com o máximo de detalhes para acelerar a entrega.
        </p>
      </div>

      <Field label="Título">
        <input
          required
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          placeholder="Ex: Novo criativo para campanha..."
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none"
        />
      </Field>

      <Field label="Categoria">
        <div className="flex flex-wrap gap-2">
          {categoriasDemanda.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setForm({ ...form, categoria: c })}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                form.categoria === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Prioridade">
        <div className="grid grid-cols-3 gap-2">
          {(["baixa", "media", "alta"] as const).map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setForm({ ...form, prioridade: p })}
              className={`rounded-xl border py-2.5 text-xs font-semibold capitalize transition ${
                form.prioridade === p
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Prazo desejado">
        <input
          type="date"
          value={form.prazo}
          onChange={(e) => setForm({ ...form, prazo: e.target.value })}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none"
        />
      </Field>

      <Field label="Descrição">
        <textarea
          required
          rows={5}
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          placeholder="Conte o que precisa, links de referência, objetivos..."
          className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none"
        />
      </Field>

      <button
        type="submit"
        className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground active:scale-95"
      >
        Enviar demanda
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}