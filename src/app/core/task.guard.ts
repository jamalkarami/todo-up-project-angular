import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanLoad {

  constructor(
    private mAuthService : AuthService,
    private mRouter   : Router
    ){

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]) : boolean {
    if(!this.mAuthService.token){
      this.mRouter.navigate(['login']);
      return false;
    }

    return true;
  }
}
