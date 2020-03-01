import { NgModule } from '@angular/core';
import { MainComponent } from '@main/main.component';
import { MainRoutingModule } from '@main/main-routing.module';
import { LayoutModule } from '@main/layout/layout.module';

const components = [
  MainComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    MainRoutingModule,
    LayoutModule,
  ],
  exports: [
    ...components
  ]
})
export class MainModule { }
