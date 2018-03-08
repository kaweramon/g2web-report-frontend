import { Injectable } from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {BudgetProducts} from './budget-products';
import {Observable} from 'rxjs/Observable';
import {AppConstantsSettings} from "../util/app-constants-settings";

@Injectable()
export class BudgetProductsService {

  private urlBudgetProducts = AppConstantsSettings.API_URL + 'budget-products';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public create(listBudgetProducts: Array<BudgetProducts>): Observable<any> {
    return this.http.post(this.urlBudgetProducts, listBudgetProducts,
      {headers: this.headers}).map(this.extractData);
  }

  public update(listBudgetProducts: Array<BudgetProducts>, budgetId: number): Observable<any> {
    this.params.set('budgetId', budgetId.toString());
    return this.http.put(this.urlBudgetProducts, listBudgetProducts,
      {headers: this.headers, search: this.params}).map(this.extractData);
  }

  public deleteBudgetProducts(budgetId: number): Observable<any> {
    this.params.set('budgetId', budgetId.toString());
    return this.http.delete(this.urlBudgetProducts, {headers: this.headers, search: this.params}).map(this.extractData);
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

}
