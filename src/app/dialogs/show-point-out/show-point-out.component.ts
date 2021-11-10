import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SimulationApiService } from 'src/app/api-client/simulation-api.service';
import { GeoJson } from 'src/app/models/geojson';
import { ChartService, ChartOptions } from '../../chart/chart.service';

@Component({
  selector: 'app-show-point-out',
  templateUrl: './show-point-out.component.html',
  styleUrls: ['./show-point-out.component.css']
})
export class ShowPointOutComponent implements OnInit {


  x:Number;
  y:Number;
  object:Object;

  output_type:string;
  simulation_id:string;
  chartOptions: Partial<ChartOptions>;


  xCoords;
  yCoords;

  gatheringData:boolean = true;
  showPlots:boolean = false;

  plotKeys = []

  xPlot
  yPlot

  data:Array<Map<string, number>>

  constructor(
    public dialModalRef: MatDialogRef<ShowPointOutComponent>,
    public _router:Router,
    public simulationApi:SimulationApiService,
    private _charts: ChartService
  ) { }

  ngOnInit(): void {
    this.changePosition()
    this.xCoords = this.object['geometry']['coordinates'][0][0][0].toFixed(5)
    this.yCoords = this.object['geometry']['coordinates'][0][1][1].toFixed(5) 
    this.simulation_id = this._router.url.split("/")[this._router.url.split("/").length - 1]


    for (const [key, value] of Object.entries(this.object['properties'])) {
      
      if (typeof value === 'number' && !this.isInt(value)){

        let valueString = value.toString()

        if (valueString.includes("e")){
          let split = valueString.split('e')
          this.object['properties'][key] = Number(Number(split[0]).toFixed(3).toString().concat('e').concat(split[1]))  
        }
        else{
          this.object['properties'][key] = value.toFixed(3)
        }
      }
    }
    // this.logObject()

    let httpPars = new HttpParams().set('id', this.simulation_id)
    .set('output_type', this.output_type).set('x', this.object['properties']['x'])
    .set('y', this.object['properties']['y'])
    this.gatheringData = true
    this.plotKeys = []
    this.simulationApi.getOneWithParam(httpPars).subscribe((resp:any)=>{
      if(resp){
        console.log(resp.length)
        this.gatheringData = false;
        this.data = resp
        Object.keys(resp[0]).forEach(k =>{
          if ((k!="t") && (k!="datetime") && (k!="x") && (k!="y") && (k!="norths") && (k!="easts") && typeof resp[10][k] != 'string'){
            this.plotKeys.push(k)
          }
        })
      }
    })
  }

  isInt(n) {
    return n % 1 === 0;
 }

  changePosition() {
    this.dialModalRef.updatePosition({ top: String(this.y) + 'px' , left: String(this.x) + 'px'});
  }


  logObject(){
    console.log(this.object)
  }

  plotValue(key){
    // console.log(this.data.length)
    // this.showPlots = false;
    let x = []
    let y = []
    let i = 0
    this.data.forEach(d =>{
      // console.log(typeof d)
      x.push(i)
      y.push(d[key].toFixed(20))
      i += 1
    })
    // this.xPlot = xs
    // this.yPlot = ys
    // this.showPlots = true;

 
      this.showPlots = false;
      this.chartOptions = this._charts.simpleLine(x,y,"Time (days)", key, null, true, false)
      this.showPlots = true;
      this.showPlots = true;




  }


}
