import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ClientService} from '../../client/client.service';
import {Client} from '../../client/client';
import * as $ from 'jquery';
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-modal-search-client',
  templateUrl: './modal-search-client.component.html',
  styleUrls: ['./modal-search-client.component.css']
})
export class ModalSearchClientComponent {

  @Input('modal')
  public modal: ModalDirective;

  public clientId: number;

  public productNameReference: string;

  public listClients: Array<Client> = [];

  public loadingClients = false;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private clientService: ClientService, public toastr: ToastsManager) { }

  public searchClient(): void {
    if (this.loadingClients) {
      return;
    }
    let query = '';
    if (this.clientId) {
      query += 'id=' + this.clientId;

      if (this.productNameReference) {
        query += ',name=' + this.productNameReference + ',fantasyName=' + this.productNameReference;
      }

    } else {
      if (this.productNameReference) {
        query += 'name=' + this.productNameReference + ',fantasyName=' + this.productNameReference;
      }
    }
    $('#btnSearchClients').prop('disabled', 'disabled');
    this.loadingClients = true;
    this.clientService.searchClients(query, false).subscribe(result => {
      this.loadingClients = false;
      $('#btnSearchClients').prop('disabled', false);
      this.listClients = result;
    }, error => {
      this.loadingClients = false;
      $('#btnSearchClients').prop('disabled', false);
      console.log(error);
      this.toastr.error(error.json().message, 'Error');
    });
  }

  public selectClient(client: Client): void {
    this.notify.emit({client: client});
    this.modal.hide();
    this.productNameReference = '';
    this.clientId = undefined;
    this.listClients = [];
    this.resetFields();
  }

  public resetFields(): void {
    this.productNameReference = '';
    this.listClients = [];
    document.getElementById('inputId').textContent = '';
  }

}
