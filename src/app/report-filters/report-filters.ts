import {Client} from "../client/client";
import {Product} from "../product/product";
export class ReportFilters {
  public id: number;
  public coo: number;
  public dateFrom: string;
  public dateTo: string;
  public fromSchedule: string;
  public toSchedule: string;
  public client: Client;
  public product: Product;
  public cashier: number;
  public nfeKey: string;
  public productGroupId: number;
  public productFamilyId: number;
  /*constructor() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
  }*/
}
