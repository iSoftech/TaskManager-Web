import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';
import { ViewTaskComponent } from '../view-task/view-task.component';

@Pipe({
  name: 'orderByTaskName',
  pure: false
})
export class OrderByTaskNamePipe implements PipeTransform {

  constructor(private viewTaskComponent: ViewTaskComponent) {}

  transform(tasks: Task[]): Task[] {
    this.viewTaskComponent.sort();
    return this.viewTaskComponent.tasks;
  }
}
