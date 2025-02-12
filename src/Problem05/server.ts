import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import instanceMongoDb from "./database/datasource";
import routes from "./routes";
console.clear();
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
instanceMongoDb;

app.use(routes);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
