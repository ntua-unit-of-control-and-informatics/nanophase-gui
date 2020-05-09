import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

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
  title:string;
  description:string;
  save:boolean = false

  emission:string;

  constructor(
    private thisSheetRef: MatBottomSheetRef<AddEmmisionsComponent>
  ) { }

  ngOnInit(): void {
   
  }


  onSave(){
    // this.feature.properties['nanomaterial'] = this.nanomaterial
    // this.feature.properties['compartment'] = this.compartment
    // this.feature.properties['form'] = this.form
    // this.feature.properties['temporalProfile']= this.temporalProfile
    // this.feature.properties['title'] = this.title
    // this.feature.properties['description'] = this.description
    // this.feature.properties['emission'] = Number(this.emission)
    this.feature['save'] = true
    this.thisSheetRef.dismiss(this.feature)
    // this.thisSheetRef.
  }

  onCancel(){
    // this.feature.properties['nanomaterial'] = this.nanomaterial
    // this.feature.properties['compartment'] = this.compartment
    // this.feature.properties['form'] = this.form
    // this.feature.properties['temporalProfile']= this.temporalProfile
    // this.feature.properties['title'] = this.title
    // this.feature.properties['description'] = this.description
    // this.feature.properties['emission'] = Number(this.emission)
    this.feature['save'] = false
    this.thisSheetRef.dismiss(this.feature)
    // return this.thisSheetRef.
  }

  onDelete(){
    // this.feature.properties['nanomaterial'] = this.nanomaterial
    // this.feature.properties['compartment'] = this.compartment
    // this.feature.properties['form'] = this.form
    // this.feature.properties['temporalProfile']= this.temporalProfile
    // this.feature.properties['title'] = this.title
    // this.feature.properties['description'] = this.description
    // this.feature.properties['emission'] = Number(this.emission)
    this.feature['save'] = "delete"
    this.thisSheetRef.dismiss(this.feature)
  }

  onRemove(){
    // this.feature.properties['nanomaterial'] = this.nanomaterial
    // this.feature.properties['compartment'] = this.compartment
    // this.feature.properties['form'] = this.form
    // this.feature.properties['temporalProfile']= this.temporalProfile
    // this.feature.properties['title'] = this.title
    // this.feature.properties['description'] = this.description
    // this.feature.properties['emission'] = Number(this.emission)
    this.feature['save'] = "remove"
    this.thisSheetRef.dismiss(this.feature)
  }

}
