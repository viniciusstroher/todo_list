import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators,  } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  loginForm;
  isLoading = false

  constructor(private formBuilder: FormBuilder, private authService: AuthService ) {
  	this.loginForm = new FormGroup({
	    inputLoginEmail: new FormControl('',[Validators.required,Validators.email]),//preencher quando tiver cache 
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

    let authResponse: any = this.authService.auth(this.loginForm.value.inputLoginEmail,this.loginForm.value.inputLoginPassword)     

    authResponse.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
    

    this.loginForm.reset()
  }


  setLoading(value: boolean): void{
    this.isLoading = value
  }

  getLoading(): boolean{
    return this.isLoading
  }

  onSuccess(data: any): void{
    this.setLoading(false);
  }

  handleError(error: any): void{
    this.setLoading(false);
  }



  ngOnInit(): void {

  }

}
