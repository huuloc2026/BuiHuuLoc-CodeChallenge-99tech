import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

import instanceMongoDb from "./database/datasource";
import routes from "./routes";
console.clear();
dotenv.config();

const app: Express = express();
app.use(express.json({ limit: "50kb" })); // Parse JSON requests
app.use(express.urlencoded({ limit: "50kb", extended: true })); // Parse URL-encoded requests

const port = process.env.PORT || 3000;
instanceMongoDb;

app.use("/users", routes);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
