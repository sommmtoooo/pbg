import { Request, Response } from "express";
import { getProcesses, getProcess, killProcesses } from "../lib/process";
import asyncHandler from "express-async-handler";
import { APIResponse } from "../lib/types";

export const getAllProcess = asyncHandler(
  async (req: Request, res: Response) => {
    const processes = await getProcesses();
    const response: APIResponse = {
      ok: true,
      message: "",
      data: processes,
    };
    res.json(response);
  },
);

export const findProcess = asyncHandler(async (req: Request, res: Response) => {
  const { search } = req.params;
  const processes = await getProcess(search);
  const response: APIResponse = {
    ok: true,
    message: "Smile",
    data: processes,
  };
  res.json(response);
});

export const deleteProcess = asyncHandler(
  async (req: Request, res: Response) => {
    const { pids } = req.body;
    await killProcesses(pids as Array<number>);
    res.json({
      ok: true,
      message: "Killed Process",
    });
  },
);
