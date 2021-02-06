import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Emission } from '../models/emission';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simulations-emissions',
  templateUrl: './simulations-emissions.component.html',
  styleUrls: ['./simulations-emissions.component.css']
})
export class SimulationsEmissionsComponent implements OnInit {

  showEmissions:boolean = false;
  simulationsEmissions:Array<Emission> = []

  hide_c:boolean = false;

  // emissions:Subscription
  // emissions2:Subscription

  constructor(    
    private _sessionService:SessionService
    ) { 
      this._sessionService.getShowSimulationsEmissions().subscribe(val =>{
        if(val === "true"){
          this.showEmissions = true
        }else if(val === "false"){
          this.showEmissions = false
          this.simulationsEmissions = []
        }
      })
      this._sessionService.getSimulationsEmissions().subscribe(em=>{
        if(em){
          let item = this.simulationsEmissions.find(this.findIndexToUpdate, em.id)
          let index = this.simulationsEmissions.indexOf(item);
          if(index < 0){
            this.simulationsEmissions.push(em)
          }else{
            this.simulationsEmissions[index] = em
          }
        }else{
          this.simulationsEmissions = []
        }
      })
    }

  ngOnInit(): void {

  }

  findIndexToUpdate(item) { 
    return item.id === this;
  }

  onRowClicked(ems){
    this._sessionService.setFlyToShownEmissions(ems)
  }

  hide(){
    this.hide_c = true
  }

  show(){
    this.hide_c = false
  }

}