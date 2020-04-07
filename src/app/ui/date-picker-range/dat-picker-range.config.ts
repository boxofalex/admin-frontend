import * as _moment from 'moment';
const moment = _moment;
moment.locale('ru');

export interface LocaleConfig {
  direction?: string;
  separator?: string;
  weekLabel?: string;
  applyLabel?: string;
  cancelLabel?: string;
  customRangeLabel?: string;
  daysOfWeek?: string[];
  monthNames?:  string[];
  firstDay?: number;
  format?: string;
}

export const DefaultLocaleConfig: LocaleConfig = {
  direction: 'ltr',
  separator: ' - ',
  weekLabel: 'W',
  applyLabel: 'Apply',
  cancelLabel: 'Cancel',
  customRangeLabel: 'Custom range',
  daysOfWeek: moment.weekdaysShort(),
  monthNames: moment.months(),
  firstDay: 1,
};
