import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TaskService } from './../../../../services/task.service';
import  Swal  from 'sweetalert2';
import { first } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  taskForm : FormGroup;
  _id : string;

  constructor(
    private mTaskService : TaskService,
    private mActivatedRoute: ActivatedRoute,
    public datepipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this._id = this.mActivatedRoute.snapshot.queryParamMap.get('_id') || '';
    let title = this.mActivatedRoute.snapshot.queryParamMap.get('title');
    let description = this.mActivatedRoute.snapshot.queryParamMap.get('description');
    let date = this.mActivatedRoute.snapshot.queryParamMap.get('scheduledTaskDate') || '';
    let scheduledDate = this.datepipe.transform(date, 'yyyy-MM-dd');;   
    console.log(scheduledDate);        
    this.taskForm= new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.minLength(10)),
      scheduledTaskDate: new FormControl(scheduledDate),    
    });            
  }

  onSubmit(){
    let task = new Task(); 
    task._id = this._id;   
    task.title = this.taskForm.get('title')?.value || '';
    task.description = this.taskForm.get('description')?.value || '';
    task.scheduledTaskDate = this.taskForm.get('scheduledTaskDate')?.value || '';
    
    console.log(task);
    
    this.mTaskService.updateTask(task).pipe(first()).subscribe(data=>{
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
