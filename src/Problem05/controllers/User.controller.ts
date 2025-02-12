import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";

export class UserController {
  // Health check endpoint
  static checkHealth = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return res.send("OK");
  };

  // Create a new user
  static create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  // List users with pagination
  static listWithPaging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const users = await UserService.listUsers(page, limit);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  };

  // Get user details
  static getDetail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // Update user details
  static update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  };

  // Delete user
  static delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await UserService.deleteUser(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
