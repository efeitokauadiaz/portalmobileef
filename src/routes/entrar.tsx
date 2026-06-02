import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/entrar")({
  component: EntrarPage,
});

const ACCESS_CODE = "123456";

function EntrarPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("ev-auth") === "ok") {
      router.navigate({ to: "/" });
    }
  }, [router]);

  const code = digits.join("");

  const handleChange = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    setError("");
    if (clean && i < 5) {
      const el = document.getElementById(`d-${i + 1}`) as HTMLInputElement | null;
      el?.focus();
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      const el = document.getElementById(`d-${i - 1}`) as HTMLInputElement | null;
      el?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Digite os 6 dígitos do código.");
      return;
    }
    if (code !== ACCESS_CODE) {
      setError("Código inválido. Verifique com seu consultor.");
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
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <KeyRound className="h-3.5 w-3.5 text-primary" />
            Código de acesso
          </div>

          <div className="grid grid-cols-6 gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                id={`d-${i}`}
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                onPaste={handlePaste}
                className="aspect-square w-full rounded-xl border border-border bg-elevated text-center font-display text-xl font-bold text-foreground focus:border-primary focus:outline-none"
              />
            ))}
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