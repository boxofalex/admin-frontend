import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CreateBlockModalComponent } from './create-block-modal/create-block-modal.component';
import { UiModule } from '@ui/ui.module';

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
    UiModule,
  ]
})
export class DashboardModule { }
