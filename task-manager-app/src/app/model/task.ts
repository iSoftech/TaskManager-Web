import { ParentTask } from "./parentTask";

export class Task {
    taskId: number = 0;
    taskName: string = '';
    priority: number = 15;
    parentTask = new ParentTask();
    startDate: string = '';
    endDate: string = '';
    active: string = '';
}