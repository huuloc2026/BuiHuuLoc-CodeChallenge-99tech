import { Request, Response, NextFunction } from "express";
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

export interface IResponse<T = any> {
  status: "success" | "error";
  message: string;
  data: T;
  metadata?: any;
}
