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
import * as moment from 'moment';
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
      "<<<
