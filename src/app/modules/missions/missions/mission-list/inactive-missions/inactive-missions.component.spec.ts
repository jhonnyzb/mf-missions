import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveMissionsComponent } from './inactive-missions.component';

describe('InactiveMissionsComponent', () => {
  let component: InactiveMissionsComponent;
  let fixture: ComponentFixture<InactiveMissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InactiveMissionsComponent]
    });
    fixture = TestBed.createComponent(InactiveMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
