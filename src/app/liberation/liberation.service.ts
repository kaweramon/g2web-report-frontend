import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Liberation} from './liberation';

@Injectable()
export class LiberationService {

  private urlLiberationReport = 'http://localhost:8080/liberation/';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params = new URLSearchParams();

  constructor(private http: Http) { }

  public listLiberation(): Observable<Liberation[]> {
    return this.http.get(this.urlLiberationReport, {headers: this.headers}).map(res => res.json());
  }

}
