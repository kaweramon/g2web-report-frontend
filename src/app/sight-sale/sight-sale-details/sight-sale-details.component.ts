import {Component, Input} from '@angular/core';
import {SightSale} from '../sight-sale';

@Component({
  selector: 'app-sight-sale-details',
  templateUrl: './sight-sale-details.component.html',
  styleUrls: ['./sight-sale-details.component.css']
})
export class SightSaleDetailsComponent {

  @Input()
  public sightSale: SightSale;

  constructor() {
    this.sightSale = new SightSale();
  }

}
