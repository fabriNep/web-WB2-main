import { TestBed } from '@angular/core/testing';

import { Recomendacion } from './recomendacion';

describe('Recomendacion', () => {
  let service: Recomendacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recomendacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
