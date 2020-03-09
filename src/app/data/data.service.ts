import { Injectable } from '@angular/core';
import {
  PRODUCTS,
  WORKING_HOURS,
  PREPARING_TIME_RANGE,
  PRODUCTS_PER_ORDER_RANGE,
  ORDERS_PER_DAY_RANGE,
  PRODUCTS_RANGE,
} from './';
import {
  Order,
  OrderItem,
  Product,
} from '@app/models';
import {
  DateHelper,
  NumberHelper,
  ArrayHelper,
} from '@shared/helpers';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  products = PRODUCTS.map(product => new Product(product));
  productNumber = this.products.length;

  constructor(private firestore: AngularFirestore) {
  }

  createOrders(
    start_date: string,
    end_date: string
  ) {
    let orders = [];
    const diffDays = DateHelper.differenceIn(start_date, end_date, 'days');
    for (let i = 0; i <= diffDays; i++) {
      const date = DateHelper.add(start_date, i);
      const formatedDate = DateHelper.formatDate(date, 'YYYY-MM-DDTHH:mm:ss');
      const ordersForDay = this.createOrdersForDate(formatedDate);
      orders = [...orders, ...ordersForDay];
    }
    return orders;
  }

  createOrdersForDate(date: string): Order[] {
    const orders = [];
    const numberOfOrders = NumberHelper.randomIntFromInterval(ORDERS_PER_DAY_RANGE.min, ORDERS_PER_DAY_RANGE.max);
    for (let i = 0; i < numberOfOrders; i++) {
      const order = this.createOrder(date);
      orders.push(order);
    }
    return orders;
  }

  createOrder(date: string) {
    const numberWorkingHours = WORKING_HOURS.endTime - WORKING_HOURS.startTime;
    const closingTime = DateHelper.formatDate(DateHelper.add(date, numberWorkingHours, 'h'), 'YYYY-MM-DDTHH:mm:ss');
    const orderCreatedTime = DateHelper.formatDate(DateHelper.randomDateBetween(date, closingTime), 'YYYY-MM-DDTHH:mm:ss');
    const orderPreparationTime = NumberHelper.randomIntFromInterval(PREPARING_TIME_RANGE.min, PREPARING_TIME_RANGE.max);
    const orderCompletionTime = DateHelper.formatDate(DateHelper.add(orderCreatedTime, orderPreparationTime, 'm'), 'YYYY-MM-DDTHH:mm:ss');

    const orderTemplate = {
      user: null,
      created: orderCreatedTime,
      completed: orderCompletionTime,
      items: [],
    };

    const numberOfOrderItems = NumberHelper.randomIntFromInterval(PRODUCTS_PER_ORDER_RANGE.min, PRODUCTS_PER_ORDER_RANGE.max);
    for (let i = 0; i < numberOfOrderItems; i++) {
      const orderItem = this.createOrderItem();
      if (orderItem) {
        orderTemplate.items.push(orderItem);
      }
    }
    const newOrder = new Order(orderTemplate);
    return newOrder;
  }

  createOrderItem(): OrderItem {
    const productIndex = NumberHelper.randomIntFromInterval(0, this.productNumber - 1);
    const product: Product = this.products[productIndex];
    const productQuantity = NumberHelper.randomIntFromInterval(PRODUCTS_RANGE.min, PRODUCTS_RANGE.max);
    const orderItemAmount = product.price * productQuantity;
    const orderItemTemplate = {
      product: product.product,
      quantity: productQuantity,
      amount: orderItemAmount,
    };
    return new OrderItem(orderItemTemplate);
  }

  addOrdersToDB(orders: Order[]) {
    ArrayHelper.forEach(orders, (order: Order) => {
      const { user, created, completed, amount, items } = order;
      const itemsObject = [];
      ArrayHelper.forEach(items, (item: OrderItem, index: number) => {
        const { product, quantity, amount } = item;
        itemsObject.push({
          product,
          quantity,
          amount,
        });
      });
      this.firestore.collection('orders').add({
        user,
        created,
        completed,
        amount,
        items: itemsObject,
      }).then(response => { });
    });
  }
}
