import { Injectable } from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {BudgetProducts} from './budget-products';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BudgetProductsService {

  private urlBudgetProducts = 'http://localhost:8080/budget-products';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public create(listBudgetProducts: Array<BudgetProducts>): Observable<any> {
    return this.http.post(this.urlBudgetProducts, listBudgetProducts,
      {headers: this.headers}).map(this.extractData);
  }

  public deleteBudgetProducts(budgetId: number): Observable<any> {
    this.params.set('budgetId', budgetId.toString());
    return this.http.delete(this.urlBudgetProducts, {headers: this.headers, search: this.params}).map(this.extractData);
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

}
