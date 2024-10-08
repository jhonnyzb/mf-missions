import { MissionsService } from '../services/missions.service';
import { TestBed } from '@angular/core/testing';


describe('MissionsService', () => {
  let service: MissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});