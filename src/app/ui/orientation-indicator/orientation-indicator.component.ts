import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { ObjectHelper } from '@shared/helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orientation-indicator',
  templateUrl: './orientation-indicator.component.html',
  styleUrls: ['./orientation-indicator.component.scss']
})
export class OrientationIndicatorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() position;
  indicatorPosition;
  subscriptions: Subscription = new Subscription();

  constructor(private chDef: ChangeDetectorRef) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.position.currentValue !== changes.position.previousValue) {
      this.subscriptions.add(
        changes.position.currentValue
          .subscribe(_changes => {
            if (
              ObjectHelper.convetObjToString(_changes.connectionPair) !==
              ObjectHelper.convetObjToString(this.indicatorPosition)
            ) {
              this.indicatorPosition = { ..._changes.connectionPair };
              this.chDef.detectChanges();
            }
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
