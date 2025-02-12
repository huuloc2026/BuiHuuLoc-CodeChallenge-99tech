import { NextFunction, Request, Response } from "express";
export class UserController {
  static checkhealth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    return res.send("oke");
  };
  static create() {}

  static listWithPaging() {}
  static getDetail() {}
  static update() {}
  static delete() {}
}
