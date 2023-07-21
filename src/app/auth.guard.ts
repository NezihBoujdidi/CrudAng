import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CredentialslistService } from './Credentials.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isValid: boolean = false;

  constructor(private credentialsService: CredentialslistService,
    private router: Router) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.credentialsService.checkExp().subscribe({
        next: (response) => {
          console.log(response);
          this.isValid = true;
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          console.error(error);
          this.isValid = false;
          this.router.navigate(['/homePage']);
          observer.next(false);
          observer.complete();
        }
      }
      );
    });
  }

}
