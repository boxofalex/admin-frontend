import { OrderItem } from './order-item.model';
import {
  TypeHelper,
  ArrayHelper,
} from '@shared/helpers';
import { FieldConstructor } from '@shared/field-constructor';

export class Order {
  user: string;
  created: string;
  completed: string;
  items: OrderItem[];
  amount: number;

  constructor(data) {
    this.user = TypeHelper.isExist(data.user_id) ? FieldConstructor.from(data, 'user').string() : null;
    this.created = TypeHelper.isExist(data.created) ? FieldConstructor.from(data, 'created').string() : null;
    this.completed = TypeHelper.isExist(data.completed) ? FieldConstructor.from(data, 'completed').string() : null;
    this.items = TypeHelper.isExist(data.items) ? FieldConstructor.from(data, 'items').arrayOf(OrderItem) : [];
    this.amount = this.calculateAmount();
  }

  calculateAmount() {
    if (this.items.length > 0) {
      let amount = 0;
      ArrayHelper.forEach(this.items, (item: OrderItem, index: number) => {
        amount = amount + item.amount;
      });
      return amount;
    }
    return 0;
  }
}
