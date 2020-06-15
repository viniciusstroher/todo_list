import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from '../views/todo-list/todo-list.component';
import { LoginComponent } from '../views/login/login.component';

import { AuthGuardService } from '../guards/auth-guard.service'
//user -> testesaipos@saipos.com.br
const routes: Routes = [
 
 { path: 'login', component: LoginComponent,canActivate: [AuthGuardService]},
 { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuardService]},
 { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
