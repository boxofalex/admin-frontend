import {
  Injectable,
  TemplateRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Popover,
  PopoverClasses,
  PopoverControl,
} from '@shared/popover/popover.service';
import { DatabaseService } from '@app/database/database.service';
import {
  HttpErrorResponse
} from '@angular/common/http';

const dashboard = {
  data: ['red'],
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _DATA$ = new BehaviorSubject([]);
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
    private databaseService: DatabaseService,
  ) { }

  createBlock(values: { [key: string]: any }) {
    this.databaseService.addBlockToDashboard({ ...values, name: '' }).then(response => {
      this.getBlocks();
    });
  }

  getBlocks() {
    this.databaseService.getDashboardData().subscribe(
      response => {
        if (response instanceof HttpErrorResponse) {
        } else {
          this.data = response;
        }
      });
  }

  openCreateBlockModal(tmp: TemplateRef<any>): void {
    this.createBlockModalRef = this.popoverService.open<any>(
      {
        content: tmp,
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
