import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() side;
  @Input() date;
  @Input() calendarData;
  @Input() locale;
  @Output() clickprev: EventEmitter<string> = new EventEmitter();
  @Output() clicknext: EventEmitter<string> = new EventEmitter();
  @Output() clickdate: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickPrev() {
    this.clickprev.emit(this.side);
  }

  clickNext() {
    this.clicknext.emit(this.side);
  }

  clickDate(event, row, col) {
    this.clickdate.next({ event, row, col, side: this.side })
  }
}
