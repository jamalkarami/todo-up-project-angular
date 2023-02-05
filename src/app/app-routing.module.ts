import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { TaskGuard } from './core/task.guard';
import { LoginComponent } from './views/auth/login/login.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { PageNotFoundComponent } from './views/errors/page-not-found/page-not-found.component';

const routes: Routes = [  
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
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
  },
  {
    path : '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
exports: [RouterModule]
})
export class AppRoutingModule { }
