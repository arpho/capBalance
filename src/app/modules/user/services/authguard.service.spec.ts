import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './authguard.service';

describe('AuthguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, RouterTestingModule],
  }));

  it('should be created', () => {
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service).toBeTruthy();
  });
});
