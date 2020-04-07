import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '@shared/popover/popover.component';
import { MaterialModule } from '@shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

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
    ReactiveFormsModule,
    ChartsModule,
  ],
  exports: [
    ...components,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  entryComponents: [
    PopoverComponent,
  ]
})
export class SharedModule { }
