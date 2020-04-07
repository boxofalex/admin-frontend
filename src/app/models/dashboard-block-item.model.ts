import {
  TypeHelper,
} from '@shared/helpers';
import { FieldConstructor } from '@shared/field-constructor';

export class DashboardBlockItem {
  id: string;
  format: string;
  name: string;
  range: any;
  type: string;

  constructor(data) {
    this.id = TypeHelper.isExist(data.id) ? FieldConstructor.from(data, 'id').string() : null;
    this.format = TypeHelper.isExist(data.format) ? FieldConstructor.from(data, 'format').string() : null;
    this.name = TypeHelper.isExist(data.name) ? FieldConstructor.from(data, 'name').string() : null;
    this.range = TypeHelper.isExist(data.range) ? FieldConstructor.from(data, 'range').any() : null;
    this.type = TypeHelper.isExist(data.type) ? FieldConstructor.from(data, 'type').string() : null;
  }
}
