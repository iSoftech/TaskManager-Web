import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from '../model/task';
import { TaskService } from '../api-service/task.service';
import { Router } from '@angular/router';
import {first} from "rxjs/operators";

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editTaskForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) {
  }

  ngOnInit() {
    let selectedTaskId = window.localStorage.getItem("selectedTaskId");
    if (selectedTaskId) {
      this.editTaskForm = this.initializeFormGroup(this.formBuilder);
      this.getTask(selectedTaskId);
    }
  }

  initializeFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({ 
        taskId: [''],
        taskName: ['', Validators.required],
        parentTask: formBuilder.group({
           parentTaskId: [''],
           parentTaskName: ['', Validators.required]
         }),
        priority: ['15', Validators.compose([Validators.required, Validators.min(0), Validators.max(30)])],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        active: ['Y']
    });
  }

  getTask(taskId: any) {
    this.taskService.getTask(taskId).subscribe(data => {
      this.editTaskForm.setValue(data.response);
    });
  }

  updateTask() {
    const editedTask: Task = Object.assign({}, this.editTaskForm.value);
    editedTask.parentTask = Object.assign({}, editedTask.parentTask);
    this.taskService.updateTask(editedTask)
      .pipe(first())
      .subscribe(data => {
          if (data.statusCode == 201) {
            alert("You've successfully updated the Task!");
            this.router.navigate(['view-tasks']);
          } else {
            alert(data.message);
          }
        }, error => {
          alert("Sorry! Something went wrong, update cannot be possible at the moment. Please try again.");
      });
  }

  onSubmit() {
    this.updateTask();
  }

  cancelEdit(): void {
    this.router.navigate(['view-tasks']);
  }
}
