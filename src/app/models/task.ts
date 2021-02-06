export interface Task{
    _id?:string;
    id?:string;
    simulationId?:string
    userId?:string;
    messages?:Array<string>;
    simulationKeys?:Array<string>;
    percentage?:Number
}