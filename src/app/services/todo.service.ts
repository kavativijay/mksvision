import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { List } from '../dashboard/dashboard.component';

export const SERVER_URL: string = "/api";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  url = 'https://jsonplaceholder.typicode.com/todos/'

  getToDoList(): Observable<any> {
    return this.http.get(this.url).pipe(
      catchError(function (err) {
        return throwError(err);
      })
    );
  }
  
  updateToDoList(body: List): Observable<any> {
    return this.http.patch(this.url + body.id, body).pipe(
      catchError(function (err) {
        return throwError(err);
      })
    );
  }

  saveToDoList(body: List): Observable<any> {
    return this.http.post(this.url, body).pipe(
      catchError(function (err) {
        return throwError(err);
      })
    );
  }

  removeList(body: List): Observable<any> {
    return this.http.delete(this.url + body.id).pipe(
      catchError(function (err) {
        return throwError(err);
      })
    );
  }
}
