import { Injectable } from '@angular/core';
import { Emission } from '../models/emission';
import { BaseClientService } from './base-client.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DialogsService } from '../dialogs/dialogs.service';
import { from, Observable } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmissionsApiService extends BaseClientService <Emission> {


  // _path = Config.nanoFaseApi + "emission/"

  constructor(
    http: HttpClient,
    public oidcSecurityService: OidcSecurityService,
    public dialogsService:DialogsService){
        super(http, dialogsService, oidcSecurityService,  "emission/")
    }


    // public getWithUpsert( ids:Array<string> ): Observable<any>{
    //   let params = new HttpParams().set('id', id);
    //   const token = this.oidcSecurityService.getToken();
    //   const tokenValue = 'Bearer ' + token;
    //   let headers = new HttpHeaders({'accept':'application/json'}).set('Authorization', tokenValue);
    //   let pathFormed = this._path
    //   return from(ids).pipe(
    //     mergeMap(id =>{}
    //       let params = new HttpParams().set('id', id);

    //     //   this.http.get(pathFormed, { headers: headers, params: params } ).pipe(
    //     //       tap((res : Response) => { 
    //     //           return res           
    //     //       }),catchError( err => this.dialogsService.onError(err) )
    //     //   )
    //     //  .upsert(id), 2)
    // }

}
