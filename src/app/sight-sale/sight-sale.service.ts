import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SightSale} from './sight-sale';

@Injectable()
export class SightSaleService {

  private urlQuickSellReport: string = 'http://localhost:8080/sight-sale';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public search(query: string): Observable<SightSale[]> {
    this.params.set('search', query);
    return this.http.get(this.urlQuickSellReport, {headers: this.headers, search: this.params}).map(res => res.json());
  }
}
