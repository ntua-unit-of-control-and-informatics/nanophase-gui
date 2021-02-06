import { Injectable } from '@angular/core';
import { BaseClientService } from './base-client.service';
import { Simulation } from '../models/simulation';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class SimulationApiService extends BaseClientService <Simulation> {

  constructor(
    http: HttpClient,
    public oidcSecurityService: OidcSecurityService,
    public dialogsService:DialogsService){
        super(http, dialogsService, oidcSecurityService,  "simulation/")
    }
}
