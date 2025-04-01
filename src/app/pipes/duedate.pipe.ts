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
      
      const isDueTodayA = dueDateA ? this.isSameDayorNot(dueDateA,today): false;
      const isDueTodayB = dueDateB ? this.isSameDayorNot(dueDateB,today): false;

      if(isDueTodayA && !isDueTodayB) return -1;
      if(!isDueTodayA && isDueTodayB) return 1;
      return 0;
    })

  }

  private isSameDayorNot(date1: Date, date2: Date): boolean {
    return(
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
      )
  }

}
