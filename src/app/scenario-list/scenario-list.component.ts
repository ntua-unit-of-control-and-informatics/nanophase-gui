import { Component, OnInit } from '@angular/core';
import { ScenarioApiService } from '../api-client/scenario-api.service';
import { HttpParams } from '@angular/common/http';
import { Scenario } from '../models/scenario';
import { Subscription } from 'rxjs';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.css']
})
export class ScenarioListComponent implements OnInit {

  scenariosShown:Array<Scenario> = []

  fromMap:Subscription

  configured:Subscription

  total:Number
  pageSize:Number = 10
  pageSizeOptions = [10]

  constructor(
    private _scenarioApi:ScenarioApiService,
    private _sessionService:SessionService,
    private _router:Router
  ) { 
    this.fromMap = this._sessionService.getScenarioForList().subscribe(em =>{
      // this.scenariosShown.pop()
      this.scenariosShown.unshift(em)
     //  this.emissionsShown.push(em) 
   })
  }

  ngOnInit(): void {
    // this.configured = this._sessionService.getConfigured().subscribe(c =>{
    //   if(c === 'true'){

    //   }
    // })
    let params = new HttpParams().set('skip', "0").set('maximum', "10")
    this._scenarioApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Scenario = JSON.parse(e)
        this.scenariosShown.push(emiss)
      })
    })
    this._scenarioApi.count().subscribe(t =>{
      this.total = Number(t.headers.get("total"))
    })
  }

  deleteScenario(sce:Scenario){
    this._scenarioApi.deleteWithIdSecured(sce._id).subscribe(res=>{
      this.scenariosShown = []
      let params = new HttpParams().set('skip', "0").set('maximum', "10")
      this._scenarioApi.getList(params).subscribe(emis=>{
        emis.forEach(e=>{
          let emiss:Scenario = JSON.parse(e)
          this.scenariosShown.unshift(emiss)
          this._sessionService.setEmissionForMap(null)
        })
      })
    })
  }

  viewScenario(sce){
    this._router.navigate(['/'])
    this._sessionService.setScenarioForMap(sce)
  }

  pageEvent(ev){
    let pageIndex = ev.pageIndex
    console.log(pageIndex)
    let start = pageIndex * 10
    let max = start + 10
    let params = new HttpParams().set('skip', String(start)).set('maximum', String(max))
    this.scenariosShown = []
    this._scenarioApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Scenario = JSON.parse(e)
        this.scenariosShown.push(emiss)
      })
    })
  }

}