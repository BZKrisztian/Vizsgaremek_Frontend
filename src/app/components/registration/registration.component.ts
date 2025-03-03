import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private formBuilderReg: FormBuilder, private authservice: AuthService) {
    this.registrationForm = this.formBuilderReg.group(
      {
        username: ['', [Validators.required,Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      } //for multiple validators, we need them in an array[]
    )
  }

  ngOnInit(): void {}


  onSubmit(){
    if(this.registrationForm.valid){
      const newUser: User = {
        user_Id : 0,
        userName: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        acc_CR_D: new Date(),
        acc_UP_D: new Date()
      }
      this.authservice.register(newUser).subscribe(
        (res)=>
          {
            this.successMessage = "Registration successful! :D"
            this.errorMessage = ""
            console.log("Succesfully registered C:",res)
            this.registrationForm.reset()
          },
        (err)=>
          {
            this.errorMessage = "Registration failed, maybe try again? :C"
            this.successMessage = ""
            console.error(err)
            this.registrationForm.reset()
          }
      )
    }
  }

}
