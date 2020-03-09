import { TypeHelper } from '@shared/helpers';
import { FieldConstructor } from '@shared/field-constructor';

export class OrderItem {
  product: string;
  quantity: number;
  amount: number;

  constructor(data) {
    this.product = TypeHelper.isExist(data.product) ? FieldConstructor.from(data, 'product').string() : null;
    this.quantity = TypeHelper.isExist(data.quantity) ? FieldConstructor.from(data, 'quantity').float() : null;
    this.amount = TypeHelper.isExist(data.amount) ? FieldConstructor.from(data, 'amount').float() : 0;
  }
}
