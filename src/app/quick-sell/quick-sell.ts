import {Client} from '../client/client';

export class QuickSell {
  public id: number;
  public sellDate: Date;
  public total: number;
  public schedule: string;
  public totalWithDescount: number;
  public type: string;
  public client: Client;
  public salesman: string;
  public cashier: number;
}
