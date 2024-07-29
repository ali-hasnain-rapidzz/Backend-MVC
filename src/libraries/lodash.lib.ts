// Import the necessary lodash functions
import lodash from "lodash";

class LodashUtils {
  /**
   * Picks the specified properties from an object.
   * @param object - The source object.
   * @param paths - The property paths to pick.
   * @returns The new object with picked properties.
   */
  static pick<T, K extends keyof T>(object: T, paths: K[]): Partial<Pick<T, K>> {
    return lodash.pick(object, paths);
  }

  /**
   * Orders a collection of items by the specified keys.
   * @param collection - The array of items to order.
   * @param iteratees - The keys to sort by.
   * @param orders - The order to sort by (asc or desc for each key).
   * @returns The ordered array.
   */
  static orderBy<T>(
    collection: T[],
    iteratees: Array<keyof T | string>,
    orders: ("asc" | "desc")[],
  ): T[] {
    return lodash.orderBy(collection, iteratees, orders);
  }

  /**
   * Sorts a collection based on one or more attributes.
   * @param collection - The array of items to sort.
   * @param iteratees - The attributes or custom functions to sort by.
   * @returns The sorted array.
   */
  static sortBy<T>(collection: T[], iteratees: Array<keyof T | ((value: T) => any)>): T[] {
    return lodash.sortBy(collection, iteratees);
  }

  static getNestedValue = (obj: any, key: string): any => {
    return key.split(".").reduce((o, k) => (o && o[k] !== "undefined" ? o[k] : null), obj);
  };

  static containsAll<T>(set: T[], subset: T[]): boolean {
    return subset.every((element) => set.includes(element));
  }

  static concat<T>(array1: T[], array2: T[]): T[] {
    return lodash.concat(array1, array2);
  }

  static sort<T>(array: T[], key: keyof T): T[] {
    return lodash.sortBy(array, key);
  }

  static concatAndSort<T>(array1: T[], array2: T[], key: keyof T): T[] {
    const combinedArray = this.concat(array1, array2);
    return this.sort(combinedArray, key);
  }

  static concatAndOrderBy<T>(
    array1: T[],
    array2: T[],
    key: keyof T,
    orderBy: "asc" | "desc" = "desc",
  ): T[] {
    const combinedArray = this.concat(array1, array2);
    return this.orderBy(combinedArray, [key], [orderBy]);
  }

  static convertToArray<T>(data: T | T[]): T[] {
    return Array.isArray(data) ? data : [data];
  }
}

export default LodashUtils;
