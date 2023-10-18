import { QueryClient } from "@tanstack/react-query";
import ProcessBoard from "../../components/ProcessBoard";

interface DashboardProps {
  queryClient: QueryClient;
}

export default function Dashboard({ queryClient }: DashboardProps) {
  return (
    <section className="min-h-screen flex gap-12">
      <ProcessBoard queryClient={queryClient} />
    </section>
  );
}
