import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-run-simulation',
  templateUrl: './run-simulation.component.html',
  styleUrls: ['./run-simulation.component.css']
})
export class RunSimulationComponent implements OnInit {

  title:string = ""
  description:string = ""
  startDate:string 
  addpbpk:boolean = false

  pbpkDays:Number = 365

  constructor(
    public dialModalRef: MatDialogRef<RunSimulationComponent>
  ) {  }

  ngOnInit(): void {
    this.changePosition()
  }

  changePosition() {
    this.dialModalRef.updatePosition({ bottom: '85px', right: '95px' });
  }


  public toggle(event: MatSlideToggleChange) {
    // console.log('toggle', event.checked);
    this.addpbpk = event.checked;
  }


  onSave(){
    let meta = {}
    meta['title'] = this.title
    meta['description'] = this.description
    meta['startDate'] = this.startDate
    meta['addpbpk'] = this.addpbpk
    meta['pbpkDays'] = this.pbpkDays
    this.dialModalRef.close(meta)
  }



}
