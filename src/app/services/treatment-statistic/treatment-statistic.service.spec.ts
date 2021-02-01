import { TestBed } from '@angular/core/testing';

import { TreatmentStatisticService } from './treatment-statistic.service';

describe('TreatmentStatisticService', () => {
  let service: TreatmentStatisticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentStatisticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
