import { Router, Request, Response } from "express";
import { deleteProcess, findProcess, getAllProcess } from "./handler/process";
import path from "path";

const app: Router = new Router();

// Process Routes
app.get("/process/all", getAllProcess);
app.get("/process/find/:search", findProcess);
app.post("/process/kill", deleteProcess);

export default app;
