import { ApiError } from "../errors/api-error";
import { ILoginDto } from "../interfaces/login.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: IUser,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExist(dto.email);

    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });

    const tokens = await tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async signIn(
    dto: ILoginDto,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = await tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
  public async refreshToken(refreshToken: string): Promise<ITokenPair> {
    try {
      const payload = tokenService.checkToken(refreshToken);
      const tokenFromDb = await tokenRepository.findByParams({ refreshToken });

      if (!tokenFromDb) {
        throw new ApiError("Invalid refresh token", 401);
      }

      const user = await userRepository.getOneUser(payload.userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      const tokens = await tokenService.generatePair({
        userId: user._id,
        role: user.role,
      });

      await tokenRepository.update(refreshToken, tokens);

      return tokens;
    } catch (error) {
      throw new ApiError("Invalid refresh token", 401);
    }
  }
}

export const authService = new AuthService();
