import express from "express";
import UserRouter from "./User.Routes";

// this is root routes
const routes = express.Router();

routes.use(UserRouter);
export default routes;
