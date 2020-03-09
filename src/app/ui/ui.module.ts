import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
    ...COMPONENTS,
  ]
})
export class UiModule { }
