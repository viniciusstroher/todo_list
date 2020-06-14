import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators,  } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  loginForm;
  isLoading = false
  isSubmitted = false

  constructor(private formBuilder: FormBuilder ) {
  	this.loginForm = new FormGroup({
	    inputLoginEmail: new FormControl('',[Validators.required,Validators.email]),//preencher quando tiver cache 
	    inputLoginPassword: new FormControl('',[Validators.required]),
	},{updateOn:'submit'});
 
  }

  get f() { return this.loginForm.controls; }

  onSubmit():void {
  	this.loginForm.markAllAsTouched();
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.isLoading = true;
    this.isSubmitted = true;
   	this.loginForm.reset()
  }

  ngOnInit(): void {

  }

}
