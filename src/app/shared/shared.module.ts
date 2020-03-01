import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '@shared/popover/popover.component';
import { MaterialModule } from '@shared/material/material.module';
import { UiModule } from '@shared/ui/ui.module';

const components = [
  PopoverComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
  ],
  exports: [
    ...components,
    MaterialModule,
    CommonModule,
    UiModule,
  ],
  entryComponents: [
    PopoverComponent,
  ]
})
export class SharedModule { }
