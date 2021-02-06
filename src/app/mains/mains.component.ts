import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-mains',
  templateUrl: './mains.component.html',
  styleUrls: ['./mains.component.css']
})
export class MainsComponent implements OnInit {

  panelOpenState = false;
  
  constructor(
    private sessionService:SessionService
  ) { 
    

  }

  ngOnInit(): void {
  }

  setConf(){
    this.sessionService.setConfigured("true")
  }

}
