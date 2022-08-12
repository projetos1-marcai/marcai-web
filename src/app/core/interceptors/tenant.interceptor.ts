import { TokenService } from './../services/token/token.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.isLoggedIn()) {
      const token: any = this.tokenService.getJwtToken();
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return (request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }));
  }
}
