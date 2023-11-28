import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { recuerdosService } from 'src/app/services/recuerdos.service';

@Component({
  selector: 'app-recuerdos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recuerdos.component.html',
  styleUrls: ['./recuerdos.component.scss']
})
export class RecuerdosComponent implements OnInit {

  image : File 
  recuerdos :string[]=[]
  constructor(private recuerdosService:recuerdosService){

  }

  ngOnInit(){
    this.cargarImagenes()
  }

  upload($event: any) {
    this.image = $event.target.files[0];
    this.recuerdosService.addRecuerdo(this.image).then(i=>{
      console.log("imagen añadida")
      this.cargarImagenes()
    })
  }

  cargarImagenes(){
    this.recuerdosService.getImages().then(images=>{
      this.recuerdos=[]
      images.items.forEach(image=>{
        this.recuerdosService.getImage(image).then(i=>{
          this.recuerdos.push(i)
        })
      })
     })
  }
}
