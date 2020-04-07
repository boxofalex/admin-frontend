import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { DatePickerFormControlComponent } from './date-picker-form-control/date-picker-form-control.component';
import { OrientationIndicatorComponent } from './orientation-indicator/orientation-indicator.component';
import { CalendarComponent } from './date-picker-range/calendar/calendar.component';
import { ChartComponent } from './chart/chart.component';

const COMPONENTS = [
  DatePickerRangeComponent,
  DatePickerFormControlComponent,
  OrientationIndicatorComponent,
  CalendarComponent,
  ChartComponent,
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
