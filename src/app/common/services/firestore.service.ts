import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

const {v4: uuidv4 } = require('uuid');
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

  createDocument(data: any, path:string){
    const document = doc(this.firestore,path);
    return setDoc(document,data);
  }

  createDocumentID(data: any, path:string, idDoc:string){
    const document = doc(this.firestore,`${path}/${idDoc}`);
    return setDoc(document,data);
  }

  async updateDocumentID(data: any, path:string, idDoc:string){
    const document = doc(this.firestore,`${path}/${idDoc}`);
    return updateDoc(document,data);
  }

  deleteDocumentID(path: string, idDoc: string){
    const document = doc(this.firestore,`${path}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: any){
    return deleteDoc(ref);
  }

  createIdDoc(){
    return uuidv4();
  }


}
