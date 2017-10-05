import {Product} from '../product/product';
import {BudgetProducts} from "./budget-products";

export class Budget {
  public id;
  public saleDate: Date;
  public clientId: number;
  public total: number;
  public salesman: string;
  public hour: Date;
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
  public increaseValue: number;
  public discountPercent: number;
  public increasePercent: number;
  public operatorId: number;
  public operatorName: string;
  public budgetCounter: number;
  public status: string;
  public validity: Date;
  public listBudgetProducts: Array<BudgetProducts>;

  constructor() {
    this.increasePercent = 0;
    this.increaseValue = 0;
    this.discountPercent = 0;
    this.discountValue = 0;
    this.totalWithDiscount = 0;
  }
}
