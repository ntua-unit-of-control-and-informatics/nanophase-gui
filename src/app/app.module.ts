import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatToolbarModule, MatButtonModule, MatCardModule, MatButtonToggleGroup, MatButtonToggleModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatBottomSheetModule, MatSelectModule, MatTooltipModule, MatDialogModule, MatListModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatPaginatorModule } from '@angular/material/';


import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatChipsModule} from '@angular/material/chips'
import {MatDialogModule} from '@angular/material//dialog'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatRadioModule} from '@angular/material/radio'
import {MatSelectModule} from '@angular/material/select'
import {MatSlideToggle, MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule} from '@angular/material/slide-toggle'
import {MatStepperModule} from '@angular/material/stepper'
import {MatTabsModule} from '@angular/material/tabs'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatTableModule} from '@angular/material/table'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatListModule} from '@angular/material/list'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatBadgeModule} from '@angular/material/badge'
import {MatMenuModule} from '@angular/material/menu'
import {MatSliderModule} from '@angular/material/slider'
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
// import {MatNativeDateModule} from '@angular/material/'

import { BaseMapComponent } from './base-map/base-map.component'
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { OidcConfigService, LogLevel, PublicEventsService, AuthModule} from 'angular-auth-oidc-client';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { configf } from './models/config.model';
import { RouterModule } from '@angular/router';
import { SessionService } from './session/session.service';
import { MainsComponent } from './mains/mains.component';
import { AddEmmisionsComponent } from './bottom-sheets/add-emmisions/add-emmisions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogsService } from './dialogs/dialogs.service';
import { EmissionComponent } from './emission/emission.component';
import { SaveScenarioComponent } from './dialogs/save-scenario/save-scenario.component';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';
import { ScenariosEmissionsComponent } from './scenarios-emissions/scenarios-emissions.component';
import { RunSimulationComponent } from './dialogs/run-simulation/run-simulation.component';
import { DatePipe } from '@angular/common';
import { Config } from './config/config';
import { SimulationListComponent } from './simulation-list/simulation-list.component';
import { SimulationsEmissionsComponent } from './simulations-emissions/simulations-emissions.component';
import { ShowSimulationComponent } from './show-simulation/show-simulation.component';
import { ShowPointOutComponent } from './dialogs/show-point-out/show-point-out.component';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { MultilineD3Component } from './d3/multiline-d3/multiline-d3.component';
import { NgApexchartsModule } from "ng-apexcharts";

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
    RunSimulationComponent,
    SimulationListComponent,
    SimulationsEmissionsComponent,
    ShowSimulationComponent,
    ShowPointOutComponent,
    ConfirmationComponent,
    MultilineD3Component
  ],
  imports: [
    NgApexchartsModule, BrowserModule, FormsModule, MatSliderModule,MatSlideToggleModule, ReactiveFormsModule, MatMenuModule,MatDialogModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatListModule,MatIconModule, HttpClientModule,MatExpansionModule,MatTooltipModule,MatFormFieldModule,MatInputModule,MatBottomSheetModule,MatSelectModule,
    BrowserAnimationsModule,MatToolbarModule, MatPaginatorModule, MatInputModule,MatButtonModule,MatCardModule,MatButtonToggleModule,
    RouterModule.forRoot([
    { path: '', component: AppComponent },
    { path: 'home', component: AppComponent },
    { path: 'forbidden', component: AppComponent },
    { path: 'unauthorized', component: AppComponent },
    { path: "simulation/:id", component: AppComponent }
], { relativeLinkResolution: 'legacy' }),
    AuthModule.forRoot()
  ],
  providers: [
    OidcConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: configureAuth,
        deps: [OidcConfigService, HttpClient, SessionService],
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
    sessionService.setConfigured('false');
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

export function configureAuth(oidcConfigService: OidcConfigService, httpClient: HttpClient, sessionService:SessionService) {
  const setupAction$ = httpClient.get<any>(`/assets/conf.json`).pipe(
      map((customConfig:configf) => {
        Config.nanoFaseApi = customConfig.nanoFaseApi
        sessionService.setConfigured('true')
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
