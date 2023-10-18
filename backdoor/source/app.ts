import express, { Express, Request, Response } from "express";
import config from "config";
import cors from "cors";
import router from "./routes";
import errorHandler from "./utils/error_handler";
import path from "path";
import { getPort } from "./utils";
import logger, { logging } from "./utils/logger";
import { openUrl } from "./utils/open";

const port = getPort() || config.get<number>("port") || 8080;
const host = config.get<string>("host");
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

app.use("/api", router);
app.use("*", (req: Request, res: Response) => {
  const file = path.join(__dirname, "public", "index.html");
  console.log(file);
  res.sendFile(file);
});

app.use(errorHandler);

app.listen(port, host, () => {
  const link = `http://${host}:${port}`;
  logging.log("info", `PBG 🔫: ${link}`);
  openUrl(link)
    .then((res) => {
      logging.log("info", `PBG 🔫: ${res}`);
    })
    .catch((err) => {
      logging.log("info", `PBG 🔫: Error Occured`);
    });
});
