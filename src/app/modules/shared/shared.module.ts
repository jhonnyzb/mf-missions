
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { MatConfirmInfoDialogComponent } from "./mat-confirm-info-dialog/mat-confirm-info-dialog.component";
import { MatConfirmSuccessDialogComponent } from "./mat-confirm-success-dialog/mat-confirm-success-dialog.component";



@NgModule({
  declarations: [
    MatConfirmDialogComponent,
    MatConfirmInfoDialogComponent,
    MatConfirmSuccessDialogComponent
  ],
  exports: [
    MatConfirmDialogComponent,
    MatConfirmInfoDialogComponent,
    MatConfirmSuccessDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  providers: [
  ]
})
export class SharedModule { }
