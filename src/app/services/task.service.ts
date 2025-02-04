import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { taskmodel } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: taskmodel[] = [];

  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<taskmodel[]> {
    return of(this.tasks);
  }
  addTask(task: taskmodel) {
    task.task_Id = this.tasks.length + 1;
    task.creation_Date = new Date();
    task.update_Date = new Date();
    this.tasks.push(task);
    return of(task);
  }
  updateTask(updatedTask: taskmodel) {
    this.tasks = this.tasks.map((task) =>
      task.task_Id === updatedTask.task_Id
        ? { ...updatedTask, update_Date: new Date() }
        : task
    );
    return of(updatedTask);
  }
  deleteTask(task_Id: number) {
    this.tasks = this.tasks.filter((task) => task.task_Id !== task_Id);
    return of(task_Id);
  }

  register(userData : {email : string, password : string}){
    return this.http.post(`${this.apiUrl}`, userData)
  }



}
