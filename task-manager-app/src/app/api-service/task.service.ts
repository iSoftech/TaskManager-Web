import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { TaskResponse } from '../model/taskResponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}

@Injectable({ providedIn: 'root' })
export class TaskService {

  baseUrl: string = 'http://localhost:8080/TaskManager/api/tasks/';
  
  constructor(private http: HttpClient) { }

  getAllTasks() : Observable<TaskResponse> {
    return this.http.get<TaskResponse>(this.baseUrl, httpOptions);
  }

  getTask(id: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(this.baseUrl + id, httpOptions);
  }

  addTask(task: Task): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.baseUrl, task, httpOptions);
  }
  
  updateTask(task: Task): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(this.baseUrl + task.taskId, task, httpOptions);
  }

  deleteTask(id: number): Observable<TaskResponse> {
    return this.http.delete<TaskResponse>(this.baseUrl + id);
  }
}