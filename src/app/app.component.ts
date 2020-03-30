import { environment } from './../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
declare var require: any;
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
var turf = require('@turf/turf');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  map:mapboxgl.Map;

  bounds = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(-0.7158816128126944, 51.554854997301135),// Notio-Dutika coordinates
    new mapboxgl.LngLat(-0.6872141628605277, 51.5663540296205)  // Borio-Anatolika coordinates
  );
  
   draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            polygon: true,
            trash: true
        }
    });

  ngOnInit() {

    (mapboxgl as any).accessToken = environment.mapboxKey;

    this.map = new mapboxgl.Map({
    container: 'map-mapbox', 
    style: 'mapbox://styles/mapbox/streets-v11',
    //style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-0.7008827,51.5626992],
    //zoom: 13,
    maxBounds : this.bounds,  //Restrict map panning to an area
    interactive: false       //Display a non-interactive map
    });

    this.createAndDragMarker(-0.7008827,51.5626992);
    this.map.addControl(this.draw,'top-right');
    this.createAndUpdatePolugon();
  }

  createAndDragMarker(lng:number, lat:number){
    const marker = new mapboxgl.Marker({
      draggable: true
      }).setLngLat([lng, lat])
      .addTo(this.map);

      marker.on('dragend',()=>{
        console.log('Coordinates-> '+marker.getLngLat());
      })
  }
  
   createAndUpdatePolugon() {
     var data,polyCoord; 
      this.map.on('draw.create',()=>{
        data = this.draw.getAll();
        polyCoord = turf.coordAll(data);
        if (data.features.length > 0) {
          console.log('Polygon Created! With coordinates:');
          for (var i = 0; i < polyCoord.length-1; i++) {
            console.log(polyCoord[i]);
          }
        }
      })
      this.map.on('draw.delete',()=>{
        console.log('Polygon Deleted!');
      })
      this.map.on('draw.update',()=>{
        data = this.draw.getAll();
        polyCoord = turf.coordAll(data);
        if (data.features.length > 0) {
          console.log('Polygon Updated! With coordinates:');
          for (var i = 0; i < polyCoord.length-1; i++) {
            console.log(polyCoord[i]);
          }
        }
      })
  }
}
