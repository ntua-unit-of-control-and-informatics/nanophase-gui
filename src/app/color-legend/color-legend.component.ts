import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Subscription } from 'rxjs';
import { MinMax } from '../models/simulation';

@Component({
  selector: 'app-color-legend',
  templateUrl: './color-legend.component.html',
  styleUrls: ['./color-legend.component.css']
})
export class ColorLegendComponent implements OnInit, OnChanges {

  @Input() outputView: string;
  @Input() minValue: Number;
  @Input() maxValue: Number;


  podMap: Boolean = false
  getRenderValue: Subscription;
  getPodValue: Subscription;

  // legend: Legend
  rMinValue: string;
  rMaxValue: string;
  colormap: Boolean = true;

  // outputView: string
  scaler: MinMax
  renderVal: string
  // minValue: Number
  // maxValue: Number

  constructor(
    public _sessionService:SessionService
  ){ }


  ngOnInit() {}


  ngOnChanges(changes){

    this.rMinValue = this.renderValue(this.minValue)
    this.rMaxValue = this.renderValue(this.maxValue)  


    this.podMap = false
    if (this.outputView == "output_biouptake"){
      this.podMap = true
    } 
  }

  private renderValue(value){

    console.log(value)
    if (value == 0){
      return "0.000"
    } 

    if (value>1000){
      value = value.toExponential()
    }
    
    let valueString = value.toString()

    if (valueString.includes("e")){
      let split = valueString.split('e')
      return Number(split[0]).toFixed(3).toString().concat('e').concat(split[1])  
    }
    else{
        
      let split = valueString.split('.')
      for (const c of split[1]) {
        if (c !== '0'){
          if (split[1].indexOf(c)>2){
            return Number(split[0].concat('.').concat(split[1].substring(split[1].indexOf(c)))).toFixed(3).toString().concat('e-').concat(split[1].indexOf(c).toString())
          } else {
            return value.toFixed(3).toString()
          }
        }  
      }
    }
  }

}
