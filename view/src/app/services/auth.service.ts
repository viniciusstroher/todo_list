import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { Globals } from '../classes/globals'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  	endpointUrl = this.globals.endpointUrl;  // URL to web api

  	httpOptions = {
    	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  	};

  	authorizationToken

 	generateBasicAuthString(email:string,password:string):string {
 		return btoa(email+":"+password)
 	}

 	setBasicAuth(auth: string): void {
 		localStorage.setItem('authorizationToken', auth);
	  	this.authorizationToken = auth
	}

	getBasicAuth(): string{
		return this.authorizationToken || localStorage.getItem('authorizationToken') 
	}

  	constructor(private http: HttpClient,private globals: Globals) { }

  	auth(auth:string): Observable<any> {
	  const url = `${this.endpointUrl}/auth`;
	  
	  let httpOptions = Object.assign({}, this.httpOptions);
	  httpOptions.headers = httpOptions.headers.append('Authorization','Basic '+auth)

	  return this.http.post<any>(url,{},httpOptions).pipe(
	      // retry(3),
	      catchError(this.handleError)
	  );
  	}

  	private handleError(error: HttpErrorResponse) {
	  return throwError(error.error);
	};

}
