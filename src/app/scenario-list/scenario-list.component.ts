import { Component, OnInit } from '@angular/core';
import { ScenarioApiService } from '../api-client/scenario-api.service';
import { HttpParams } from '@angular/common/http';
import { Scenario } from '../models/scenario';
import { Subscription } from 'rxjs';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.css']
})
export class ScenarioListComponent implements OnInit {

  scenariosShown:Array<Scenario> = []

  fromMap:Subscription

  constructor(
    private _scenarioApi:ScenarioApiService,
    private _sessionService:SessionService
  ) { 
    this.fromMap = this._sessionService.getScenarioForList().subscribe(em =>{
      // this.scenariosShown.pop()
      this.scenariosShown.unshift(em)
     //  this.emissionsShown.push(em) 
   })

  }

  ngOnInit(): void {
    let params = new HttpParams().set('skip', "0").set('maximum', "10")
    this._scenarioApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Scenario = JSON.parse(e)
        this.scenariosShown.push(emiss)
      })
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
    this._sessionService.setScenarioForMap(sce)
  }


}
