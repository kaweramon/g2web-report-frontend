import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Employee} from './employee';

@Injectable()
export class EmployeeService {

  private urlEmployee = 'http://localhost:8080/employee';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public login(login: string, password: string): Observable<Employee> {
    this.params.set('login', login);
    this.params.set('password', password);
    return this.http.get(this.urlEmployee + '/login', {headers: this.headers, search: this.params}).map(res => res.json());
  }

  public getSalesman(): Observable<Array<Employee>> {
    return this.http.get(this.urlEmployee + '/salesman', {headers: this.headers}).map(res => res.json());
  }

  public getById(employeeId: number): Observable<Employee> {
    this.params.set('employeeId', employeeId.toString());
    return this.http.get(this.urlEmployee, {headers: this.headers, search: this.params}).map(res => res.json());
  }

}
