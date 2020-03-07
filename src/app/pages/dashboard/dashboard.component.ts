import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { ArrayHelper } from '@shared/helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  leftColumnData = [];
  rightColumnData = [];

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.dashboardService.data$.subscribe(
        data => {
          ArrayHelper.forEach(data, (item, index) => {
            if (index === 0 || (index % 2) !== 0) {
              this.leftColumnData.push(item);
            } else {
              this.rightColumnData.push(item);
            }
          });
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openCreateBlockModal() {
    this.dashboardService.openCreateBlockModal();
  }
}
