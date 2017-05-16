import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ProductFamily} from './product-family';

@Injectable()
export class ProductFamilyService {

  private urlProductFamilies = 'http://localhost:8080/product-family';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public list(prodGroupId: string): Observable<ProductFamily[]> {
    this.params.set('productGroupId', prodGroupId);
    return this.http.get(this.urlProductFamilies, {search: this.params, headers: this.headers}).map(res => res.json());
  }
}
