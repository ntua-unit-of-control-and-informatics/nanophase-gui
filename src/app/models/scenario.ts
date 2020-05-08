import { Emission } from './emission';

export interface Scenario{
    title?:string
    description?:string
    emissions?:Array<Emission>
}
