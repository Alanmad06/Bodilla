import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import {
  collectionData,
  collection,
  Firestore,
  CollectionReference,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Menu } from '../models/info.model';
import {
  Storage,
  StorageReference,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable()
export class menuService {
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  imageReference: StorageReference;
  menu: Observable<Menu[]>;
  menuCollection: CollectionReference;

  constructor() {
    this.menuCollection = collection(this.firestore, 'menu');
    this.menu = collectionData(this.menuCollection,{idField : 'id'}) as Observable<Menu[]>;
  }

  getMenu() {
    return this.menu;
  }

  addDish(platillo: Menu) {
    platillo.image =
      'gs://mikeswedding-3ea42.appspot.com/menu/' + platillo.image;

    addDoc(this.menuCollection, platillo);
  }

  editDish(platillo : Menu){
    platillo.image =
    'gs://mikeswedding-3ea42.appspot.com/menu/' + platillo.image;
        let docRef= doc(this.firestore,'menu',platillo.id!)
        setDoc(docRef,platillo)
        
  }

  updateDish(platillo : Menu){
    let docRef= doc(this.firestore,'menu',platillo.id!)
     updateDoc(docRef,{
      name: platillo.name,
      hour : platillo.hour,
      description : platillo.description
    })
  }

   async getDish(id : string){
    let docRef= doc(this.firestore,'menu',id)
    return await getDoc(docRef)
    

  }
  
  deleteDish(id : string){
    let docRef= doc(this.firestore,'menu',id)
     return deleteDoc(docRef)

  }


  addImage(image: any) {
    this.imageReference = ref(this.storage, 'menu/' + image.name);
    return uploadBytes(this.imageReference, image)
  }

  async getImage(link: string): Promise<string> {
    const ref1 = ref(this.storage, link);
    return getDownloadURL(ref1);
  }

  añadir(){
    
  }
}
