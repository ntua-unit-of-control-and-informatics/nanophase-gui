import { Geometry } from "./geometry";

export class GeoJson{
    type: string;
    features: Array<GeoFeature>
    outputType: string;
}

export class GeoFeature{
    geometry:Geometry
    properties: { [key:string]:any; };

}