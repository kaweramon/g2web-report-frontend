import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Client} from './client';

@Injectable()
export class ClientService {

  private urlClient: string = 'http://localhost:8080/client/';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public list(): Observable<Client[]> {
    return this.http.get(this.urlClient, {headers: this.headers})
      .map(res => res.json());
  }

}
