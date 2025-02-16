import { NextFunction, Request, Response } from "express";
import { HandleResponse } from "../utils/handleResponse";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${err.message}`);
  HandleResponse.error(res, err.message, err.status || 500);
};

export default errorHandler;
