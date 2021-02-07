import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-run-simulation',
  templateUrl: './run-simulation.component.html',
  styleUrls: ['./run-simulation.component.css']
})
export class RunSimulationComponent implements OnInit {

  title:string = ""
  description:string = ""
  startDate:string 

  constructor(
    public dialModalRef: MatDialogRef<RunSimulationComponent>
  ) {  }

  ngOnInit(): void {
    this.changePosition()
  }

  changePosition() {
    this.dialModalRef.updatePosition({ bottom: '85px', right: '95px' });
  }

  onSave(){
    let meta = {}
    meta['title'] = this.title
    meta['description'] = this.description
    meta['startDate'] = this.startDate
    this.dialModalRef.close(meta)
  }

}
