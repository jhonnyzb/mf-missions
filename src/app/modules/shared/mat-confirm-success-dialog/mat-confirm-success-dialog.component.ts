import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mat-confirm-success-dialog',
  templateUrl: './mat-confirm-success-dialog.component.html',
  styleUrls: ['./mat-confirm-success-dialog.component.scss']
})
export class MatConfirmSuccessDialogComponent {
  dialogIcon = "";
  confirmText ="";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<MatConfirmSuccessDialogComponent>,
    private router:Router
    ) {
      this.dialogIcon =  "../../../../assets/img/check-circle.svg" ;
      this.confirmText = data.confirmText || "Aceptar";
    }

  closeDialog(){
    this.dialogRef.close(false);

  }
  cerrarDialogo(): void {
    this.dialogRef.close(false);

  }
  confirmado(): void {

   if(this.data.page == null){
    this.dialogRef.close(true);
   }else{
    this.router.navigate([this.data.page]);
    this.dialogRef.close(true);
   }

  }
  checkRouteUrl() {
    return this.router.url == '/main/redeem/cart';
  }
 
}
