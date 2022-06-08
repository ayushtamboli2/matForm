import { TestBed } from '@angular/core/testing';

import { BooktableService } from './booktable.service';

describe('BooktableService', () => {
  let service: BooktableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooktableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
