function Sample() {
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
        `Only methods can be decorated with @Sample. <${propertyKey}> is not a method!`,
      );
    }

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      console.log("Sample decorator init.");
      const result = await originalMethod.apply(this, [...args]);
      console.log("Sample decorator ended.");
      return result;
    };

    return descriptor;
  };
}

export default Sample;
