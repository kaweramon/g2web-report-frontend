import {Client} from '../client/client';
export class Liberation {
  public id: number;
  public clientId: number;
  public clientSystemVersion: string;
  public systemLiberationDate: any;
  public verificationDate: any;
  public obs: string;
  public client: Client;

  constructor() {
    this.client = new Client();
  }
}
