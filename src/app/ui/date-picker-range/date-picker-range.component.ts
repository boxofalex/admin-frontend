import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;
moment.locale('ru');
import { DefaultLocaleConfig, LocaleConfig } from './dat-picker-range.config';

export enum SideEnum {
  left = 'left',
  right = 'right'
}

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss']
})
export class DatePickerRangeComponent implements OnInit {
  // fields
  private _old: { start: any; end: any } = { start: null, end: null };
  chosenLabel: string;
  calendarVariables: { left: any; right: any } = { left: {}, right: {} };
  sideEnum = SideEnum;
  _startDate = moment().startOf('day');
  _endDate = moment().startOf('day');
  chosenRange: string;
  rangesArray: Array<any> = [];
  isShown: boolean = false;
  inline: boolean = false;
  leftCalendar: any = {};
  rightCalendar: any = {};
  showCalInRanges: boolean = false;
  _locale: LocaleConfig = {};

  // inputs
  @Input() dateLimit: number = null;
  @Input() minDate: _moment.Moment = null;
  @Input() maxDate: _moment.Moment = null;
  @Input() autoApply: boolean = false;
  @Input() singleDatePicker: boolean = false;
  @Input() linkedCalendars: boolean = false;
  @Input() autoUpdateInput: boolean = false;
  @Input() alwaysShowCalendars: boolean = false;
  @Input() maxSpan: boolean = false;
  @Input() showRangeLabelOnInput: boolean = false;
  @Input() set startDate(value) {
    if (value) {
      this._startDate = moment(value);
    }
  }
  @Input() set endDate(value) {
    if (value) {
      this._endDate = moment(value);
    }
  }


  // outputs
  @Output('choosedDate') choosedDate: EventEmitter<Object> = new EventEmitter();
  @Output('datesUpdated') datesUpdated: EventEmitter<
    Object
  > = new EventEmitter();
  @Output() canceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('pickerContainer') pickerContainer: ElementRef;

  // customed functions to check dates
  @Input() isInvalidDate(date) {
    return false;
  }
  @Input() isCustomDate(date) {
    return false;
  }

  // config locale
  @Input() set locale(value) {
    this._locale = { ...DefaultLocaleConfig, ...value };
  }
  get locale(): any {
    return this._locale;
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this._buildLocale();
    const daysOfWeek = [...this.locale.daysOfWeek];
    if (this.locale.firstDay !== 0) {
      let iterator = this.locale.firstDay;

      while (iterator > 0) {
        daysOfWeek.push(daysOfWeek.shift());
        iterator--;
      }
    }
    this.locale.daysOfWeek = daysOfWeek;
    this._old.start = moment(this._startDate).clone();
    this._old.end = moment(this._endDate).clone();
    this.updateMonthsInView();
    this.renderCalendar(SideEnum.left);
    this.renderCalendar(SideEnum.right);
  }

  private _buildLocale() {
    this.locale = { ...DefaultLocaleConfig, ...this.locale };
    if (!this.locale.format) {
      this.locale.format = moment.localeData().longDateFormat('L');
    }
  }

  updateMonthsInView() {
    if (this._endDate) {
      // if both dates are visible already, do nothing
      if (
        !this.singleDatePicker &&
        this.leftCalendar.month &&
        this.rightCalendar.month &&
        ((this._startDate &&
          this.leftCalendar &&
          this._startDate.format('YYYY-MM') ===
          this.leftCalendar.month.format('YYYY-MM')) ||
          (this._startDate &&
            this.rightCalendar &&
            this._startDate.format('YYYY-MM') ===
            this.rightCalendar.month.format('YYYY-MM'))) &&
        (this._endDate.format('YYYY-MM') ===
          this.leftCalendar.month.format('YYYY-MM') ||
          this._endDate.format('YYYY-MM') ===
          this.rightCalendar.month.format('YYYY-MM'))
      ) {
        return;
      }
      if (this._startDate) {
        this.leftCalendar.month = this._startDate.clone().date(2);
        if (
          !this.linkedCalendars &&
          (this._endDate.month() !== this._startDate.month() ||
            this._endDate.year() !== this._startDate.year())
        ) {
          this.rightCalendar.month = this._endDate.clone().date(2);
        } else {
          this.rightCalendar.month = this._startDate
            .clone()
            .date(2)
            .add(1, 'month');
        }
      }
    } else {
      if (
        this.leftCalendar.month.format('YYYY-MM') !==
        this._startDate.format('YYYY-MM') &&
        this.rightCalendar.month.format('YYYY-MM') !==
        this._startDate.format('YYYY-MM')
      ) {
        this.leftCalendar.month = this._startDate.clone().date(2);
        this.rightCalendar.month = this._startDate
          .clone()
          .date(2)
          .add(1, 'month');
      }
    }
    if (
      this.maxDate &&
      this.linkedCalendars &&
      !this.singleDatePicker &&
      this.rightCalendar.month > this.maxDate
    ) {
      this.rightCalendar.month = this.maxDate.clone().date(2);
      this.leftCalendar.month = this.maxDate
        .clone()
        .date(2)
        .subtract(1, 'month');
    }
  }

  renderCalendar(side: string) {
    const mainCalendar: any =
      side === SideEnum.left ? this.leftCalendar : this.rightCalendar;
    const month = mainCalendar.month.month();
    const year = mainCalendar.month.year();
    const hour = mainCalendar.month.hour();
    const minute = mainCalendar.month.minute();
    const second = mainCalendar.month.second();
    const daysInMonth = moment([year, month]).daysInMonth();
    const firstDay = moment([year, month, 1]);
    const lastDay = moment([year, month, daysInMonth]);
    const lastMonth = moment(firstDay)
      .subtract(1, 'month')
      .month();
    const lastYear = moment(firstDay)
      .subtract(1, 'month')
      .year();
    const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    const dayOfWeek = firstDay.day();
    // initialize a 6 rows x 7 columns array for the calendar
    const calendar: any = [];
    calendar.firstDay = firstDay;
    calendar.lastDay = lastDay;
    for (let i = 0; i < 6; i++) {
      calendar[i] = [];
    }

    // populate the calendar with date objects
    let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }

    if (dayOfWeek === this.locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }

    let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

    for (
      let i = 0, col = 0, row = 0;
      i < 42;
      i++, col++, curDate = moment(curDate).add(24, 'hour')
    ) {
      if (i > 0 && col % 7 === 0) {
        col = 0;
        row++;
      }
      calendar[row][col] = curDate
        .clone()
        .hour(hour)
        .minute(minute)
        .second(second);
      curDate.hour(12);

      if (
        this.minDate &&
        calendar[row][col].format('YYYY-MM-DD') ===
        this.minDate.format('YYYY-MM-DD') &&
        calendar[row][col].isBefore(this.minDate) &&
        side === 'left'
      ) {
        calendar[row][col] = this.minDate.clone();
      }

      if (
        this.maxDate &&
        calendar[row][col].format('YYYY-MM-DD') ===
        this.maxDate.format('YYYY-MM-DD') &&
        calendar[row][col].isAfter(this.maxDate) &&
        side === 'right'
      ) {
        calendar[row][col] = this.maxDate.clone();
      }
    }

    // make the calendar object available to hoverDate/clickDate
    if (side === SideEnum.left) {
      this.leftCalendar.calendar = calendar;
    } else {
      this.rightCalendar.calendar = calendar;
    }
    //
    // Display the calendar
    //
    const minDate = side === 'left' ? this.minDate : this._startDate;
    let maxDate = this.maxDate;
    // adjust maxDate to reflect the dateLimit setting in order to
    // grey out end dates beyond the dateLimit
    if (this._endDate === null && this.dateLimit) {
      const maxLimit = this._startDate
        .clone()
        .add(this.dateLimit, 'day')
        .endOf('day');
      if (!maxDate || maxLimit.isBefore(maxDate)) {
        maxDate = maxLimit;
      }
    }
    this.calendarVariables[side] = {
      month: month,
      year: year,
      hour: hour,
      minute: minute,
      second: second,
      daysInMonth: daysInMonth,
      firstDay: firstDay,
      lastDay: lastDay,
      lastMonth: lastMonth,
      lastYear: lastYear,
      daysInLastMonth: daysInLastMonth,
      dayOfWeek: dayOfWeek,
      calRows: Array.from(Array(6).keys()),
      calCols: Array.from(Array(7).keys()),
      classes: {},
      minDate: minDate,
      maxDate: maxDate,
      calendar: calendar
    };
    this._buildCells(calendar, side);
  }

  private _buildCells(calendar, side: string) {
    for (let row = 0; row < 6; row++) {
      this.calendarVariables[side].classes[row] = {};
      const rowClasses = [];
      for (let col = 0; col < 7; col++) {
        const classes = [];
        if (col === 0) {
          classes.push('first-in-row');
        }
        if (col === 6) {
          classes.push('last-in-row');
        }
        // highlight today's date
        if (calendar[row][col].isSame(new Date(), 'day')) {
          classes.push('today');
        }
        // highlight weekends
        if (calendar[row][col].isoWeekday() > 5) {
          classes.push('weekend');
        }
        // grey out the dates in other months displayed at beginning and end of this calendar
        if (calendar[row][col].month() !== calendar[1][1].month()) {
          classes.push('off');
        }
        // don't allow selection of dates before the minimum date
        if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day')) {
          classes.push('off', 'disabled');
        }
        // don't allow selection of dates after the maximum date
        if (
          this.calendarVariables[side].maxDate &&
          calendar[row][col].isAfter(
            this.calendarVariables[side].maxDate,
            'day'
          )
        ) {
          classes.push('off', 'disabled');
        }
        // don't allow selection of date if a custom function decides it's invalid
        if (this.isInvalidDate(calendar[row][col])) {
          classes.push('off', 'disabled');
        }
        // highlight the currently selected start date
        if (
          this._startDate &&
          calendar[row][col].format('YYYY-MM-DD') ===
          this._startDate.format('YYYY-MM-DD')
        ) {
          classes.push('active', 'start-date');
        }
        // highlight the currently selected end date
        if (
          this._endDate != null &&
          calendar[row][col].format('YYYY-MM-DD') ===
          this._endDate.format('YYYY-MM-DD')
        ) {
          classes.push('active', 'end-date');
        }
        // highlight dates in-between the selected dates
        if (
          this._endDate != null &&
          calendar[row][col] > this._startDate &&
          calendar[row][col] < this._endDate
        ) {
          classes.push('in-range');
        }
        // apply custom classes for this date
        const isCustom = this.isCustomDate(calendar[row][col]);
        if (isCustom !== false) {
          if (typeof isCustom === 'string') {
            classes.push(isCustom);
          } else {
            Array.prototype.push.apply(classes, isCustom);
          }
        }
        // store classes var
        let cname = '';
        let disabled = false;
        for (let i = 0; i < classes.length; i++) {
          cname += classes[i] + ' ';
          if (classes[i] === 'disabled') {
            disabled = true;
          }
        }
        if (!disabled) {
          cname += 'available';
        }
        this.calendarVariables[side].classes[row][col] = cname.replace(
          /^\s+|\s+$/g,
          ''
        );
      }
      this.calendarVariables[side].classes[row].classList = rowClasses.join(
        ' '
      );
    }
  }

  clickPrev(side: SideEnum) {
    if (side === SideEnum.left) {
      this.leftCalendar.month.subtract(1, 'month');
      if (this.linkedCalendars) {
        this.rightCalendar.month.subtract(1, 'month');
      }
    } else {
      const monthDifference = this.rightCalendar.month.diff(this.leftCalendar.month, 'months', true);
      if (Math.round(monthDifference) > 1) {
        this.rightCalendar.month.subtract(1, 'month');
      }
    }
    this.updateCalendars();
  }

  clickNext(side: SideEnum) {
    if (side === SideEnum.left) {
      const monthDifference = this.rightCalendar.month.diff(this.leftCalendar.month, 'months', true);
      if (Math.round(monthDifference) > 1) {
        this.leftCalendar.month.add(1, 'month');
      }
    } else {
      this.rightCalendar.month.add(1, 'month');
      if (this.linkedCalendars) {
        this.leftCalendar.month.add(1, 'month');
      }
    }
    this.updateCalendars();
  }

  clickDate({ event, side, row, col }) {
    if (event.target.tagName === 'TD') {
      if (!event.target.classList.contains('available') || event.target.classList.contains('off')) {
        return;
      }
    } else if (event.target.tagName === 'SPAN') {
      if (!event.target.parentElement.classList.contains('available') || event.target.parentElement.classList.contains('off')) {
        return;
      }
    }
    const date =
      side === SideEnum.left
        ? this.leftCalendar.calendar[row][col]
        : this.rightCalendar.calendar[row][col];

    if (this._endDate || date.isBefore(this._startDate, 'day')) {
      // picking start
      this._endDate = null;
      this.set_startDate(date.clone());
    } else if (!this._endDate && date.isBefore(this._startDate)) {
      // special case: clicking the same date for start/end,
      // but the time of the end date is before the start date
      this.set_endDate(this._startDate.clone());
    } else {
      // picking end
      this.set_endDate(date.clone());
      if (this.autoApply) {
        this.calculateChosenLabel();
        this.clickApply();
      }
    }
    if (this.singleDatePicker) {
      this.set_endDate(this._startDate);
      if (this.autoApply) {
        this.clickApply();
      }
    }
    this.updateView();
    // This is to cancel the blur event handler if the mouse was in one of the inputs
    event.stopPropagation();
  }

  set_startDate(_startDate) {
    if (typeof _startDate === 'string') {
      this._startDate = moment(_startDate, this.locale.format);
    }
    if (typeof _startDate === 'object') {
      this._startDate = moment(_startDate);
    }
    this._startDate = this._startDate.startOf('day');
    if (this.minDate && this._startDate.isBefore(this.minDate)) {
      this._startDate = this.minDate.clone();
    }
    if (this.maxDate && this._startDate.isAfter(this.maxDate)) {
      this._startDate = this.maxDate.clone();
    }
    this.updateMonthsInView();
  }

  set_endDate(_endDate) {
    if (typeof _endDate === 'string') {
      this._endDate = moment(_endDate, this.locale.format);
    }
    if (typeof _endDate === 'object') {
      this._endDate = moment(_endDate);
    }
    this._endDate = this._endDate
      .add(1, 'day')
      .startOf('day')
      .subtract(1, 'second');
    if (this._endDate.isBefore(this._startDate)) {
      this._endDate = this._startDate.clone();
    }
    if (this.maxDate && this._endDate.isAfter(this.maxDate)) {
      this._endDate = this.maxDate.clone();
    }
    if (
      this.dateLimit &&
      this._startDate
        .clone()
        .add(this.dateLimit, 'day')
        .isBefore(this._endDate)
    ) {
      this._endDate = this._startDate.clone().add(this.dateLimit, 'day');
    }
    this.updateMonthsInView();
  }

  updateView() {
    this.updateMonthsInView();
    this.updateCalendars();
  }

  updateCalendars() {
    this.renderCalendar(SideEnum.left);
    this.renderCalendar(SideEnum.right);
    if (this._endDate === null) {
      return;
    }
    this.calculateChosenLabel();
  }

  /**
   * this should calculate the label
   */
  calculateChosenLabel() {
    if (!this.locale || !this.locale.separator) {
      this._buildLocale();
    }
  }

  clickApply(e?) {
    if (!this.singleDatePicker && this._startDate && !this._endDate) {
      this._endDate = this._startDate.clone();
      this.calculateChosenLabel();
    }
    if (this.isInvalidDate && this._startDate && this._endDate) {
      // get if there are invalid date between range
      let d = this._startDate.clone();
      while (d.isBefore(this._endDate)) {
        if (this.isInvalidDate(d)) {
          this._endDate = d.subtract(1, 'days');
          this.calculateChosenLabel();
          break;
        }
        d.add(1, 'days');
      }
    }
    if (this.chosenLabel) {
      this.choosedDate.emit({
        chosenLabel: this.chosenLabel,
        _startDate: this._startDate,
        _endDate: this._endDate
      });
    }
    this.datesUpdated.emit({
      _startDate: this._startDate,
      _endDate: this._endDate
    });
  }

  clickCancel(e) {
    this._startDate = this._old.start;
    this._endDate = this._old.end;
    if (this.inline) {
      this.updateView();
    }
    this.canceled.emit()
  }

  handleInternalClick(e) {
    e.stopPropagation();
  }

  updateLocale(locale) {
    for (const key in locale) {
      if (locale.hasOwnProperty(key)) {
        this.locale[key] = locale[key];
      }
    }
  }

  clear() {
    this._startDate = moment().startOf('day');
    this._endDate = moment().endOf('day');
    this.choosedDate.emit({ chosenLabel: '', _startDate: null, _endDate: null });
    this.datesUpdated.emit({ _startDate: null, _endDate: null });
  }

  hasCurrentMonthDays(currentMonth, row) {
    for (let day = 0; day < 7; day++) {
      if (row[day].month() === currentMonth) {
        return true;
      }
    }
    return false;
  }
}
