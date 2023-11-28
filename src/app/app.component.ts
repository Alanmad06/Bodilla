import { Component, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HomeComponent,FooterComponent,HeaderComponent,
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHome: boolean = false;
  isLogin : boolean = false;

  constructor(private route: ActivatedRoute , private router : Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      console.log(event)
      if (event instanceof NavigationEnd) {
        
        if(event.url==="/" ){
          this.isHome=true;
        }else if(event.url==="/login"){
          this.isLogin=true;
        }
        else{
          this.isHome=false
          
        }
      }
    });
  }
 
}
