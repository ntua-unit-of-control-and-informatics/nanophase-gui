import { Injectable } from '@angular/core';
import { BaseClientService } from './base-client.service';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DialogsService } from '../dialogs/dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService extends BaseClientService <Task>{

  constructor(
    http: HttpClient,
    public oidcSecurityService: OidcSecurityService,
    public dialogsService:DialogsService){
        super(http, dialogsService, oidcSecurityService,  "task/")
    }
}
