import { Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { Home, ClipboardList, User, Bell, Plus, LogOut } from "lucide-react";
import { cliente } from "@/lib/data/mock";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/demandas", label: "Demandas", icon: ClipboardList },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("ev-auth");
    router.navigate({ to: "/entrar" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 px-5 pb-3 pt-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight">EFEITO</span>
              <span className="font-display text-lg font-bold tracking-tight text-primary">VENDAS</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-border bg-card p-2 text-muted-foreground transition hover:text-foreground" aria-label="Notificações">
                <Bell className="h-4 w-4" />
              </button>
              <button
                onClick={handleLogout}
                className="rounded-full border border-border bg-card p-2 text-muted-foreground transition hover:text-foreground"
                aria-label="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
              <Link
                to="/perfil"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground"
                aria-label="Perfil"
              >
                {cliente.inicial}
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-32">
          <Outlet />
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-border bg-background/95 backdrop-blur">
          <ul className="grid grid-cols-3">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex flex-col items-center gap-1 py-3 text-[11px] font-medium uppercase tracking-wide transition ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          to="/demandas/nova"
          className="fixed bottom-20 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition active:scale-95"
          style={{ maxWidth: "calc(28rem - 2.5rem)" }}
        >
          <Plus className="h-4 w-4" />
          Abrir demanda
        </Link>
      </div>
    </div>
  );
}