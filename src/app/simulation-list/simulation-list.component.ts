import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SimulationApiService } from '../api-client/simulation-api.service';
import { Simulation } from '../models/simulation';
import { SessionService } from '../session/session.service';
import { SimulationsEmissionsComponent } from '../simulations-emissions/simulations-emissions.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DialogsService } from '../dialogs/dialogs.service';


@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.css']
})
export class SimulationListComponent implements OnInit {

  simulationsShown = []
  total:Number
  pageSize:Number = 10
  pageSizeOptions = [10]

  constructor(
    private _simulationApi:SimulationApiService,
    private _sessionService:SessionService,
    private location: Location,
    private _dialogsService:DialogsService,
    private router:Router
    // private _simEmComp:SimulationsEmissionsComponent
  ) { 

  }

  ngOnInit(): void {
    let params = new HttpParams().set('skip', "0").set('maximum', "10")
    this._simulationApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Simulation= JSON.parse(e)
        this.simulationsShown.push(emiss)
      })
    })
    this._simulationApi.count().subscribe(t =>{
      this.total = Number(t.headers.get("total"))
    })
  }

  viewSimulation(sim){
    // console.log(sim)
    this._sessionService.setSimulationForMap(sim)
    this.router.navigate(['simulation/' + sim._id])
    // this.location.replaceState('simulation/' + sim._id)
  }

  deleteSimulation(sim){
    this._dialogsService.onConfirm("Simulation and all outputs will be deleted. Proceed?", "Delete").subscribe(r=>{
      if(r === true){
        this._simulationApi.deleteWithIdSecured(sim._id).subscribe(resp=>{
          if(resp){
            this._dialogsService.onConfirm("Simulation deleted.", "Continue").subscribe(r=>{
              this.simulationsShown = []
              let params = new HttpParams().set('skip', "0").set('maximum', "10")
              this._simulationApi.getList(params).subscribe(emis=>{
                emis.forEach(e=>{
                  let emiss:Simulation= JSON.parse(e)
                  
                  this.simulationsShown.push(emiss)
                  this.router.navigate(['/'])
                })
              })
              this._simulationApi.count().subscribe(t =>{
                this.total = Number(t.headers.get("total"))
              })
            })
          }
        })
      }
    })
  }

  pageEvent(ev){
    let previousPageIndex = ev.previousPageIndex
    let pageIndex = ev.pageIndex
    let start = pageIndex * 10
    let max = start + 10
    let params = new HttpParams().set('skip', String(start)).set('maximum', String(max))
    this.simulationsShown = []
    this._simulationApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Simulation= JSON.parse(e)
        this.simulationsShown.push(emiss)
      })
    })
  }

}