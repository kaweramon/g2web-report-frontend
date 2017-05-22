import {Client} from '../client/client';
import {ProductQuickSell} from './product-quick-sell/product-quick-sell';

export class QuickSell {
  public id: number;
  public sellDate: Date;
  public total: number;
  public schedule: Date;
  public totalWithDescount: number;
  public type: string;
  public client: Client;
  public cashier: number;
  public nfeKey: string;
  public listProductQuickSell: Array<ProductQuickSell>;
}
