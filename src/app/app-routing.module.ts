import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { TaskGuard } from './core/task.guard';
import { LoginComponent } from './views/auth/login/login.component';
import { SignupComponent } from './views/auth/signup/signup.component';

const routes: Routes = [  
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {    
    path : 'tasks',
    loadChildren: () => import('./views/task/task-list/task-list.module').then(m => m.TaskListModule),
    canLoad : [TaskGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
exports: [RouterModule]
})
export class AppRoutingModule { }
