export class TypeHelper {
  public static isObject(obj: any) {
    return typeof obj === 'object';
  }

  public static isFunction(obj: any) {
    return typeof obj === 'function';
  }

  public static isSet(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }

  public static isNotSet(obj: any): boolean {
    return obj === undefined || obj === null;
  }

  public static isExist(obj: any): boolean {
    return obj !== undefined;
  }

  public static isNotExist(obj: any): boolean {
    return obj === undefined;
  }

  public static isString(value): boolean {
    return typeof value === 'string' || value instanceof String;
  }
}
