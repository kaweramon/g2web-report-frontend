import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {QuickSell} from './quick-sell';

@Injectable()
export class QuickSellService {

  private urlQuickSellReport: string = 'http://localhost:8080/quicksell/';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public list(query: string): Observable<QuickSell[]> {
    this.params.set('search', query);
    return this.http.get(this.urlQuickSellReport, {search: this.params, headers: this.headers}).map(res => res.json());
  }

}
