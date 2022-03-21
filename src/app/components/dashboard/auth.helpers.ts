import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthHelpers implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer c3VwZXJhZG1pbkByYWFzbGVlbGEuY29tOkFkbWluQDEyMw==`
                }
            });
        
        return next.handle(request);
    }
}