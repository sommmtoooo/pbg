import { killProcesses } from "../queries/process/mutations";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { onError } from "../lib/error";
import queryKeys from "../queries/keys";
import { Dispatch, SetStateAction } from "react";
import { Process } from "../lib/types";

interface SideNavProps {
  setFiltered: Dispatch<SetStateAction<Process[]>>;
  setPids: Dispatch<SetStateAction<number[]>>;
  pids: Array<number>;
  queryClient: QueryClient;
}

export default function SideNav({
  pids,
  queryClient,
  setFiltered,
  setPids,
}: SideNavProps) {
  const killProcessesMutation = useMutation({
    mutationFn: killProcesses,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.PROCESS] });
    },
    onError,
  });

  const handleKillProcesses = () => {
    if (pids.length <= 0) return;
    killProcessesMutation.mutate(pids);
    setFiltered((processes: Process[]) => {
      return processes.filter((process) => {
        pids.forEach((pid) => {
          process.pid !== pid;
        });
      });
    });
    setPids([]);
  };

  return (
    <section className="w-full col-span-2">
      <div className="">
        <button
          className={`w-full p-2 rounded-md bg-secondary text-sm text-primary text-head transition ${
            pids.length <= 0
              ? "cursor-not-allowed bg-opacity-5"
              : "bg-opacity-25"
          }`}
          onClick={handleKillProcesses}
        >
          Kill Selected Processes
        </button>
      </div>
      <hr className="my-8 border-primary border-opacity-25" />
    </section>
  );
}
