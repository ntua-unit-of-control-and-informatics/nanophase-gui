import { Geometry } from './geometry';
import { Meta } from './meta';

export interface Emission{
    meta?:Meta;
    nanomaterial?:string;
    compartmen?:string;
    form?:string;
    profile?:string;
    emission?:Number;
    geometry?:Geometry;
}