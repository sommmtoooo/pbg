import { Request, Response, NextFunction } from "express";
import { userInfo } from "os";

function isSuperUser(req: Request, res: Response, next: NextFunction) {
  const sudo_user = userInfo().uid === 0 ? true : false;
  if (!sudo_user) {
    res.send("Cannot Access This Route");
    return;
  }
  return next();
}

export { isSuperUser };
