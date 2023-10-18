import ctl from "@netlify/classnames-template-literals";
import { Process } from "../lib/types";
import Row from "./Row";
import { AiOutlineLoading } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

interface ProcessDisplayProps {
  processes: Array<Process>;
  pids: Array<number>;
  setPids: Dispatch<SetStateAction<number[]>>;
  loading?: boolean;
}

export default function ProcessDisplay({
  loading,
  processes,
  setPids,
  pids,
}: ProcessDisplayProps) {
  const available = processes?.length > 0 ? true : false;
  return (
    <div className="w-full flex-col rounded-md">
      {/*Head*/}
      <div className="grid grid-cols-3 bg-secondary bg-opacity-20">
        <h1 className={display_head_items}>Name</h1>
        <h1 className={display_head_items}>PID</h1>
        <h1 className={`${display_head_items} border-none`}>Parent PID</h1>
      </div>
      {/*List Of Process*/}
      <div
        className={`h-[60vh] overflow-y-auto py-4 border-[1px] border-secondary border-opacity-25 border-t-0 rounded-b-lg flex flex-col ${
          available ? "justify-start" : "justify-center"
        }`}
      >
        {loading === false ? (
          available ? (
            processes.map((process: Process) => {
              if (process.pid === null) return;
              return (
                <Row
                  key={process.pid}
                  process={process}
                  pids={pids}
                  setPids={setPids}
                />
              );
            })
          ) : (
            <NoProcessFound />
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

function NoProcessFound() {
  return (
    <div className="mx-auto text-center">
      <span className="text-secondary">No Process Found</span>
    </div>
  );
}

function Loading() {
  return (
    <div className="mx-auto text-center text-xl animate-spin">
      <span className="text-secondary">
        <AiOutlineLoading />
      </span>
    </div>
  );
}

const display_head_items = ctl(
  "opacity-75 text-primary text-sm p-3 shadow-accent shadow-lg border-r-[1px] border-opacity-25",
);
