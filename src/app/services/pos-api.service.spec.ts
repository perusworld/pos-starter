import { TestBed } from '@angular/core/testing';

import { PosApiService } from './pos-api.service';

describe('PosApiService', () => {
  let service: PosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
