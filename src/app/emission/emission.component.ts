import { Component, OnInit, ViewChild } from '@angular/core';
import { Emission } from '../models/emission';
import { EmissionsApiService } from '../api-client/emissions-api.service';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SessionService } from '../session/session.service';
import {MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-emission',
  templateUrl: './emission.component.html',
  styleUrls: ['./emission.component.css']
})
export class EmissionComponent implements OnInit {

  emissionsShown:Array<Emission> = []

  fromMap:Subscription
  // toMap:Subscription
  
  paginator : MatPaginator;
  total:Number;
  pageSize=10;
  pageSizeOptions: number[] = [5, 10, 20];
 
 
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
  }
  pageEvent(event:PageEvent){
    let skip = event.pageIndex * event.pageSize;
    let pSize= event.pageSize.toString();
    let params = new HttpParams().set('skip', skip.toString()).set("maximum", pSize);
    this.emissionsShown.splice(0,this.emissionsShown.length);
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

}
