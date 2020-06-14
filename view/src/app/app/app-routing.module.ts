import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from '../views/todo-list/todo-list.component';
import { TodoNewComponent } from '../views/todo-new/todo-new.component';
import { LoginComponent } from '../views/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
 { path: 'login', component: LoginComponent },
 { path: 'todo-list', component: TodoListComponent },
 { path: 'todo-new', component: TodoNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
