import {Component, OnInit, ViewChild} from '@angular/core';
import {LiberationService} from './liberation.service';
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

@Component({
  selector: 'app-liberation',
  templateUrl: './liberation.component.html',
  styleUrls: ['./liberation.component.css']
})
export class LiberationComponent implements OnInit{
  public listClients: Array<Client> = [];

  public liberationFilter: LiberationFilters;

  public selectClient: Client;

  public employee: Employee;

  public isLooged = false;

  public listVersions: string[];

  @ViewChild('modalReleaseClient')
  public modalReleaseClient: ModalDirective;

  constructor(private service: LiberationService, private clientService: ClientService,
              private slimLoadingBarService: SlimLoadingBarService, private employeeService: EmployeeService,
              private localStorageService: LocalStorageService) {
    this.liberationFilter = new LiberationFilters();
    this.employee = new Employee();

    this.getVersions();
  }

  ngOnInit(): void {
    if (this.employee === undefined || this.employee === null) {
      this.employee = new Employee();
    }
    if (this.localStorageService.get('employee') !== null && this.localStorageService.get('employee') !== undefined) {
      this.isLooged = true;
      this.employee.id = this.localStorageService.get('employee')['id'];
      this.employee.name = this.localStorageService.get('employee')['name'];
      if (this.localStorageService.get('employee')['isG2Interno'] === undefined ||
        this.localStorageService.get('employee')['isG2Interno'] === null) {
        this.employeeService.isG2Interno().subscribe(isG2Interno => {
          this.employee.isG2Interno = isG2Interno;
        });
      }
      this.employee.isG2Interno = this.localStorageService.get('employee')['isG2Interno'];
    } else {
      this.isLooged = false;
    }
  }

  private getVersions(): void {
    this.service.getVersions().subscribe(versions => {
      this.listVersions = versions;
    });
  }

  public searchClients(): void {
    this.slimLoadingBarService.start();
    this.clientService.searchClients(this.buildQuery(), true).subscribe(result => {
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
    if (this.liberationFilter.version !== null && this.liberationFilter.version !== undefined
      && this.liberationFilter.version.length > 0) {
      if (query.length > 0) {
        query += ',';
      }
      query += 'clientSystemVersion=' + this.liberationFilter.version;
    }
    return query;
  }

  public getConvertedDate(clientId, date: Date): any {
    if (this.selectClient !== undefined && clientId === this.selectClient.id) {
      return moment(date).format('DD/MM/YYYY');
    }
    if (date === null) {
      return '';
    } else {
      return moment(date).add(1, 'days').format('DD/MM/YYYY');
    }
  }

  public export(): void {
    const test: Array<any> = [];
    this.listClients.forEach(client => {
      test.push({
        codigo: client.id,
        nome: client.name,
        nomeFantasia: client.fantasyName,
        categoria: client.category,
        versao: client.liberation !== null ? client.liberation.clientSystemVersion : '',
        dataVerificacao: client.liberation !== null ? this.getConvertedDate(client.id, client.liberation.verificationDate) : '',
        dataLiberacao: client.liberation !== null ? this.getConvertedDate(client.id, client.liberation.systemLiberationDate) : '',
        observacoes: client.liberation !== null ? client.liberation.obs : '',
        status: client.situation
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
      this.employeeService.isG2Interno().subscribe(isG2Interno => {
        employee.isG2Interno = isG2Interno;
        this.localStorageService.set('employee', employee);
        this.employee = Object.assign({}, employee);
        this.isLooged = true;
      });
    }, error => {
    });
  }

  public loggof(): void {
    this.isLooged = false;
    this.localStorageService.set('employee', null );
    this.employee = new Employee();
  }

}
