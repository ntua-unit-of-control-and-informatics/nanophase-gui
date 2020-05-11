import { Injectable } from '@angular/core';
import { Emission } from '../models/emission';
import { BaseClientService } from './base-client.service';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class EmissionsApiService extends BaseClientService <Emission> {

  constructor(
    http: HttpClient,
    public oidcSecurityService: OidcSecurityService,
    public dialogsService:DialogsService){
        super(http, dialogsService, oidcSecurityService,  "emission/")
    }

}
