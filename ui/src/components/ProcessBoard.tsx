import { useEffect, useState } from "react";
import ProcessSearchBar from "./ProcessSearchBar";
import { getProcess } from "../queries/process/fetch";
import ProcessDisplay from "./ProcessDisplay";
import { Process } from "../lib/types";
import SideNav from "./SideNav";
import { QueryClient, useQuery } from "@tanstack/react-query";
import queryKeys from "../queries/keys";

interface ProcessBoardProps {
  queryClient: QueryClient;
}

export default function ProcessBoard({ queryClient }: ProcessBoardProps) {
  const [name, setName] = useState("");
  const [pids, setPids] = useState<Array<number>>([]);
  const [filtered, setFiltered] = useState<Array<Process> | null>(null);
  const processesQuery = useQuery({
    queryKey: [queryKeys.PROCESS],
    queryFn: getProcess,
    refetchOnWindowFocus: false,
    refetchInterval: 2500,
  });

  useEffect(() => {
    if (name === "") setFiltered(null);
    if (processesQuery.isLoading) return;
    const data = processesQuery.data as Array<Process>;
    const filter = data.filter((process) =>
      process.name.toLowerCase().startsWith(name.toLowerCase()),
    );
    setFiltered(filter);
  }, [name, processesQuery.data, processesQuery.isLoading]);

  return (
    <section className="w-full">
      <section className="grid grid-cols-9 gap-9">
        <section className="col-span-6">
          <ProcessSearchBar name={name} setName={setName} />
          <ProcessDisplay
            loading={processesQuery.isLoading}
            processes={
              filtered !== null
                ? filtered
                : (processesQuery.data as Array<Process>)
            }
            setPids={setPids}
            pids={pids}
          />
        </section>
        <SideNav
          pids={pids}
          queryClient={queryClient}
          setFiltered={setFiltered}
          setPids={setPids}
        />
      </section>
    </section>
  );
}
