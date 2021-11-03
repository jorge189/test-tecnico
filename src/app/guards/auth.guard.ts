import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { delay, tap ,take,map,first, switchMap} from 'rxjs/internal/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private router: Router) { }
    
    canActivate(){

      return this.auth.authState.pipe(
        take(1),
        switchMap(async (authState) => {
            if (authState) {
                return true;
            } else {
              this._snackBar.open("No esta auntenticado", "cerrar", {
                duration: 5000,
               });
                console.log('No autenticado');
                this.router.navigate(['/auth/login'])
                return false
            }
        }),
    )

  }
  
}
