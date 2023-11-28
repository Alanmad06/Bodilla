import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Traje } from 'src/app/models/info.model';
import { trajeService } from 'src/app/services/trajes.service';


@Component({
  selector: 'app-novio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './novio.component.html',
  styleUrls: ['./novio.component.scss']
})
export class NovioComponent implements OnInit {

@Output() sendTraje = new EventEmitter<Traje>

trajes: Traje[] =[]

constructor(private trajeService:trajeService){
  
}

ngOnInit(){
this.trajeService.getTrajesNovio().subscribe(trajes=>{
  this.trajes=trajes
  
})}

 editTraje(traje : Traje){
  
  this.sendTraje.emit(traje)

 }
}
