import { NextFunction, Request, Response } from "express";

import { ICar } from "../interfaces/car.interface";
import { carService } from "../services/car.service";

class CarController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await carService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ICar;
      const result = await carService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getOneCar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await carService.getOneCar(id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const dto = req.body as ICar;
      const result = await carService.update(id, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await carService.delete(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
