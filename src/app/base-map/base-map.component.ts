// import { environment } from environment
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { SessionService } from '../session/session.service';
import { Observable, Subscription, of } from 'rxjs';
import { SheetsService } from '../bottom-sheets/sheets-services.service';
import { EmissionsApiService } from '../api-client/emissions-api.service';
import { Emission } from '../models/emission';
import { GeoFeature, GeoJson } from '../models/geojson';
import { DialogsService } from '../dialogs/dialogs.service';
import { Scenario } from '../models/scenario';
import { ScenarioApiService } from '../api-client/scenario-api.service';
import { Simulation } from '../models/simulation';
import { SimulationApiService } from '../api-client/simulation-api.service';
import { DatePipe } from '@angular/common';
declare var require: any;
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
var turf = require('@turf/turf');
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import {GridLayer} from '@deck.gl/aggregation-layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Geometry } from '../models/geometry';
import { ThrowStmt } from '@angular/compiler';


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

  flyTo:Subscription

  fromScenarioList:Subscription

  showSimulationFor: Subscription

  saveScenario:boolean = false

  scenarioOnScreen:boolean = false

  simulationsEmissions:boolean = false;

  simulationType:string = ""

  renderValue:string
  
  draws: any //mapboxgl..MapboxGeoJSONFeature

  objectHovered: any

  elevationNumder:Number = 10000000000

  podValue:Number = 0

  bounds = new mapboxgl.LngLatBounds(
    new mapboxgl.LngLat(-3.94, 50.30),// Dutika-Notio coordinates
    new mapboxgl.LngLat(1.92, 52.64)  // Anatolika-Borio coordinates
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
      private _scenarioApi:ScenarioApiService, private _simulationApi:SimulationApiService, public datepipe: DatePipe){
        
    }

    ngOnInit() {
      (mapboxgl as any).accessToken = environment.mapboxKey;
      let theme = this.sessionService.get('theme')
      if(theme === "default-theme" ||  !theme){
        let mapStyle = 'mapbox://styles/mapbox/light-v9'
        this.map = new mapboxgl.Map({
          container: 'map-mapbox', 
          style: mapStyle,
          maxBounds : this.bounds,  
          interactive: true     
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
          maxBounds : this.bounds, 
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
      if(theme === "green-theme"){
        let mapStyle = 'mapbox://styles/mapbox/outdoors-v11'
        this.map = new mapboxgl.Map({
          container: 'map-mapbox', 
          style: mapStyle,
          // center: [-0.7008827,51.5626992],
          maxBounds : this.bounds,  
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

        if(theme.data === "green-theme"){
          let mapStyle = 'mapbox://styles/mapbox/outdoors-v11'
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
                , essential: true, zoom: 9})
          }else{
            this.map.flyTo(
              {
                center: [
                  em.geometry.coordinates[0],
                  em.geometry.coordinates[1]
                ],
                essential: true, zoom: 9
              }
            )
          }
        this.scenarioOnScreen =false;
        this.checkSaveScenario()
        }
      })

      this.flyTo = this.sessionService
      .getFlyToShownEmissions().subscribe((em:Emission) => {
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
        this.draw.deleteAll()
        if(scen){
          this.sessionService.setShowScenariosEmissions("true")
          scen.emissions.forEach((emId:string)=>{
            this._emissionsApi.getWithIdSecured(emId).subscribe((em:Emission)=>{
              this.draw.add(em)
              this.sessionService.setScenariosEmissions(em)
            })
          })
          this.scenarioOnScreen = true;
          this.checkSaveScenario()
        }
      })
      
      this.sessionService.getShowSimulationsEmissions().subscribe(val=>{
        if(val){
          if(val === 'false'){
            this.simulationsEmissions = false;
            this.map.setPitch(0);
            if(this.map.getLayer('scatter')){
              this.map.removeLayer('scatter')
            }
            
          }else if(val === 'true'){
            this.simulationsEmissions = true;
            this.map.setPitch(45);
            this.sessionService.getRenderValue().subscribe(val =>{
              if(val){
                this.renderValue = val
              }
            })
          }
        }
      })


      this.sessionService.getElevation().subscribe((elev:Number) =>{

        if(elev){
          this.elevationNumder = elev
        }
      })


      this.sessionService.getPodVal().subscribe((pod:Number) =>{
        if(pod > 0){
          this.podValue = pod
        }
      })

      this.featureSelection()
      this.onUpdate()

      this.sessionService.getShowSimulationOutput().subscribe((type:string)=>{
        this.simulationType = type
      })
    
      this.sessionService.getShowSimsGEOJson().subscribe((data:GeoJson) =>{
        // for(let i in data.features){
        //   var geofeature:GeoFeature = data.features[i]
        //   var newgf:GeoFeature = <GeoFeature>{};
        //   var geom:Geometry = <Geometry>{};
        //   newgf.properties = geofeature.properties
        //   newgf.geometry = geom;
        //   newgf.geometry.type = "Polygon";
        //   newgf.geometry.coordinates = [[[geofeature.geometry.coordinates[0] - 0.02, geofeature.geometry.coordinates[1] - 0.018]
        //   ,[geofeature.geometry.coordinates[0] - 0.02, geofeature.geometry.coordinates[1] + 0.02]
        //   ,[geofeature.geometry.coordinates[0] + 0.03, geofeature.geometry.coordinates[1] + 0.02]
        //   ,[geofeature.geometry.coordinates[0] + 0.03, geofeature.geometry.coordinates[1] - 0.018]
        //   ,[geofeature.geometry.coordinates[0] - 0.02, geofeature.geometry.coordinates[1] - 0.018]]]
        //   data.features[i] = newgf
        // }
        this.sessionService.getRenderValue().subscribe(val =>{
          if(val){
            this.renderValue = val
          }
        })
        this.setLayers(this.map, data, this.podValue)
        // console.log(data)
      })
  
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
      let emi = f.features[0]
      this._emissionsApi.putEntitySecured(emi).subscribe((em:Emission)=>{
        let item = this.draws.features.find(this.findIndexToUpdate, em.id)
        let index = this.draws.features.indexOf(item);
        this.draws.features[index] = em
        this.draw.add(em)
        this.scenarioOnScreen = false;
        this.checkSaveScenario()
        // this.scenarioOnScreen = false;
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
              this.scenarioOnScreen = false;
              this.checkSaveScenario()
            }
          }
          else if(typeof res != 'undefined' && res.save === false && f.features[0].properties['saved'] != true){
            this.draw.delete(f.features[0].id)
            this.scenarioOnScreen = false;
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
                this.scenarioOnScreen = false;
                this.checkSaveScenario()
              })
            }else if(typeof res != 'undefined' && res.properties.saved === true){
              this._emissionsApi.putEntitySecured(res).subscribe((em:Emission)=>{
                let item = this.draws.features.find(this.findIndexToUpdate, em.id)
                let index = this.draws.features.indexOf(item);
                this.draws.features[index] = em
                this.draw.add(em)
                this.scenarioOnScreen = false;
                this.checkSaveScenario()
              })
            }
          }else if(typeof res != 'undefined' &&  res.save === "delete"){
            this._emissionsApi.deleteWithIdSecured(f.features[0].id).subscribe(r=>{
              if(r){
                this.draw.delete(f.features[0].id)
                this.scenarioOnScreen = false;
                this.checkSaveScenario()
              }
            })
          }else if( typeof res != 'undefined' && res.save === "remove"){
            this.draw.delete(f.features[0].id)
            this.scenarioOnScreen = false;
            this.checkSaveScenario()
            this.sessionService.setRemoveFromShownEmissions(f.features[0])
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
              this.scenarioOnScreen = false;
              this.checkSaveScenario()
            })
          }
        })
      }
    })
  }

  checkSaveScenario(){
    let data = this.draw.getAll()
    if(data.features.length > 0 && this.scenarioOnScreen === false){
      this.saveScenario = true
      this.sessionService.setShowScenariosEmissions("true")
      data.features.forEach((elem:Emission) => {
        this.sessionService.setScenariosEmissions(elem)
      });
    }else if(this.scenarioOnScreen === true){
      this.sessionService.setShowScenariosEmissions("true")
      this.saveScenario = false
      data.features.forEach((elem:Emission) => {
        this.sessionService.setScenariosEmissions(elem)
      });
    }else if(data.features.length === 0){
      this.sessionService.setShowScenariosEmissions("false")
      this.saveScenario = false
    }
  }

  onSaveScenario(){
    this._dialogsService.onSaveScenario().subscribe(res=>{
      if(res){
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
          this.scenarioOnScreen = true;
        })
        this.saveScenario = false;        
      }
    })
  }

  onRunScenario(){
    this._dialogsService.onRunSimulation().subscribe(res=>{
      if(res){
        let data = this.draw.getAll()
        let simulation:Simulation = {}
        simulation.emissions = []
        data.features.forEach(element => {
          simulation.emissions.push(element.id)
        });
        simulation.date = Date.now()
        simulation.title = res['title']
        simulation.description = res['description']
        simulation.startDate =  this.datepipe.transform(res['startDate'], 'yyyy-MM-dd')
        simulation.pbpk = res['addpbpk']
        simulation.pbpkDays = res['pbpkDays']

        this._simulationApi.post(simulation).subscribe((res:Simulation) =>{
          console.log(res)
        })
        // this.scenarioOnScreen = false;        
      }
    })
  }

  findIndexToUpdate(item) { 
    return item.id === this;
  }



  setLayers(m: mapboxgl.Map, data: any, podVal: Number) {
    const layer = m.getLayer('scatter')
    if (!!layer) {
      m.removeLayer('scatter')
    }

    
    const COLOR_SCALE = [
      // negative

    
      // positive
      [128, 0, 38],
      [189, 0, 38],
      [227, 26, 28],
      [252, 78, 42],
      [254, 178, 76],
      [253, 141, 60],
      [254, 217, 118],
      [255, 237, 160],
      [255, 255, 204],
      

      [65, 182, 196],
      [127, 205, 187],
      [199, 233, 180],
      [237, 248, 177],


    ];

    const scatter = new MapboxLayer({
      id: 'scatter',
      type: GeoJsonLayer,
      data,
      opacity: 0.4,
      filled: true,
      stroked: false,
      extruded: true,
      wireframe: true,
      pickable: true,
      autoHighlight: true,
      elevationScale: 1,
      getElevation: f => f.properties[this.renderValue] * Number(this.elevationNumder),
      // getFillColor: f => [160, 40, 40, f.properties[this.renderValue] * 10000000000],
      getFillColor: f => colorScale(f.properties[this.renderValue], podVal),
      getLineColor: [100, 100, 100],

      onClick: ({ object, x, y }) => {
        this._dialogsService.onShowOutput(object, x, y, this.simulationType)
    }
    });

    function colorScale(x, podVal) {
      // if()
      if(podVal == 0){
        return [160, 40, 40, x * 10000000000]
      }else{
        const i = Math.floor(Math.log10(Math.abs(x)) + 1 );
        // console.log(podVal)
        // console.log("BEFORE")
        // console.log(x)
        x = podVal - x 
        // console.log("AFTER")
        // console.log(x)
        if (x < 0) {
          // console.log(i)
          // const i = Math.round( Math.abs(x) * 10000000) + 4;
          const j = Math.floor(Math.log10(Math.abs(x)) + 4 )
          
          // console.log(Math.abs(j))

          return COLOR_SCALE[Math.abs(j)] || COLOR_SCALE[0];
        }
        // console.log(i)
        return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
      }

    }

    m.addLayer(scatter);
  }

  useAsInput(){
    console.log(this.objectHovered)
  }



}
