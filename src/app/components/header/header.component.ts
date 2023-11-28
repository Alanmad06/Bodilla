import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { loginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
@Input()isHome:boolean = false;

constructor(private loginService : loginService){

}

logOut(){
  this.loginService.logOut()
}

 }
