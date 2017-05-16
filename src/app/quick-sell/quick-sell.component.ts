import {Component} from '@angular/core';
import {QuickSellService} from './quick-sell-service';
import {QuickSell} from './quick-sell';
import * as moment from 'moment';
import {ClientService} from '../client/client.service';
import {Client} from '../client/client';
import {ProductService} from '../product/product.service';
import {Product} from '../product/product';
import {ProductGroupService} from '../product/product-group.service';
import {ProductGroup} from '../product/product-group';
import {ProductFamilyService} from '../product/product-family.service';
import {ProductFamily} from '../product/product-family';
declare var $: any;

export class QuickSellReportFilter {
  public id: number;
  public coo: number;
  public dateFrom: Date;
  public dateTo: Date;
  public fromSchedule: string;
  public toSchedule: string;
  public client: Client;
  public product: Product;
  public cashier: number;
  public nfeKey: string;
  public productGroupId: number;
  public productFamilyId: number;
  constructor() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
  }
}

@Component({
  selector: 'app-quick-sell',
  templateUrl: './quick-sell.component.html',
  styleUrls: ['./quick-sell.component.css']
})
export class QuickSellComponent {

  public listQuickSell: Array<QuickSell> = [];

  public clients: Array<Client> = [];

  public products: Array<Product> = [];

  public productGroups: Array<ProductGroup> = [];

  public productFamilies: Array<ProductFamily> = [];

  public quickSellReportFilter: QuickSellReportFilter;

  public quickSellSelected: QuickSell;

  public hourMask = [/[0-9]/, /\d/, ':', /\d/, /\d/];

  public filterSelected = '';

  public listFilters: Array<any> = [];

  constructor(private quickSellService: QuickSellService, private clientService: ClientService,
      private productService: ProductService, private productGroupService: ProductGroupService,
      private productFamilyService: ProductFamilyService) {
    this.quickSellReportFilter = new QuickSellReportFilter();
    this.listClients();
    this.listProducts();
    this.listProductGroups();
  }

  private listClients(): void {
    this.clientService.list().subscribe( result => {
      this.clients = result;
    });
  }

  private listProducts(): void {
    this.productService.list().subscribe( result => {
      this.products = result;
    });
  }

  public listProductGroups(): void {
    this.productGroupService.list().subscribe( result => {
      this.productGroups = result;
    });
  }

  public listProdFamilyByGroup(): void {
    console.log(this.quickSellReportFilter.productGroupId);
    this.productFamilyService.list(this.quickSellReportFilter.productGroupId.toString()).subscribe( result => {
      this.productFamilies = result;
    });
  }


  public searchQuickSellReport(): void {
    this.listQuickSell = [];
    this.quickSellService.list(this.buildSearchQuery())
      .subscribe( result => {
        this.listQuickSell = result;
    });
  }

  private buildSearchQuery(): string {
    let query = 'transaction=Concluida';
    if (this.quickSellReportFilter.dateFrom) {
      query += ',sellDate>' + moment(this.quickSellReportFilter.dateFrom, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
    if (this.quickSellReportFilter.dateTo) {
      query += ',sellDate<' + moment(this.quickSellReportFilter.dateTo, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
    if (this.quickSellReportFilter.client) {
      query += ',client=' + this.quickSellReportFilter.client.id;
    }
    if (this.quickSellReportFilter.product) {
      query += ',listProductQuickSell.product=' + this.quickSellReportFilter.product.id;
    }
    if (this.quickSellReportFilter.fromSchedule) {
      query += ',schedule>' + this.quickSellReportFilter.fromSchedule;
    }
    if (this.quickSellReportFilter.toSchedule) {
      query += ',schedule<' + this.quickSellReportFilter.toSchedule;
    }
    if (this.quickSellReportFilter.id) {
      query += ',id=' + this.quickSellReportFilter.id;
    }
    if (this.quickSellReportFilter.coo) {
      query += ',numNote=' + this.quickSellReportFilter.coo;
    }
    if (this.quickSellReportFilter.productGroupId) {
      query += ',group=' + this.quickSellReportFilter.productGroupId;
    }
    if (this.quickSellReportFilter.productFamilyId) {
      query += ',family=' + this.quickSellReportFilter.productFamilyId;
    }
    return query;
  }

  public getConvertedDate(date: Date): any {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }

  public selectRow(event, quickSell, quickSellId): void {
    event.preventDefault();
    this.quickSellSelected = quickSell;
    $('#quickSellRow_' + quickSellId).addClass('active').siblings().removeClass('active');
  }

  public insertFilter(filterType: string, filter: string): void {
    let filterChanged = false;
    this.listFilters.forEach(filterItem => {
      if (filterItem.type === filterType) {
        filterItem.filter = filter;
        filterChanged = true;
      }
    });
    if (!filterChanged) {
      let filterStr = '';
      if (filterType === 'Grupo') {
        this.productGroups.forEach( prodGroup => {
          if (parseInt(filter, undefined) === prodGroup.id) {
            filterStr = prodGroup.name;
          }
        });
      } else if (filterType === 'Família') {
        this.productFamilies.forEach( prodFamily => {
          if (prodFamily.id === parseInt(filter, undefined)) {
            filterStr = prodFamily.name;
          }
        });
      }
      this.listFilters.push({
        type: filterType,
        filter: filterStr !== '' ? filterStr : filter
      });
    }
  }

  public removeFilter(filter: any): void {
    switch (filter.type) {
      case 'Produto':
        this.quickSellReportFilter.product = undefined;
        break;
      case 'Cliente':
        this.quickSellReportFilter.client = undefined;
        break;
      case 'Caixa':
        this.quickSellReportFilter.cashier = undefined;
        break;
      case 'Chave':
        this.quickSellReportFilter.nfeKey = undefined;
        break;
      case 'Grupo':
        this.quickSellReportFilter.productGroupId = undefined;
        break;
      case 'Família':
        this.quickSellReportFilter.productFamilyId = undefined;
        break;
      case 'Nº Nota':
        this.quickSellReportFilter.coo = undefined;
        break;
      case 'Código':
        this.quickSellReportFilter.id = undefined;
        break;
      default:
        this.quickSellReportFilter.client = undefined;
    }
    this.listFilters.splice(this.listFilters.indexOf(filter), 1);
  }

}
