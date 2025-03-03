import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { TaskList } from '../models/tasklist.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // private tasks: Task[] = [];
  // private tasklist: TaskList[] = [];

  private apiUrl = 'http://localhost:3000';
  // http://localhost:3000 => url for testing with json server

  constructor(private http: HttpClient) {}

  //taskCRUD
  getTasks(taskList_Id: number): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.apiUrl}/tasks?taskList_Id=${taskList_Id}`
    );
  }
  addTask(task: Task): Observable<Task> {
    if(!task.task_Priority){
      task.task_Priority = 'low';
    }
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }
  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${updatedTask.task_Id}`, updatedTask);
  }
  deleteTask(task_Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${task_Id}`);
  }

  //tasklistCRUD
  getTaskLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.apiUrl}/tasklists`);
  }
  addTaskList(tasklist: TaskList): Observable<TaskList> {
    return this.http.post<TaskList>(`${this.apiUrl}/tasklists`, tasklist);
  }
  updateTaskList(updatedTaskList: TaskList): Observable<TaskList> {
    return this.http.put<TaskList>(
      `${this.apiUrl}/tasklists/${updatedTaskList.list_Id}`,
      updatedTaskList
    );
  }
  // deleteTaskList(list_Id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/tasklists/${list_Id}`);
  // }
  //we wont need this anymore.

  //so, this method is for deleting every task within a list, and then the list itself
  //in case of interest, this method is called 'cascading'
  Order66(list_Id: number): Observable<void>{
    return this.getTasks(list_Id).pipe(
      switchMap(
        (tasks)=>{
          if(tasks.length>0){
            const purge = tasks.map(
              task => this.deleteTask(task.task_Id)
            )
            return forkJoin(purge).pipe(
              switchMap(
                ()=>this.http.delete<void>(`${this.apiUrl}/tasklists/${list_Id}`)
              )
            )
          }
          else{
            return this.http.delete<void>(`${this.apiUrl}/tasklists/${list_Id}`)
          }
        }
      )
    )
  }




}
