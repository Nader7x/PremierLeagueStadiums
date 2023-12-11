import { TestBed } from '@angular/core/testing';

import { CommentatorService } from './commentator.service';

describe('CommentatorService', () => {
  let service: CommentatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
