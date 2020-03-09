import { Injectable } from '@angular/core';
import { FirebaseService } from '@app/firebase/firebase.service';
import { Observable } from 'rxjs';
import { Product } from '@app/models';
import { map } from 'rxjs/operators';
import { QueryItem } from '@app/database';

@Injectable()
export class DatabaseService {

  constructor(
    private firebaseService: FirebaseService,
  ) { }

  getProducts(queries: QueryItem[] = []): Observable<any> {
    return this.firebaseService.getDocumentsFromCollection('products', queries).pipe(map(data => data.map(el => new Product(el))));
  }

  getProduct(productId: string): Observable<any> {
    return this.firebaseService.getDocumentFromCollection('products', productId).pipe(map(data => new Product(data)));
  }

  getOrders(queries: QueryItem[] = []): Observable<any> {
    return this.firebaseService.getDocumentsFromCollection('orders', queries);
  }

  getCategories(queries: QueryItem[] = []): Observable<any> {
    return this.firebaseService.getDocumentsFromCollection('categories', queries);
  }
}
