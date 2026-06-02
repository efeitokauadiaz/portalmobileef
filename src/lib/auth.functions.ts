import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const StoreIdSchema = z.object({
  storeId: z
    .string()
    .trim()
    .min(3)
    .max(64)
    .regex(/^[a-zA-Z0-9_-]+$/),
});

export const validateStoreAccess = createServerFn({ method: "POST" })
  .inputValidator((input) => StoreIdSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: store, error } = await supabaseAdmin
      .from("stores")
      .select("id, identifier, status")
      .eq("identifier", data.storeId)
      .maybeSingle();

    if (error) {
      console.error("validateStoreAccess error:", error);
      return { ok: false as const, reason: "Não foi possível validar o ID. Tente novamente." };
    }

    if (!store) {
      return { ok: false as const, reason: "ID da loja não encontrado. Verifique com seu consultor." };
    }

    if (store.status !== "active") {
      return { ok: false as const, reason: "Esta loja não possui acesso ativo no momento." };
    }

    return { ok: true as const, storeId: store.id, identifier: store.identifier };
  });