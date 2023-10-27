import { NextFunction, Request, Response } from "express";

const isTattooArtist = (req: Request, res: Response, next: NextFunction) => {

  if (req.token.role == "user") {
    return res.json('You need special permissions')
  }

  next();
}

export { isTattooArtist }