import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { nextSortDir } from '@swimlane/ngx-datatable';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/firebase/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  H
  constructor(public authService: AuthService,
    public router: Router) { }

   


  // canActivate(next: ActivatedRouteSnapshot, 
  //     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   Guard for user is login or not
  //   let user = JSON.parse(localStorage.getItem('user'));
  //   if (!user || user === null) {
  //     this.router.navigate(['/auth/login']);
  //     return true
  //   }
  //   else if (user) {
  //     if (!Object.keys(user).length) {
  //       this.router.navigate(['/auth/login']);
  //       return true
  //     }
  //   }
  //   return true
  // }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.isLoggedIn();
  
    if (user) {
      return true;
    }
    else {
      // this.router.navigate(['/auth/login'], {
      //   queryParams: { returnUrl: state.url },
      // });
      return true;
    }

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
  const token = this.authService.getToken();
  if(token){
     request = request.clone({
      setHeaders:{Authorization:`Authorization token ${token}`}
     });
  }

  return next.handle(request).pipe(
    catchError((err)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status ===401){

        }
      }
      return throwError(err);
    })
  )
}

}
