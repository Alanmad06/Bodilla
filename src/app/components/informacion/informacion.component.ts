import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule ,GoogleMapsModule],
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent {

  center: google.maps.LatLngLiteral = {lat: 20.65974, lng: -103.34808} ;
  zoom = 8;
  display: google.maps.LatLngLiteral;

  moveMap(event: google.maps.MapMouseEvent) {
    if(!event.latLng)return
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if(!event.latLng)return
    this.display = event.latLng.toJSON();
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
};
markerPositions: google.maps.LatLngLiteral[] = [{lat: 20.65974, lng: -103.34808}];

}
