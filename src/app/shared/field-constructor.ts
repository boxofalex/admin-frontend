import { isDevMode } from '@angular/core';
import {
  ObjectHelper,
  TypeHelper,
} from '@shared/helpers';
import { ObjectKey } from '@shared/custom-types';

export class FieldConstructor {
  private static instanse: FieldConstructor;
  private _def: any;
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  public static from(data: { [key: string]: any }, path: string | ObjectKey[], modifier?: any): FieldConstructor {
    const res = ObjectHelper.getByPath(data, path);
    if (!FieldConstructor.instanse) {
      if (modifier) {
        FieldConstructor.instanse = new FieldConstructor({ ...res, ...modifier });
      } else {
        FieldConstructor.instanse = new FieldConstructor(res);
      }
    } else {
      FieldConstructor.instanse.clear(res);
    }
    return FieldConstructor.instanse;
  }

  public clear(data: any) {
    this.data = data;
    this._def = undefined;
  }

  public def(def: any = null) {
    this._def = def;
    return this;
  }

  public enum(type: any) {
    return type[type[this.data]] || this._def;
  }

  public object(type: any) {
    return this.isSetThen(this.data, (data: any) => new type(data));
  }

  public enumedObj(keysEnum: any, itemConstructor?: (item: any) => any) {
    return ObjectHelper.reduce(this.data, (acc: any, item: any, key: any) => {
      if ((Object as any).values(keysEnum).includes(key)) {
        if (itemConstructor) {
          acc[key] = this.isSetThen(item, itemConstructor);
        } else {
          acc[key] = this.isSetThen(item, (el: any) => el);
        }
      } else if (isDevMode()) {
        console.info(`Key "${key}" is invalid in path "${name}"`);
      }
      return acc;
    }, {});
  }

  public any() {
    return this.data;
  }

  public int() {
    return typeof this.data === 'number' ? this.data : Number.parseInt('' + this.data, 10);
  }

  public float() {
    return typeof this.data === 'number' ? this.data : Number.parseFloat('' + this.data);
  }

  public string() {
    return this.isSetThen(this.data, (value: any) => '' + value);
  }

  public boolean() {
    return !!this.data;
  }

  public arrayOf(type: any) {
    if (!this.data) {
      return [];
    }
    return (this.data as any[]).map((item: any) => this.isSetThen(item, (data: any) => new type(data)));
  }

  public arrayOfWirhIndex(type: any) {
    if (!this.data) {
      return [];
    }
    return (this.data as any[])
      .map((item: any, index) => this.isSetThen(ObjectHelper.mergeObjects(item, { index }), (data: any) => new type(data)));
  }

  public arrayofWithIndexAndData(type: any, additionalData) {
    if (!this.data) {
      return [];
    }
    return (this.data as any[]).map((item: any, index) => {
      const newObject = !TypeHelper.isSet(item.index) ? ObjectHelper.mergeObjects(item, { index, ...additionalData }) : ObjectHelper.mergeObjects(item, { ...additionalData });
      return this.isSetThen(newObject, (data: any) => {
        const newValue = new type(data);
        return newValue;
      });
    });
  }

  public arrayofWithData(type: any, data) {
    if (!this.data) {
      return [];
    }
    return (this.data as any[]).map((item: any, index) => this.isSetThen(ObjectHelper.mergeObjects(item, data), (data: any) => new type(data)));
  }

  isSetThen(value: any, callback: (value: any) => any) {
    return TypeHelper.isSet(value) ? callback(value) : this._def;
  }
}
