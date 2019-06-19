import { TestBed } from '@angular/core/testing';

import { NetworkEffects } from './network-effects.service';

describe('NetworkEffectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkEffects = TestBed.get(NetworkEffects);
    expect(service).toBeTruthy();
  });
});
