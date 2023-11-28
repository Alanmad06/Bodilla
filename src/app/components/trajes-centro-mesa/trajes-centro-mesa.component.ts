import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoviaComponent } from './novia/novia.component';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { trajeService } from 'src/app/services/trajes.service';
import { Traje, centroMesa } from 'src/app/models/info.model';
import { NovioComponent } from './novio/novio.component';
import { CentroMesaComponent } from './centro-mesa/centro-mesa.component';
import { guestService } from 'src/app/services/guests.service';
import { registerService } from 'src/app/services/register.service';
import { User } from '@angular/fire/auth';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-trajes-centro-mesa',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    NovioComponent,
    CentroMesaComponent,
    NoviaComponent,
  ],
  templateUrl: './trajes-centro-mesa.component.html',
  styleUrls: ['./trajes-centro-mesa.component.scss'],
})
export class TrajesCentroMesaComponent {
  @ViewChild('modal') modal: ElementRef;

  Titulo: String = 'Trajes del Novio';
  isNovio: boolean = true;
  isNovia: boolean = false;
  isCentro: boolean = false;

  editarModal: boolean = false;

  image: File | null = null;

  aux = {
    id: '',
    name: '',
    number: 0,
    description: '',
    image: '',
    image_aux: '',
  };

  user : User
  guest : Person ={
    name: "",
    lastname : "",
    moderator: false,
    email: ""
  }
  
  constructor(private router: Router, private trajeService: trajeService, private guestService : guestService, private registerService: registerService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/trajesCentro/novio') {
          this.Titulo = 'Trajes del Novio';
          this.isNovio = true;
          this.isNovia = false;
          this.isCentro = false;
        } else if (event.url === '/trajesCentro/novia') {
          this.Titulo = 'Trajes de la Novia';
          this.isNovio = false;
          this.isNovia = true;
          this.isCentro = false;
        } else {
          this.Titulo = 'Centro de Mesa';
          this.isNovio = false;
          this.isNovia = false;
          this.isCentro = true;
        }
      }
    });

    this.registerService.getAuthState().subscribe(user=>{
      console.log("user", user)
      if(user){
        
      this.user = user
      if(!guestService.getGuest()){
        this.guestService.createGuest(user.uid)
      }
      
      this.guestService.getGuest().subscribe(guest=>{
        if(guest)
        this.guest= guest[0]
      console.log("guest", this.guest)
      })
      }
    })
  }

  openModal() {
    console.log(this.aux);
    this.modal.nativeElement.classList.add('visible');
  }

  closeModal() {
    
          this.editarModal= false
          this.image= null
          this.reset()
    this.modal.nativeElement.classList.remove('visible');
    this.editarModal = false;
  }

  save({ value, valid, form }: NgForm) {
    this.modal.nativeElement.classList.remove('visible');
    if (!valid) {
      alert('Rellene los campos correctamente');
    } else if (value.hora < 0 ) {
      alert('Rellene los campos correctamente');
    } else if (!this.image && !this.editarModal) {
      alert('Favor de agregar una Imagen');
    } else if (!this.editarModal) {
      this.addModal(form);
    } else {
      this.editModal(form);
    }
  }

  delete_({ form }: NgForm) {
    if (this.isNovio) {
      this.trajeService
        .deleteTrajeNovio(this.aux.id)
        .then((data) => {
          console.log('dato eliminado ', data);
         
        })
        .catch((e) => {
          console.log('error al eliminar  ', e);
        });
    } else if (this.isNovia) {
      this.trajeService
        .deleteTrajeNovia(this.aux.id)
        .then((data) => {
          console.log('dato eliminado ', data);
          
        })
        .catch((e) => {
          console.log('error al eliminar  ', e);
        });
    } else if (this.isCentro) {
    }

    this.closeModal();
  }

  upload($event: any) {
    this.image = $event.target.files[0];
  }

  addModal(form: any) {
    if (this.isNovio) {
      console.log(this.image)
      this.editarModal , this.image , form =this.trajeService.añadirTrajeNovio(this.aux,this.image,form,this.editarModal)
      this.reset()
    } else if (this.isNovia) {
      this.editarModal , this.image , form=this.trajeService.añadirTrajeNovia(this.aux,this.image,form,this.editarModal)
      this.reset()
    }
  }

  recibirTraje($event: any) {
    this.editAuxModal($event);
  }
  editAuxModal(aux: any) {
    this.editarModal = true;

    this.aux = { ...aux };
    this.aux.number = aux.coste;

    this.openModal();
  }

  editModal(form: any) {
    if (this.isNovio) {
      this.editarModal , this.image , form=this.trajeService.editarTrajeNovio(this.aux,this.image,form,this.editarModal)
      this.reset()
    } else if (this.isNovia) {
     this.editarModal , this.image, form=this.trajeService.editarTrajeNovia(this.aux,this.image,form,this.editarModal)
     this.reset()
    } else if (this.isCentro) {
      let centro: centroMesa = {
        name: this.aux.name,
        description: this.aux.description,
        coste: this.aux.number,
        image: this.aux.image,
        image_aux: this.aux.image_aux,
      };
    }
  }

  reset() {
    this.aux = {
      id: '',
      name: '',
      number: 0,
      description: '',
      image: '',
      image_aux: '',
    };
  
  }
}
