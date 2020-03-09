import * as _ from 'lodash';

export class NumberHelper {

  public static round(num, precision) {
    return _.round(num, precision);
  }

  public static randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
