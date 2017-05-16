import {QuickSell} from '../quick-sell';
import {Product} from '../../product/product';
export class ProductQuickSell {
  public id: number;
  public quickSell: QuickSell;
  public product: Product;
  public cfop: number;
  public quantity: number;
  public value: number;
  public subTotal: number;
  public aliquotICMS: number;
  public percentPIS: string;
  public percentCofins: string;
  public discount: number;
}
