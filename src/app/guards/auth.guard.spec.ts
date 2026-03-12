import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/' } as RouterStateSnapshot;

  const runGuard = () =>
    TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow navigation when user is logged in', () => {
    authService.login('testuser', 'password');
    const result = runGuard();
    expect(result).toBe(true);
  });

  it('should redirect to /login when user is not logged in', () => {
    authService.logout();
    const result = runGuard();
    expect(result).not.toBe(true);
    const urlTree = router.createUrlTree(['/login']);
    expect(result.toString()).toBe(urlTree.toString());
  });
});
