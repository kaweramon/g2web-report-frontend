import {Product} from '../../product/product';
export class ProductSightSale {
  public id: number;
  public product: Product;
  public quantity: number;
  public value: number;
  public subTotal: number;
  public costValue: number;
  public cfop: number;
  public cst: number;
  public ncm: string;
  public aliquotICMS: number;
}
