import { TestBed } from '@angular/core/testing';

import { ShoppingKartsService } from './shopping-karts.service';

describe('ShoppingKartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingKartsService = TestBed.get(ShoppingKartsService);
    expect(service).toBeTruthy();
  });
});
