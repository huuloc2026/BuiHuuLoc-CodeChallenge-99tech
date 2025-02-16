import express from "express";
import { UserController } from "../controllers/User.controller";
import { asyncHandler } from "../middleware/asyncHandler";
const UserRouter = express.Router();

UserRouter.post("/create", asyncHandler(UserController.create));
UserRouter.get("/", asyncHandler(UserController.listWithPaging));
UserRouter.get("/cond", asyncHandler(UserController.listWithCond));
UserRouter.get("/:id", asyncHandler(UserController.getDetail));
UserRouter.put("/:id", asyncHandler(UserController.update));
UserRouter.delete("/:id", asyncHandler(UserController.delete));

export default UserRouter;
