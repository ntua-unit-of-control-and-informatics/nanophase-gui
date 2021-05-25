import { Injectable } from '@angular/core';
// import { ErrorReport } from '../accounts-api/models/models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { SaveScenarioComponent } from './save-scenario/save-scenario.component';
import { RunSimulationComponent } from './run-simulation/run-simulation.component';
import { ShowPointOutComponent } from './show-point-out/show-point-out.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

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

  public onSaveScenario(){
    let dialogRef: MatDialogRef<SaveScenarioComponent>;
    dialogRef = this.dialog.open(SaveScenarioComponent);
    return dialogRef.afterClosed();
  }

  public onRunSimulation(){
    let dialogRef: MatDialogRef<RunSimulationComponent>;
    dialogRef = this.dialog.open(RunSimulationComponent);
    return dialogRef.afterClosed();
  }

  public onShowOutput(object, x, y, output_type){
    let dialogRef: MatDialogRef<ShowPointOutComponent>;
    dialogRef = this.dialog.open(ShowPointOutComponent);
    dialogRef.componentInstance.object = object;
    dialogRef.componentInstance.x = x;
    dialogRef.componentInstance.y = y;

    dialogRef.componentInstance.output_type = output_type
    // dialogRef.componentInstance.simulation_id = simulation_id


    return dialogRef.afterClosed();
  }

  public onConfirm(message:string, action:string){
    let dialogRef: MatDialogRef<ConfirmationComponent>;
    dialogRef = this.dialog.open(ConfirmationComponent);
    dialogRef.componentInstance.confirmationMessage = message
    dialogRef.componentInstance.confirmationAction = action
    return dialogRef.afterClosed();
  }

  // public onMessage(message:string){
  //   let dialogRef: MatDialogRef<ErrorDialogComponent>;
  //   dialogRef = this.dialog.open(ErrorDialogComponent);
  //   dialogRef.componentInstance.message = message
  //   return dialogRef.afterClosed();
  // }


}
