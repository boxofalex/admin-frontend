import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  MainMenuService,
  MenuModeEnum,
} from './main-menu.service';
import { Observable } from 'rxjs';
import { MenuItem } from './models/menu-item.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {
  menuData$: Observable<MenuItem[]>;
  isMenuOpened$: Observable<boolean>;
  isMenuOpened: boolean;
  menuMode: MenuModeEnum;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private mainMenuService: MainMenuService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.menuData$ = this.mainMenuService.menuData$;
    this.isMenuOpened$ = this.mainMenuService.isMenuOpened$;
    this.subscriptions.add(
      this.mainMenuService.isMenuOpened$.subscribe(
        state => {
          this.isMenuOpened = state;
        }
      )
    ).add(
      this.mainMenuService.menuMode$.subscribe(
        mode => {
          this.menuMode = mode;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goToLink(link: string) {
    this.router.navigateByUrl(link);
  }

  toggleMainMenuState() {
    if (this.menuMode !== MenuModeEnum.fixed) {
      this.mainMenuService.toggleMainMenuState();
    }
  }

  toggleMainMenuMode() {
    this.mainMenuService.toggleMainMenuMode();
  }
}
