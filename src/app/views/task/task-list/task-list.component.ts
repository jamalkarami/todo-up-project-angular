import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  
  tasks : Task[] = [];
  constructor(
    private mTaskService : TaskService,
    private mRouter : Router,
    private mActivatedRoute : ActivatedRoute,
    private mAuthService : AuthService
    ){

  }

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(){
    this.mTaskService.findAll(this.mAuthService.user._id).pipe(first()).subscribe(tasks=>{
      this.tasks = tasks;
      console.log(tasks);      
    },error=>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error while retrieving data',      
      });
    })
  }

  onAddTask(){
    this.mRouter.navigate(['task-add'], {relativeTo : this.mActivatedRoute})
  }

  onDeleteTask(task : Task){
    this.mTaskService.deleteTask(task._id).pipe(first()).subscribe(data=>{
      console.log("the data :" , data);    
      Swal.fire({
        icon: 'success',
        title: 'deleted successfully'
      });
      this.loadTask();
    }, error=>{
      console.log("the error : " ,error);      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error || 'Error when accessing to server',    
      })
    })
  }

  onEditTask(task : Task){
      this.mRouter.navigate(['task-edit'], {relativeTo : this.mActivatedRoute, queryParams : task})
  }

  onLogout(){
    this.mAuthService.token = '';
    this.mRouter.navigate(['login'])
  }
}
