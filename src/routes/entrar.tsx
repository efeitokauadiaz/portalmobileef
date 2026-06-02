import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/entrar")({
  component: EntrarPage,
});

const ACCESS_CODE = "123456";

function EntrarPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("ev-auth") === "ok") {
      router.navigate({ to: "/" });
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Digite o ID da loja.");
      return;
    }
    if (code.trim() !== ACCESS_CODE) {
      setError("ID da loja inválido. Verifique com seu consultor.");
      return;
    }
    localStorage.setItem("ev-auth", "ok");
    router.navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="font-display text-2xl font-bold tracking-tight">
            EFEITO <span className="text-primary">VENDAS</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Portal exclusivo do cliente</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6">
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <KeyRound className="h-3.5 w-3.5 text-primary" />
            Acesse sua conta
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Código de acesso</label>
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(""); }}
                placeholder="Digite o código de acesso"
                className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-xs font-medium text-destructive">{error}</p>}

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-95"
          >
            Entrar
          </button>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Não tem o código? Solicite ao seu consultor.
          </p>
        </form>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Código demo: <span className="font-mono text-foreground">123456</span>
        </p>
      </div>
    </div>
  );
}