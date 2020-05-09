import { Geometry } from './geometry';
import { Properties } from './properties';

export interface Emission{
    id?:string
    userId?:string
    properties?:Properties
    geometry?:Geometry;
    type?:string
}