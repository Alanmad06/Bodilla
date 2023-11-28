import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Person } from 'src/app/models/person.model';
import { registerService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { guestService } from 'src/app/services/guests.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  Password:string = ""
  Cpassword:string = ""
  equalpassword:boolean=false

  constructor(private registerService : registerService, private router : Router , private guestService : guestService){

  }
  
  persona:Person ={
    name:"",
    lastname:"",
    email:"",
    image: 'gs://mikeswedding-3ea42.appspot.com/invitados/default.jpeg',
    assistance:false,
    moderator : false
  }

  signUpGoogle(): void {
  
  }

  see(){
    console.log("asistencia", this.persona.assistance)
  }

  registrarse({valid} : NgForm){
    if(this.Password!==this.Cpassword){
      alert("Las contraseñas deben coincidir")
      
      
    }
    else if(!valid){
      alert("Favor de rellenar los campos correctamente")
    }else{
      this.registerService.register(this.persona.email,this.Password).then(userCredential=>{
        console.log("user Credential" , userCredential)
        this.persona.idAuth= userCredential.user.uid
        this.guestService.getImage(this.persona.image!).then((image)=>{
          this.persona.image_aux = image
          this.guestService.addGuest(this.persona)
          this.guestService.createGuest(this.persona.idAuth!)
          
         this.router.navigate(['/'])
        }).catch(e=>{
          console.log("Error al obtener Imagen Default del Invitado")
        })
        
      }).catch(e=>{
        console.log("error al registrarse ",e)
      })
    }
  }
}
