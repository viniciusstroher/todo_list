import { Injectable } from '@angular/core';
import { CanActivate,Router,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,private router: Router) { }
 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  	if (state.url !== '/login' && !this.authService.getBasicAuth()) {
        this.router.navigate(['/login']);
        return false;
    }

    return true;
  }
}