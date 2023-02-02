import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskAddComponent } from './task-add/task-add.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskEditComponent,
    TaskAddComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule
  ]
})
export class TaskListModule { }
