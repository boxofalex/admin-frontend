import { ObjectHelper } from './object';
import { TypeHelper } from './type';
import * as _ from 'lodash';

export class ArrayHelper {

  public static checkIfArray(value: any): boolean {
    return Array.isArray(value);
  }

  // to get last index of array
  public static isLastIndex(index: number, array: any[]) {
    return index === array.length - 1;
  }

  // to check if array is empty
  public static isEmpty<T>(array: T[]) {
    return array.length === 0;
  }

  public static unique<T>(array: T[], getIndex?: (value: T, array: T[]) => number): T[] {
    if (!getIndex) {
      return array.filter((value: T, index: number) => array.indexOf(value) === index);
    }
    return array.filter((value: T, index: number) => getIndex(value, array) === index);
  }

  public static uniqueBy(array, callback) {
    return _.uniqBy(array, callback);
  }

  // to filter array as per function
  public static filterAsPerFunction<T>(array: T[], filterFunc: (value: any, index: number) => boolean): T[] | [] {
    if (TypeHelper.isSet(array)) {
      return array.filter(filterFunc);
    }
    return [];
  }

  // to sort array as per sort function
  public static sortAsPerFunction<T>(array: T[], sortFunc: (a: T, b: T) => number, refArray?: any[]): void {
    array.sort(sortFunc);
  }

  // to check if array contains element
  public static isContain<T>(array: T[], element: T, propertyForObjectComparison?: string): boolean {
    if (propertyForObjectComparison) {
      return !this.isEmpty(this.filterAsPerFunction(array, (value: any, index: number) => {
        if (TypeHelper.isExist(value[propertyForObjectComparison])) {
          return value[propertyForObjectComparison] === element[propertyForObjectComparison];
        } else {
          return value === element[propertyForObjectComparison];
        }
      }));
    }
    return !this.isEmpty(this.filterAsPerFunction(array, (value: any, index: number) => value === element));
  }

  // apply function to each element of array
  public static forEach<T>(array: T[], callback: (item: any, index: number) => void) {
    return array.forEach((el, index) => {
      callback(el, index);
    });
  }

  // copy array
  public static copyArray<T>(array: T[]): T[] {
    return array.slice();
  }

  // copy array with objects
  public static copyArrayWithObjects<T>(array: T[]): any[] {
    const res = [];
    this.forEach(array, (item, index) => {
      res.push(ObjectHelper.createNewObject(item));
    });
    return res;
  }

  public static differenceBy(a: object, b: object, by: string) {
    return _.differenceBy(a, b, by);
  }

  public static orderBy(array, field, order = 'asc') {
    const oderedArray = _.orderBy(array, [field], [order]);
    return oderedArray;
  }

  public static removeEmpty(array) {
    const filteredArray = this.filterAsPerFunction(array, (item, index) => {
      return Boolean(item);
    });
    return filteredArray;
  }

  public static compareArrays(a, b) {
    return _.isEqual(a.sort(), b.sort());
  }

  public static findElementAsPerFunction(array, filterFunc: (value: any, index: number) => boolean) {
    const el = array.find(filterFunc);
    return el;
  }

  public static flattenDeep(array) {
    return _.flattenDeep(array);
  }
}
