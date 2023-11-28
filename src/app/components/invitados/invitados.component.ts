import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from 'src/app/models/person.model';
import { guestService } from 'src/app/services/guests.service';
import { registerService } from 'src/app/services/register.service';
import { User } from 'firebase/auth';

import { ExcelService } from 'src/app/services/excel.service';


@Component({
  selector: 'app-invitados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitados.component.html',
  styleUrls: ['./invitados.component.scss']
})
export class InvitadosComponent {

  invitados : Person[]=[]
  user : User
  guest : Person

  constructor(private guestService: guestService , private registerService : registerService ,private excelService : ExcelService){
    this.guestService.getGuests().subscribe(invitados=>{
      this.invitados = invitados
      console.log(this.invitados)
    })
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
      })
      }
    })
   
  }

  giveMod(invitado : Person){
 console.log(this.guest)
    if(this.guest.moderator){
      if(!invitado.moderator){
      this.guestService.giveMod(invitado.id!)
      }else{
        this.guestService.removeMod(invitado.id!)
      }
    }
    
  }

  toExcel(){
    console.log("ola")
    let confirmGuest = this.invitados.filter(x=>x.assistance==true).map(x=>{
      return { name: x.name, lastname: x.lastname }
    })
    console.log("ola",confirmGuest)
this.excelService.exportAsExcelFile(confirmGuest,"Invitados Confirmados")
  }

  
}
