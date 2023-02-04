import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = environment.apiURL + 'users';

  constructor(
    private mHttpClient : HttpClient
  ) { }


  findAll(user_id : string) : Observable<Task[]>{
    return this.mHttpClient.get<Task[]>(`${this.baseURL}/${user_id}/tasks`);
  }

  deleteTask(id : string) : Observable<string>{
    return this.mHttpClient.delete<string>(`${this.baseURL}/tasks/${id}`);
  }

  updateTask(task : Task) : Observable<Task>{
    return this.mHttpClient.put<Task>(`${this.baseURL}/tasks/${task._id}`, task);
  }

  createTask(task : Task) : Observable<Task[]>{
    return this.mHttpClient.post<Task[]>(`${this.baseURL}/tasks`, task);
  }
}
