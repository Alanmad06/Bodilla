import { Observable } from "rxjs"
import { Person } from "../models/person.model"
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc, updateDoc } from "@angular/fire/firestore"
import { Injectable, inject } from "@angular/core"
import { Storage, StorageReference, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage"
import { getDoc, query, where } from "firebase/firestore"

@Injectable()
export class guestService{


    firestore : Firestore= inject(Firestore)
    guest : Observable<Person[]>
    guests : Observable<Person[]>
    storage: Storage = inject(Storage);

    imageReference: StorageReference;
    collectionReference : CollectionReference

    constructor(){
        this.collectionReference = collection(this.firestore ,'invitados')
       
      this.guests = collectionData(this.collectionReference,{idField : 'id'}) as Observable<Person[]>
    }

    addGuest(person : Person){
        addDoc(this.collectionReference,person)
     }
     getGuests(){
         return this.guests
     }
     addImage(image: any) {
        this.imageReference = ref(this.storage, 'invitados/' + image.name);
        return uploadBytes(this.imageReference, image)
      }
      async getImage(link: string): Promise<string> {
        const ref1 = ref(this.storage, link);
        return getDownloadURL(ref1);
      }

      giveMod(id : string){
        
        let docRef= doc(this.firestore,'invitados',id)
        updateDoc(docRef,{
         moderator : true
       })
      }

      removeMod(id : string){
        
        let docRef= doc(this.firestore,'invitados',id)
        updateDoc(docRef,{
         moderator : false
       })
      }

      createGuest(uid : string){
        const q = query(this.collectionReference, where('idAuth','==',uid))
        this.guest= collectionData(q,{idField : 'id'}) as Observable<Person[]>
        
      }

      getGuest(){
        return this.guest
      }

      
    
}