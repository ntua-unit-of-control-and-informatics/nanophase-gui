import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatButtonToggleGroup, MatButtonToggleModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatBottomSheetModule, MatSelectModule, MatTooltipModule, MatDialogModule, MatListModule, MatIconModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material/';
import { BaseMapComponent } from './base-map/base-map.component'
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EventTypes, OidcConfigService, LogLevel, PublicEventsService, AuthModule} from 'angular-auth-oidc-client';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { configf } from './models/config';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { SessionService } from './session/session.service';
import { MainsComponent } from './mains/mains.component';
import { AddEmmisionsComponent } from './bottom-sheets/add-emmisions/add-emmisions.component';
import { FormsModule } from '@angular/forms';
import { DialogsService } from './dialogs/dialogs.service';
import { EmissionComponent } from './emission/emission.component';
import { SaveScenarioComponent } from './dialogs/save-scenario/save-scenario.component';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';
import { ScenariosEmissionsComponent } from './scenarios-emissions/scenarios-emissions.component';
import { RunSimulationComponent } from './dialogs/run-simulation/run-simulation.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BaseMapComponent,
    MainsComponent,
    AddEmmisionsComponent,
    EmissionComponent,
    SaveScenarioComponent,
    ScenarioListComponent,
    ScenariosEmissionsComponent,
    RunSimulationComponent
  ],
  imports: [
    BrowserModule,FormsModule,MatDialogModule,MatDatepickerModule, MatNativeDateModule, MatListModule,MatIconModule, HttpClientModule,MatExpansionModule,MatTooltipModule,MatFormFieldModule,MatInputModule,MatBottomSheetModule,MatSelectModule,
    BrowserAnimationsModule,MatToolbarModule,MatInputModule,MatButtonModule,MatCardModule,MatButtonToggleModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'home', component: AppComponent },
      { path: 'forbidden', component: AppComponent },
      { path: 'unauthorized', component: AppComponent },
  ]),
    AuthModule.forRoot()
  ],
  providers: [
    OidcConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: configureAuth,
        deps: [OidcConfigService, HttpClient],
        multi: true,
    },
    SessionService, DialogsService, DatePipe
  ],
  exports:[MatInputModule, MatFormFieldModule],
  bootstrap: [AppComponent]
})
export class AppModule { 

  subscription:Subscription;
  theme:string;
  sts_server:string
  constructor(private overlayContainer: OverlayContainer
              , private sessionService: SessionService
              // , private oidcConfigService: OidcConfigService
              , private readonly eventService: PublicEventsService
              ) 
  {
    var _theme = sessionService.get('theme');
    if(_theme === 'dark-theme'){
      
      // this.overlayContainer.getContainerElement().classList.remove("cdk-overlay-container");
      this.overlayContainer.getContainerElement().classList.remove('default-theme'); 
      // this.overlayContainer.getContainerElement().classList.add('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    }else{
      // this.overlayContainer.getContainerElement().classList.remove("cdk-overlay-container");
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('default-theme');
    }

    this.subscription= this.sessionService
    .getTheme().subscribe(theme => {
      // console.log(this.overlayContainer.getContainerElement().classList)
      var the = (<any>Object).values(theme);
      if(the[0] === 'dark-theme'){
        this.theme = 'dark-theme';
        // this.overlayContainer.getContainerElement().classList.remove("cdk-overlay-container");
        this.overlayContainer.getContainerElement().classList.remove('default-theme'); 
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
      }else if (the[0]==='default-theme'){
        this.theme = 'default-theme'
        // this.overlayContainer.getContainerElement().classList.remove("cdk-overlay-container");
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
        this.overlayContainer.getContainerElement().classList.add('default-theme');
      }else if(the[0] === 'green-theme'){
        this.theme = 'green-theme'
        // this.overlayContainer.getContainerElement().classList.remove("cdk-overlay-container");
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
        this.overlayContainer.getContainerElement().classList.add('default-theme');
      }
    })
  }
    
  changeTheme(theme:string){
    this.overlayContainer.getContainerElement().classList.add(theme);
  }
  
}

export function configureAuth(oidcConfigService: OidcConfigService, httpClient: HttpClient) {
  const setupAction$ = httpClient.get<any>(`/assets/conf.json`).pipe(
      map((customConfig:configf) => {
          return {
              stsServer: customConfig.stsServer,
              redirectUrl: customConfig.redirect_url,
              clientId: customConfig.client_id,
              responseType: customConfig.response_type,
              scope: customConfig.scope,
              // postLogoutRedirectUri: customConfig.baseurl,
              // startCheckSession: customConfig.start_checksession,
              // silentRenew: customConfig.silent_renew,
              silentRenewUrl: customConfig.silent_redirect_url,
              // postLoginRoute: customConfig.baseurl,
              // forbiddenRoute: customConfig.baseurl,
              // unauthorizedRoute: customConfig.baseurl,
              logLevel: LogLevel.Error, // LogLevel.Debug,
              maxIdTokenIatOffsetAllowedInSeconds: 60,
              historyCleanupOff: true,
              autoUserinfo: false,
              storage: localStorage
          };
      }),
      switchMap((config) => oidcConfigService.withConfig(config))
  );

  return () => setupAction$.toPromise();
}
