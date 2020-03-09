import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '@shared/popover/popover.component';
import { MaterialModule } from '@shared/material/material.module';

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
  ],
  exports: [
    ...components,
    MaterialModule,
    CommonModule,
  ],
  entryComponents: [
    PopoverComponent,
  ]
})
export class SharedModule { }
