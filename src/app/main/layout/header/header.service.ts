import { Injectable } from '@angular/core';
import {
  Popover,
  PopoverClasses,
  PopoverControl,
} from '@shared/popover/popover.service';
import { AccountMenuComponent } from '@main/layout/account-menu/account-menu.component';
import { MatButton } from '@angular/material/button';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private accountMenuRef: PopoverControl;
  private accountMenuPosition = [{
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top'
  }];

  constructor(
    private popoverService: Popover,
  ) { }

  openAccoutMenu(origin: MatButton): void {
    this.accountMenuRef = this.popoverService.open<any>(
      {
        content: AccountMenuComponent,
        origin,
        data: null,
        minWidth: null,
        width: null,
        height: null,
        position: this.accountMenuPosition,
        backdropClass: PopoverClasses.popover_backdrop_black,
        withBackdrop: true,
        closeOnBackDropClick: true,
      }
    );
  }
}
