import { TokenStorageServiceService } from './token-storage-service.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

const TOKEN_HEADER_KEY = "Authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    // const token = this.tokenStorageService.getToken();
    // console.log("INTERCEPTOR: " + token);
    
    // if (token != null) {
    //   authReq = req.clone({
    //     headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
    //   })
    // }
    return next.handle(authReq);
  }
}
