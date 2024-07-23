import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: IUser): Promise<IUser> {
    await this.isEmailExist(dto.email);
    return await userRepository.create(dto);
  }

  public async getOneUser(id: string): Promise<IUser> {
    return await userRepository.getOneUser(id);
  }

  public async update(id: string, dto: IUser): Promise<IUser> {
    return await userRepository.update(id, dto);
  }

  public async delete(id: string): Promise<void> {
    const user = await userRepository.getOneUser(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.delete(id);
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("Email already exist!!!", 409);
    }
  }
}

export const userService = new UserService();
