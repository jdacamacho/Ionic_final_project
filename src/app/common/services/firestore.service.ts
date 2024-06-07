import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  constructor() { }

  getCollectionChanges<tipo>(path: string){
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }
}
