import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
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

  public update(liberation: Liberation): Observable<Liberation> {
    this.params.set('liberationId', liberation.id.toString());
    return this.http.put(this.urlLiberationReport + liberation.id, liberation,
      {headers : this.headers, search : this.params}).map(res => res.json());
  }

  public getVersions(): Observable<string[]> {
    return this.http.get(this.urlLiberationReport + '/versions', {headers: this.headers}).map(res => res.json());
  }

}
