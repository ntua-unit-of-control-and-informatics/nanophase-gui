import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { DialogsService } from '../dialogs/dialogs.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';
import { Config } from '../config/config';

// @Injectable({
//   providedIn: 'root'
// })
export class BaseClientService < T >{

  private _basePath: string;
  private _defaultHeaders: Headers = new Headers();
  private _path: string;

  constructor(protected http: HttpClient,
    protected dialogsService: DialogsService,
    protected oidcSecurityService: OidcSecurityService,
    protected requestPath: String) {
    this._basePath = Config.nanoFaseApi
    this._path = this._basePath + this.requestPath
  }

  public post < T > (entity: any): Observable < T > {
    const token = this.oidcSecurityService.getToken();
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    }).set('Authorization', tokenValue);
    let pathFormed = this._path
    return this.http.post(pathFormed, entity,{
      headers: headers}).pipe(tap((res:Response) =>{
        return res
      }),catchError(err =>this.dialogsService.onError(err)))
  }

    public getWithIdSecured<T>(id:string): Observable<T>{
        let params = new HttpParams();
        const token = this.oidcSecurityService.getToken();
        const tokenValue = 'Bearer ' + token;
        let headers = new HttpHeaders({'Content-Type':'application/json'}).set('Authorization', tokenValue);
        let pathFormed = this._path + id
        return this.http.get(pathFormed, { headers: headers, params: params } ).pipe(
            tap((res : Response) => { 
                return res           
            }),catchError( err => this.dialogsService.onError(err) )
        );
    }

    public getList<T>(params:HttpParams){
        const token = this.oidcSecurityService.getToken();
        const tokenValue = 'Bearer ' + token;
        let headers = new HttpHeaders({'accept':'application/json'}).set('Authorization', tokenValue);
        return this.http.get(this._path, {headers: headers, params:params}).pipe(
            tap((res:Response) => {
                return res.json
            }),catchError(err => this.dialogsService.onError(err))
        );
    }

    public getOneWithParam<T>(params:HttpParams){
      const token = this.oidcSecurityService.getToken();
      const tokenValue = 'Bearer ' + token;
      let headers = new HttpHeaders("accept: application/json").set('Authorization', tokenValue);
      return this.http.get(this._path, {headers: headers, params:params}).pipe(
          tap((res:Response) => {
              return res.json
          }),catchError(err => this.dialogsService.onError(err))
      );
  }

  public getOneForPoll<T>(params:HttpParams){
    const token = this.oidcSecurityService.getToken();
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders("accept: application/json").set('Authorization', tokenValue);
    return this.http.get(this._path, {headers: headers, params:params})
  }

  //   public getPropertyWithIdSecured<T>(id:string, property:string): Observable<T>{
  //       let params = new HttpParams();
  //       const token = this.oidcSecurityService.getToken();
  //       const tokenValue = 'Bearer ' + token;
  //       let headers = new HttpHeaders({'Content-Type':'application/json'}).set('Authorization', tokenValue);
  //       let pathFormed = this._path + id + "/" + property
  //       return this.http.get(pathFormed, { headers: headers, params: params } ).pipe(
  //           tap((res : Response) => { 
  //               return res           
  //           }),catchError( err=> this.dialogsService.onError(err) )
  //       );
  //   }

    public putWithIdSecured<T>(id:string, updateIt:any): Observable<T>{
        let params = new HttpParams();
        const token = this.oidcSecurityService.getToken();
        const tokenValue = 'Bearer ' + token;
        let headers = new HttpHeaders({'Content-Type':'application/json'}).set('Authorization', tokenValue);
        let pathFormed = this._path + id
        return this.http.put(pathFormed, updateIt, { headers: headers, params: params } ).pipe(
            tap((res : Response) => { 
                return res           
            }),catchError( err => this.dialogsService.onError(err) )
        );
    }

    public putEntitySecured<T>(updateIt:any): Observable<T>{
        let params = new HttpParams();
        const token = this.oidcSecurityService.getToken();
        const tokenValue = 'Bearer ' + token;
        let headers = new HttpHeaders({'Content-Type':'application/json'}).set('Authorization', tokenValue);
        let pathFormed = this._path
        return this.http.put(pathFormed, updateIt, { headers: headers, params: params } ).pipe(
            tap((res : Response) => { 
                return res           
            }),catchError( err => this.dialogsService.onError(err) )
        );
    }

    public deleteWithIdSecured<T>(id:string): Observable<T>{
      let params = new HttpParams();
      const token = this.oidcSecurityService.getToken();
      const tokenValue = 'Bearer ' + token;
      let headers = new HttpHeaders({'Content-Type':'application/json'}).set('Authorization', tokenValue);
      let pathFormed = this._path + id
      return this.http.delete(pathFormed, { headers: headers, params: params } ).pipe(
          tap((res : Response) => { 
              return res           
          }),catchError( err => this.dialogsService.onError(err) )
      );
  }

}
