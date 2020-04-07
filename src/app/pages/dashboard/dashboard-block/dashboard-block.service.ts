import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { DashboardBlockItem } from '@app/models';
import { DatabaseService } from '@app/database';
import { ArrayHelper } from '@shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class DashboardBlockService {
  private _block: BehaviorSubject<any> = new BehaviorSubject(null);
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  public readonly block$: Observable<DashboardBlockItem> = this._block.asObservable();
  public readonly data$: Observable<any> = this._data.asObservable();

  get block() {
    return this._block.value;
  }
  set block(val) {
    this._block.next(val);
  }
  get data() {
    return this._data.value;
  }
  set data(val) {
    this._data.next(val);
  }

  constructor(
    private databaseService: DatabaseService,
  ) { }

  initBlock(block: DashboardBlockItem) {
    this.block = block;
    this.getDataForBlock(this.block);
  }

  getDataForBlock(block: DashboardBlockItem) {
    let request: Observable<any>;
    const { type, range } = block;
    const { startDate, endDate } = range;
    switch (type) {
      case 'sales':
        request = this.databaseService.getOrders([
          { key: 'orderBy', value: ['created'] },
          { key: 'startAt', value: [startDate] },
          { key: 'endAt', value: [endDate] },
        ]);
        break;
      default:
        request = this.databaseService.getOrders();
    }
    request.subscribe(
      response => {
        if (response) {
          this.prepareDataForChart(response);
        }
      }
    );
  }

  prepareDataForChart(data) {
    const preparedData = {
      labels: [],
      dataSet: [],
      type: 'bar',
      legend: true,
      plugins: [],
      options: {
        responsive: true,
      }
    };
    const values = [];
    const bucketSize = 100;
    ArrayHelper.forEach(data, (el, index) => {
      const { amount } = el;
      values.push(amount);
    });
    const sortedValues = values.sort((a, b) => a - b);
    const minValue = 0;
    const maxValue = sortedValues[sortedValues.length - 1];
    const numberOfBuckets = Math.ceil(maxValue / bucketSize);
    let currentValue = minValue;
    let prevValue;
    const dataSet = [];
    while (currentValue <= (numberOfBuckets * bucketSize)) {
      if (currentValue === minValue) {
      } else {
        const foundEls = data.filter(el => el.amount >= prevValue && el.amount <= currentValue);
        preparedData.labels.push(`${prevValue}-${currentValue}`);
        dataSet.push(foundEls.length);
      }
      prevValue = currentValue;
      currentValue = currentValue + bucketSize;
    }
    preparedData.dataSet.push({ data: dataSet, label: 'Продажи' });
    this.data = preparedData;
  }
}
