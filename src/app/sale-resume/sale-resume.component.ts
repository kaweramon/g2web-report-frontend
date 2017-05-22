import {Component, Input} from '@angular/core';
import {SaleResume} from './sale-resume';

@Component({
  selector: 'app-sale-resume',
  templateUrl: './sale-resume.component.html',
  styleUrls: ['./sale-resume.component.css']
})
export class SaleResumeComponent {

  @Input()
  public saleResume: SaleResume;

  constructor() {
    this.saleResume = new SaleResume();
  }

}
