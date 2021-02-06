import { Component, OnInit } from '@angular/core';
import { Emission } from '../models/emission';
import { EmissionsApiService } from '../api-client/emissions-api.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-emission',
  templateUrl: './emission.component.html',
  styleUrls: ['./emission.component.css']
})
export class EmissionComponent implements OnInit {

  emissionsShown:Array<Emission> = []

  fromMap:Subscription
  // toMap:Subscription

  configured:Subscription

  total:Number
  pageSize:Number = 10
  pageSizeOptions = [10]

  constructor(
    private _emmissionApi:EmissionsApiService,
    private _sessionService:SessionService
  ) {

    this.fromMap = this._sessionService.getEmissionForList().subscribe(em =>{
      //  this.emissionsShown.pop()
       this.emissionsShown.unshift(em)
      //  this.emissionsShown.push(em) 
    })

   }

  ngOnInit(): void {

    // this.configured = this._sessionService.getConfigured().subscribe(c =>{
    //   if(c === 'true'){

    //   }
    // })

    let params = new HttpParams().set('skip', "0").set('maximum', "10")
    this._emmissionApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Emission = JSON.parse(e)
        this.emissionsShown.push(emiss)
      })
    })
    this._emmissionApi.count().subscribe(t=>{
      this.total = Number(t.headers.get('total'))
    })

  }

  onRowClicked(ems){
    this._sessionService.setEmissionForMap(ems)
    this._sessionService.setShowSimulationsEmissions('false')
  }

  pageEvent(ev){
    let pageIndex = ev.pageIndex
    console.log(pageIndex)
    let start = pageIndex * 10
    let max = start + 10
    let params = new HttpParams().set('skip', String(start)).set('maximum', String(max))
    this.emissionsShown = []
    this._emmissionApi.getList(params).subscribe(emis=>{
      emis.forEach(e=>{
        let emiss:Emission = JSON.parse(e)
        this.emissionsShown.push(emiss)
      })
    })
  }

}
