import {ProductOthers} from './product-others';
import {ProductGroup} from './product-group';
import {ProductFamily} from './product-family';
export class Product {
  public id: number;
  public name: string;
  public barCode: string;
  public type: string;
  public costPrice: number;
  public productOther: ProductOthers;
  public productGroup: ProductGroup;
  public productFamily: ProductFamily;
}
