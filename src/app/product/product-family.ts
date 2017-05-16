import {ProductGroup} from './product-group';
export class ProductFamily {
  public id: number;
  public name: string;
  public group: ProductGroup;

  constructor() {
    this.name = '';
  }
}
