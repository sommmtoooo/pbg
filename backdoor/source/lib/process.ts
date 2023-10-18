import { exec as execution } from "child_process";
import { promisify } from "util";
import { Process } from "./types";

const exec = promisify(execution);

export async function getProcesses(): Promise<Array<Process>> {
  const { stderr, stdout } = await exec("ps -e -o comm,pid,ppid");

  if (stderr) {
    return [];
  }

  const lines: Array<string> = stdout.trim().split("\n");
  lines.shift();

  const programs: Array<Process> = lines.map((line) => {
    const raw_program: Array<string> = line.trim().split(/\s+/);
    const program: Process = {
      name: raw_program[0] as string,
      pid: parseInt(raw_program[1]),
      ppid: parseInt(raw_program[2]),
    };
    return program;
  });

  return programs;
}

export async function getProcess(
  search_string: string,
): Promise<Array<Process>> {
  const processes = await getProcesses();
  const match = processes.filter((process) =>
    process.name.startsWith(search_string),
  );
  return match;
}

export async function killProcesses(pids: Array<number>): Promise<Boolean> {
  if (typeof pids !== "object") throw new Error("Invalid PID");
  const range = pids.length;
  let count = 0;

  while (count != range) {
    const terminated = await killProcess(pids[count]);
    if (!terminated) throw new Error("An Error Occurred");
    count += 1;
  }

  return true;
}

export async function killProcess(pid: number): Promise<Boolean> {
  const { stderr, stdout } = await exec(`kill -9 ${pid}`);

  if (stderr) {
    throw new Error("Operation Failed");
  }

  return true;
}
