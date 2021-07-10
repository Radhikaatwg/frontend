import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {

  phone_number_verify_status;
  public val;
  public user_value: any;

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;

    return this.verify_mobile(url);
    //return true;
  }

  verify_mobile(url: string): true | UrlTree {
    console.log("Url: " + url);

    //let val: string = this.tokenStorage.getUser().usertype;
    let val = this.userService.getUserDetails().pipe().subscribe(
      (data: any) => {
        this.user_value = data.phone_number_verification_status;
        console.log(this.user_value);
      });

    console.log(this.user_value);
      return true;
    /*if (val != null && val == "1") {
       return true;
    } else {
       return this.router.parseUrl('/verify-details');
    } */
  }

}
