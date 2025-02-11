import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable< boolean | UrlTree> | Promise <boolean |UrlTree > | boolean | UrlTree {
    
    let user = localStorage.getItem('user');

      return new Promise((resolve) => {

        this.firebaseData.getAut().onAuthStateChanged((auth)  => {
          if (auth) {
            if (user) resolve(true);
          }
          else {
            this.utlsData.routerLink('/login');
            resolve (false);
          }
        })
      })
  }

 /*  canActivate() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  } */
}