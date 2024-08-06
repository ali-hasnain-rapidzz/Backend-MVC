import { ERROR_MESSAGES } from "@Constants/constants";
import { UserService } from "@Services/user.service";
import { ApiError } from "@Utils/ApiError";
import { catchAsync } from "@Utils/catchAsync";
import { LoginValidationType, SignUpValidationType } from "@Validations/auth.validation";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const {
    body: { name, email, password },
  } = req as SignUpValidationType;

  const existingUser = await UserService.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.ALREADY_EXISTS);
  }

  await UserService.createUser({ name, email, password });
  res.status(200).json({ message: "User created successfully" });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const {
    body: { email, password },
  } = req as LoginValidationType;

  const { token, user } = await UserService.loginUser({ email, password });
  console.log("Login Success");
  res.status(200).json({ token, user });
});
