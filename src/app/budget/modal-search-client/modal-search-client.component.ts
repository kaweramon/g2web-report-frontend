import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ClientService} from '../../client/client.service';
import {Client} from '../../client/client';

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

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private clientService: ClientService) { }

  public searchClient(): void {
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
    this.clientService.searchClients(query).subscribe(result => {
      this.listClients = result;
    });
  }

  public selectClient(client: Client): void {
    this.notify.emit({client: client});
    this.modal.hide();
  }

}
