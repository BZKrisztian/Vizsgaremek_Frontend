import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(private fobul: FormBuilder, private taskService: TaskService) {
    this.registerForm = this.fobul.group(
      {
        email : ['',[Validators.required, Validators.email]],
        password : ['',[Validators.required, Validators.minLength(6)]],
      }
    );
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.taskService.register(this.registerForm.value).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    }
  }

}
