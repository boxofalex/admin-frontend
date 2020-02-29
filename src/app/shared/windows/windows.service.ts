import { Injectable } from '@angular/core';
import { Dictionary } from '@shared/models';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root',
  deps: []
})
export class WindowsService extends Dictionary<any> {

  constructor() {
    super();
  }

  add(key: string, value: any) {
    super.set(key, new BehaviorSubject(value));
    return this;
  }

  get(key: string): BehaviorSubject<any> {
    return super.get(key);
  }

  getValue(key: string): any {
    if (super.get(key)) {
      return super.get(key).getValue();
    }
    return super.get(key);
  }

  getAsObservable(key: string): Observable<any> {
    return super.get(key).asObservable();
  }

  open(key: string): void {
    super.get(key).next(true);
  }

  close(key: string): void {
    super.get(key).next(false);
  }

  change(key: string, value: any): void {
    super.get(key).next(value);
  }

  toggle(key: string): void {
    const subject = super.get(key);
    const value = subject.getValue();
    subject.next(!value);
  }

  clear() {
    super.removeAll();
  }
}
