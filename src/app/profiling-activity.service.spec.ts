import { TestBed } from '@angular/core/testing';

import { ProfilingActivityService } from './profiling-activity.service';

describe('ProfilingActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilingActivityService = TestBed.get(ProfilingActivityService);
    expect(service).toBeTruthy();
  });
});
