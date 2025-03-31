import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'duedate'
})
export class DuedatePipe implements PipeTransform {

  transform(tasks: Task[]): Task[] {
    if(!tasks)return[];
    const today = new Date();
    today.setHours(0,0,0,0);

    return tasks.sort((a,b)=>{
      const dueDateA = a.due_Date ? new Date(a.due_Date) : null;
      const dueDateB = b.due_Date ? new Date(b.due_Date) : null;
      const isDueTodayA = dueDateA ? dueDateA.getDate() === today.getTime(): false;
      const isDueTodayB = dueDateB ? dueDateB.getDate() === today.getTime(): false;

      if(isDueTodayA && !isDueTodayB) return -1;
      if(!isDueTodayA && isDueTodayB) return 1;
      return 0;
    })

  }

}
