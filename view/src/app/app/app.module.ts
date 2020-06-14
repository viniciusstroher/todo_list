import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from '../views/todo-list/todo-list.component';
import { LoginComponent } from '../views/login/login.component';
import { NgbModule,NgbActiveModal,NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 
import { HttpClientModule } from '@angular/common/http';


import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { Globals } from '../classes/globals'


import { ModalMessageComponent } from '../components/modal-message/modal-message.component'

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LoginComponent,
    ModalMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TodoService,AuthService,Globals,NgbActiveModal,NgbModal,ModalMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
