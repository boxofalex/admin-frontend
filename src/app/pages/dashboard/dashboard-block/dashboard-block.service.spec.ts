import { TestBed } from '@angular/core/testing';

import { DashboardBlockService } from './dashboard-block.service';

describe('DashboardBlockService', () => {
  let service: DashboardBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
