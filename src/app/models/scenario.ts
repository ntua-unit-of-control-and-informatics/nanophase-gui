import { Meta } from './meta';
import { Emission } from './emission';

export interface Scenario{
    meta?:Meta
    emissions?:Array<Emission>
}
