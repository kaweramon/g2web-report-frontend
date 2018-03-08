import { Injectable } from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Budget} from './budget';
import {AppConstantsSettings} from "../util/app-constants-settings";

@Injectable()
export class BudgetService {

  // private urlBudget = 'http://localhost:8080/budget';
  private urlBudget = AppConstantsSettings.API_URL + 'budget';
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

  public update(budget: Budget): Observable<Budget> {
    this.params.set('budgetId', budget.id);
    return this.http.put(this.urlBudget, budget, {headers: this.headers, search: this.params}).map(this.extractData);
  }

  public search(query: string): Observable<Array<Budget>> {
    this.params.set('query', query);
    return this.http.get(this.urlBudget + '/search', {headers: this.headers, search: this.params})
      .map(this.extractData);
  }

  public deleteBudget(budgetId: number): Observable<any> {
    this.params.set('budgetId', budgetId.toString());
    return this.http.delete(this.urlBudget, {headers: this.headers, search: this.params}).map(this.extractData);
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

}
