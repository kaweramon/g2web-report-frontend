import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Product} from './product';

@Injectable()
export class ProductService {

  private urlProduct = 'http://localhost:8080/product';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public list(): Observable<Product[]> {
    return this.http.get(this.urlProduct, {headers: this.headers}).map(res => res.json());
  }
}
