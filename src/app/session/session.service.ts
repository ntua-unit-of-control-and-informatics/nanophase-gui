import {Injectable} from '@angular/core';
import {Observable, Subject,  BehaviorSubject } from 'rxjs';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Emission } from '../models/emission';
import { Scenario } from '../models/scenario';
import { EmissionsApiService } from '../api-client/emissions-api.service';
import { Simulation } from '../models/simulation';


@Injectable()
export class SessionService{

    private subjectId = new Subject<any>();
    token: string;
    userid:string;
    private userName = new Subject<any>();
    private theme = new Subject<any>();
    private emissionForList = new Subject<Emission>();
    private emmissionForMap = new Subject<Emission>();

    private scenarioForList = new Subject<Scenario>();
    private scenarioForMap = new Subject<Scenario>();

    private scenariosEmissions = new Subject<Emission>();

    private simulationsEmissions = new Subject<Emission>();

    private showScenariosEmissions = new Subject<string>();

    private showSimulationsEmissions = new Subject<string>();

    private showSimulationsType = new Subject<string>();

    private renderSimulationsKey = new Subject<string>();

    private flyToShownEmissions = new Subject<Emission>();

    private removeFromShownEmissions = new Subject<Emission>();

    private showSimsGEOJson = new Subject<any>();

    private configured = new Subject<String>();

    constructor(
        private _emissionsApi:EmissionsApiService
    ){
        
    }

    getSubjectId(): Observable<any>{
        return this.subjectId.asObservable();
    }

    getUserId(){
        var userData = JSON.parse(localStorage.getItem('userData'))
        this.userid = userData.sub
        return this.userid;
    }

    getUserData(){
        var userData = JSON.parse(localStorage.getItem('userData'))
        return userData
    }

    getUserName(): Observable<any>{
        return this.userName.asObservable();
    }

    getTheme(): Observable<any>{
        return this.theme.asObservable();
    }

    setEmissionForMap(emm:Emission){
        this.emmissionForMap.next(emm)
    }

    getEmissionForMap(){
        return this.emmissionForMap.asObservable()
    }

    setEmissionForList(emm:Emission){
        this.emissionForList.next(emm)
    }

    getEmissionForList(){
        return this.emissionForList.asObservable()
    }

    getConfigured(){
        return this.configured.asObservable()
    }

    setConfigured(configured:String){
        this.configured.next(configured)
    }

    setScenarioForMap(emm:Scenario){
        this.scenarioForMap.next(null)
        // this.emmissionForMap.next(null)
        this.scenariosEmissions.next(null)
        this.scenarioForMap.next(emm)
        this.setShowSimulationsEmissions('false')
        emm.emissions.forEach(em=>{
            this._emissionsApi.getWithIdSecured(em).subscribe(em=>{
                if(em){
                    this.scenariosEmissions.next(em)
                }
            })
        })
    }

    setSimulationForMap(sim:Simulation){
        this.scenarioForMap.next(null)
        // this.emmissionForMap.next(null)
        this.scenariosEmissions.next(null)
        this.setShowScenariosEmissions('false')
        this.setShowSimulationsEmissions('true')
        // this.scenarioForMap.next(sim)
        sim.emissions.forEach(em=>{
            this._emissionsApi.getWithIdSecured(em).subscribe(em=>{
                if(em){
                    this.simulationsEmissions.next(em)
                }
            })
        })
    }

    setRenderValue(value){
        this.renderSimulationsKey.next(value)
    }

    getRenderValue(){
        return this.renderSimulationsKey.asObservable()
    }

    getSimulationsEmissions(){
        return this.simulationsEmissions.asObservable()
    }

    getShowSimulationsEmissions(){
        return this.showSimulationsEmissions.asObservable()
    }

    setShowSimulationsEmissions(emm:string){
        this.showSimulationsEmissions.next(emm)
    }

    getScenarioForMap(){
        return this.scenarioForMap.asObservable()
    }

    setScenarioForList(scen:Scenario){
        this.scenarioForList.next(scen)
    }

    getScenarioForList(){
        return this.scenarioForList.asObservable()
    }

    setScenariosEmissions(emm:Emission){
        this.scenariosEmissions.next(emm)
    }

    getScenariosEmissions(){
        return this.scenariosEmissions.asObservable()
    }

    setShowScenariosEmissions(emm:string){
        this.showScenariosEmissions.next(emm)
    }

    getShowScenariosEmissions(){
        return this.showScenariosEmissions.asObservable()
    }

    setShowSimulationOutput(emm:string){
        this.showSimulationsType.next(emm)
    }

    getShowSimulationOutput(){
        return this.showSimulationsType.asObservable()
    }

    setFlyToShownEmissions(emm:Emission){
        this.flyToShownEmissions.next(emm)
    }

    getFlyToShownEmissions(){
        return this.flyToShownEmissions.asObservable()
    }

    setRemoveFromShownEmissions(em:Emission){
        this.removeFromShownEmissions.next(em)
    }

    getRemoveFromShownEmissions(){
        return this.removeFromShownEmissions.asObservable()
    }

    setShowSimsGEOJson(data:any){
        return this.showSimsGEOJson.next(data)
    }

    getShowSimsGEOJson(){
        return this.showSimsGEOJson.asObservable()
    }

    get(key: any){
        return localStorage.getItem(key);
    }

    remove(key:any){
        switch(key){
            case 'subjectId':{
                this.subjectId.next();
                break;
            }
            //case 'loggedIn':{
           //     var fal = "false";
           //     this.loggedIn.next({ fal });
          //      break;
         //   }
            case 'userName':{
                this.userName.next();
                break;
            }

        }
        return localStorage.removeItem(key);
    }

    clear(){
        var nul = "null";
        this.subjectId.next({ nul });
     //   this.loggedIn.next({ nul });
        this.userName.next({ nul });
        return localStorage.clear();
    }

    set(key:any, data:any){
        switch(key){
            case 'subjectId':{
                this.subjectId.next({ data });
                break;
            }
            case 'userName':{
                this.userName.next({ data });
                break;
            }
            case 'theme':{
                this.theme.next({ data });
                break;
            }
        }
        return localStorage.setItem(key, data);
    }

}