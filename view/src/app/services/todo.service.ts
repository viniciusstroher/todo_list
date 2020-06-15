import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  	httpOptions = {
    	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  	};

  	constructor(private http: HttpClient, private authService: AuthService) {
  	 }

  	createTask(task: any): Observable<any> {
	  const url = `${this.authService.endpointUrl}/tasks`;
	  
	  let httpOptions = Object.assign({}, this.httpOptions);
	  httpOptions.headers = httpOptions.headers.append('Authorization',this.authService.getBasicAuth())

	  return this.http.post<any>(url,task,httpOptions).pipe(
	      // retry(3),
	      catchError(this.handleError)
	  );
  	}

  	updateTask(id:number,task: any): Observable<any> {
	  const url = `${this.authService.endpointUrl}/tasks/${id}`;
	  
	  let httpOptions = Object.assign({}, this.httpOptions);
	  httpOptions.headers = httpOptions.headers.append('Authorization',this.authService.getBasicAuth())

	  return this.http.put<any>(url,task,httpOptions).pipe(
	      // retry(3),
	      catchError(this.handleError)
	  );
  	}

  	getTasks(): Observable<any> {
	  const url = `${this.authService.endpointUrl}/tasks`;
	  
	  let httpOptions = Object.assign({}, this.httpOptions);
	  httpOptions.headers = httpOptions.headers.append('Authorization',this.authService.getBasicAuth())

	  return this.http.get<any>(url,httpOptions).pipe(
	      // retry(3),
	      catchError(this.handleError)
	  );
  	}

  	requestNewTasks(): Observable<any> {
	  const url = `${this.authService.endpointUrl}/tasks?type=request_new`;
	  
	  let httpOptions = Object.assign({}, this.httpOptions);
	  httpOptions.headers = httpOptions.headers.append('Authorization',this.authService.getBasicAuth())

	  return this.http.get<any>(url,httpOptions).pipe(
	      // retry(3),
	      catchError(this.handleError)
	  );
  	}

  	private handleError(error: HttpErrorResponse) {
	  return throwError(error.error);
	};

}
