import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar) {}

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
        isAdmin: false
      };
      this.authservice.register(newUser).subscribe({
        next: () => {
          this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
          this.registrationForm.reset();
        },
        error: (err) => {
          const message = err.error?.message || 'Registration failed';
          this.snackBar.open(`Registration failed: ${message}`, 'Close', { duration: 3000 });
        }
      });
    }
  }

}
