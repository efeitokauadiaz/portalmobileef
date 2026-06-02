import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app/Layout";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});