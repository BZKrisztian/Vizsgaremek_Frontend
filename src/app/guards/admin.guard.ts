import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})

export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}

    canActivate(): boolean {
        const user = this.authService.getCurrentUser();

        if(this.authService.isLoggedIn() && user && user.isAdmin) {
            return true;
        }

        if(this.authService.isLoggedIn()){
            this.router.navigate(['/homepage'])
        }else{
            this.router.navigate(['/entry']);
        }

        return false

    }

}