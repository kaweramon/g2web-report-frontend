import { Injectable } from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Budget} from './budget';

@Injectable()
export class BudgetService {

  private urlBudget = 'http://localhost:8080/budget';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public getLast(): Observable<Budget> {
    return this.http.get(this.urlBudget + '/last', {headers: this.headers}).map(res => res.json());
  }

  public create(budget: Budget): Observable<Budget> {
    return this.http.post(this.urlBudget, budget,
      {headers: this.headers}).map(this.extractData);
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

}
