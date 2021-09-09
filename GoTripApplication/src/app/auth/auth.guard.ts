import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as Parse from 'parse';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, ) { }


  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log(state)

    return Parse.Session.current().then(()=>{

      if(state.url === '/' ||  state.url === '/signup'  || state.url === 'forgot-password') {
        this.router.navigate(['/dashboard'])
        return false
      }
      return true
    }).catch(() => {
      if(state.url === '/' ||  state.url === '/signup'  || state.url === 'forgot-password') {
        return true
      }
      this.router.navigate(['']);
      return false
    });
    
  }

}
