import { Dispatch, SetStateAction, useRef } from "react";
import { Process } from "../lib/types";

interface RowProp {
  process: Process;
  pids: Array<number>;
  setPids: Dispatch<SetStateAction<number[]>>;
}

export default function Row({ process, setPids, pids }: RowProp) {
  const checkbox = useRef<HTMLInputElement>();
  const handleChange = () => {
    const { pid } = process;
    const includes = pids.includes(pid);

    if (includes) {
      removeFromList();
      return;
    }
    setPids((old_pid: number[]) => {
      return [...old_pid, pid];
    });
  };

  const removeFromList = () => {
    const new_pids = pids.filter((p) => p !== process.pid);
    setPids(new_pids);
  };

  return (
    <div className="grid grid-cols-3 px-2 py-4 border-b-shadow border-opacity-10">
      <div className="input--wrapper">
        <input
          ref={checkbox}
          type="checkbox"
          onChange={handleChange}
          className="mx-2 cursor-pointer focus:ring-secondary"
        />
        <span className="text-primary text-sm opacity-40 cursor-pointer">
          {process.name}
        </span>
      </div>
      <span className="text-secondary text-sm">{process.pid}</span>
      <span className="text-primary text-sm opacity-50">{process.ppid}</span>
    </div>
  );
}
