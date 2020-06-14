import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { Globals } from '../classes/globals'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  	private endpointUrl = this.globals.endpointUrl+'/api/auth';  // URL to web api

  	httpOptions = {
    	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  	};

  	constructor(private http: HttpClient,private globals: Globals) { }

  	auth(email: string, password: string): Observable<any> {
	  const url = `${this.endpointUrl}`;
	  
	  let httpOptions = Object.assign({}, this.httpOptions);
	  httpOptions.headers = httpOptions.headers.append('Authorization','Basic '+btoa(email+":"+password))

	  return this.http.post<any>(url,{},httpOptions).pipe(
	      // retry(3),
	      catchError(this.handleError)
	  );
  	}

  	private handleError(error: HttpErrorResponse) {
	  return throwError(error.error);
	};

}
