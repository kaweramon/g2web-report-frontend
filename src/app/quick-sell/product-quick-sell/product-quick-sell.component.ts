import {Component, Input, OnInit} from '@angular/core';
import {QuickSell} from '../quick-sell';

@Component({
  selector: 'app-product-quick-sell',
  templateUrl: './product-quick-sell.component.html',
  styleUrls: ['./product-quick-sell.component.css']
})
export class ProductQuickSellComponent implements OnInit {

  @Input()
  public quickSell: QuickSell;

  constructor() {
    this.quickSell = new QuickSell();
  }

  ngOnInit() {
  }

}
