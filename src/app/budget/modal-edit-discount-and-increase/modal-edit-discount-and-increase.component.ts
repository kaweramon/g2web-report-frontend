import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-modal-edit-discount-and-increase',
  templateUrl: './modal-edit-discount-and-increase.component.html',
  styleUrls: ['./modal-edit-discount-and-increase.component.css']
})
export class ModalEditDiscountAndIncreaseComponent {

  @Input()
  public discountPercent: number;

  @Input()
  public discountValue: number;

  @Input()
  public increasePercent: number;

  @Input()
  public increaseValue: number;

  @Input()
  public total: number;

  public totalStr = '0';

  @Input()
  public modal: ModalDirective;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(public toastr: ToastsManager) {
    this.calculatePercentDiscount(this.discountValue);
    this.calculateIncreasePercent(this.increaseValue);
    this.increaseValue = this.increaseValue ? this.increaseValue : 0;
    this.discountValue = this.discountValue ? this.discountValue : 0;
    this.discountPercent = this.discountPercent ? this.discountPercent : 0;
    this.increasePercent = this.increasePercent ? this.increasePercent : 0;
  }

  public resetFields(): void {
    this.discountValue = 0;
    this.discountPercent = 0;
    this.increasePercent = 0;
    this.increaseValue = 0;
    this.totalStr = '';
  }

  public save(): void {
    if (this.total < 0) {
      this.toastr.error('Valor total não pode ser negativo', 'Error');
      return;
    }
    if (this.discountValue > this.total) {
      this.toastr.error('Desconto não pode ser maior que o valor total', 'Error');
      return;
    }
    this.modal.hide();
    this.notify.emit({
      message: 'saveDiscountAndIncrease',
      discountValue: this.discountValue,
      increaseValue: this.increaseValue,
      discountPercent: this.discountPercent,
      increasePercent: this.increasePercent
    });
  }

  public calculateDiscount(discountPercent): void {
    if (discountPercent > 0) {
      this.discountValue = ((this.total * discountPercent) / 100);
    } else {
      this.discountValue = 0;
    }
  }

  public calculatePercentDiscount(discountValue): void {
    if (discountValue >= 0) {
      this.discountPercent = ((discountValue * 100) / this.total);
    }
  }

  public calculateIncrease(increasePercent): void {
    if (increasePercent > 0) {
      this.increaseValue = ((this.total * increasePercent) / 100);
    } else {
      this.increaseValue = 0;
    }
  }

  public calculateIncreasePercent(increaseValue): void {
    if (increaseValue >= 0) {
      this.increasePercent = ((increaseValue * 100) / this.total);
    }
  }

}
