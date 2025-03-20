import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'sortbypriority',
  standalone: true
})
export class SortbypriorityPipe implements PipeTransform {

  transform(tasks: Task[]): Task[] {
    if(!tasks)return[];
    const priorityOrder = {high:1, medium:2, low:3};
    return tasks.sort((a,b)=>{
      const priorityA = priorityOrder[a.task_Priority || 'low'];
      const priorityB = priorityOrder[b.task_Priority || 'low'];
      return priorityA - priorityB
    })
  }

}
