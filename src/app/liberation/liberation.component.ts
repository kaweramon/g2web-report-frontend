import {Component} from '@angular/core';
import {LiberationService} from './liberation.service';
import {Liberation} from './liberation';
import * as moment from 'moment';
import {LiberationFilters} from './liberation-filters';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {ClientService} from '../client/client.service';
import {Client} from '../client/client';

@Component({
  selector: 'app-liberation',
  templateUrl: './liberation.component.html',
  styleUrls: ['./liberation.component.css']
})
export class LiberationComponent {

  public listLiberation: Array<Liberation> = [];

  public listClients: Array<Client> = [];

  public liberationFilter: LiberationFilters;

  constructor(private service: LiberationService, private clientService: ClientService,
              private slimLoadingBarService: SlimLoadingBarService) {
    this.liberationFilter = new LiberationFilters();
  }

  public getListLiberations(): void {
    this.slimLoadingBarService.start();
    this.service.listLiberation().subscribe(result => {
      this.listLiberation = result;
      this.slimLoadingBarService.stop();
      this.slimLoadingBarService.complete();
    });
  }

  public searchClients(): void {
    this.slimLoadingBarService.start();
    this.clientService.searchClients(this.buildQuery()).subscribe(result => {
      console.log(result);
      this.listClients = result;
      this.slimLoadingBarService.stop();
      this.slimLoadingBarService.complete();
    });
  }

  private buildQuery(): string {
    let query = '';

    if (this.liberationFilter.fantasyName !== null && this.liberationFilter.fantasyName !== undefined
      && this.liberationFilter.fantasyName.length > 0) {
      query += 'fantasyName=' + this.liberationFilter.fantasyName;
    }
    if (this.liberationFilter.name !== null && this.liberationFilter.name !== undefined
      && this.liberationFilter.name.length > 0) {
      if (query.length > 0) {
        query += ',';
      }
      query += 'name=' + this.liberationFilter.name;
    }
    if (this.liberationFilter.category !== null && this.liberationFilter.category !== undefined
      && this.liberationFilter.category.length > 0) {
      if (query.length > 0) {
        query += ',';
      }
      query += 'category=' + this.liberationFilter.category;
    }
    if (this.liberationFilter.situation !== null && this.liberationFilter.situation !== undefined
      && this.liberationFilter.situation.length > 0) {
      if (query.length > 0) {
        query += ',';
      }
      query += 'situation=' + this.liberationFilter.situation;
    }
    console.log(query);
    return query;
  }

  public getConvertedDate(date: Date): any {
    return moment(date).format('DD/MM/YYYY');
  }

  public export(): void {
    const test: Array<any> = [];
    this.listLiberation.forEach(liberation => {
      test.push({
        nome: liberation.id,
        razaoSocial: liberation.client !== null ? liberation.client.name : '',
        nomeFantasia: liberation.client !== null ? liberation.client.fantasyName : '',
        versaoDoCliente: liberation.clientSystemVersion,
        dataDeLiberacao: liberation.systemLiberationDate,
        dataDeVerificacao: moment(liberation.verificationDate, 'DD/MM/YYYY'),
        obs: liberation.obs,
        status: liberation.client !== null ? liberation.client.situation : ''
      });
    });
    new Angular2Csv(test, 'relatorio_liberacao_cliente_' + moment().format('DD/MM/YYYY'), {showLabels: true});
  }

}
