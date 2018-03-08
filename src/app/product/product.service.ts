import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from './product';
import {AppConstantsSettings} from "../util/app-constants-settings";

@Injectable()
export class ProductService {

  // private urlProduct = 'http://localhost:8080/product';
  private urlProduct = AppConstantsSettings.API_URL + 'product';
  headers = new Headers({ 'Content-Type': 'application/json' });
  params: URLSearchParams = new URLSearchParams();

  constructor(private http: Http) { }

  public list(): Observable<Product[]> {
    return this.http.get(this.urlProduct, {headers: this.headers}).map(res => res.json());
  }

  public search(query: string): Observable<Product[]> {
    this.params.set('query', query);
    return this.http.get(this.urlProduct + '/search', {headers: this.headers, search: this.params}).map(res => res.json());
  }

  public findByBarCode(barCode: string): Observable<Product> {
    this.params = new URLSearchParams();
    this.params.set('barCode', barCode);
    return this.http.get(this.urlProduct + '/barCode', {headers: this.headers, search: this.params})
      .map(res => res.json());
  }

}
