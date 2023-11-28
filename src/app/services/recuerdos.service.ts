import { inject } from "@angular/core";
import { StorageReference, Storage, uploadBytes, ref, listAll, getDownloadURL } from "@angular/fire/storage";

export class recuerdosService{

    
    storage: Storage = inject(Storage);

  imageReference: StorageReference;


  
  addRecuerdo(image : any){
    this.imageReference = ref(this.storage, 'recuerdos/' + image.name);
    return uploadBytes(this.imageReference, image)

  }

   getImages(){
    this.imageReference = ref(this.storage, 'recuerdos/');
    return listAll(this.imageReference)
   }

   getImage(image:any){
    return getDownloadURL(image)
   }
}