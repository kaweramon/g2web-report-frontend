import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BudgetFilter} from './budget-filter';
import {Budget} from '../budget';
import {BudgetService} from '../budget.service';
import {ToastsManager} from 'ng2-toastr';
import {ModalDirective} from 'ngx-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-search-budget',
  templateUrl: './modal-search-budget.component.html',
  styleUrls: ['./modal-search-budget.component.css']
})
export class ModalSearchBudgetComponent {

  public budgetFilter: BudgetFilter;

  public dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  public listBudgets: Array<Budget> = [];

  @Input()
  public modal: ModalDirective;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private service: BudgetService, public toastr: ToastsManager) {
    this.budgetFilter = new BudgetFilter();
    this.budgetFilter.saleDateFrom = moment().format('DD/MM/YYYY');
    this.budgetFilter.saleDateTo = moment().format('DD/MM/YYYY');
  }

  public searchBudget(): void {
    let query = 'status=Concluido';
    if (this.budgetFilter.id !== null && this.budgetFilter.id !== undefined) {
      query += ',id=' + this.budgetFilter.id;
    }
    if (this.budgetFilter.budgetId !== null && this.budgetFilter.budgetId !== undefined) {
      query += ',budgetCounter=' + this.budgetFilter.budgetId;
    }
    if (this.budgetFilter.saleDateFrom !== null && this.budgetFilter.saleDateFrom !== undefined
      && this.budgetFilter.saleDateFrom.length > 0) {
      query += ',saleDate>' + this.budgetFilter.saleDateFrom;
    }
    if (this.budgetFilter.saleDateTo !== null && this.budgetFilter.saleDateTo !== undefined
      && this.budgetFilter.saleDateTo.length > 0) {
      query += ',saleDate<' + this.budgetFilter.saleDateTo;
    }
    if (this.budgetFilter.obs !== null && this.budgetFilter.obs !== undefined && this.budgetFilter.obs.length > 0) {
      query += ',obs=' + this.budgetFilter.obs;
    }
    console.log(query);
    this.service.search(query).subscribe(result => {
      this.listBudgets = result;
    }, error => {
      this.toastr.error(error.json().message, 'Error');
    });
  }

  public selectBudget(budget: Budget): void {
    this.modal.hide();
    this.notify.emit({budget: budget});
  }

  public getConvertedDate(date: Date): string {
    return moment(date).add(1, 'd').format('DD/MM/YYYY');
  }

}
