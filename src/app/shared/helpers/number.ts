import * as _ from 'lodash';

export class NumberHelper {

  public static round(num, precision) {
    return _.round(num, precision);
  }
}
