import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogParams } from "src/app/core/models/gtm/dialogParams.model";
import { MatConfirmDialogComponent } from "src/app/modules/shared/mat-confirm-dialog/mat-confirm-dialog.component";
import { MatConfirmInfoDialogComponent } from "src/app/modules/shared/mat-confirm-info-dialog/mat-confirm-info-dialog.component";
import { MatConfirmSuccessDialogComponent } from "src/app/modules/shared/mat-confirm-success-dialog/mat-confirm-success-dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {

  constructor(private dialog: MatDialog) {

  }


  openConfirmDialog(msg: any, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }

  openConfirmInfoDialog(msg: any, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmInfoDialogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }

  openConfirmSuccessDialog(msg: any, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmSuccessDialogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }
}
