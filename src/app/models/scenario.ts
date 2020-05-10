import { Emission } from './emission';

export interface Scenario{
    title?:string
    description?:string
    date?:Number
    emissions?:Array<string>
    _id?:string
    id?:string
    userId?:string
}
