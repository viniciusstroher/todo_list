import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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

  constructor() { }

  ngOnInit(): void {
  	this.tasks = [{id: 1,
  		   responsibleName: "Vinicius",
  		   responsibleEmail: "viniciusferreirawk@gmail.com", 
  		   description:"teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste",
  		   status:'PENDING',
  		   createdAt: this.now.format('DD/MM/YYYY hh:mm')},
  		   {id: 2,
  		   responsibleName: "Vinicius",
  		   responsibleEmail: "viniciusferreirawk@gmail.com", 
  		   description:"teste2 teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste",
  		   status:'COMPLETED',
  		   createdAt: this.now.format('DD/MM/YYYY hh:mm')}];

  	this.visibleTasks = this.filterTasksPending();
  	// this.visibleTasks = []

  }

  filterTasksPending(): any{
  	return this.tasks.filter(task => task.status == 'PENDING')
  }

  filterTasksCompleted(): any{
	return this.tasks.filter(task => task.status == 'COMPLETED')
  }

  toogleTasks(): void{
  	if(!this.showCompletedTask){
  		this.showCompletedTask = true
  		this.visibleTasks = this.filterTasksCompleted()
  	}else{
  		this.showCompletedTask = false
  		this.visibleTasks = this.filterTasksPending()
  	}
  }
}
