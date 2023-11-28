import {
  Component,
  ElementRef,
  HostListener,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu } from 'src/app/models/info.model';
import { menuService } from 'src/app/services/menu.service';
import { FormsModule, NgForm } from '@angular/forms';
import { forkJoin, map, mergeMap, toArray } from 'rxjs';
import { User } from '@angular/fire/auth';
import { Person } from 'src/app/models/person.model';
import { registerService } from 'src/app/services/register.service';
import { guestService } from 'src/app/services/guests.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
@Injectable()
export class MenuComponent implements OnInit {
  menu: Menu[] = [];
  editarModal: boolean = false;
  menu_modal: Menu = {
    name: '',
    description: '',
    image_aux: '',
    image: '',
    hour: 0,
  };         
  user : User
  guest : Person ={
    name: "",
    lastname : "",
    moderator: false,
    email: ""
  }
  

  image: File | null = null;

  @ViewChild('modal') modal: ElementRef;

  constructor(private menuService: menuService, private registerService: registerService, private guestService : guestService) {

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

  ngOnInit() {
    this.menuService.getMenu().subscribe((menu) => {
      console.log("menu",menu)
      this.menu = menu;
    });
  }

  editar(platillo: Menu) {
    this.editarModal = true;
    console.log(platillo)
    this.menu_modal = { ...platillo };

    this.openModal();
  }

  formatHour(hour: number): string {
    const formattedHour = `${hour < 10 ? '0' : ''}${hour}:00`;
    return formattedHour;
  }

  openModal() {
    
    console.log(this.image);
    this.modal.nativeElement.classList.add('visible');
  }

  closeModal() {
    this.modal.nativeElement.classList.remove('visible');
    this.editarModal = false;
  }
  save({ value, valid, form }: NgForm) {
    this.modal.nativeElement.classList.remove('visible');
    if (!valid) {
      alert('Rellene los campos correctamente');
    } else if (value.hora < 0 && value.hora > 24) {
      alert('Rellene los campos correctamente');
    } else if (!this.image && !this.editarModal) {
      alert('Favor de agregar una Imagen');
    } else if (!this.editarModal) {
      this.menuService
        .addImage(this.image)
        .then((data) => {
          if (data) {
            this.menu_modal.image = this.image!.name;
            this.menuService
              .getImage(
                'gs://mikeswedding-3ea42.appspot.com/menu/' +
                  this.menu_modal.image
              )
              .then((i) => {
                this.menu_modal.image_aux = i;

                this.menuService.addDish(this.menu_modal);
                this.reset(form);
              })
              .catch((e) => {
                console.log('Error al Editar un Platillo:', e);
              });
          }
        })
        .catch((e) => {
          console.log('Error Subir Imagen del nuevo Platillo:', e);
        });
    } else {
      if (this.image) {
        this.menuService.addImage(this.image).then((data) => {
          if (data) {
            console.log('imagen enviada');

            this.menu_modal.image = this.image!.name;

            this.menuService
              .getImage(
                'gs://mikeswedding-3ea42.appspot.com/menu/' +
                  this.menu_modal.image
              )
              .then((i) => {
                this.menu_modal.image_aux = i;
                this.menuService.editDish(this.menu_modal);
                this.reset(form);
              })
              .catch((e) => {
                console.log('Error al Editar un Platillo:', e);
              })
              .catch((e) => {
                console.log(
                  'Error al Subir Imagen de la Edicion del Platillo:',
                  e
                );
              });
          }
        });
      } else {
        this.menuService.updateDish(this.menu_modal);
        this.reset(form);
      }
    }
  }
  upload($event: any) {
    this.image = $event.target.files[0];
  }

  delete_(form: NgForm) {
    this.menuService
      .deleteDish(this.menu_modal.id!)
      .then((data) => {
        console.log('dato eliminado', data);
        this.reset(form);
      })
      .catch((e) => {
        console.log('error al eliminar ', e);
      });
    this.closeModal();
  }

  reset(form: any) {
    this.image = null;
    form.reset();
    this.editarModal = false;
  }
}
