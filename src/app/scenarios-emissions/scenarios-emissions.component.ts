import { Component, OnInit } from '@angular/core';
import { Emission } from '../models/emission';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-scenarios-emissions',
  templateUrl: './scenarios-emissions.component.html',
  styleUrls: ['./scenarios-emissions.component.css']
})
export class ScenariosEmissionsComponent implements OnInit {

  scenariosEmissions:Array<Emission> = []
  showEmissions:boolean = false;



  constructor(
    private _sessionService:SessionService
  ) { 
    this._sessionService.getShowScenariosEmissions().subscribe(val =>{
      if(val === "true"){
        this.showEmissions = true
      }else if(val === "false"){
        this.showEmissions = false
        this.scenariosEmissions = []
      }
    })
    this._sessionService.getScenariosEmissions().subscribe(em=>{
      let item = this.scenariosEmissions.find(this.findIndexToUpdate, em.id)
      let index = this.scenariosEmissions.indexOf(item);
      if(index < 0){
        this.scenariosEmissions.push(em)
      }else{
        this.scenariosEmissions[index] = em
      }
    })
    this._sessionService.getRemoveFromShownEmissions().subscribe(em=>{
      let item = this.scenariosEmissions.find(this.findIndexToUpdate, em.id)
      let index = this.scenariosEmissions.indexOf(item);
      if(index > -1){
        this.scenariosEmissions.splice(index, 1)
      }
    })

  }

  ngOnInit(): void {
  }

  onRowClicked(ems){
    this._sessionService.setFlyToShownEmissions(ems)
  }

  findIndexToUpdate(item) { 
    return item.id === this;
  }

}
