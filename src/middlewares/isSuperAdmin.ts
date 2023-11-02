import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {

  if (req.token.role !== "super_admin") {
    return res.json('Necesitas permisos')
  }

  next();
}

export { isSuperAdmin }