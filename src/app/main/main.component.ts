import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  MainMenuService,
  MenuModeEnum,
} from '@app/main/layout/main-menu/main-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  mainMenuMode: MenuModeEnum;

  constructor(
    private mainMenuService: MainMenuService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.mainMenuService.menuMode$.subscribe(
        mode => {
          this.mainMenuMode = mode;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
