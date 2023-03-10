import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from './../../../../model/task';
import { first } from 'rxjs';
import  Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit{

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('',[Validators.minLength(10), Validators.required]),
    scheduledTaskDate: new FormControl('', Validators.required),    
  });


  constructor(
    private mTaskService : TaskService,
    private mAuthService : AuthService
  ){

  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    let task = new Task();
    task.title = this.taskForm.get('title')?.value || '';
    task.description = this.taskForm.get('description')?.value || '';
    task.scheduledTaskDate = new Date(this.taskForm.get('scheduledTaskDate')?.value || '');    
    task.user_id = this.mAuthService.user._id;    
    
    this.mTaskService.createTask(task).pipe(first()).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: 'Created successfully'
      })
      console.log(data);      
    },error=>{
      console.log(error);      
      Swal.fire({
        icon: 'error',
        title: 'Création task error',
        text: error.error || 'Error when accessing to server',      
      })
    })
  }  
}
