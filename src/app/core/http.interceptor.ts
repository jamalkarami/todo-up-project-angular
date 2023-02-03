import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpInterceptorServices implements HttpInterceptor {

  constructor(private mAuthService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    const accessToken = this.mAuthService.token;
    if (accessToken) {
        request = this.addAccessTokenToHeader(request, accessToken);
    }

    return next.handle(request);
  }

  addAccessTokenToHeader(request: HttpRequest<unknown>, accessToken : string) {
    return request.clone({ headers: request.headers.set('Authorization', accessToken) });
}

}
