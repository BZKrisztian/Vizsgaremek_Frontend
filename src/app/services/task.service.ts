import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { TaskList } from '../models/tasklist.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private tasklist: TaskList[] = [];

  private apiUrl = '';

  constructor(private http: HttpClient) {}



  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
  addTask(task: Task) {
    task.task_Id = this.tasks.length + 1;
    task.creation_Date = new Date();
    task.update_Date = new Date();
    this.tasks.push(task);
    return of(task);
  }
  updateTask(updatedTask: Task) {
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



  getTaskLists(): Observable<TaskList[]> {
    return of(this.tasklist)
  }
  addTaskList(tasklist: TaskList) {
    tasklist.list_Id = this.tasklist.length + 1;
    tasklist.creation_Date = new Date();
    tasklist.update_Date = new Date();
    this.tasklist.push(tasklist);
    return of(tasklist);
  }
  updateTaskList(updatedTaskList: TaskList) {
    this.tasklist = this.tasklist.map((tasklist) =>
      tasklist.list_Id === updatedTaskList.list_Id
        ? { ...updatedTaskList, update_Date: new Date() }
        : tasklist
    );
    return of(updatedTaskList);
  }
  deleteTaskList(list_Id: number) {
    this.tasklist = this.tasklist.filter((tasklist) => tasklist.list_Id !== list_Id);
    return of(list_Id);
  }



  register(userData: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}`, userData);
  }
}
