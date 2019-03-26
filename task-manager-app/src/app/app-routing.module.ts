import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
    { path: '', redirectTo: 'view-tasks', pathMatch: 'full' },
    { path: 'view-tasks', component: ViewTaskComponent },
    { path: 'add-task', component: AddTaskComponent },
    { path: 'edit-task', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
