export interface Simulation{
    _id?:string
    id?:string
    userId?:string
    emissions?:Array<string>
    description?:string
    title?:string
    date?:Number
    startDate?:String
    taskId?:string
    pbpk?:boolean
    pbpkDays?:Number
    minmax?:MinMax
}

export interface MinMax{
    output_soil?:any
    output_sediment?:any
    output_water?:any
}