import { TestBed } from '@angular/core/testing';

import { RefreeService } from './refree.service';

describe('RefreeService', () => {
  let service: RefreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
