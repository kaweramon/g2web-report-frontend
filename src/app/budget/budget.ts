import {Product} from '../product/product';

export class Budget {
  public id;
  public saleDate: Date;
  public clientId: number;
  public total: number;
  public salesman: string;
  public hour: Date;
  public percentDiscount: number;
  public totalWithDiscount: number;
  public obs: string;
  public delivered: string;
  public message: string;
  public type: string;
  public clientName: string;
  public freightValue: number;
  public insuranceValue: number;
  public infTreasury: string;
  public additionalInf: string;
  public freightModality: string;
  public discountValue: number;
  public operatorId: number;
  public operatorName: string;
  public budgetCounter: number;
  public status: string;
  public validity: Date;
  public listBudgetProducts: Array<Product>;
}
