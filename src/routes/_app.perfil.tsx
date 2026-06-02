import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { cliente, equipe } from "@/lib/data/mock";

export const Route = createFileRoute("/_app/perfil")({
  component: Perfil,
});

function Perfil() {
  return (
    <div className="space-y-5 px-5 pt-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Conta</p>
        <h1 className="font-display text-2xl font-bold tracking-tight">Meu perfil</h1>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground">
            {cliente.inicial}
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">{cliente.nome}</h2>
            <p className="text-xs text-muted-foreground">{cliente.plano}</p>
            <p className="text-xs text-muted-foreground">Cliente desde {cliente.desde}</p>
          </div>
        </div>

        <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
          <Row icon={<Building2 className="h-4 w-4" />} label="Empresa" value={cliente.nome} />
          <Row icon={<Mail className="h-4 w-4" />} label="E-mail" value="contato@brsupershop.com.br" />
          <Row icon={<Phone className="h-4 w-4" />} label="Telefone" value="+55 11 4002-8922" />
          <Row icon={<CreditCard className="h-4 w-4" />} label="Plano" value={cliente.plano} />
          <Row icon={<Calendar className="h-4 w-4" />} label="Renovação" value="15/03/2027" />
        </div>
      </div>

      <section>
        <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Sua equipe
        </h2>
        <div className="space-y-2">
          {equipe.map((m) => (
            <div key={m.nome} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-elevated font-display text-sm font-bold">
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
                  <p className="font-display text-sm font-semibold">{m.nome}</p>
                  <p className="text-xs text-muted-foreground">{m.funcao}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`mailto:${m.email}`}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-elevated py-2 font-semibold text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" /> E-mail
                </a>
                <a
                  href={`tel:${m.telefone.replace(/\D/g, "")}`}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-primary py-2 font-semibold text-primary-foreground"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Chamar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Preferências
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <MenuRow icon={<Bell className="h-4 w-4" />} label="Notificações" />
          <MenuRow icon={<Lock className="h-4 w-4" />} label="Segurança e senha" />
          <MenuRow icon={<HelpCircle className="h-4 w-4" />} label="Central de ajuda" />
          <MenuRow icon={<LogOut className="h-4 w-4 text-destructive" />} label="Sair" danger />
        </div>
      </section>

      <p className="pb-4 text-center text-[11px] text-muted-foreground">Efeito Vendas · v1.0</p>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="ml-auto text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

function MenuRow({
  icon,
  label,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-b-0"
    >
      <span className={danger ? "text-destructive" : "text-muted-foreground"}>{icon}</span>
      <span className={`text-sm font-medium ${danger ? "text-destructive" : "text-foreground"}`}>{label}</span>
      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
    </button>
  );
}