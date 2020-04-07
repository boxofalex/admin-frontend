import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import {
  map,
} from 'rxjs/operators';
import { QueryItem } from '@app/database';
import { FirebaseQuery } from '@app/database/firebase-query';
import 'firebase/firestore';

@Injectable()
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getDocumentsFromCollection(collectionName: string, queries: QueryItem[]) {
    const query = new FirebaseQuery(queries).getQuery();
    return this.firestore.collection(collectionName, query).get().pipe(
      map((response: QuerySnapshot<any>) => this.handleQuerySnapshot(response))
    );
  }

  getDocumentFromCollection(collectionName: string, docId: string) {
    return this.firestore.collection(collectionName).doc(docId).get().pipe(
      map(this.handleDoc)
    );
  }

  addDocumentToCollection(collectionName: string, value) {
    return this.firestore.collection(collectionName).add(value);
  }

  handleQuerySnapshot(querySnapshot: QuerySnapshot<any>) {
    const arrayOfData = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<any>) => {
      const docData = this.handleDoc(doc);
      arrayOfData.push(docData);
    });
    return arrayOfData;
  }

  handleDoc(doc: QueryDocumentSnapshot<any>): any {
    const { id } = doc;
    const docData = doc.data();
    return {
      id,
      ...docData,
    };
  }
}
