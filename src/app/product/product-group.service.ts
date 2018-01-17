import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ProductGroup} from './product-group';

@Injectable()
export class ProductGroupService {

  // private urlProductGroups = 'http://localhost:8080/product-group';
  private urlProductGroups = '/product-group';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public list(): Observable<ProductGroup[]> {
    return this.http.get(this.urlProductGroups, {headers: this.headers}).map(res => res.json());
  }

}
