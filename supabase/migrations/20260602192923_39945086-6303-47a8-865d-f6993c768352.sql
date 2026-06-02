
-- ============ STORES ============
CREATE TABLE public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  plan TEXT NOT NULL DEFAULT 'basic',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.stores TO anon, authenticated;
GRANT ALL ON public.stores TO service_role;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read stores" ON public.stores FOR SELECT USING (true);

-- ============ STORE_METRICS ============
CREATE TABLE public.store_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  revenue NUMERIC(14,2) NOT NULL DEFAULT 0,
  orders INTEGER NOT NULL DEFAULT 0,
  average_ticket NUMERIC(14,2) NOT NULL DEFAULT 0,
  conversion_rate NUMERIC(6,2) NOT NULL DEFAULT 0,
  gross_revenue NUMERIC(14,2) NOT NULL DEFAULT 0,
  fees NUMERIC(14,2) NOT NULL DEFAULT 0,
  refunds NUMERIC(14,2) NOT NULL DEFAULT 0,
  monthly_goal NUMERIC(14,2) NOT NULL DEFAULT 0,
  UNIQUE(store_id, date)
);
CREATE INDEX idx_store_metrics_store_date ON public.store_metrics(store_id, date DESC);
GRANT SELECT ON public.store_metrics TO anon, authenticated;
GRANT ALL ON public.store_metrics TO service_role;
ALTER TABLE public.store_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read store_metrics" ON public.store_metrics FOR SELECT USING (true);

-- ============ ADS_METRICS ============
CREATE TABLE public.ads_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  investment NUMERIC(14,2) NOT NULL DEFAULT 0,
  revenue NUMERIC(14,2) NOT NULL DEFAULT 0,
  roas NUMERIC(8,2) NOT NULL DEFAULT 0,
  cpa NUMERIC(10,2) NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(6,2) NOT NULL DEFAULT 0,
  active_campaigns INTEGER NOT NULL DEFAULT 0,
  UNIQUE(store_id, date)
);
CREATE INDEX idx_ads_metrics_store_date ON public.ads_metrics(store_id, date DESC);
GRANT SELECT ON public.ads_metrics TO anon, authenticated;
GRANT ALL ON public.ads_metrics TO service_role;
ALTER TABLE public.ads_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read ads_metrics" ON public.ads_metrics FOR SELECT USING (true);

-- ============ PRODUCTS ============
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT,
  sold_quantity INTEGER NOT NULL DEFAULT 0,
  revenue NUMERIC(14,2) NOT NULL DEFAULT 0,
  orders INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_products_store ON public.products(store_id);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read products" ON public.products FOR SELECT USING (true);

-- ============ DEMANDS ============
CREATE TABLE public.demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  responsible TEXT,
  progress INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_demands_store ON public.demands(store_id);
GRANT SELECT ON public.demands TO anon, authenticated;
GRANT ALL ON public.demands TO service_role;
ALTER TABLE public.demands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read demands" ON public.demands FOR SELECT USING (true);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER trg_demands_touch BEFORE UPDATE ON public.demands
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ RESPONSIBLES ============
CREATE TABLE public.responsibles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  avatar TEXT,
  online_status TEXT NOT NULL DEFAULT 'offline'
);
CREATE INDEX idx_responsibles_store ON public.responsibles(store_id);
GRANT SELECT ON public.responsibles TO anon, authenticated;
GRANT ALL ON public.responsibles TO service_role;
ALTER TABLE public.responsibles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read responsibles" ON public.responsibles FOR SELECT USING (true);
