import { GenericAggregation } from "@Aggregations/generic.aggregation";
import { ERROR_MESSAGES } from "@Constants/constants";
import TryCatch from "@Decorators/try_catch.decorator";
import { EncryptLibrary } from "@Libraries/encrypt.lib";
import { TokenService } from "@Libraries/token.lib";
import { User } from "@Models/user.model";
import { IUser, UserType } from "@Types/user.types";
import { ApiError } from "@Utils/ApiError";
import { FilterValidationType } from "@Validations/pagination.validation";
import httpStatus from "http-status";

class UserServiceClass {
  @TryCatch()
  async findUserByEmail({
    email,
    allowPassword = false,
  }: {
    email: string;
    allowPassword?: boolean;
  }): Promise<UserType | null> {
    return await User.findOne({ email }).select(
      allowPassword ? "+password" : "",
    );
  }

  @TryCatch()
  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: Omit<UserType, "password"> }> {
    const user = await this.findUserByEmail({ email, allowPassword: true });
    if (
      !user ||
      !(await EncryptLibrary.comparePasswords(password, user.password))
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_USER);
    }

    const token = TokenService.generateToken(user.email, user.name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: usrPass, ...usertoSend } = user;
    return { token, user };
  }

  @TryCatch()
  async createUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    console.log("IN the service method");
    const hashedPassword = await EncryptLibrary.encryptPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    return await newUser.save();
  }

  @TryCatch()
  async listAllUsers({
    filter,
    page,
    limit,
  }: {
    filter?: FilterValidationType;
    page: number;
    limit: number;
  }): Promise<{ count: number; result: IUser[] }> {
    const aggregation = GenericAggregation.countAndPaginate({
      page,
      limit,
      filter,
    });

    const result = await User.aggregate(aggregation);

    return {
      count: result[0]?.totalCount || 0,
      result: result[0]?.data || [],
    };
  }

  @TryCatch()
  async userCron(): Promise<void> {
    console.log("User Cron Added");
  }
}

export const UserService = new UserServiceClass();
