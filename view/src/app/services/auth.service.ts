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
	      retry(3),
	      catchError(this.handleError)
	  );
  	}

  	private handleError(error: HttpErrorResponse) {
	  if (error.error instanceof ErrorEvent) {
	    // A client-side or network error occurred. Handle it accordingly.
	    console.error('An error occurred:', error.error.message);
	  } else {
	    // The backend returned an unsuccessful response code.
	    // The response body may contain clues as to what went wrong,
	    console.error(
	      `Backend returned code ${error.status}, ` +
	      `body was: ${error.error}`);
	  }
	  // return an observable with a user-facing error message
	  return throwError('Something bad happened; please try again later.');
	};

}
