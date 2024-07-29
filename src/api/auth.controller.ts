import { UserService } from "@Services/user.service";
import { ApiError } from "@Utils/ApiError";
import { catchAsync } from "@Utils/catchAsync";
import { LoginValidationType } from "@Validations/auth.validation";
import { CreateUserValidationType } from "@Validations/user.validation";
import httpStatus from "http-status";

/**
 * this function is used to register user
 */
export const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let {
      body: reqBody
    } = req as CreateUserValidationType;

    const existingUser = await UserService.getOneUser({ id: reqBody.email });

    if (existingUser) 
      throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");

    const newUser = await UserService.createUser({
      ...reqBody,
      fullName: reqBody.firstName.trim() + " " + reqBody.lastName.trim(),
    });
    return res.status(httpStatus.OK).json({
      result: newUser,
    });
  });

/**
 * this function is used to login user
 */
  export const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body as LoginValidationType;
      const user = (await UserService.getOneUser({ email }).lean());
  
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exists");
      }
      let { password: userPassword, ...userWithoutPassword } = user;
      // compare encrypted password
      const comparePass = EncryptLibraryClass.comparePasswords(userPassword, password);
      if (!comparePass) {
        throw new ApiError(httpStatus.401, "Incorect password");
      }
  
      return res.status(200).json({
        user,
      });
    },
  );
  