import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Client} from '../../client/client';
import * as moment from 'moment';
import {ModalDirective} from 'ngx-bootstrap';
import {LiberationService} from '../liberation.service';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-modal-client-liberation',
  templateUrl: './modal-client-liberation.component.html',
  styleUrls: ['./modal-client-liberation.component.css']
})
export class ModalClientLiberationComponent {

  @Input()
  public client: Client;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public modal: ModalDirective;

  private employee: any;

  constructor(private service: LiberationService, private localStorageService: LocalStorageService) {
    this.client = new Client();
  }

  public releaseClient(): void {
    this.client.liberation.systemLiberationDate = moment().add(5, 'days');
    this.client.liberation.verificationDate = moment().add(5, 'days');
    this.employee = this.localStorageService.get('employee');
    this.client.liberation.obs = 'Temporário por: ' + this.employee.id + ' - ' + this.employee.login + ' - ' +
      moment().format('DD/MM/YYYY HH:MM:ss');
    console.log(this.client.liberation);
    this.service.update(this.client.liberation).subscribe(result => {
      this.modal.hide();
      this.client.liberation = Object.assign({}, result);
      this.notify.emit({message: 'CLIENT_RELEASED'});
    });
  }

}
