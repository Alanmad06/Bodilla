import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { loginService } from 'src/app/services/login.service';
import { guestService } from 'src/app/services/guests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:string =""
  password:string =""

  constructor(private loginService : loginService, private guestService : guestService , private router: Router){

    
  }

  logInGoogle(){
    
  }

  logIn({valid}:NgForm){
    if(!valid){
alert("Rellenar los campos correctamente")
    }else{
      this.loginService.login(this.email, this.password).then(userCredential=>{
        this.guestService.createGuest(userCredential.user.uid)
        this.router.navigate(['/'])
      })
    }

  }
}
