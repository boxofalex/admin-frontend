import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '@shared/popover/popover.component';

const components = [
  PopoverComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components
  ],
  entryComponents: [
    PopoverComponent,
  ]
})
export class SharedModule { }
