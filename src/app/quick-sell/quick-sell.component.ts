import {Component} from '@angular/core';
import {QuickSellService} from './quick-sell-service';
import {QuickSell} from './quick-sell';
import * as moment from 'moment';
import {SaleResume} from '../sale-resume/sale-resume';
import {ToastOptions, ToastyConfig, ToastyService} from 'ng2-toasty';
declare var $: any;

@Component({
  selector: 'app-quick-sell',
  templateUrl: './quick-sell.component.html',
  styleUrls: ['./quick-sell.component.css']
})
export class QuickSellComponent {

  public listQuickSell: Array<QuickSell> = [];

  public quickSellSelected: QuickSell;

  public saleResume: SaleResume;

  public reportType: any = 'quickSell';

  constructor(private quickSellService: QuickSellService, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.position = 'bottom-right';
  }

  public searchQuickSellReport(query: string): void {
    this.quickSellSelected = new QuickSell();
    this.listQuickSell = [];
    this.quickSellService.list(query)
      .subscribe( result => {
        if (result.length === 0) {
          const toastOptions: ToastOptions = {
            title: 'Nenhum resultado encontrado',
            showClose: true,
            timeout: 4000,
            theme: 'material'
          };
          this.toastyService.warning(toastOptions);
        }
        this.listQuickSell = result;
        this.calculateTotals();
    });
  }

  public getConvertedDate(date: Date): any {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }

  public selectRow(event, quickSell, quickSellId): void {
    event.preventDefault();
    this.quickSellSelected = Object.assign({}, this.quickSellSelected, quickSell);
    $('#quickSellRow_' + quickSellId).addClass('active').siblings().removeClass('active');
  }

  public onNotify(query: any): void {
    this.searchQuickSellReport(query);
  }

  private calculateTotals(): void {
    this.saleResume = new SaleResume();
    this.listQuickSell.forEach( quickSell => {
      this.saleResume.saleTotal += quickSell.total;
      quickSell.listProductQuickSell.forEach( productQuickSell => {
        this.saleResume.numTotalSales += productQuickSell.quantity;
        this.saleResume.productTotalPriceCost += productQuickSell.product.costPrice;
        if (productQuickSell.product.productOther && productQuickSell.product.productOther.discountValue) {
          this.saleResume.productTotalDiscountValue += productQuickSell.product.productOther.discountValue;
        }
      });
    });
  }
}
