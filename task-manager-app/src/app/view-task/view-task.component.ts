import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TaskService } from '../api-service/task.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.viewTasks();
  }

  viewTasks() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data.response; 
      this.sort();
    });
  }

  editTask(task: Task) {
    window.localStorage.removeItem('selectedTaskId');
    window.localStorage.setItem('selectedTaskId', task.taskId.toString());
    this.router.navigate(['edit-task']);
  }

  prepareEndTask(task: Task) {
    window.localStorage.removeItem('selectedTaskId');
    window.localStorage.setItem('selectedTaskId', task.taskId.toString());
  }

  endTask() {
    let selectedTaskId: any = window.localStorage.getItem('selectedTaskId');
    if (selectedTaskId) {
      let selectedTask: Task;
      this.taskService.getTask(selectedTaskId).subscribe(data => {
        selectedTask = data.response;
        selectedTask.active = 'N';
        this.taskService.updateTask(selectedTask).pipe(first())
        .subscribe(data => {
            if (data.statusCode == 201) {
              setTimeout("2000");
              alert("You've successfully completed a Task!");
              this.ngOnInit();
            } else {
              alert(data.message);
            }
          }, error => {
            alert("Sorry! Something went wrong, update cannot be possible at the moment. Please try again.");
        });
      });
    }
  }

  sort() {
    this.tasks.sort((t1: Task, t2: Task) => {
      let num = t1.taskName.localeCompare(t2.taskName);
      if (num < 0) {
        return -1;
      } else if (num > 0) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
