import { Injectable } from '@angular/core';
// import { ErrorReport } from '../accounts-api/models/models';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  // private _errorReport:ErrorReport;

  constructor(
    private dialog: MatDialog
  ) { }

  public onError(error:HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // client-side error
      var errorMessage = error.error.message;
      var status = error.status;
    } else {
        // server-side error
      var errorMessage = error.message;
      var status = error.status;
    }
    let dialogRef: MatDialogRef<ErrorDialogComponent>;
    dialogRef = this.dialog.open(ErrorDialogComponent);
    dialogRef.componentInstance.httpStatus = Number(status);
    dialogRef.componentInstance.message = errorMessage;
    return dialogRef.afterClosed();
  }


  // public onMessage(message:string){
  //   let dialogRef: MatDialogRef<ErrorDialogComponent>;
  //   dialogRef = this.dialog.open(ErrorDialogComponent);
  //   dialogRef.componentInstance.message = message
  //   return dialogRef.afterClosed();
  // }


}
