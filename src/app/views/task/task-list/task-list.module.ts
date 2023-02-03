import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskEditComponent,
    TaskAddComponent,
    
  ],
  providers : [
    DatePipe
  ],
  imports: [  
  CommonModule,
    TaskListRoutingModule,
    ReactiveFormsModule
  ]
})
export class TaskListModule { }
