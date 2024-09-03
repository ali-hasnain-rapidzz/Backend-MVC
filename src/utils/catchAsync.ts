// catchAsync.ts
export const catchAsync = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  shouldRethrow: boolean = false,
) => {
  return (...args: Parameters<T>): Promise<void> => {
    return fn(...args).catch((err) => {
      console.error("Async function failed:", err);

      if (shouldRethrow) {
        throw err;
      }
    });
  };
};
