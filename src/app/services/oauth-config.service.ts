import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { filter, find } from 'rxjs/operators';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";
import { environment } from '../../environments/environment';


@Injectable()
export class OauthConfigService {

  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  get decodedAccessToken() { return this._decodedAccessToken; }
  get decodedIDToken() { return this._decodedIDToken; }

  authConfig: AuthConfig = {
    issuer: environment.OAUTH.URL,
    oidc: true,
    redirectUri: window.location.origin + "/dashboard",
    clientId: environment.OAUTH.CLIENT_ID,
    scope: 'openid profile email',
    responseType: environment.OAUTH.RESONSE_TYPE,
    silentRefreshRedirectUri: window.location.origin + "/assets/silent-refresh.html",
  }


  constructor(
    private readonly oauthService: OAuthService,
    private authService: AuthService
  ) { }

  async initAuth(): Promise<any> {
    return new Promise((resolveFn: any, rejectFn: any) => {
      // setup oauthService
      this.oauthService.configure(this.authConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.setupAutomaticSilentRefresh();
      this.oauthService.tokenValidationHandler = new NullValidationHandler();

      this.oauthService.events.pipe(filter(e => e.type === 'session_terminated')).subscribe(e => {
        console.log('Your session has been terminated!');
      })
      this.oauthService.events
        .pipe(find((e: any) => {
          return e.type === 'token_expires';
        }))
        .subscribe(() => {
        }, err => {
          console.log(err);
        });

      this.oauthService.events
        .pipe(filter((e: any) => {
          return e.type === 'token_received';
        }))
        .subscribe(() => this.handleNewToken());

      this.oauthService.events
        .pipe(filter((e: any) => {
          return e.type === 'token_refresh_error';
        }))
        .subscribe(() => this.oauthService.initCodeFlow());


      // continue initializing app or redirect to login-page

      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(isLoggedIn => {
        if (isLoggedIn) {
          this.oauthService.refreshToken().then(() => {
            var decode = jwt_decode(this.oauthService.getAccessToken());
            this.authService.setUserAuth(decode);
            resolveFn();
          }).catch(err => {
            rejectFn();
          })
        } else {
          this.oauthService.initImplicitFlow();
          rejectFn();
        }
      }).catch(err => {
        console.log(err);
        this.oauthService.initImplicitFlow();
        rejectFn();
      });
    });
  }

  private handleNewToken() {
    this._decodedAccessToken = this.oauthService.getAccessToken();
    this._decodedIDToken = this.oauthService.getIdToken();
  }


}



