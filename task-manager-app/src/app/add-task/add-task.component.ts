import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Task } from '../model/task';
import { TaskService } from '../api-service/task.service';
import { Router } from '@angular/router';
import { first } from "rxjs/operators";

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

    addTaskForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) {
        this.addTaskForm = this.initializeFormGroup();
    }

    initializeFormGroup(): FormGroup {
        return this.formBuilder.group({
            taskId: [''],
            taskName: ['', Validators.required],
            parentTask: this.formBuilder.group({
                parentTaskId: [''],
                parentTaskName: ['']
            }),
            priority: ['15', Validators.compose([Validators.required, Validators.min(0), Validators.max(30)])],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            active: ['Y']
        });
     }

    addTask() {
        const newTask: Task = Object.assign({}, this.addTaskForm.value);
        newTask.parentTask = Object.assign({}, newTask.parentTask);
        this.taskService.addTask(newTask)
        .pipe(first())
        .subscribe(
            data => {
                if (data.statusCode == 201) {
                    alert("You've successfully added a new Task!");
                    this.router.navigate(['view-tasks']);
                } else {
                    alert(data.message);
                }
            }, 
            error => {
                alert("Sorry! Something went wrong, new task cannot be added at the moment. Please try again.");
            }
        );
    }

    onSubmit() {
        this.addTask();
    }

    reset() {
        this.addTaskForm.reset({
            taskId: '',
            taskName: '',
            parentTask: ({
                parentTaskId: '',
                parentTaskName: ''
            }),
            priority: '15',
            startDate: '',
            endDate: '',
            active: 'Y'
        });
    }
}
