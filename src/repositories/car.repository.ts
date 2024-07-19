import { ICar } from "../interfaces/car.interface";
import { CarModel } from "../models/car.models";

class CarRepository {
  public async getList(): Promise<ICar[]> {
    return await CarModel.find();
  }

  public async create(dto: ICar): Promise<ICar> {
    return await CarModel.create(dto);
  }

  public async getOneCar(id: string): Promise<ICar> {
    return await CarModel.findById(id);
  }

  public async update(id: string, dto: ICar): Promise<ICar> {
    return await CarModel.findByIdAndUpdate(id, dto, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await CarModel.findByIdAndDelete(id);
  }
}

export const carRepository = new CarRepository();
