import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators,  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router"
import { NgbModule,NgbActiveModal,NgbModal  } from '@ng-bootstrap/ng-bootstrap';

import { ModalMessageComponent } from '../../components/modal-message/modal-message.component'
import { Globals } from '../../classes/globals'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  
  loginForm;
  isLoading = false
  modalRef

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private modalService: NgbModal, private globals: Globals ) {
  	this.loginForm = new FormGroup({
	    inputLoginEmail: new FormControl('',[Validators.required,Validators.email]),
	    inputLoginPassword: new FormControl('',[Validators.required]),
	},{updateOn:'submit'});
 
  }

  get f() { return this.loginForm.controls; }

  onSubmit():void {
  	this.loginForm.markAllAsTouched();
    
    if (this.loginForm.invalid) {
        return;
    }

    this.setLoading(true);

    const auth = this.authService.generateBasicAuthString(this.loginForm.value.inputLoginEmail,this.loginForm.value.inputLoginPassword)

    let authResponse: any = this.authService.auth(auth)     

    authResponse.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
    
    // this.loginForm.reset()
  }


  setLoading(value: boolean): void{
    this.isLoading = value
  }

  getLoading(): boolean{
    return this.isLoading
  }

  onSuccess(data: any): void{
    this.setLoading(false);
      
    //registra authorizacao
    const auth = this.authService.generateBasicAuthString(this.loginForm.value.inputLoginEmail,this.loginForm.value.inputLoginPassword)
    this.authService.setBasicAuth(auth)

    this.router.navigate(['/todo-list'])
  }

  handleError(error: any): void{
    this.setLoading(false);
    this.openModal(error.message)
  }


  openModal(message: string): void{
    const modalRef = this.modalService.open(ModalMessageComponent);
    modalRef.componentInstance.message = message;
  }


  ngOnInit(): void {

  }

}
