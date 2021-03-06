import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment';
import { ModalTaskComponent } from '../../components/modal-task/modal-task.component'

import { NgbModule,NgbActiveModal,NgbModal  } from '@ng-bootstrap/ng-bootstrap'
import { TodoService } from '../../services/todo.service'
import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  now = moment()
  
  tasks = []
  visibleTasks = []
  
  showOwner = true
  showCompletedTask = false

  modalOpen = false

  constructor(private modalService: NgbModal, private todoService: TodoService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getTasks()
  }


  logout():void{
    this.authService.setBasicAuth(null)
    this.router.navigate(['/login']);
  }

  requestNewTasks():void{
    let tasksResponse: any = this.todoService.requestNewTasks()     

    tasksResponse.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    )
  }

  getTasks(): void{
    let tasksResponse: any = this.todoService.getTasks()     

    tasksResponse.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    )
  }


  filterTasksPending(): any{
  	return this.tasks.filter(task => task.status == 'PENDING')
  }

  filterTasksCompleted(): any{
	return this.tasks.filter(task => task.status == 'COMPLETED')
  }

  filterTask(filter: string): void{
  	switch(filter){
  		case 'PENDING':
	  		this.showCompletedTask = false
	  		this.visibleTasks = this.filterTasksPending()
  			break

  		case 'COMPLETED':
  			this.showCompletedTask = true
  			this.visibleTasks = this.filterTasksCompleted()
  			break
  	}
  }

  openTaskModal(task: any): void{
  	
    this.modalOpen = true
  	
    let self = this
    
    const modalRef = this.modalService.open(ModalTaskComponent)
    modalRef.componentInstance.task = task
    modalRef.result.then(function (updated) {
        self.modalOpen = false 
        if(updated){
          self.getTasks()
        }
    });
  }

  onSuccess(data: any): void{
    this.tasks = data
    this.visibleTasks =  !this.showCompletedTask ? this.filterTasksPending() : this.filterTasksCompleted()
  }

  handleError(error: any): void{
  }
 
}
