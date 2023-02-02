import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskListComponent } from './task-list.component';

const routes: Routes = [
  {
    path : '',
    component : TaskListComponent,
    pathMatch : 'full'    
  },  
  {
    path : 'task-edit',
    component : TaskEditComponent
  } 
  ,  
  {
    path : 'task-add',
    component : TaskAddComponent
  }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
exports: [RouterModule]
})
export class TaskListRoutingModule { }
