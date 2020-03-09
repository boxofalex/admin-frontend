import * as _moment from 'moment';
const moment = _moment;
moment.locale('ru');

export class DateHelper {

  public static createDate(value: string) {
    return moment(value);
  }

  public static getTimeStamp() {
    const timeStamp = moment();
    return timeStamp;
  }

  public static firstDateBeforeSecond(a, b) {
    return moment(a).isBefore(moment(b));
  }

  public static formatDate(date, format) {
    return moment(date).format(format);
  }

  public static differenceIn(startDate, endDate, measure: any = 'days') {
    return moment(endDate).diff(moment(startDate), measure);
  }

  public static add(date, value, measure = 'd') {
    return moment(date).add(value, measure);
  }

  public static randomDateBetween(start, end) {
    const date = moment(start).valueOf() + Math.random() * (moment(end).valueOf() - moment(start).valueOf());
    return moment(date);
  }
}
