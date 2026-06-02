import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/app/Layout";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && localStorage.getItem("ev-auth") !== "ok") {
      throw redirect({ to: "/entrar" });
    }
  },
  component: AppLayout,
});