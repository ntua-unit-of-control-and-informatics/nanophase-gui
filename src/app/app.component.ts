import { environment } from './../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService, PublicConfiguration, OidcClientNotification, PublicEventsService, EventTypes } from 'angular-auth-oidc-client';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SessionService } from './session/session.service';
import { MatButtonToggle } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  loggedIn:boolean;
  subscription:Subscription;
  isAuthorizedSubscription: Subscription;
  isAuthorized: boolean;

  configuration: PublicConfiguration;
  userDataChanged$: Observable<OidcClientNotification<any>>;
  userData$: Observable<any>;
  isAuthenticated$: Observable<boolean>;
  checkSessionChanged$: Observable<boolean>;
  checkSessionChanged: any;

  // showSimulation:boolean = false;

  selectedTheme:string = "default-theme"

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private eventService: PublicEventsService,
    private _sessionService:SessionService
  ){
    // this._sessionService.getShowSimulationsEmissions().subscribe(val=>{
    //   if(val){
    //     console.log(
    //       val
    //     )
    //     if(val === 'true'){
    //       this.showSimulation = true;
    //     }else if(val === 'false'){
    //       this.showSimulation = false;
    //     }
    //   }
    // })
  }

  ngOnInit( ) {
    let theme = this._sessionService.get('theme')
    if(theme){
      this.selectedTheme = theme
    }
    this.isAuthorizedSubscription = this.oidcSecurityService.isAuthenticated$.subscribe(
      (isAuthorized: boolean) => {
        if(isAuthorized === true){
          this.loggedIn = true;
        }else{
          this.loggedIn = false;
        }
      });
      this.configuration = this.oidcSecurityService.configuration;
      this.userData$ = this.oidcSecurityService.userData$;
      this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
      this.checkSessionChanged$ = this.oidcSecurityService.checkSessionChanged$;

      this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => console.log('app authenticated', isAuthenticated));

      this.eventService
          .registerForEvents()
          .pipe(filter((notification) => notification.type === EventTypes.CheckSessionReceived))
          .subscribe((value) => console.log('CheckSessionReceived with value from app', value));
  }  

  login() {
    this.oidcSecurityService.authorize();
  } 

  logout() {
      this.oidcSecurityService.logoff();
  }

  themeChanged(event:MatButtonToggle){
    this._sessionService.set('theme', event.value)
  }


  downloadTutorial(){
    window.open('/assets/tutorial.pdf', '_blank');
  }

}
