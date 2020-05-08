import { Geometry } from './geometry';
import { Properties } from './properties';

export interface Emission{
    // meta?:Meta;
    properties?:Properties
    nanomaterial?:string;
    compartmen?:string;
    form?:string;
    profile?:string;
    emission?:Number;
    geometry?:Geometry;

}