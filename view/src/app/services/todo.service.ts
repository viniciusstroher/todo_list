import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class TodoService {

	private endPointUrl = 'api/heroes';  // URL to web api

  	httpOptions = {
    	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  	};

  	constructor(private http: HttpClient) { }

  	getTasks(): Observable<any> {
	  const url = `${this.endPointUrl}`;
	  return this.http.get<any>(url).pipe(
	     tap(_ => this.log(`getTasks error`)),
	     catchError(this.handleError<any>(`getTasks error`))
	  );
  	}

  	private handleError<T>(operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead

	      // TODO: better job of transforming error for user consumption
	      this.log(`${operation} failed: ${error.message}`);

	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	  }

	  private log(message: string) {
	    console.log(`TodoService: ${message}`);
	  }
}
