import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('login') === -1) {
      console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
        })
      });
      console.log("1111111111111111111111111111111111111111111111111111", authReq)
      return next.handle(authReq);
    }
      if(req.url.indexOf('login') != -1){
        console.log("2222222222222222222222222222222222222222222222222222", req)
        return next.handle(req);
      }
      else {
      const reqVal = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
           })
      });
      console.log("333333333333333333333333333333333333333333333333333333333", reqVal)
      return next.handle(reqVal);
    }
  }
}
