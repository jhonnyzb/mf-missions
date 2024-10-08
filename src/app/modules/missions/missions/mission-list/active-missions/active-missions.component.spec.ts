import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMissionsComponent } from './active-missions.component';

describe('ActiveMissionsComponent', () => {
  let component: ActiveMissionsComponent;
  let fixture: ComponentFixture<ActiveMissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveMissionsComponent]
    });
    fixture = TestBed.createComponent(ActiveMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
