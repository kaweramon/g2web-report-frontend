import {Component, Input} from '@angular/core';
import {SightSale} from '../sight-sale';

@Component({
  selector: 'app-product-sight-sale',
  templateUrl: './product-sight-sale.component.html',
  styleUrls: ['./product-sight-sale.component.css']
})
export class ProductSightSaleComponent {

  @Input()
  public sightSale: SightSale;

  constructor() {
    this.sightSale = new SightSale();
  }

}
