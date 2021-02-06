import { TestBed } from '@angular/core/testing';

import { SimulationApiService } from './simulation-api.service';

describe('SimulationApiService', () => {
  let service: SimulationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
