import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.models";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await UserModel.find();
  }

  public async create(dto: IUser): Promise<IUser> {
    return await UserModel.create(dto);
  }

  public async getOneUser(id: string): Promise<IUser> {
    return await UserModel.findById(id);
  }

  public async update(id: string, dto: IUser): Promise<IUser> {
    return await UserModel.findByIdAndUpdate(id, dto, { new: true });
  }

  public async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}

export const userRepository = new UserRepository();
