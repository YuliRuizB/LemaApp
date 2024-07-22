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

export class NoAuthGuard implements CanActivate {
constructor(private afAuth: AngularFireAuth, private router: Router) {}
  firebaseData = inject(FirebaseService);
  utlsData = inject(UtilsService);

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable< boolean | UrlTree> | Promise <boolean |UrlTree > | boolean | UrlTree {
    
    
      return new Promise((resolve) => {

        this.firebaseData.getAut().onAuthStateChanged((auth)  => {
          if (!auth)   resolve(true);
          else {
            this.utlsData.routerLink('/home');
            resolve (false);
          }
        })
      })
  }
}
