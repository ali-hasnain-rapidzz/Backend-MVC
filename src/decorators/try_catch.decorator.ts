import { ApiError } from "@Utils/ApiError";
import httpStatus from "http-status";

function TryCatch() {
  return function (
    target: object,
    propertyKey: string,
    descriptor?: TypedPropertyDescriptor<any>,
  ): any {
    if (!descriptor) {
      descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
    }

    if (!descriptor || typeof descriptor.value !== "function") {
      throw new TypeError(
        `Only methods can be decorated with @TryCatch. <${propertyKey}> is not a method!`,
      );
    }

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Error: ${error.message}`,
          );
        } else {
          throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred",
          );
        }
      }
    };

    return descriptor;
  };
}

export default TryCatch;
