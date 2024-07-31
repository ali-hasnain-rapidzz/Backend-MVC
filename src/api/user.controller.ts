import { DEFAULT_PAGINATION_LIMIT } from "@Constants/constants";
import { UserService } from "@Services/user.service";
import { catchAsync } from "@Utils/catchAsync";
import { createPaginationResponse } from "@Utils/GenericFunctions";
import { ListAllUsersPaginationValidationType } from "@Validations/user.validation";
import httpStatus from "http-status";

export const listUsers = catchAsync(async (req, res) => {
  const { body: reqBody } = req as ListAllUsersPaginationValidationType;

  const { page = 1, limit = DEFAULT_PAGINATION_LIMIT, filter } = reqBody;
  const queryResult = await UserService.listAllUsers({
    filter,
    page,
    limit,
  });

  const response = createPaginationResponse({
    total: queryResult.count || 0,
    list: queryResult.result || [],
    currentPage: page,
    limit,
  });

  res.status(httpStatus.OK).json({
    ...response,
  });
});
