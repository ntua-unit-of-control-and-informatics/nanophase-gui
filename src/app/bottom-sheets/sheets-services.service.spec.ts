import { TestBed } from '@angular/core/testing';

import { SheetsServicesService } from './sheets-services.service';

describe('SheetsServicesService', () => {
  let service: SheetsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheetsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
