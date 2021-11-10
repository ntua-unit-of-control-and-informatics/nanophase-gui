import { Injectable } from '@angular/core';
// import { Component, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};


export interface DataHash {
  [key: string] : Array<number>;
} 

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public chartOptions: Partial<ChartOptions>;

  constructor() { }

  public simpleLine(x: Array<number>, y:Array<number>, XTitle:string, YTitle:string, title?:string, zoomEnable?:boolean, dataLabels?:boolean,):Partial<ChartOptions>{
    
    if (title == null){
      title = ""
    }

    if (zoomEnable == null){
      zoomEnable = false
    }

    if (dataLabels == null){
      dataLabels = false
    }


    this.chartOptions = {
      series: [
        {
          name: YTitle,
          data: y
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: zoomEnable
        },
        toolbar:{
          export:{
            csv : {
              headerCategory:XTitle
            }
          }
        }
        
      },
      dataLabels: {
        enabled: dataLabels
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: title,
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: x,
        type: "numeric",
        title:{
          text: XTitle
        }
      },

      yaxis:{

        title: {
          text:YTitle
        },
        // labels:{
        //   formatter: function (value) {
        //     return `${value.toFixed(3)}`
        //   }
        // },
        labels: {
          show: false
        },
        forceNiceScale: true,
        decimalsInFloat: 20
        // labels:{
        //   formatter: function (value) {
        //     return value.toFixed(20)
        //   }
        // },
        // forceNiceScale: true,
        // decimalsInFloat: 2
      }
    };
  
    return this.chartOptions
  }

  
  public multipleLinesChart(data:DataHash, XTitle:string, title?:string, zoomEnable?:boolean, dataLabels?:boolean):Partial<ChartOptions>{
    if (title == null){
      title = ""
    }

    if (zoomEnable == null){
      zoomEnable = false
    }

    if (dataLabels == null){
      dataLabels = false
    }


    this.chartOptions = {
      series: [],
      colors: [],
      chart: {
        height: 500,
        type: "line",
        zoom: {
          enabled: zoomEnable
        },
        toolbar:{
          export:{
            csv : {
              headerCategory:XTitle
            }
          }
        }
      },
      dataLabels: {
        enabled: dataLabels
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: title,
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: data[XTitle],
        type: "numeric",
        title:{
          text: XTitle
        }
      },
      yaxis:{
        title: {
          text:"Concentration (mg/g)"
        },
        // labels:{
        //   formatter: function (value) {
        //     return `${value.toFixed(3)}`
        //   }
        // },
        forceNiceScale: true,
        decimalsInFloat: 3
      },
      tooltip: {
        y: {
          formatter: function(value) {
            return `${value}`
          }
        }
      }
    };

    for (let [k, value] of Object.entries(Object.values(data))){
      let key = Object.keys(data)[k]
      
      if (key!==XTitle){
        this.chartOptions.series.push(
          {
            name: key,
            data: value
          }
        )

        this.chartOptions.colors.push(this.getRandomColor())
      }
    }

    if (XTitle=="time"){
      this.chartOptions.xaxis.title.text = "Time (days)"
    }
  
    return this.chartOptions
  }



  private getRandomColor():string{
    let colors = ['#CD5C5C','#F08080','#FA8072','#E9967A','#FFA07A','#DC143C','#FF0000','#B22222','#8B0000','#FFC0CB','#FFB6C1','#FF69B4','#FF1493','#C71585','#DB7093','#FFA07A','#FF7F50','#FF6347','#FF4500','#FF8C00','#FFA500','#FFD700','#FFFF00','#FFFFE0','#FFFACD','#FAFAD2','#FFEFD5','#FFE4B5','#FFDAB9','#EEE8AA','#F0E68C','#BDB76B','#E6E6FA','#D8BFD8','#DDA0DD','#EE82EE','#DA70D6','#FF00FF','#FF00FF','#BA55D3','#9370DB','#663399','#8A2BE2','#9400D3','#9932CC','#8B008B','#800080','#4B0082','#6A5ACD','#483D8B','#7B68EE','#ADFF2F','#7FFF00','#7CFC00','#00FF00','#32CD32','#98FB98','#90EE90','#00FA9A','#00FF7F','#3CB371','#2E8B57','#228B22','#008000','#006400','#9ACD32','#6B8E23','#808000','#556B2F','#66CDAA','#8FBC8B','#20B2AA','#008B8B','#008080','#00FFFF','#00FFFF','#E0FFFF','#AFEEEE','#7FFFD4','#40E0D0','#48D1CC','#00CED1','#5F9EA0','#4682B4','#B0C4DE','#B0E0E6','#ADD8E6','#87CEEB','#87CEFA','#00BFFF','#1E90FF','#6495ED','#7B68EE','#4169E1','#0000FF','#0000CD','#00008B','#000080','#191970','#FFF8DC','#FFEBCD','#FFE4C4','#FFDEAD','#F5DEB3','#DEB887','#D2B48C','#BC8F8F','#F4A460','#DAA520','#B8860B','#CD853F','#D2691E','#8B4513','#A0522D','#A52A2A','#800000','#DCDCDC','#D3D3D3','#C0C0C0','#A9A9A9','#808080','#696969','#778899','#708090','#2F4F4F','#000000']
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

