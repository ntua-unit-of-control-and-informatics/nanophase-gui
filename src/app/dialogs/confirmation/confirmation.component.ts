import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  confirmationMessage:string;
  confirmationAction:string;

  constructor(public thisDialogRef: MatDialogRef<ConfirmationComponent>) { }
  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close(true);
  }
  
  onCloseCancel() {
    this.thisDialogRef.close(false);
  }
}
