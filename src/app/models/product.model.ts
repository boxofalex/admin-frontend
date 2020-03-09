import { TypeHelper } from '@shared/helpers';
import { FieldConstructor } from '@shared/field-constructor';

export class Product {
  id: string;
  category: string;
  name: string;
  price: number;

  constructor(data) {
    this.id = TypeHelper.isExist(data.id) ? FieldConstructor.from(data, 'id').string() : null;
    this.category = TypeHelper.isExist(data.category) ? FieldConstructor.from(data, 'category').string() : null;
    this.name = TypeHelper.isExist(data.name) ? FieldConstructor.from(data, 'name').string() : null;
    this.price = TypeHelper.isExist(data.price) ? FieldConstructor.from(data, 'price').float() : null;
  }
}
