// import { environment } from environment
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { SessionService } from '../session/session.service';
import { Subscription } from 'rxjs';
import { SheetsService } from '../bottom-sheets/sheets-services.service';
import { EmissionsApiService } from '../api-client/emissions-api.service';
import { Emission } from '../models/emission';
import { DialogsService } from '../dialogs/dialogs.service';
import { Scenario } from '../models/scenario';
import { ScenarioApiService } from '../api-client/scenario-api.service';
declare var require: any;
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
var turf = require('@turf/turf');

@Component({
  selector: 'app-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.css']
})
export class BaseMapComponent implements OnInit {

  map:mapboxgl.Map;

  isEnabled:boolean = false;
  subscription:Subscription;

  fromList:Subscription

  fromScenarioList:Subscription

  saveScenario:boolean = false

  draws: any //mapboxgl..MapboxGeoJSONFeature

  bounds = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(-1.390769, 51.291669),// Notio-Dutika coordinates
    new mapboxgl.LngLat(0.734746, 51.806683)  // Borio-Anatolika coordinates
  );
  
   draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            polygon: true,
            point:true,
        }
    });

    constructor(private _oidcService:OidcSecurityService
      , public sessionService:SessionService,
      public bottomSheet:SheetsService,
      private _emissionsApi:EmissionsApiService,
      private _dialogsService:DialogsService,
      private _scenarioApi:ScenarioApiService){

    }

    ngOnInit() {
      (mapboxgl as any).accessToken = environment.mapboxKey;
      let theme = this.sessionService.get('theme')
      if(theme === "default-theme" ||  !theme){
        let mapStyle = 'mapbox://styles/mapbox/light-v9'
        this.map = new mapboxgl.Map({
          container: 'map-mapbox', 
          style: mapStyle,
          // center: [-0.7008827,51.5626992],
          maxBounds : this.bounds,  //Restrict map panning to an area 
          interactive: true      //Display a non-interactive map
          });
          this._oidcService.isAuthenticated$.subscribe(
            (isAuthorized: boolean) => {
              if(isAuthorized === true && this.isEnabled === false){
                this.map.addControl(this.draw,'top-right');
                this.map.addControl(new mapboxgl.NavigationControl());
                this.createAndUpdatePolugon();
                this.isEnabled = true
              }else if(isAuthorized === false && typeof this.map != 'undefined'){
                this.isEnabled = false
              }
            });
      }
      if(theme === "dark-theme"){
        let mapStyle = 'mapbox://styles/mapbox/dark-v9'
        this.map = new mapboxgl.Map({
          container: 'map-mapbox', 
          style: mapStyle,
          // center: [-0.7008827,51.5626992],
          maxBounds : this.bounds,  //Restrict map panning to an area 
          interactive: true      //Display a non-interactive map
          });
          this._oidcService.isAuthenticated$.subscribe(
            (isAuthorized: boolean) => {
              if(isAuthorized === true && this.isEnabled === false){
                this.map.addControl(this.draw,'top-right');
                this.map.addControl(new mapboxgl.NavigationControl());
                this.createAndUpdatePolugon();
                this.isEnabled = true
              }else if(isAuthorized === false && typeof this.map != 'undefined'){
                this.isEnabled = false
              }
            });
      }
      this.subscription = this.sessionService
      .getTheme().subscribe(theme => {
        if(theme.data === "default-theme"){
          let mapStyle = 'mapbox://styles/mapbox/light-v9'
          this.map.setStyle(mapStyle) 
        }

        if(theme.data === "dark-theme"){
          let mapStyle = 'mapbox://styles/mapbox/dark-v9'
          this.map.setStyle(mapStyle) 
        }

      })

      this.fromList = this.sessionService
      .getEmissionForMap().subscribe((em:Emission) => {
        if(em){
          this.draw.add(em)
          this.checkSaveScenario()
          if(em.geometry.type === "Polygon"){
            this.map.flyTo(
              {center:
                [
                  em.geometry.coordinates[0][1][0],
                  em.geometry.coordinates[0][1][1]
                ]
                , essential: true})
          }else{
            this.map.flyTo(
              {
                center: [
                  em.geometry.coordinates[0],
                  em.geometry.coordinates[1]
                ],
                essential: true
              }
            )
          }
        }
      })

      this.fromScenarioList = this.sessionService
      .getScenarioForMap().subscribe((scen:Scenario) => {
        console.log(scen)
        this.draw.deleteAll()
        if(scen){
          scen.emissions.forEach((emId:string)=>{
            this._emissionsApi.getWithIdSecured(emId).subscribe((em:Emission)=>{
              this.draw.add(em)
              this.checkSaveScenario()
            })
          })
        }
      })
      
      this.featureSelection()
      this.onUpdate()
    }   

  public onStyleLoad(){
    this.map.on('style.load', () => {
      const waiting = () => {
        if (this.map.isStyleLoaded()) {
          setTimeout(waiting, 200);
        } else {
          this.loadLayer();
        }
      };
      waiting();
    });
  }

 public loadLayer(){
  this.map.addSource('scenario', { type: 'geojson', data: this.draws })
 }

  createAndUpdatePolugon() {
    this.map.on('draw.create',()=>{
      this.draws = this.draw.getAll();
    })

  }

  onUpdate(){
    this.map.on('draw.update',(f)=>{ 
      console.log(f)
      let emi = f.features[0]
      this._emissionsApi.putEntitySecured(emi).subscribe((em:Emission)=>{
        let item = this.draws.features.find(this.findIndexToUpdate, em.id)
        let index = this.draws.features.indexOf(item);
        this.draws.features[index] = em
        this.draw.add(em)
        this.checkSaveScenario()
      })
    })
  }

  featureSelection(){
    this.map.on('draw.selectionchange',(f)=>{
      if(f.features.length > 0){
        const sheet = this.bottomSheet.addEmissions(f.features[0])
        sheet.subscribe(res =>{
          if(typeof res === 'undefined' && typeof f.features[0].properties != 'undefined'){
            if(f.features[0].properties['saved'] != true){
              this.draw.delete(f.features[0].id)
              this.checkSaveScenario()
            }
          }
          else if(typeof res != 'undefined' && res.save === false && f.features[0].properties['saved'] != true){
            this.draw.delete(f.features[0].id)
            this.checkSaveScenario()
          }else if(typeof res != 'undefined' && res.save === true){

            if(res.properties.saved != true){
              let emis:Emission = {}
              emis.properties = res.properties
              emis.geometry = res.geometry
              emis.id = res.id
              emis.properties.date = Date.now();
              emis.type = res.type
              this._emissionsApi.post(emis).subscribe((em:Emission)=>{
                let item = this.draws.features.find(this.findIndexToUpdate, em.id)
                let index = this.draws.features.indexOf(item);
                this.draws.features[index] = em
                this.draw.add(em)
                this.sessionService.setEmissionForList(em)
                this.checkSaveScenario()
              })
            }else if(typeof res != 'undefined' && res.properties.saved === true){
              this._emissionsApi.putEntitySecured(res).subscribe((em:Emission)=>{
                let item = this.draws.features.find(this.findIndexToUpdate, em.id)
                let index = this.draws.features.indexOf(item);
                this.draws.features[index] = em
                this.draw.add(em)
                this.checkSaveScenario()
              })
            }
          }else if(typeof res != 'undefined' &&  res.save === "delete"){
            this._emissionsApi.deleteWithIdSecured(f.features[0].id).subscribe(r=>{
              if(r){
                this.draw.delete(f.features[0].id)
                this.checkSaveScenario()
              }
            })
          }else if( typeof res != 'undefined' && res.save === "remove"){
            this.draw.delete(f.features[0].id)
            this.checkSaveScenario()
          }
          else if(typeof res != 'undefined' && res.save != false && res.properties.saved === true){
            let emis:Emission = {}
            emis.properties = res.properties
            emis.geometry = res.geometry
            emis.id = res.id
            emis.properties.date = Date.now();
            this._emissionsApi.putEntitySecured(emis).subscribe((em:Emission) =>{
              let item = this.draws.features.find(this.findIndexToUpdate, em.id)
              let index = this.draws.features.indexOf(item);
              this.draws.features[index] = em
              this.draw.add(em)
              this.checkSaveScenario()
            })
          }
        })
      }
    })
  }


  checkSaveScenario(){
    let data = this.draw.getAll()
    if(data.features.length > 0){
      this.saveScenario = true
    }else if(data.features.length === 0){
      this.saveScenario = false
    }
  }

  onSaveScenario(){
    this._dialogsService.onSaveScenario().subscribe(res=>{
      let data = this.draw.getAll()
      let scenario:Scenario = {}
      scenario.emissions = []
      data.features.forEach(element => {
        scenario.emissions.push(element.id)
      });
      scenario.date = Date.now()
      scenario.title = res['title']
      scenario.description = res['description']

      this._scenarioApi.post(scenario).subscribe((res:Scenario) =>{
        this.sessionService.setScenarioForList(res)
      })
      this.saveScenario = false;
    })
  }


  findIndexToUpdate(item) { 
    return item.id === this;
  }


}