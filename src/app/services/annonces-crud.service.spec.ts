import { TestBed } from '@angular/core/testing';

import { AnnoncesCrudService } from './annonces-crud.service';

describe('AnnoncesCrudService', () => {
  let service: AnnoncesCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnoncesCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
