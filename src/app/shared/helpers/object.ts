import { ObjectKey } from '@shared/custom-types';
import { TypeHelper } from './type';
import * as _ from 'lodash';

export class ObjectHelper {
  /**
   * Merges objects in first object recursively.
   * {object} trees
   * {{}}
   */
  public static merge(...trees: object[]) {
    const resultMerged: any = {};
    trees.forEach((tree) => {
      ObjectHelper.forEach(tree, (item, key) => {
        if (resultMerged[key] instanceof Object && tree[key] instanceof Object && !Array.isArray(resultMerged[key])) {
          resultMerged[key] = ObjectHelper.merge(resultMerged[key], tree[key]);
        } else {
          resultMerged[key] = tree[key];
        }
      });
    });
    return resultMerged;
  }

  /**
   * iterates through objects properties
   * object
   * {(item: any, key: (string | number)) => void} callback
   * {string} keyPrefix
   */
  public static forEach(object: any, callback: (item: any, key: ObjectKey) => void, keyPrefix: string = '') {
    for (const key in object) {
      if (object.hasOwnProperty(key) && callback(object[key], keyPrefix + key) === null) {
        break;
      }
    }
  }

  /**
   * Map object to another object with same properties with callback.
   * object
   * {(item: any, key: ObjectKey) => any} callback
   * {{}}
   */
  public static map(object: any, callback: (item: any, key: ObjectKey) => any) {
    const res = {};
    ObjectHelper.forEach(object, (item: any, key: ObjectKey) => {
      res[key] = callback(item, key);
    });
    return res;
  }

  public static reduce<T>(
    object: any,
    callback: (acc: any, item: T, key: ObjectKey, ...parameters: any[]) => any,
    acc: any = null,
    ...parameters: any[]
  ) {
    let res = acc;
    this.forEach(object, (item: T, key: ObjectKey) => {
      res = callback(res, item, key, ...parameters);
    });
    return res;
  }

  public static find(object: any, callback: (item: any, key: ObjectKey) => boolean) {
    let res;
    for (const key in object) {
      if (object.hasOwnProperty(key) && callback(object[key], key)) {
        res = object[key];
        break;
      }
    }
    return res;
  }

  /**
   * return object value by chain of keys. Ex: getByPath(object, 'qwe.asd.zxc') returns object.qwe.asd.zxc value;
   */
  public static getByPath(
    object: any,
    path: string | ObjectKey[] = [],
    def?: any,
    defCondition?: (value: any) => boolean,
  ) {
    const res = ObjectHelper.normalisePath(path).reduce(
      (acc, item) => TypeHelper.isSet(acc) ? acc[item] : acc,
      object,
    );
    return !defCondition && TypeHelper.isExist(res) || !!defCondition && !defCondition(res) ? res : def;
  }

  /**
   * sets object value by chain of keys. Ex: setByPath(object, 'qwe.asd.zxc', 1) sets object.qwe.asd.zxc value to 1;
   */
  public static setByPath(object: any, path: string | ObjectKey[] = [], value: any) {
    const arrayPath = ObjectHelper.normalisePath(path);
    const pathLength = arrayPath.length;
    let i = 0;
    return arrayPath.reduce((acc, item) => {
      if (i + 1 === pathLength) {
        acc[item] = value;
        return acc;
      }
      if (TypeHelper.isExist(acc)) {
        acc[item] = {};
      }
      i++;
      return acc;
    }, object);
  }

  public static isEmpty(obj: any) {
    let res = true;
    ObjectHelper.forEach(obj, () => {
      res = false;
    });
    return res;
  }

  public static isNumber(item: any) {
    return !Number.isNaN(Number(item));
  }

  private static normalisePath(path: string | ObjectKey[] = []): ObjectKey[] {
    return Array.isArray(path) ? path : path.split('.')
      .map((part: string) => ObjectHelper.isNumber(part) ? Number(part) : part);
  }

  // create new object based on another
  public static createNewObject(base?: object, modifier?: object): any {
    return Object.assign({}, base, modifier);
  }

  // to convert object to string
  public static convetObjToString(object: object): string {
    return JSON.stringify(object);
  }

  // to convert string to object
  public static convertStringToObject(_string: string): any {
    return JSON.parse(_string);
  }

  public static addGroup(key, value) {
    return { key, value };
  }

  public static compareObjects(a: object, b: object): boolean {
    return _.isEqual(a, b);
  }

  public static mergeObjects(a: object, b: object) {
    return _.assign({}, a, b);
  }

  public static deepClone(a: object) {
    return _.cloneDeep(a);
  }

  public static copyObject(a: object) {
    return this.mergeObjects({}, a);
  }

  // returns object that contains keys only without null/undefined values
  public static omitNil(a: object) {
    return _.omitBy(a, _.isNil);
  }

  public static groupArrayBy(data: any, field?: string): any {
    const map = new Map();
    if (field) {
      data.forEach(item => {
        const key = item[field];
        if (!map.has(key)) {
          map.set(key, [item]);
        } else {
          map.get(key).push(item);
        }
      });
    } else {
      data.forEach(item => {
        const key = item;
        if (!map.has(key)) {
          map.set(key, item);
        } else {
          map.get(key).push(item);
        }
      });
    }

    const groups: any = Array.from(map, x => ObjectHelper.addGroup(x[0], x[1]));
    return groups;
  }
}
