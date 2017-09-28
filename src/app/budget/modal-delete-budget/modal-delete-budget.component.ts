import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-delete-budget',
  templateUrl: './modal-delete-budget.component.html',
  styleUrls: ['./modal-delete-budget.component.css']
})
export class ModalDeleteBudgetComponent {

  @Input()
  public modal: ModalDirective;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public removeBudget(): void {
    this.modal.hide();
    this.notify.emit('removeBudget');
  }

}
