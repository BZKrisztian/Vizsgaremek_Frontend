import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'completionstatus'
})
export class CompletionstatusPipe implements PipeTransform {

  transform(tasks: Task[]): Task[] {
    if(!tasks) return [];
    return tasks.sort((a,b)=>{
      return Number(a.task_Status) - Number(b.task_Status)
    })
  }

}
