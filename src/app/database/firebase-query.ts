import {
  Query,
  QueryItem,
} from './query';
import {
  CollectionReference,
  Query as FireQuery,
  QueryFn,
} from '@angular/fire/firestore';
import { ArrayHelper } from '@shared/helpers';

export class FirebaseQuery extends Query {

  constructor(queries) {
    super(queries);
  }

  getQuery(): QueryFn {
    if (this._queries.length > 0) {
      return (collectionRef: CollectionReference) => {
        let createdQuery: FireQuery = collectionRef;
        ArrayHelper.forEach(this._queries, (query: QueryItem) => {
          const { key, value: currentValue } = query;
          if (key === 'where') {
            const [fieldPath, opStr, value] = currentValue;
            createdQuery = createdQuery.where(fieldPath, opStr, value);
          }
          if (key === 'orderBy') {
            const [field] = currentValue;
            createdQuery = createdQuery.orderBy(field);
          }
          if (key === 'startAt') {
            const [value] = currentValue;
            createdQuery = createdQuery.startAt(value);
          }
          if (key === 'endAt') {
            const [value] = currentValue;
            createdQuery = createdQuery.endAt(value);
          }
        });
        return createdQuery;
      };
    }
    return (collectionRef: CollectionReference) => collectionRef;
  }
}
