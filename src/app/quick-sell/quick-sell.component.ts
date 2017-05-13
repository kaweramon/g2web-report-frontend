import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {QuickSellService} from './quick-sell-service';
import {QuickSell} from './quick-sell';
import * as moment from 'moment';
import {QuickSellProductComponent} from './quick-sell-product/quick-sell-product.component';
import {ClientService} from '../client/client.service';
import {Client} from '../client/client';
import {ProductService} from '../product/product.service';
import {Product} from '../product/product';

export class QuickSellReportFilter {
  public dateFrom: Date;
  public dateTo: Date;
  public client: Client;
  public product: Product;
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
export class QuickSellComponent implements AfterViewInit {

  public listQuickSell: Array<QuickSell> = [];

  public clients: Array<Client> = [];

  public products: Array<Product> = [];

  public quickSellReportFilter: QuickSellReportFilter;

  @ViewChild(QuickSellProductComponent)
  public quickSellProductComponent: QuickSellProductComponent;

  constructor(private quickSellService: QuickSellService, private clientService: ClientService,
      private productService: ProductService) {
    this.quickSellReportFilter = new QuickSellReportFilter();
    this.listClients();
    this.listProducts();
  }

  ngAfterViewInit() {
    // console.log(new Date().toISOString().substring(0, 10));
    // document.getElementById('inputQuickSellReportDateFrom').innerHTML = '2017-05-12';
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

  public searchQuickSellReport(): void {
    this.listQuickSell = [];
    this.quickSellService.list(this.buildSearchQuery())
      .subscribe( result => {
        this.listQuickSell = result;
        this.quickSellProductComponent.list();
    });
  }

  private buildSearchQuery(): string {
    let query = '';
    console.log(this.quickSellReportFilter.dateFrom);
    if (this.quickSellReportFilter.dateFrom) {
      query += 'sellDate>' + moment(this.quickSellReportFilter.dateFrom, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
    if (this.quickSellReportFilter.dateTo) {
      query += ',sellDate<' + moment(this.quickSellReportFilter.dateTo, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }
    if (this.quickSellReportFilter.client) {
      query += ',client=' + this.quickSellReportFilter.client.id;
    }
    console.log(query);
    return query;
  }

  public getConvertedDate(date: Date): any {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }
}
