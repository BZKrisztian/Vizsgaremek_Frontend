import { Task } from "./task.model";

export interface TaskList {
    list_Id: number;
    list_Title: string;
    list_Description?: string;
    creation_Date: Date;
    update_Date: Date;
    tasks?: Task[],
    owner_Id?: number,
    color?: string
}