import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageServiceEncrypt
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.localStorageService.get("currentUser")) {
      let url: string = state.url;
      return this.checkUserLogin(next, url);
    }

    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    let currentUser = JSON.parse(this.localStorageService.get("currentUser"));

    const userRole = currentUser.kullaniciTipi;
    if (route.data.role && route.data.role.indexOf(userRole) === -1) {
      this.router.navigate(["/access"]);
      return false;
    }
    return true;
  }
}
