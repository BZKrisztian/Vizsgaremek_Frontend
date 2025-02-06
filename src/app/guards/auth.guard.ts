import { CanActivate, Router} from "@angular/router";
import { AuthService } from "../services/auth.service";

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.getToken()) {
            return true;
        } else {
            this.router.navigate(['/entry']);
            return false;
        }
    }
}