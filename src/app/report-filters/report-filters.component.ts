import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReportFilters} from './report-filters';
import {ClientService} from '../client/client.service';
import {ProductService} from '../product/product.service';
import {ProductFamilyService} from '../product/product-family.service';
import {ProductGroupService} from '../product/product-group.service';
import {Client} from '../client/client';
import {Product} from '../product/product';
import {ProductGroup} from '../product/product-group';
import {ProductFamily} from '../product/product-family';
declare var $: any;

@Component({
  selector: 'app-report-filters',
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.css']
})
export class ReportFiltersComponent {

  public reportFilters: ReportFilters;

  public hourMask = [/[0-9]/, /\d/, ':', /\d/, /\d/];

  public dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  public filterSelected = '';

  public listFilters: Array<any> = [];

  public clients: Array<Client> = [];

  public products: Array<Product> = [];

  public productGroups: Array<ProductGroup> = [];

  public productFamilies: Array<ProductFamily> = [];

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  @Input('reportType')
  public reportType: string;

  constructor(private clientService: ClientService,
              private productService: ProductService, private productGroupService: ProductGroupService,
              private productFamilyService: ProductFamilyService) {
    this.reportFilters = new ReportFilters();
    this.listClients();
    this.listProducts();
    this.listProductGroups();
    this.initDate();
  }

  private initDate(): void {
    const dateArray = new Date().toISOString().split('-');
    const day = dateArray[2].substr(0, 2);
    this.reportFilters.dateFrom = day + '/' + dateArray[1] + '/' + dateArray[0];
    this.reportFilters.dateTo = day + '/' + dateArray[1] + '/' + dateArray[0];
  }

  private listClients(): void {
    this.clientService.list().subscribe(result => {
      this.clients = result;
    });
  }

  private listProducts(): void {
    this.productService.list().subscribe(result => {
      this.products = result;
    });
  }

  public listProductGroups(): void {
    this.productGroupService.list().subscribe(result => {
      this.productGroups = result;
    });
  }

  public listProdFamilyByGroup(): void {
    this.productFamilyService.list(this.reportFilters.productGroupId.toString()).subscribe(result => {
      this.productFamilies = result;
    });
  }

  public buildSearchQuery(): void {
    let query = '';

    if (this.reportType === 'quickSell') {
      query += 'transaction=Concluida';
      query += ',sellDate>' + this.reportFilters.dateFrom;
      query += ',sellDate<' + this.reportFilters.dateTo;
    } else {
      query += 'status=Concluido';
      let dateArrayFrom = this.reportFilters.dateFrom.split('/');
      let dateArrayTo = this.reportFilters.dateTo.split('/');
      let dayLess = parseInt(dateArrayFrom[0]) - 1;
      let dayGreater = parseInt(dateArrayTo[0]) + 1;
      query += ',sellDate>' + dayLess + '/' + dateArrayFrom[1] + '/' + dateArrayFrom[2];
      query += ',sellDate<' + dayGreater + '/' + dateArrayTo[1] + '/' + dateArrayTo[2];
    }

    if (this.reportFilters.client) {
      query += ',client=' + this.reportFilters.client.id;
    }

    if (this.reportFilters.product) {
      query += ',product=' + this.reportFilters.product.id;
    }

    if (this.reportFilters.productGroupId) {
      query += ',group=' + this.reportFilters.productGroupId;
    }

    if (this.reportFilters.productFamilyId) {
      query += ',family=' + this.reportFilters.productFamilyId;
    }

    if (this.reportFilters.coo) {
      query += ',coo=' + this.reportFilters.coo;
    }

    if (this.reportFilters.id) {
      query += ',id=' + this.reportFilters.id;
    }

    if (this.reportFilters.cashier) {
      query += ',cashier' + this.reportFilters.cashier;
    }
    this.notify.emit(query);
  }

  public insertFilter(filterType: string, filter: any): void {
    let hasFilter = false;
    this.listFilters.forEach( filterItem => {
      if (filterItem.type === filterType) {
        filterItem.filter = filter;
        hasFilter = true;
      }
    });

    if (!hasFilter) {
      this.listFilters.push({
        type: filterType,
        filter: filter
      });
    }
  }

  public removeFilter(filter: any): void {
    switch (filter.type) {
      case 'Cliente':
        this.reportFilters.client = undefined;
        break;
      case 'Product':
        this.reportFilters.product = undefined;
        break;
      case 'Caixa':
        this.reportFilters.cashier = undefined;
        break;
      case 'Chave':
        this.reportFilters.nfeKey = undefined;
        break;
      case 'Código':
        this.reportFilters.id = undefined;
        break;
      case 'Nº Nota':
        this.reportFilters.coo = undefined;
        break;
      case 'Grupo':
        this.reportFilters.productGroupId = undefined;
        break;
      case 'Família':
        this.reportFilters.productFamilyId = undefined;
        break;
      default :
        this.reportFilters.client = undefined;
    }
    this.listFilters.splice(this.listFilters.indexOf(filter), 1);
  }
}
