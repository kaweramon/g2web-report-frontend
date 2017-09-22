import {Client} from '../client/client';
import {ProductSightSale} from './product-sight-sale/product-sight-sale';
export class SightSale {
  public id: number;
  public sellDate: Date;
  public client: Client;
  public total: number;
  public totalDiscount: number;
  public cashier: number;
  public salesMan: string;
  public schedule: Date;
  public nfeKey: string;
  public coo: string;
  public listProductSightSale: Array<ProductSightSale>;
}
