import { ObjectHelper } from '@shared/helpers';

export class Dictionary<T> {
  protected _length = 0;
  protected items: { [index: string]: T } = {};

  constructor(values: { [index: string]: T } = {}) {
    this.load(values);
  }

  get length(): number {
    return this._length;
  }

  load(items: { [index: string]: T }): void {
    if (items) {
      ObjectHelper.forEach(items, (condition: T, key: string) => this.set(key, condition));
    }
  }

  set(key: string, value: T): Dictionary<T> {
    if (!this.items.hasOwnProperty(key)) {
      this._length++;
    }
    this.items[key] = value;

    return this as Dictionary<T>;
  }

  has(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  get(key: string): T {
    return this.items[key];
  }

  getKeyByIndex(index: number): string {
    let i = -1;
    let res = null;
    this.forEach((value: T, name: string) => {
      if (++i === index) {
        res = name;
        return null;
      }
    });

    return res;
  }

  getByIndex(index: number): T {
    let i = -1;
    let res = null;
    this.forEach((value: T) => {
      if (++i === index) {
        res = value;
        return null;
      }
    });

    return res;
  }

  remove(key: string): Dictionary<T> {
    if (this.has(key)) {
      delete this.items[key];
      this._length--;
    }
    return this as Dictionary<T>;
  }

  keys(): string[] {
    const keySet: string[] = [];
    ObjectHelper.forEach(this.items, (item: T, key: string) => {
      keySet.push(key);
    });

    return keySet;
  }

  values(): T[] {
    const values: T[] = [];
    ObjectHelper.forEach(this.items, (item: T) => {
      values.push(item);
    });

    return values;
  }

  removeAll(): void {
    this.items = {};
    this._length = 0;
  }

  forEach(callback: (value: T, name: string, index: number) => void) {
    let i = 0;
    ObjectHelper.forEach(this.items, (item: T, key: string) => {
      return callback(item, key, i++);
    });
  }

  find(callback: (value: T, name: string) => boolean): T | null {
    let res = null;
    ObjectHelper.forEach(this.items, (value: T, name: string) => {
      if (callback(value, name)) {
        res = value;
        return null;
      }
    });
    return res;
  }

  filter(callback: (value: T, name: string) => boolean): Dictionary<T> {
    const res: { [index: string]: T } = {};
    this.forEach((value: T, name: string) => {
      if (callback(value, name)) {
        res[name] = value;
      }
    });

    return new Dictionary(res);
  }

  reduce(callback: (acc: any, item: T, name: string) => any, startValue: any = null) {
    let res = startValue;
    this.forEach((value: T, name: string) => {
      res = callback(res, value, name);
    });

    return res;
  }
}
