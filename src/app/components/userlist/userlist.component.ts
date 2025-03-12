import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  imports: [
    CommonModule
  ]
})
export class UserlistComponent implements OnInit {

  users: User[] = []
  errorMessage: string = ''

  constructor(private authService: AuthService) { }

  ngOnInit():void{
    this.loadUsers()
  }

  loadUsers(){
    this.authService.getUsers().subscribe(
      (users) => this.users = users,
      (err) => {
        this.errorMessage = "Could not load users."
        console.log(err)
      }
    )
  }
  deleteUser(user_Id: number):void{
    if(confirm("Are you sure you want to delete this user?")){
      this.authService.deleteUser(user_Id).subscribe(
        ()=>{
          this.users = this.users.filter(user => user.user_Id != user_Id)
        },
        (err)=>{
          this.errorMessage = "Could not delete user."
          console.log(err)
        }
      )
    }
  }

}
