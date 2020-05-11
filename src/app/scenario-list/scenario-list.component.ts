import { Component, OnInit,ViewChild } from '@angular/core';
import { ScenarioApiService } from '../api-client/scenario-api.service';
import { HttpParams } from '@angular/common/http';
import { Scenario } from '../models/scenario';
import { Subscription } from 'rxjs';
import { SessionService } from '../session/session.service';
import {MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.css']
})
export class ScenarioListComponent implements OnInit {

  scenariosShown:Array<Scenario> = []

  fromMap:Subscription

  paginator : MatPaginator;
  total:Number;
  pageSize=10;
  pageSizeOptions: number[] = [5, 10, 20];
 

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
    this._scenarioApi.count().subscribe(t=>{
      this.total = Number(t.headers.get('total'))
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
  pageEvent(event:PageEvent){
    let skip = event.pageIndex * event.pageSize;
    let pSize= event.pageSize.toString();
    let params = new HttpParams().set('skip', skip.toString()).set('maximum', pSize);
    this.scenariosShown.splice(0,this.scenariosShown.length);
    this._scenarioApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Scenario = JSON.parse(e)
        this.scenariosShown.push(emiss)
      })
    })
    this._scenarioApi.count().subscribe(t=>{
      this.total = Number(t.headers.get('total'))
    })
  }

}
