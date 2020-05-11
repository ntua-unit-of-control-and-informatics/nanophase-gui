import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-emmisions',
  templateUrl: './add-emmisions.component.html',
  styleUrls: ['./add-emmisions.component.css']
})
export class AddEmmisionsComponent implements OnInit {

  feature:any
  form1:NgForm;

  nanomaterial:string = "TiO2"
  compartment:string = "Soil"
  form:string = "Pristine"
  temporalProfile:string = "P1"
  title:string;
  description:string;
  save:boolean = false

  emission:string;

  defaultNano=this.nanomaterial;
  defaultCompartment=this.compartment;
  defaultForm=this.form;
  defaultProfile=this.temporalProfile;

  constructor(
    private thisSheetRef: MatBottomSheetRef<AddEmmisionsComponent>
  ) { }

  ngOnInit(): void {
   
  }

  onSubmit(form: NgForm){
  console.log("form validated!");
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
