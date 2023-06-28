import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem("auth") || '{}');
    if (currentUser && this.oauthService.getAccessToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.oauthService.getAccessToken()}`
        }
      });
    }


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          location.reload();
        }
        return throwError(error);
      })
    )
  }
}
