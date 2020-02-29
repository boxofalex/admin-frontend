import * as _moment from 'moment';
const moment = _moment;
moment.locale('ru');

export class DateHelper {

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
}
