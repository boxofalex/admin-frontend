import { Injectable } from '@angular/core';
import { menuData } from './data/menu-data';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from './models/menu-item.model';

export enum MenuModeEnum {
  over = 'over',
  fixed = 'fixed',
}

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {
  private MENU_DATA$: BehaviorSubject<MenuItem[]> = new BehaviorSubject(menuData.map(item => new MenuItem(item)));
  private IS_MENU_OPENED$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private MENU_MODE$: BehaviorSubject<MenuModeEnum> = new BehaviorSubject(MenuModeEnum.over);
  public readonly menuData$ = this.MENU_DATA$.asObservable();
  public readonly isMenuOpened$ = this.IS_MENU_OPENED$.asObservable();
  public readonly menuMode$ = this.MENU_MODE$.asObservable();
  menuCalibration = false;

  get menuData() {
    return this.MENU_DATA$.value;
  }
  set menuData(val) {
    this.MENU_DATA$.next(val);
  }
  get isMenuOpened() {
    return this.IS_MENU_OPENED$.value;
  }
  set isMenuOpened(val) {
    this.IS_MENU_OPENED$.next(val);
  }
  get menuMode() {
    return this.MENU_MODE$.value;
  }
  set menuMode(val) {
    this.MENU_MODE$.next(val);
  }

  constructor() { }

  openMainMenuState() {
    this.isMenuOpened = true;
  }

  closeMainMenuState() {
    this.isMenuOpened = false;
  }

  toggleMainMenuState() {
    if (this.menuCalibration) {
      this.menuCalibration = false;
    } else {
      this.isMenuOpened = !this.isMenuOpened;
    }
  }

  toggleMainMenuMode() {
    if (this.menuMode === MenuModeEnum.over) {
      this.menuMode = MenuModeEnum.fixed;
      if (!this.isMenuOpened) {
        this.openMainMenuState();
      }
    } else {
      this.menuMode = MenuModeEnum.over;
      this.closeMainMenuState();
      this.menuCalibration = true;
    }
  }
}
