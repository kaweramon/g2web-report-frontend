import {Component, ViewChild} from '@angular/core';
import {LiberationService} from './liberation.service';
import {Liberation} from './liberation';
import * as moment from 'moment';
import {LiberationFilters} from './liberation-filters';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {ClientService} from '../client/client.service';
import {Client} from '../client/client';
import {ModalDirective} from 'ngx-bootstrap';
import {Employee} from '../employee/employee';
import {EmployeeService} from '../employee/employee.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-liberation',
  templateUrl: './liberation.component.html',
  styleUrls: ['./liberation.component.css']
})
export class LiberationComponent {

  public listLiberation: Array<Liberation> = [];

  public listClients: Array<Client> = [];

  public liberationFilter: LiberationFilters;

  public selectClient: Client;

  public employee: Employee;

  public isLooged = false;

  @ViewChild('modalReleaseClient')
  public modalReleaseClient: ModalDirective;

  constructor(private service: LiberationService, private clientService: ClientService,
              private slimLoadingBarService: SlimLoadingBarService, private employeeService: EmployeeService,
              private localStorageService: LocalStorageService, private toastr: ToastsManager) {
    this.liberationFilter = new LiberationFilters();
    this.employee = new Employee();
    if (this.localStorageService.get('employee') !== null && this.localStorageService.get('employee') !== undefined) {
      this.isLooged = true;
    } else {
      this.isLooged = false;
    }
  }

  public searchClients(): void {
    this.slimLoadingBarService.start();
    this.clientService.searchClients(this.buildQuery()).subscribe(result => {
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
    return query;
  }

  public getConvertedDate(clientId, date: Date): any {
    if (this.selectClient !== undefined && clientId === this.selectClient.id) {
      return moment(date).format('DD/MM/YYYY');;
    }
    if (date === null) {
      return '';
    } else {
      return moment(date).add(1, 'days').format('DD/MM/YYYY');
    }
  }

  public export(): void {
    const test: Array<any> = [];
    this.listLiberation.forEach(liberation => {
      test.push({
        nome: liberation.id,
        razaoSocial: liberation.client !== null ? liberation.client.name : '',
        nomeFantasia: liberation.client !== null ? liberation.client.fantasyName : '',
        versaoDoCliente: liberation !== null ? liberation.clientSystemVersion : '',
        dataDeLiberacao: liberation !== null ? liberation.systemLiberationDate : '',
        dataDeVerificacao: moment(liberation.verificationDate, 'DD/MM/YYYY'),
        obs: liberation.obs,
        status: liberation.client !== null ? liberation.client.situation : ''
      });
    });
    new Angular2Csv(test, 'relatorio_liberacao_cliente_' + moment().format('DD/MM/YYYY'), {showLabels: true});
  }

  public showModalReleaseClient(client: Client): void {
    this.selectClient = Object.assign({}, client);
    this.modalReleaseClient.show();
  }

  public onNotify(msg: any): void {
    if (msg.message === 'CLIENT_RELEASED') {
      this.selectClient.liberation.systemLiberationDate = moment().add(5, 'days');
      this.selectClient.liberation.verificationDate = moment().add(5, 'days');
    }
  }

  public login(): void {
    this.employeeService.login(this.employee.login, this.employee.password).subscribe(employee => {
      this.localStorageService.set('employee', employee);
      this.isLooged = true;
    }, error => {
      this.toastr.error(error.json().message, 'Erro');
    });
  }

  public loggof(): void {
    this.isLooged = false;
    this.localStorageService.set('employee', null );
  }

}
