import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Popover,
  PopoverClasses,
  PopoverControl,
} from '@shared/popover/popover.service';
import { CreateBlockModalComponent } from '@app/pages/dashboard/create-block-modal/create-block-modal.component';

const dashboard = {
  data: ['red'],
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _DATA$ = new BehaviorSubject(dashboard.data);
  public readonly data$ = this._DATA$.asObservable();

  get data() {
    return this._DATA$.value;
  }
  set data(val) {
    this._DATA$.next(val);
  }

  createBlockModalRef: PopoverControl;

  constructor(
    private popoverService: Popover,
  ) { }

  openCreateBlockModal(): void {
    this.createBlockModalRef = this.popoverService.open<any>(
      {
        content: CreateBlockModalComponent,
        origin: null,
        data: null,
        minWidth: null,
        width: null,
        height: null,
        position: null,
        backdropClass: PopoverClasses.popover_backdrop_black,
        withBackdrop: true,
        closeOnBackDropClick: false,
      }
    );
  }
}
