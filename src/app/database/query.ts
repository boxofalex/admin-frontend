export interface QueryItem {
  key: string;
  value: string | any[];
}

export class Query {
  _queries: QueryItem[] = [];

  constructor(queries: QueryItem[]) {
    this._queries = [...this._queries, ...queries];
  }

  add(query: QueryItem) {
    this._queries.push(query);
  }
}
