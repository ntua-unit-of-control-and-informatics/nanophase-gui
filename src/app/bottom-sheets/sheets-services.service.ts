import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { AddEmmisionsComponent } from './add-emmisions/add-emmisions.component';

@Injectable({
  providedIn: 'root'
})
export class SheetsService {

  constructor(
    private sheet:MatBottomSheet
  ) { }

  public addEmissions(f){
    let sheetRef:MatBottomSheetRef<AddEmmisionsComponent>
    sheetRef = this.sheet.open(AddEmmisionsComponent)
    sheetRef.instance.feature = f
    return sheetRef.afterDismissed();
  }

}
