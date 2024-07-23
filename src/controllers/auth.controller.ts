import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new ApiError("Refresh token is required", 400);
      }
      const tokens: ITokenPair = await authService.refreshToken(refreshToken);
      res.status(200).json(tokens);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
