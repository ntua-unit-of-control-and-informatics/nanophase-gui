import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-multiline-d3',
  templateUrl: './multiline-d3.component.html',
  styleUrls: ['./multiline-d3.component.css']
})
export class MultilineD3Component implements OnChanges {


  @Input() xs = {}
  @Input() ys = {}
  
  svg:any
  margin = {top: 40, right: 80, bottom: 80, left: 80};

  data: any;
  dataGotAll : any;
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  line;

  //temp:any;
  // data: any;

  constructor() { }

  ngOnChanges() {

    // this.data = TEMPERATURES.map((v) => v.values.map((v) => v.date ))[0];
    // console.log(this.xs)
    // console.log(this.ys)

    let dataGot = []
    for(let key in this.ys){
      let dataObject = {}
      dataObject['id'] = key
      let values = []
      for(var _i = 0; _i < this.ys[key].length; _i++){
        let xKey:string = Object.keys(this.xs)[0]
        let value = {}
        value[xKey] = this.xs[xKey][_i]
        value['concentration'] = this.ys[key][_i]
        values.push(value)
      }
      dataObject['values']=values
      dataGot.push(dataObject)
    }
    this.dataGotAll = dataGot
    this.data = dataGot.map((v) => v.values.map((v) => v.t ))[0]

    // console.log( dataGot.map((v) => v.values.map((v) => v.time ))[0])
    // console.log(this.data)
    // this.temp=this.data.map(x=> x*100);
    // console.log(this.temp);

    this.initChart();
    this.drawAxis();
    this.drawPath();
  }

  initChart():void{

    // this.svg.selectAll("*").remove();
    this.svg = d3.select('.svg');
    
    

    this.width = this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = this.svg.attr('height') - this.margin.top - this.margin.bottom;

    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

    this.line = d3Shape.line()
      .curve(d3Shape.curveBasis)
      .x( (d: any) => this.x(d.t) )
      .y( (d: any) => this.y(d.concentration) );
      
    let xmin = 0
    let xmax = 0
    for (let key in this.xs){
      var min = Math.min(...this.xs[key])
      if(min<xmin){
        xmin = min
      }
      var max = Math.max(...this.xs[key])
      if(max > xmax){
        xmax = max
      }
    }
    this.x.domain([ 
      d3Array.min([xmin]),
      d3Array.max([xmax])
    ] );
    let ymin = 0
    let ymax = 0
    for (let key in this.ys){
      var min = Math.min(...this.ys[key])
      if(min<ymin){
        ymin = min
      }
      var max = Math.max(...this.ys[key])
      if(max > ymax){
        ymax = max
      }
    }
    this.y.domain([
        d3Array.min([ymin]),
        d3Array.max([ymax])
    ]);

    let ids = []
    for(let key in this.ys){
      ids.push(key)
    }
    this.z.domain(ids)
  }

  private drawAxis(): void {

    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
       //.call(d3Axis.axisBottom(this.x)).append('text')
        .call(d3Axis.axisBottom(this.x).tickFormat(d => String(Number(d) * 1))).append('text')
        .attr('fill', '#000')
        .attr('x', 1000)
        .attr('dx', '0.71em')
        .text('Days');

    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#000')
        .text('Concentration');
   
  }

  private drawPath(): void {
    console.log(this.dataGotAll)
    let organ = this.g.selectAll('.organ')
    .data(this.dataGotAll)
    .enter().append('g')
    .attr('class', 'organ');

    organ.append('path')
        .attr('class', 'line')
        .attr('d', (d) => this.line(d.values) )
        .style('stroke', (d) => this.z(d.id) ).style("fill","none");

    organ.append('text')
        .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
        .attr('transform', (d) => {'translate(' + this.x(d.value.t) + ',' + this.y(d.value.concentration) + ')', console.log(d)} )
        .attr('x', 2)
        .attr('dy', '-0.85em')
        .style('font', '10px sans-serif')
        .text(function(d) { return d.id; });
  }
}
