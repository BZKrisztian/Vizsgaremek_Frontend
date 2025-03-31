export interface Task {
  task_Id: number;
  taskList_Id: number;
  task_Title: string;
  task_Description?: string;
  task_Status: boolean;
  task_Priority?: 'high' | 'medium' | 'low';
  due_Date?: Date;
  creation_Date: Date;
  update_Date: Date;
  owner_Id?: number;
  color?: string
}
