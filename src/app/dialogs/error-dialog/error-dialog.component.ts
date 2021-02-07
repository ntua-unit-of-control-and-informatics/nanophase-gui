import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import {NgModel} from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent{

  public _env:boolean;

    public httpStatus:number;
    public message:string;
    public details:string;
    // public trace:string;
    public id:string;

    constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>){
       if(environment.production === true){
         this._env = false;
       }else{
         this._env = true;
       }
    }

    onClose(){
      this.dialogRef.close(true);
    }

}
