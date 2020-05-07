import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-emmisions',
  templateUrl: './add-emmisions.component.html',
  styleUrls: ['./add-emmisions.component.css']
})
export class AddEmmisionsComponent implements OnInit {

  feature:any


  nanomaterial:string = "TiO2"
  compartment:string = "Soil"
  form:string = "Pristine"
  temporalProfile:string = "P1"

  constructor() { }

  ngOnInit(): void {
    console.log(this.feature)
  }



}
