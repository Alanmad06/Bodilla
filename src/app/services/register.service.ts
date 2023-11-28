import { Injectable, inject } from "@angular/core";
import { Auth, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "@angular/fire/auth";
import { BehaviorSubject, Observable } from "rxjs";
import { Person } from "../models/person.model";
import { CollectionReference, Firestore, addDoc, collection, collectionData, getDoc } from "@angular/fire/firestore";
import { guestService } from "./guests.service";

@Injectable()
export class registerService{

    

    
     auth : Auth = inject(Auth)
     authStateSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
     person : Person 

    constructor(private guestService: guestService){

      this.onAuthStateChange();
      
      
    }

    login(user :string , password:string){
        return signInWithEmailAndPassword(this.auth,user,password)
    }

    logout(){
        this.auth.signOut()
    }
    
    register(user :string , password:string){
      return createUserWithEmailAndPassword(this.auth,user,password)
      
  }

    private onAuthStateChange(): void {
      onAuthStateChanged(this.auth, (user) => {
        console.log("User register ",user)
        this.authStateSubject.next(user)
        if(user){
        this.guestService.createGuest(user.uid)
      }
      
      });
    }
    
    
     getAuthState(): BehaviorSubject<User | null> {
     return this.authStateSubject;
    }
      
   

    



    

}