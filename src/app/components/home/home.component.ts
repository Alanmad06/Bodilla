import { Component, isSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 
  targetDate: Date;
  months: number = 0;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds:number =0;
  
  constructor(private router:Router,private route : ActivatedRoute){
 
    this.targetDate = new Date("2024-11-01T00:00:00");

  
    setInterval(() => {
      const currentDate: Date = new Date();
      const timeDifference: number = this.targetDate.getTime() - currentDate.getTime();
      this.months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
      this.days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24)));
      this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      this.minutes = Math.floor((timeDifference % (1000 * 60 * 60) / (1000 * 60)));
      this.seconds = Math.floor((timeDifference % (1000 * 60 ) / (1000 )));
    }, 1000);
  }
  
  ngOnInit() {
  
  }
  
}
