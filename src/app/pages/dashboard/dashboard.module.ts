import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CreateBlockModalComponent } from './create-block-modal/create-block-modal.component';
import { UiModule } from '@ui/ui.module';
import { DashboardBlockComponent } from './dashboard-block/dashboard-block.component';

const COMPONENTS = [
  DashboardComponent,
  CreateBlockModalComponent,
  DashboardBlockComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    DashboardRoutingModule,
    UiModule,
  ]
})
export class DashboardModule { }
