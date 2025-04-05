import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class MyProfileComponent implements OnInit {

  profileForm!: FormGroup
  userId: number = 0

  constructor(
    private FormB: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.authService.getCurrentUser()
    if(!user)
      return

    this.userId = user.user_Id

    this.profileForm = this.FormB.group({
      userName: [user.userName, [Validators.required, Validators.minLength(6)]],
      email: [user.email, [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: ['']
    }, {validators: this.passwordsMustMatch})
  }

  passwordsMustMatch(group: FormGroup){
    const passW = group.get('password')?.value;
    const confPassW = group.get('confirmPassword')?.value;
    if (!passW && !confPassW)
      return null
    return passW === confPassW ? null : {mismatch:true}
  }

  onSubmit():void{
    if(this.profileForm.invalid)
      return;

    const {userName, email, password } = this.profileForm.value;

    this.authService.updateSelf({ userName, email, password }).subscribe({
      next: (res)=>{
        this.snackBar.open('Profile updated successfully','Close', {duration: 3000})
        this.authService.refreshCurrentUser()
      },
      error: (err)=>{
        const message = err.error?.message || 'Profile update failed'
        this.snackBar.open(message, 'Close', {duration: 3000})
      }
    })

  }

  onClickDeleteAccount():void{
    const firstConfirm = confirm("Are you sure you want to delete your account?")
    if(!firstConfirm)
      return

    const secondConfirm = confirm("This action cannot be undone. Are you sure you want to delete your account?")
    if(!secondConfirm)
      return

    this.authService.harakiri().subscribe({
      next:()=>{
        this.snackBar.open("Account deleted successfully", "Close", {duration: 3000})
        this.authService.logout();
        this.router.navigate(['/entry']);
      },
      error:(err)=>{
        console.error(err)
        this.snackBar.open("Failed to delete account.", "Close", {duration: 3000})
      }
    })
  }


}
