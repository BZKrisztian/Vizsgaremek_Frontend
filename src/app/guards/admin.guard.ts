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
        const adminToken = localStorage.getItem('adminToken');
        if (token && adminToken === 'true') {
            return true;
        } else {
            this.router.navigate(['/entry']);
            return false;
        }
    }

}