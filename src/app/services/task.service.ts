import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { TaskList } from '../models/tasklist.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // private tasks: Task[] = [];
  // private tasklist: TaskList[] = [];

  private apiUrl = '';

  constructor(private http: HttpClient) {}


  //taskCRUD
  getTasks(taskList_Id: number): Observable<Task[]> {
    return this.http.get<Task[]>
    (`${this.apiUrl}/tasks?taskList_Id=${taskList_Id}`);
  }
  addTask(taskList_Id: number, task: Task): Observable<Task> {
    return this.http.post<Task>
    (`${this.apiUrl}/tasks?taskList_Id=${taskList_Id}`, task);
  }
  updateTask(taskList_Id: number,updatedTask: Task): Observable<Task> {
    return this.http.put<Task>
      (`${this.apiUrl}/tasks/${updatedTask.task_Id}?taskList_Id=${taskList_Id}`, updatedTask);
  }
  deleteTask(taskList_Id: number,task_Id: number) {
    return this.http.delete<void>
      (`${this.apiUrl}/tasks/${task_Id}?taskList_Id=${taskList_Id}`);
  }


  //tasklistCRUD
  getTaskLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>
      (`${this.apiUrl}/tasklists`);
  }
  addTaskList(tasklist: TaskList): Observable<TaskList> {
    return this.http.post<TaskList>
      (`${this.apiUrl}/tasklists`, tasklist);
  }
  updateTaskList(updatedTaskList: TaskList): Observable<TaskList> {
    return this.http.put<TaskList>
      (`${this.apiUrl}/tasklists/${updatedTaskList.list_Id}`, updatedTaskList);
  }
  deleteTaskList(list_Id: number): Observable<void> {
    return this.http.delete<void>
      (`${this.apiUrl}/tasklists/${list_Id}`);
  }

}
