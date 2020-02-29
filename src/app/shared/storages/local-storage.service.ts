import { Injectable } from '@angular/core';
import { Dictionary } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends Dictionary<any> {
  constructor() {
    super();
    /*
    const length = localStorage.length;
    for (let i = 0; i < length; i++) {
      const key = localStorage.key(i);
      let value = localStorage.getItem(key);
      try {
        value = JSON.parse(value);
      } catch (e) { }
      this.set(key, value);
    }
    */
  }

  set(key: string, value: any): this {
    super.set(key, value);
    localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);

    return this;
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }

  remove(key: string): this {
    super.remove(key);
    localStorage.removeItem(key);
    return this;
  }

  removeAll(): void {
    super.removeAll();
    // localStorage.clear();
  }
}
