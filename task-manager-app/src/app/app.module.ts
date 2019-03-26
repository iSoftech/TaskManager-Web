import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav-bar/navbar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TaskService } from './api-service/task.service';
import { OrderByTaskNamePipe } from './sort-filter/order-by-task-name.pipe';
import { FilterPipe } from './sort-filter/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddTaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    OrderByTaskNamePipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
