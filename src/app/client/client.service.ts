import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Client} from './client';

@Injectable()
export class ClientService {

  private urlClient = 'http://localhost:8080/client';
  // private urlClient: string = '/client';
  headers = new Headers({ 'Content-Type': 'application/json' });
  private params: URLSearchParams = new URLSearchParams();

  constructor(private http: Http) { }

  public list(): Observable<Client[]> {
    return this.http.get(this.urlClient, {headers: this.headers})
      .map(res => res.json());
  }

  public searchClients(search: string, isLiberation: any): Observable<Client[]> {
    this.params.set('search', search);
    this.params.set('isLiberation', isLiberation);
    return this.http.get(this.urlClient + '/search', {headers: this.headers, search: this.params}).map(res => res.json());
  }

}
