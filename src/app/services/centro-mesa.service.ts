import { Injectable, inject } from "@angular/core";
import { CollectionReference, Firestore } from "firebase/firestore";

import { Observable } from "rxjs";
import { centroMesa } from "../models/info.model";

@Injectable()
export class centroMesaService{

    firestore: Firestore = inject(Firestore)
    clientes: Observable<centroMesa[]>
    clientesCollection : CollectionReference
    
}