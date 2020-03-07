import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { CreateBlockModalComponent } from './create-block-modal/create-block-modal.component';

const components = [
  DashboardComponent,
  CreateBlockModalComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
