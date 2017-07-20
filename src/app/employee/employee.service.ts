import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Employee} from './employee';

@Injectable()
export class EmployeeService {

  private urlEmployeeLogin = 'http://localhost:8080/employee/login';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public login(login: string, password: string): Observable<Employee> {
    this.params.set('login', login);
    this.params.set('password', password);
    return this.http.get(this.urlEmployeeLogin, {headers: this.headers, search: this.params}).map(res => res.json());
  }

}
