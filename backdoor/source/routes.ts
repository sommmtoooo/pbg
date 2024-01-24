import { Router } from "express";
import { deleteProcess, findProcess, getAllProcess } from "./handler/process";

const app = Router();

// Process Routes
app.get("/process/all", getAllProcess);
app.get("/process/find/:search", findProcess);
app.post("/process/kill", deleteProcess);

export default app;
