import { TestBed } from '@angular/core/testing';

import { EmissionsApiService } from './emissions-api.service';

describe('EmissionsApiService', () => {
  let service: EmissionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
