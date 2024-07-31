import { GenericAggregation } from "@Aggregations/generic.aggregation";
import { ERROR_MESSAGES } from "@Constants/constants";
import Sample from "@Decorators/sample.decorator";
import { EncryptLibrary } from "@Libraries/encrypt.lib";
import { TokenService } from "@Libraries/token.lib";
import { User } from "@Models/user.model";
import { IUser, UserType } from "@Types/user.types";
import { ApiError } from "@Utils/ApiError";
import { FilterValidationType } from "@Validations/pagination.validation";
import httpStatus from "http-status";

class UserServiceClass {
  findUserByEmail = async (email: string, allowPassword?: boolean): Promise<UserType | null> => {
    return await User.findOne({ email }).select(allowPassword ? "+password" : "");
  };

  @Sample()
  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: UserType }> {
    const user = await this.findUserByEmail(email, true);
    if (!user || !(await EncryptLibrary.comparePasswords(password, user.password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INVALID_USER);
    }

    const token = TokenService.generateToken(user.email, user.name);
    return { token, user };
  }

  createUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> => {
    const hashedPassword = await EncryptLibrary.encryptPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    return await newUser.save();
  };

  listAllUsers = async (data: { filter?: FilterValidationType; page: number; limit: number }) => {
    const { filter, page, limit } = data;

    const aggregation = GenericAggregation.countAndPaginate({ page, limit, filter });
    const result = await User.aggregate(aggregation);
    return {
      count: result[0]?.totalCount || 0,
      result: result[0]?.data || [],
    };
  };

  UserCron = async () => {
    console.log("User Cron Added");
  };
}

export const UserService = new UserServiceClass();
