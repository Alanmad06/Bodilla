import { Injectable, inject } from "@angular/core";


import { Observable } from "rxjs";
import { Traje } from "../models/info.model";
import { addDoc, collection, collectionData, deleteDoc, doc, getDoc, setDoc, updateDoc, CollectionReference, Firestore } from "@angular/fire/firestore";
import { Storage,StorageReference, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";
import { NgForm } from "@angular/forms";

@Injectable()
export class trajeService{

    
    
    firestore: Firestore = inject(Firestore);
    storage: Storage = inject(Storage);
    
    imageReference: StorageReference;
    trajeNovio: Observable<Traje[]>;
    trajeNovia: Observable<Traje[]>
    TrajeCollectionNovio: CollectionReference;
    TrajeCollectionNovia: CollectionReference;
  
    constructor() {
      this.TrajeCollectionNovio = collection(this.firestore, 'trajes-novio');
      this.TrajeCollectionNovia = collection(this.firestore, 'trajes-novia');
      this.trajeNovio = collectionData(this.TrajeCollectionNovio,{idField : 'id'}) as Observable<Traje[]>;
      this.trajeNovia = collectionData(this.TrajeCollectionNovia,{idField : 'id'}) as Observable<Traje[]>;
    }
  
    getTrajesNovio() {
      return this.trajeNovio;
    }
    getTrajesNovia() {
        return this.trajeNovia;
      }
  
    addTrajeNovio(traje: Traje) {
      traje.image =
        'gs://mikeswedding-3ea42.appspot.com/trajes/novio/' + traje.image;
  
      addDoc(this.TrajeCollectionNovio, traje);
    }
    addTrajeNovia(traje: Traje) {
        traje.image =
          'gs://mikeswedding-3ea42.appspot.com/trajes/novia/' + traje.image;
    
        addDoc(this.TrajeCollectionNovia, traje);
      }

  
    editTrajeNovio(traje : Traje){
      traje.image =
      'gs://mikeswedding-3ea42.appspot.com/trajes/novio/' + traje.image;
          let docRef= doc(this.firestore,'trajes-novio',traje.id!)
          setDoc(docRef,traje)
          
    }
    editTrajeNovia(traje : Traje){
        traje.image =
        'gs://mikeswedding-3ea42.appspot.com/trajes/novio/' + traje.image;
            let docRef= doc(this.firestore,'trajes-novia',traje.id!)
            setDoc(docRef,traje)
            
      }
    
  
    updateTrajeNovio(traje : Traje){
      let docRef= doc(this.firestore,'trajes-novio',traje.id!)
       updateDoc(docRef,{
        name: traje.name,
        coste : traje.coste,
        description : traje.description
      })
    }

    updateTrajeNovia(traje : Traje){
        let docRef= doc(this.firestore,'trajes-novia',traje.id!)
         updateDoc(docRef,{
          name: traje.name,
          coste : traje.coste,
          description : traje.description
        })
      }
  
     async getTrajeNovio(id : string){
      let docRef= doc(this.firestore,'trajes-novio',id)
      return await getDoc(docRef)
      
  
    }

    async getTrajeNovia(id : string){
        let docRef= doc(this.firestore,'trajes-novia',id)
        return await getDoc(docRef)
        
    
      }
    
    deleteTrajeNovio(id : string){
      let docRef= doc(this.firestore,'trajes-novio',id)
       return deleteDoc(docRef)
  
    }
    deleteTrajeNovia(id : string){
        let docRef= doc(this.firestore,'trajes-novia',id)
         return deleteDoc(docRef)
    
      }
  
  
    addImageNovio(image: File) {
    console.log("IMAGEN ",image)
      this.imageReference = ref(this.storage, 'trajes/novio/' + image.name);
      return uploadBytes(this.imageReference, image)
    }
    addImageNovia(image: any) {
    
      this.imageReference = ref(this.storage, 'trajes/novia/' + image.name);
      return uploadBytes(this.imageReference, image)
    }
  
    async getImage(link: string): Promise<string> {
      const ref1 = ref(this.storage, link);
      return getDownloadURL(ref1);
    }

    editarTrajeNovia(aux: any , image : File | null, form : NgForm , edit : boolean){
      let traje: Traje = {
        id: aux.id,
        name: aux.name,
        description: aux.description,
        coste: aux.number,
        image: aux.image,
        image_aux: aux.image_aux,
      };
      console.log('editandodo');
      if (image) {
        this.addImageNovia(image).then((data) => {
          if (data) {
            console.log('imagen enviada');

            traje.image = image!.name;

            this
              .getImage(
                'gs://mikeswedding-3ea42.appspot.com/trajes/novia/' +
                  traje.image
              )
              .then((imageaux) => {
                traje.image_aux = imageaux;
                this.editTrajeNovia(traje);
                return edit = false , image = null , this.reset(form)
              })
              .catch((e) => {
                console.log('Error al Editar un Traje de la Novia:', e);
              })
              .catch((e) => {
                console.log(
                  'Error al Subir Imagen del Traje de la Novia:',
                  e
                );
              });
          }
        });
      } else {
        this.updateTrajeNovia(traje);
        return edit = false , image = null , this.reset(form)
              
        
      }
      return null
    }

    editarTrajeNovio(aux: any , image : File | null, form : NgForm , edit : boolean){
      let traje: Traje = {
        id: aux.id,
        name: aux.name,
        description: aux.description,
        coste: aux.number,
        image: aux.image,
        image_aux: aux.image_aux,
      };
      console.log('editandodo');
      if (image) {
        this.addImageNovio(image).then((data) => {
          if (data) {
            console.log('imagen enviada');

            traje.image = image!.name;

            this
              .getImage(
                'gs://mikeswedding-3ea42.appspot.com/trajes/novio/' +
                  traje.image
              )
              .then((imageaux) => {
                traje.image_aux = imageaux;
                this.editTrajeNovio(traje);
                return edit = false , image = null , this.reset(form)
              })
              .catch((e) => {
                console.log('Error al Editar un Traje del Novio:', e);
              })
              .catch((e) => {
                console.log(
                  'Error al Subir Imagen de la Edicion del Traje del Novio:',
                  e
                );
              });
          }
        });
      } else {
        this.updateTrajeNovio(traje);
        return edit = false , image = null , this.reset(form)
              
        
      }
      return null
    }

     añadirTrajeNovio(aux:any , image : File | null , form : NgForm , edit : boolean) {
      let traje: Traje = {
        name: aux.name,
        description: aux.description,
        coste: aux.number,
        image: aux.image,
        image_aux: aux.image_aux,
      };
      this
        .addImageNovio(image!)
        .then((data) => {
          if (data) {
            console.log("ADD :", image)
            traje.image = image!.name;
            this
              .getImage(
                'gs://mikeswedding-3ea42.appspot.com/trajes/novio/' +
                  traje.image
              )
              .then((imageaux) => {
                traje.image_aux = imageaux;
                this.addTrajeNovio(traje);
                
                return edit = false , image = null , this.reset(form)
              })
              .catch((e) => {
                console.log('Error al añadir un Traje del Novio:', e);
              });
          }
        })
        .catch((e) => {
          console.log('Error Subir Imagen del Traje del Novio:', e);
        });
        return null
    }

    añadirTrajeNovia(aux:any , image : File | null , form : NgForm , edit : boolean){
      let traje: Traje = {
        name: aux.name,
        description: aux.description,
        coste: aux.number,
        image: aux.image,
        image_aux: aux.image_aux,
      };
      this
        .addImageNovia(image)
        .then((data) => {
          if (data) {
            traje.image = image!.name;
            this
              .getImage(
                'gs://mikeswedding-3ea42.appspot.com/trajes/novia/' +
                  traje.image
              )
              .then((imageaux) => {
                traje.image_aux = imageaux;
                this.addTrajeNovia(traje);
                
                return edit = false , image = null , this.reset(form)
              })
              .catch((e) => {
                console.log('Error al añadir un Traje para la Novia:', e);
              });
          }
        })
        .catch((e) => {
          console.log('Error Subir Imagen del Traje de la Novia:', e);
        });
        return null
        
    }

    

    reset(form: NgForm){
      return form.reset()
      
    }
}