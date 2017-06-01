import {Component, Input} from '@angular/core';
import {QuickSell} from '../quick-sell';

@Component({
  selector: 'app-quick-sell-details',
  templateUrl: './quick-sell-details.component.html',
  styleUrls: ['./quick-sell-details.component.css']
})
export class QuickSellDetailsComponent {

  @Input()
  public quickSell: QuickSell;

  constructor() {
    this.quickSell = new QuickSell();
  }

}
