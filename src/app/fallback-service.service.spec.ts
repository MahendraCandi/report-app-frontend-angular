import { TestBed } from '@angular/core/testing';

import { FallbackServiceService } from './fallback-service.service';

describe('FallbackServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FallbackServiceService = TestBed.get(FallbackServiceService);
    expect(service).toBeTruthy();
  });
});
