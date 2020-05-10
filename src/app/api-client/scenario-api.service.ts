import { Injectable } from '@angular/core';
import { BaseClientService } from './base-client.service';
import { Scenario } from '../models/scenario';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class ScenarioApiService extends BaseClientService <Scenario> {

  constructor(
    http: HttpClient,
    public oidcSecurityService: OidcSecurityService,
    public dialogsService:DialogsService){
        super(http, dialogsService, oidcSecurityService,  "scenario/")
    }
}
