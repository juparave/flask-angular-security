import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  authenticationChanged = new Subject();
  constructor(private http: HttpClient, private router: Router) {
  }

  private handleAuthentication(): void {
    window.setTimeout(x => {
      this.authenticationChanged.next();
      this.router.navigate(['/articles']);
    }, 2000);

  }

  login(form: FormGroup): Observable<any> {
    return this.http.post<any>('/api/v1/login', {
      username: form.value.user_login,
      password: form.value.password
    })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication();
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>('/api/v1/logout', {})
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.authenticationChanged.next();
          this.router.navigate(['/']);
        })
      );
  }

  register(form: FormGroup): Observable<any> {
    return this.http.post<string>('/api/v1/register', {
      username: form.value.user,
      password: form.value.password_1,
      email: form.value.email_address1
    })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication();
        })
      );
  }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get<any>('/api/v1/users/current', {})
      .pipe(
        catchError(this.handleError),
        take(1),
        map(resp => {
          return new User(resp.response.data.user_id, resp.response.data.username, resp.response.data.email);
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error ||
      !errorRes.error.response) {
      return throwError(errorMessage);
    }

    if (errorRes.error.response.error) {
      return throwError(errorRes.error.response.error);

    } else if (errorRes.error.response.errors) {

      const errorObj = errorRes.error.response.errors;

      for (const prop in errorObj) {
        if (errorObj.hasOwnProperty(prop)) {
          errorMessage = errorObj[prop];
        }
      }
    }

    return throwError(errorMessage);
  }
}
