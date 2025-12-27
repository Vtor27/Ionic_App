import { TestBed } from '@angular/core/testing';

import { Photoservice } from './photoservice';

describe('Photoservice', () => {
  let service: Photoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Photoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
