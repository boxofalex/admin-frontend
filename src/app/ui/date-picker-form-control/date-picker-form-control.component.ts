import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import { Popover } from '../../shared/popover/popover.service';
import * as _moment from 'moment';
const moment = _moment;
moment.locale('ru');
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { direction } from '../orientation-indicator/direction.enum';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-date-picker-form-control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerFormControlComponent),
      multi: true
    }
  ],
  templateUrl: './date-picker-form-control.component.html',
  styleUrls: ['./date-picker-form-control.component.scss']
})
export class DatePickerFormControlComponent
  implements ControlValueAccessor, OnInit {
  positionChangeSub: Subscription;
  position: any = null;
  date = new FormControl('');
  ref: any;
  value = { startDate: null, endDate: null };
  @Input() placeholder = '';
  @Input() width = null;
  @Input() initPosition = [
    direction.top,
    direction.right
  ];

  constructor(private popover: Popover) { }

  ngOnInit() { }

  show(content: TemplateRef<any>, origin) {
    this.ref = this.popover.open<any>({
      content,
      origin,
      data: null,
      width: null,
      minWidth: null,
      height: null,
      position: this.initPosition,
      backdropClass: null,
      withBackdrop: true,
    });
    const { positionStrategy } = this.ref;
    this.positionChangeSub = positionStrategy.positionChanges.subscribe(
      changes => {
        this.position = changes.connectionPair;
      }
    );
  }

  onNewDatedSelected(event) {
    const { popoverRef } = this.ref;
    const { _startDate, _endDate } = event;
    const valueToStore = {
      startDate: _startDate.startOf('day').format('YYYY-MM-DD HH:mm'),
      endDate: _endDate.endOf('day').format('YYYY-MM-DD HH:mm')
    };
    popoverRef.close();
    this.writeValue(valueToStore);
  }

  writeValue(value) {
    if (!value) {
      this.onChange(null);
      this.date.setValue('');
      return;
    }
    const { startDate, endDate } = value;
    this.value = { startDate, endDate };
    const valueToShow = `${moment(startDate).format('L')} - ${moment(endDate).format('L')} `;
    this.date.setValue(valueToShow);
    this.onChange(value);
  }

  onChange: any = () => { };

  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  cancel() {
    const { popoverRef } = this.ref;
    popoverRef.close();
  }
}
