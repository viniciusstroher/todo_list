import { Component,Type, OnInit, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl , Validators,  } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Globals } from '../../classes/globals';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})

export class ModalTaskComponent implements OnInit {
  taskForm
  now = moment()

  showInvalidemail = false
  didUMean = ""

  //handle peding task request
  showinputTaskPasswordPermitPending=false
  inputTaskPasswordPermitPending=""
  requiredPassword = false
  passwordError = false

  showMaxPendingTask=false
  isLoading = false
  updated = false
  @Input() task

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private todoService: TodoService,private globals: Globals) { 
  	
  }

  get f() { return this.taskForm.controls; }

  async onSubmit():Promise<void>{
    this.showMaxPendingTask = false
    this.showInvalidemail = false
    this.taskForm.markAllAsTouched();
    
    if (this.taskForm.invalid) {
        return;
    }

    let emailValidateData 
    try{
      emailValidateData= await this.todoService.verifyEmail(this.taskForm.value.inputTaskEmail)

    }catch(ex){
      return
    }
    
    if(!emailValidateData.format_valid){
      this.showInvalidemail = true
      return
    }
    
    if(emailValidateData.did_you_mean != ''){
      this.didUMean = emailValidateData.did_you_mean
      return
    }

    this.setLoading(true)
    this.task = {id:this.task.id != 0 ? this.task.id : 0,
                responsibleName:this.taskForm.value.inputTaskName,
                responsibleEmail:this.taskForm.value.inputTaskEmail,
                description:this.taskForm.value.inputTaskDescription,
                status:this.task.status,
                tries:this.task.tries,
                createdAt:this.task.createdAt}

    let todoResponse: any = null
    if(this.task.id == 0){
      todoResponse = this.todoService.createTask(this.task)  
    }else{
      todoResponse = this.todoService.updateTask(this.task.id,this.task)  
    }

    todoResponse.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  completeTask():void{
    let task = Object.assign({}, this.task);
    task.status = 'COMPLETED'

    let todoResponse: any = this.todoService.updateTask(task.id,task)  
    todoResponse.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  requestPendingTask():void{
    this.showinputTaskPasswordPermitPending = true
  }

  closeRequestPendingTask():void{
    this.showinputTaskPasswordPermitPending = false
    this.clearPasswordValidation()
  }
  
  clearPasswordValidation():void{
    this.requiredPassword = false
    this.passwordError = false
  }

  checkPassword():void{
    this.clearPasswordValidation()

    const password = this.taskForm.controls.inputTaskPasswordPermitPending._pendingValue
    if(password == ""){
      this.requiredPassword = true
      return 
    }

    if(this.globals.passwordToPendingTask != password){
      this.passwordError = true
      return
    }else{
      this.pendingTask()
    }
  }

  pendingTask():void{
    let task = Object.assign({}, this.task);
    if(task.tries+1 > this.globals.maxTaskTries){
      this.showMaxPendingTask = true
      return 
    }

    task.status = 'PENDING'
    task.tries +=1

    let todoResponse: any = this.todoService.updateTask(task.id,task)  
    todoResponse.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
  }

  onSuccess(data: any): void{
    this.setLoading(false);
    this.task = data
    this.updated = true

    this.closeRequestPendingTask()
  }

  handleError(error: any): void{
    this.setLoading(false);
  }

  setLoading(value: boolean): void{
    this.isLoading = value
  }

  getLoading(): boolean{
    return this.isLoading
  }

  ngOnInit(): void {
  	if(this.task == null){
  		this.task = {id:0,
    			  		  responsibleName:null,
    			  		  responsibleEmail:null,
    			  		  description:null,
    			  		  status:'PENDING',
                  tries:0,
    			  		  createdAt:null}
  	}
  	this.taskForm = new FormGroup({
    		inputTaskName:new FormControl(this.task.responsibleName,[Validators.required]),
  	    inputTaskEmail: new FormControl(this.task.responsibleEmail,[Validators.required,Validators.email]),
  	    inputTaskDescription: new FormControl(this.task.description,[Validators.required]),
        inputTaskPasswordPermitPending: new FormControl('')
  	},{updateOn:'submit'});
  }

}
