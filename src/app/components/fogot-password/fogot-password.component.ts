import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fogot-password',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './fogot-password.component.html',
  styleUrls: ['./fogot-password.component.scss']
})
export class FogotPasswordComponent {

  email:String=""

}
