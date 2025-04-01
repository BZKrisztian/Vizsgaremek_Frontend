import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[] | undefined, search: string | undefined): Task[]{
    if(!tasks)return [];
    if(!search)return tasks;
    return tasks.filter(task=>
      (task.task_Title || '').toLowerCase().includes(search.toLowerCase())
    )
  }

}
