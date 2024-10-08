import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmInfoDialogComponent } from './mat-confirm-info-dialog.component';

describe('MatConfirmDialogComponent', () => {
  let component: MatConfirmInfoDialogComponent;
  let fixture: ComponentFixture<MatConfirmInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
