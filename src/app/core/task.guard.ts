import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskGuard implements CanLoad {
  canLoad(
    route: Route,
    segments: UrlSegment[]) : boolean {
    return true;
  }

}
