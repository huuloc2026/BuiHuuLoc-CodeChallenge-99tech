import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";
import { UserFilter } from "../models/User.models";

export class HandleResponse {
  static success(
    res: Response,
    data: any,
    message = "Success",
    status = 200,
    metadata = null
  ) {
    return res.status(status).json({
      status: "success",
      message,
      data,
      metadata,
    });
  }

  static error(res: Response, error: any, status = 500) {
    return res.status(status).json({
      status: "error",
      message: error.message || "Internal Server Error",
      error,
    });
  }

  static notFound(res: Response, message = "Resource not found") {
    return res.status(404).json({
      status: "error",
      message,
    });
  }
}

export class UserController {
  // Health check endpoint
  static checkHealth = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return HandleResponse.success(res, null, "Server is running");
  };

  // Create a new user
  static create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await UserService.createUser(req.body);
      return HandleResponse.success(
        res,
        user,
        "User created successfully",
        201
      );
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
      const page = Math.max(Number(req.query.page) || 1, 1); // Ensure page is at least 1
      const limit = Math.max(Number(req.query.limit) || 10, 1); // Ensure limit is at least 1

      const { users, totalUsers } = await UserService.listUsers(page, limit);
      const totalPages = Math.ceil(totalUsers / limit);

      return HandleResponse.success(
        res,
        {
          users,
          pagination: {
            totalUsers,
            totalPages,
            currentPage: page,
            limitPerPage: limit,
          },
        },
        "Users retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  };
  static listWithCond = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { gender, phone } = req.query;
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.max(Number(req.query.limit) || 10, 1);
      const cond: UserFilter = {};
      if (gender) cond.gender = gender as string;
      if (phone) cond.phone = phone as string;
      const { users, totalUsers } = await UserService.listUsersWithFilter(
        cond,
        page,
        limit
      );

      const totalPages = Math.ceil(totalUsers / limit);

      return HandleResponse.success(
        res,
        {
          users,
          pagination: {
            totalUsers,
            totalPages,
            currentPage: page,
            limitPerPage: limit,
          },
        },
        "Filtered users retrieved successfully"
      );
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
      if (!user) return HandleResponse.notFound(res, "User not found");
      return HandleResponse.success(
        res,
        user,
        "User details retrieved successfully"
      );
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
      if (!user) return HandleResponse.notFound(res, "User not found");
      return HandleResponse.success(res, user, "User updated successfully");
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
      if (!user) return HandleResponse.notFound(res, "User not found");
      return HandleResponse.success(res, null, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  };
}
