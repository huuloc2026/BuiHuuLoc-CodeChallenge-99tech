import express from "express";
import { UserController } from "../controllers/User.controller";
import { asyncHandler } from "../middleware/asyncHandler";
const UserRouter = express.Router();

UserRouter.post("/create", UserController.create);
UserRouter.get("/", UserController.listWithPaging);
UserRouter.get("/cond", UserController.listWithCond);
UserRouter.get("/:id", UserController.getDetail);
UserRouter.put("/:id", UserController.update);
UserRouter.delete("/:id", UserController.delete);

export default UserRouter;
