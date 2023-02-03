import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = environment.apiURL + 'users/tasks';

  constructor(
    private mHttpClient : HttpClient
  ) { }


  findAll() : Observable<Task[]>{
    return this.mHttpClient.get<Task[]>(this.baseURL);
  }

  deleteTask(id : string) : Observable<string>{
    return this.mHttpClient.delete<string>(`${this.baseURL}/${id}`);
  }

  updateTask(task : Task) : Observable<Task>{
    return this.mHttpClient.put<Task>(`${this.baseURL}/${task._id}`, task);
  }

  createTask(task : Task) : Observable<Task[]>{
    return this.mHttpClient.post<Task[]>(`${this.baseURL}`, task);
  }
}
