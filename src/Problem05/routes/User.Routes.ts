import express from "express";
import { UserController } from "../controllers/User.controller";
import { asyncHandler } from "../middleware/asyncHandler";
const UserRouter = express.Router();

UserRouter.post("/create", asyncHandler(UserController.create));
UserRouter.get("/list", asyncHandler(UserController.listWithPaging));
UserRouter.get("/getdetail", asyncHandler(UserController.getDetail));
UserRouter.put("/update:id", asyncHandler(UserController.update));
UserRouter.delete("/delete:id", asyncHandler(UserController.delete));

export default UserRouter;
