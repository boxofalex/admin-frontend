import {
  Component,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { DashboardBlockService } from './dashboard-block.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss']
})
export class DashboardBlockComponent implements OnInit, OnDestroy {
  @Input() block;
  data;
  subscriptions: Subscription = new Subscription();

  constructor(
    private dashboardBlockService: DashboardBlockService,
  ) { }

  ngOnInit(): void {
    this.dashboardBlockService.data$.subscribe(
      data => {
        this.data = data;
      }
    );
    this.dashboardBlockService.initBlock(this.block);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
