import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    private formBuilderReg: FormBuilder,
    private authservice: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilderReg.group(
      {
        username: ['', [Validators.required,Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['',[
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')
        ]],
        confirmPassword:['',Validators.required]
      }, //for multiple validators, we need them in an array[]
      {
        validators: this.passMustMatch('password', 'confirmPassword')
      }
    )
  }
  passMustMatch(passwordKey:string, confirmPasswordKey:string){
    return (formGroup:FormGroup)=>{
      const password = formGroup.get(passwordKey);
      const confirmPassword = formGroup.get(confirmPasswordKey);
      if(password && confirmPassword && password.value !== confirmPassword.value){
        confirmPassword!.setErrors({mismatch:true})
      }else(
        confirmPassword!.setErrors(null)
      )
    }
  }


  onSubmit(): void {
    if(this.registrationForm.valid){
      const newUser: User = {
        user_Id: 0,
        userName: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        acc_CR_D: new Date(),
        acc_UP_D: new Date(),
        isAdmin: false,
        isEmailVerified: false
      };
      this.authservice.register(newUser).subscribe({
        next: () => {
          this.snackBar.open('Registration successful, please check your email :D', 'Close', { duration: 3000 });
          this.registrationForm.reset();
          setTimeout(() => {
            this.router.navigate(['/entry']);
          })
        },
        error: (err) => {
          let message = 'Registration failed'
          if(err.error?.message==='Email already in use'){
            message = 'The email is already in use. Please choose another one.'
          }else if(err.error?.message==='Username is already in use'){
            message = 'The username is already taken. Please choose another.'
          }
          this.snackBar.open(message,'Close',{duration:3000})
        }
      });
    }
  }

}
