import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppResolver implements Resolve<Observable<boolean>> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    const params = route.params;
    return of(true);
  }
}
