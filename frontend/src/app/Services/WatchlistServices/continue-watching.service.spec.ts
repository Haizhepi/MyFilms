import { TestBed } from '@angular/core/testing';

import { ContinueWatchingService } from './continue-watching.service';

describe('ContinueWatchingService', () => {
  let service: ContinueWatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinueWatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
