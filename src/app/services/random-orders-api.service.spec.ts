import { TestBed } from '@angular/core/testing';

import { RandomOrdersApiService } from './random-orders-api.service';

describe('RandomOrdersApiService', () => {
  let service: RandomOrdersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomOrdersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
