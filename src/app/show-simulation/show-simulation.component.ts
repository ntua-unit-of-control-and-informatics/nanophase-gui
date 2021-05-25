import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, Event } from '@angular/router';
import { Simulation } from '../models/simulation';
import { SimulationApiService } from '../api-client/simulation-api.service';
import { Location } from '@angular/common';
import { TaskApiService } from '../api-client/task-api.service';
import { HttpParams } from '@angular/common/http';
import { Task } from '../models/task';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GeoJson } from '../models/geojson';


@Component({
  selector: 'app-show-simulation',
  templateUrl: './show-simulation.component.html',
  styleUrls: ['./show-simulation.component.css']
})
export class ShowSimulationComponent implements OnInit {

  showSimulation:boolean = false
  _simulationId:string
  _simulation:Simulation
  _task:Task

  _waterOutput:boolean = false;
  _soilOutput:boolean = false;
  _sedimentOutput:boolean = false;


  _waterOutputDay:Number;
  _soilOutputDay:Number;
  _sedimentOutputDay:Number;

  _selectRender = [];

  selectedRenderValue:String
  uns:Subscription

  autoTicks = true;
  disabled = true;
  invert = false;
  max:Number = 364;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;

  view_output:string

  hide_c:boolean = false;

  // autoTicks = false;
  // disabled = false;
  // invert = false;
  // max = 100;
  // min = 0;
  // showTicks = false;
  // step = 1;
  // thumbLabel = false;
  // value = 0;
  // vertical = false;
  // tickInterval = 1;

  constructor(
    private _sessionService:SessionService,
    private _simulationApi:SimulationApiService,
    private location:Location,
    private _taskApi:TaskApiService,
    private _router:Router,
  ) {

    this._router.events.pipe(filter(e => e instanceof NavigationEnd))
    .subscribe((s: NavigationEnd) => {
      let url = s.url
        if(url.includes('simulation')){
          this.showSimulation = true
          this._simulationId = url.split("/")[url.split("/").length - 1]
          this._simulationApi.getWithIdSecured(this._simulationId).subscribe((sim:Simulation) =>{
            this._simulation = sim
            this._sessionService.setSimulationForMap(sim)
            // console.log(sim)
          })

          let httpParams =  new HttpParams().set('simulation_id', this._simulationId)
          this._taskApi.getOneWithParam(httpParams).subscribe((t:Task)=>{
            this._task = t
            this._task.simulationKeys.forEach(s_key =>{
              if(s_key.split("_")[1] === 'water'){
                this._waterOutput = true;
                this._waterOutputDay = Number(s_key.split("_")[s_key.split("_").length -1])
              }
            })
            this._task.simulationKeys.forEach(s_key =>{
              if(s_key.split("_")[1] === 'soil'){
                this._soilOutput = true;
                this._soilOutputDay = Number(s_key.split("_")[s_key.split("_").length -1])
              }
            })
            this._task.simulationKeys.forEach(s_key =>{
              if(s_key.split("_")[1] === 'sediment'){
                this._sedimentOutput = true;
                this._sedimentOutputDay = Number(s_key.split("_")[s_key.split("_").length -1])
              }
            })
            // console.log(t)
          })
      }else{
        this.showSimulation = false;
      }
    });

    // this.uns = this._sessionService.getShowSimulationsEmissions().subscribe(val=>{
    //   if(val){
    //     if(val === 'true'){
    //       this.showSimulation = true;
    //       this.getSimulationId()
    //     }else if(val === 'false'){
    //       this.showSimulation = false;
    //       this.location.replaceState('/')
    //     }
    //   }
    // })

    // this.uns.unsubscribe()

   }

  ngOnInit(): void {
    // let url = window.location.href
    // if(url.includes('simulation')){
    //   this.showSimulation = true
    //   this._simulationId = url.split("/")[url.split("/").length - 1]
    //   this._simulationApi.getWithIdSecured(this._simulationId).subscribe((sim:Simulation) =>{
    //     this._simulation = sim
    //     this._sessionService.setSimulationForMap(sim)
    //   })

    //   let httpParams =  new HttpParams().set('simulation_id', this._simulationId)
    //   this._taskApi.getOneWithParam(httpParams).subscribe((t:Task)=>{
    //     this._task = t
    //   })
    // }

    // this.uns.unsubscribe()

  }


  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }

  getSimulationId(){
    let url = window.location.href
    if(url.includes('simulation')){
      this.showSimulation = true
      this._simulationId = url.split("/")[url.split("/").length - 1]
      this._simulationApi.getWithIdSecured(this._simulationId).subscribe((sim:Simulation) =>{
        this._simulation = sim
        this._sessionService.setSimulationForMap(sim)
      })

      let httpParams =  new HttpParams().set('simulation_id', this._simulationId)
      this._taskApi.getOneWithParam(httpParams).subscribe((t:Task)=>{
        this._task = t
        this._task.simulationKeys.forEach(s_key =>{
          console.log(s_key.split("_")[1])
          if(s_key.split("_")[1] === 'water'){
            this._waterOutput = true;
            this._waterOutputDay = Number(s_key.split("_")[s_key.split("_").length -1])
          }
        })
        this._task.simulationKeys.forEach(s_key =>{
          if(s_key.split("_")[1] === 'soil'){
            this._soilOutput = true;
            this._soilOutputDay = Number(s_key.split("_")[s_key.split("_").length -1])
          }
        })
        this._task.simulationKeys.forEach(s_key =>{
          if(s_key.split("_")[1] === 'sediment'){
            this._sedimentOutput = true;
            this._sedimentOutputDay = Number(s_key.split("_")[s_key.split("_").length -1])
          }
        })
        // console.log(t)
      })
    }
  }

  onValChange(val){
    this.disabled = false;
    this.view_output = val
    if(val === 'water'){
      this._sessionService.setShowSimulationOutput(val)
      this.max = this._waterOutputDay
      
      let httpPars = new HttpParams().set('id', this._simulationId).set('output_type', this.view_output).set('day', "1")
      this._simulationApi.getOneWithParam(httpPars).subscribe((resp:GeoJson)=>{
        if(resp){
          this._selectRender = []
          for(let key in resp.features[0].properties){
            this._selectRender.push(key)
          }
        }
      })

    }
    if(val === 'soil'){
      this._sessionService.setShowSimulationOutput(val)
      this.max = this._soilOutputDay

      let httpPars = new HttpParams().set('id', this._simulationId).set('output_type', this.view_output).set('day', "1")
      this._simulationApi.getOneWithParam(httpPars).subscribe((resp:GeoJson)=>{
        if(resp){
          this._selectRender = []
          for(let key in resp.features[0].properties){
            this._selectRender.push(key)
          }
        }
      })
    }
    if(val === 'sediment'){
      this._sessionService.setShowSimulationOutput(val)
      this.max = this._sedimentOutputDay
      let httpPars = new HttpParams().set('id', this._simulationId).set('output_type', this.view_output).set('day', "1")
      this._simulationApi.getOneWithParam(httpPars).subscribe((resp:GeoJson)=>{
        if(resp){
          this._selectRender = []
          for(let key in resp.features[0].properties){
            this._selectRender.push(key)
          }
        }
      })
    }
  }

  updateSlider(val){
    if(val === 0){
      val = 1
    }
    let httpPars = new HttpParams().set('id', this._simulationId).set('output_type', this.view_output).set('day', val)
    this._simulationApi.getOneWithParam(httpPars).subscribe(resp=>{
      // console.log(resp)
      this._sessionService.setShowSimsGEOJson(resp)
    })
  }

  setRender(ev){
    // console.log(ev.value)
    this.selectedRenderValue = ev.value
    this._sessionService.setRenderValue(ev.value)
    // this._sessionService.setShowSimsGEOJson(resp)
  }

  hide(){
    this.hide_c = true
  }

  show(){
    this.hide_c = false
  }

}
