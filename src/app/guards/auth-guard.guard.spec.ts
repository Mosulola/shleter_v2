import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

import { AuthGuard } from './auth.guard';

describe('AuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        OAuthService,
        HttpClient,
        HttpHandler,
        UrlHelperService,
        OAuthLogger
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
    });
  });

  it('should create AuthGuard', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
