import { ICar } from "../interfaces/car.interface";
import { carRepository } from "../repositories/car.repository";

class CarService {
  public async getList(): Promise<ICar[]> {
    return await carRepository.getList();
  }

  public async create(dto: ICar): Promise<ICar> {
    return await carRepository.create(dto);
  }

  public async getOneCar(id: string): Promise<ICar> {
    return await carRepository.getOneCar(id);
  }

  public async update(id: string, dto: ICar): Promise<ICar> {
    return await carRepository.update(id, dto);
  }

  public async delete(id: string): Promise<void> {
    await carRepository.delete(id);
  }
}

export const carService = new CarService();
