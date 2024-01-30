import { TestBed } from '@angular/core/testing';

import { PptProjectService } from './ppt-project.service';

describe('PptProjectService', () => {
  let service: PptProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PptProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
