import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { validateStoreAccess } from "@/lib/auth.functions";

export const Route = createFileRoute("/entrar")({
  component: EntrarPage,
});

function EntrarPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const validate = useServerFn(validateStoreAccess);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("ev-auth") === "ok") {
      router.navigate({ to: "/" });
    }
  }, [router]);

  const validateStoreId = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return "O ID da loja é obrigatório.";
    if (trimmed.length < 3) return "O ID da loja deve ter pelo menos 3 caracteres.";
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      return "O ID da loja só pode conter letras, números, traços e underscores.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateStoreId(code);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const result = await validate({ data: { storeId: code.trim() } });
      if (!result.ok) {
        setError(result.reason);
        return;
      }
      localStorage.setItem("ev-auth", "ok");
      localStorage.setItem("ev-store-id", result.storeId);
      localStorage.setItem("ev-store-identifier", result.identifier);
      router.navigate({ to: "/" });
    } catch (err) {
      console.error(err);
      setError("Erro ao validar o ID. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">ID de loja</label>
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(""); }}
              placeholder="Digite o ID da loja"
              className="w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          {error && <p className="mt-3 text-xs font-medium text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-95 disabled:opacity-60"
          >
            {loading ? "Validando..." : "Entrar"}
          </button>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Não tem o código? Solicite ao seu consultor.
          </p>
        </form>

      </div>
    </div>
  );
}