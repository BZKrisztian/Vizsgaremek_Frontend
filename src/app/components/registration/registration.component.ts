import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

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

  constructor(private formBuilderReg: FormBuilder, private taskService: TaskService) {
    this.registrationForm = this.formBuilderReg.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilderReg.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid)
          {
            return;
          }
    
    const newUser: User = {
      user_Id : 0,
      userName: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      acc_CR_D: new Date(),
      acc_UP_D: new Date()
    };
    
    this.taskService.register(newUser).subscribe(
      (response) => {
        console.log('Registration successful', response);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  };
    

}
