import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from '../../employee/employee';
import {EmployeeService} from '../../employee/employee.service';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-modal-search-employee-salesman',
  templateUrl: './modal-search-employee-salesman.component.html',
  styleUrls: ['./modal-search-employee-salesman.component.css']
})
export class ModalSearchEmployeeSalesmanComponent {

  public listSalesmanEmployees: Array<Employee>;

  @Input('modal')
  public modal: ModalDirective;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  public selectedSalesman: Employee;

  constructor(private service: EmployeeService) {
    this.service.getSalesman().subscribe(result => {
      this.listSalesmanEmployees = result;
    });
  }

  public selectEmployee(): void {
    this.modal.hide();
    this.notify.emit({salesman: this.selectedSalesman});
  }

  public changeSalesman(salesman: Employee): void {
    this.selectedSalesman = salesman;
  }

}
