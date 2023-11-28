import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Traje } from 'src/app/models/info.model';
import { trajeService } from 'src/app/services/trajes.service';


@Component({
  selector: 'app-novia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './novia.component.html',
  styleUrls: ['./novia.component.scss']
})
export class NoviaComponent {

  @Output() sendTraje = new EventEmitter<Traje>

  trajes: Traje[] =[]

constructor(private trajeService:trajeService){
  
}

 ngOnInit(){
this.trajeService.getTrajesNovia().subscribe(trajes=>{
  this.trajes=trajes
  
})}

 editTraje(traje : Traje){
  
  this.sendTraje.emit(traje)

 }
}
