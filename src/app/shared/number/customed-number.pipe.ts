import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

const map = {
  RUB: 'ru-RU',
};

@Pipe({
  name: 'customedNumber'
})
export class CustomedNumberPipe implements PipeTransform {

  transform(value: any, digitsInfo?: string): any {
    if (value) {
      return formatNumber(value, map.RUB, digitsInfo ? digitsInfo : null);
    } else {
      return value;
    }
  }
}
