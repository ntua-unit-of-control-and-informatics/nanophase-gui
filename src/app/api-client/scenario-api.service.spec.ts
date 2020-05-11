import { TestBed } from '@angular/core/testing';

import { ScenarioApiService } from './scenario-api.service';

describe('ScenarioApiService', () => {
  let service: ScenarioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenarioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
