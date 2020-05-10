import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-save-scenario',
  templateUrl: './save-scenario.component.html',
  styleUrls: ['./save-scenario.component.css']
})
export class SaveScenarioComponent implements OnInit {

  title:string = ""
  description:string = ""

  constructor(
    public dialModalRef: MatDialogRef<SaveScenarioComponent>
  ) { }

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
    this.dialModalRef.close(meta)
  }


}
