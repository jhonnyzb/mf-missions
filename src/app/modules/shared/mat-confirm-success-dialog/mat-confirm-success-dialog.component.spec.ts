import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmSuccessDialogComponent } from './mat-confirm-success-dialog.component';

describe('MatConfirmDialogComponent', () => {
  let component: MatConfirmSuccessDialogComponent;
  let fixture: ComponentFixture<MatConfirmSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmSuccessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
