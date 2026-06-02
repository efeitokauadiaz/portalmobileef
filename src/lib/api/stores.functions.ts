import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const identifierSchema = z.object({ identifier: z.string().min(1).max(64) });

export const listStores = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getStoreByIdentifier = createServerFn({ method: "GET" })
  .inputValidator((input) => identifierSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: store, error } = await supabase
      .from("stores")
      .select("*")
      .eq("identifier", data.identifier)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return store;
  });

export const getStoreDashboard = createServerFn({ method: "GET" })
  .inputValidator((input) => identifierSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: store, error: storeErr } = await supabase
      .from("stores")
      .select("*")
      .eq("identifier", data.identifier)
      .maybeSingle();
    if (storeErr) throw new Error(storeErr.message);
    if (!store) return null;

    const [metrics, ads, products, demands, responsibles] = await Promise.all([
      supabase
        .from("store_metrics")
        .select("*")
        .eq("store_id", store.id)
        .order("date", { ascending: false })
        .limit(30),
      supabase
        .from("ads_metrics")
        .select("*")
        .eq("store_id", store.id)
        .order("date", { ascending: false })
        .limit(30),
      supabase
        .from("products")
        .select("*")
        .eq("store_id", store.id)
        .order("revenue", { ascending: false }),
      supabase
        .from("demands")
        .select("*")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("responsibles")
        .select("*")
        .eq("store_id", store.id),
    ]);

    return {
      store,
      storeMetrics: metrics.data ?? [],
      adsMetrics: ads.data ?? [],
      products: products.data ?? [],
      demands: demands.data ?? [],
      responsibles: responsibles.data ?? [],
    };
  });