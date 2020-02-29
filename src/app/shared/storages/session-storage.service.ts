import { Injectable } from '@angular/core';
import { Dictionary } from '@shared/models';

@Injectable({
  providedIn: 'root',
  deps: []
})
export class SessionStorageService extends Dictionary<any> {
  constructor() {
    super();
    // const length = sessionStorage.length;
    // for (let i = 0; i < length; i++) {
    //   const key = sessionStorage.key(i);
    //   let value = sessionStorage.getItem(key);
    //   try {
    //     value = JSON.parse(value);
    //   } catch (e) { }
    //   this.set(key, value);
    // }
  }

  set(key: string, value: any): this {
    super.set(key, value);
    sessionStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);

    return this;
  }

  get(key: string): string {
    return sessionStorage.getItem(key);
  }

  remove(key: string): this {
    super.remove(key);
    sessionStorage.removeItem(key);
    return this;
  }

  removeAll(): void {
    super.removeAll();
    sessionStorage.clear();
  }
}
