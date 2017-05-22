import { Component } from '@angular/core';
import { SightSale } from './sight-sale';
import { SightSaleService } from './sight-sale.service';
import * as moment from 'moment';
import {SaleResume} from '../sale-resume/sale-resume';
declare var $: any;

@Component({
  selector: 'app-sight-sale',
  templateUrl: './sight-sale.component.html',
  styleUrls: ['./sight-sale.component.css']
})
export class SightSaleComponent {

  public listSightSale: Array<SightSale>;

  public sightSaleSelected: SightSale;

  public saleResume: SaleResume;

  constructor(private sightSaleService: SightSaleService) {
    this.listSightSale = new Array<SightSale>();
  }

  private searchSightSaleReport(query: string): void {
    this.sightSaleService.search(query).subscribe( result => {
      this.listSightSale = result;
      this.calculateTotals();
    });
  }

  public onNotify(query: any): void {
    this.searchSightSaleReport(query);
  }

  public selectRow(event, sightSale, sightSaleId): void {
    event.preventDefault();
    this.sightSaleSelected = sightSale;
    $('#sightSaleRow_' + sightSaleId).addClass('active').siblings().removeClass('active');
  }

  public getConvertedDate(date: Date, format: string): any {
    return moment(date).format(format);
  }

  private calculateTotals(): void {
    this.saleResume = new SaleResume();
    this.listSightSale.forEach( sightSale => {
      this.saleResume.saleTotal += sightSale.total;
      sightSale.listProductSightSale.forEach( productSightSale => {
        this.saleResume.numTotalSales += productSightSale.quantity;
        this.saleResume.productTotalPriceCost += productSightSale.product.costPrice;
      });
    });
  }
}
