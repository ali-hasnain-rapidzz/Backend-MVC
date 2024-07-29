import { ApiError } from "@Utils/ApiError";
import httpStatus from "http-status";
import { ClientSession, startSession } from "mongoose";

function Transaction() {
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
        `Only methods can be decorated with @Transaction. <${propertyKey}> is not a method!`,
      );
    }

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const session: ClientSession = await startSession();
      session.startTransaction();
      try {
        const result = await originalMethod.apply(this, [...args, session]);
        await session.commitTransaction();
        return result;
      } catch (error) {
        console.log({ error });
        await session.abortTransaction();
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error as string);
      } finally {
        session.endSession();
      }
    };

    return descriptor;
  };
}

export default Transaction;

// import { ApiError } from "@Utils/ApiError";
// import httpStatus from "http-status";
// import { ClientSession, startSession } from "mongoose";

// function Transaction() {
//   return function (
//     target: Object,
//     propertyKey: string,
//     descriptor?: TypedPropertyDescriptor<any>,
//   ): any {
//     if (!descriptor) {
//       descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
//     }

//     if (!descriptor || typeof descriptor.value !== "function") {
//       throw new TypeError(
//         `Only methods can be decorated with @Transaction. <${propertyKey}> is not a method!`,
//       );
//     }

//     const originalMethod = descriptor.value;

//     descriptor.value = async function (...args: any[]) {
//       const session: ClientSession = await startSession();
//       session.startTransaction();
//       try {
//         const result = await originalMethod.apply(this, [...args, session]);
//         await session.commitTransaction();
//         return result;
//       } catch (error) {
//         console.log({ error });
//         await session.abortTransaction();
//         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error as string);
//       } finally {
//         session.endSession();
//       }
//     };

//     return descriptor;
//   };
// }

// export default Transaction;
