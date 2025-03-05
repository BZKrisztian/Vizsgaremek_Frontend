import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})

export class AdminGuard implements CanActivate {
    // dont forget to apply/implement it within app-routing
    constructor(private authService: AuthService, private router: Router){}

    canActivate(): boolean {
        const token = this.authService.getToken();
        const adminCheck = this.authService.getCurrentAdmin();
        if (token && adminCheck) {
            return true;
        } else {
            this.router.navigate(['/homepage']);
            return false;
        }
    }

}