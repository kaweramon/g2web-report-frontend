import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Product} from '../../product/product';
import {ProductService} from "../../product/product.service";

@Component({
  selector: 'app-modal-search-product',
  templateUrl: './modal-search-product.component.html',
  styleUrls: ['./modal-search-product.component.css']
})
export class ModalSearchProductComponent {

  @Input('modal')
  public modal: ModalDirective;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  public listProducts: Array<Product> = [];

  public productId: number;

  public productNameReference: string;

  public productBarCode: string;

  constructor(private productService: ProductService) { }

  public searchProduct(): void {
    let query = '';
    if (this.productId) {
      query += 'id=' + this.productId;
      if (this.productNameReference) {
        query += ',name=' + this.productNameReference;
      }
    } else {
      if (this.productNameReference) {
        query += 'name=' + this.productNameReference;
      }
      if (this.productBarCode) {
        if (this.productNameReference || this.productId) {
          query += ',barCode=' + this.productBarCode;
        } else {
          query += 'barCode=' + this.productBarCode;
        }
      }
    }
    this.productService.search(query).subscribe(result => {
      this.listProducts = result;
    });
  }

  public selectProduct(product: Product): void {
    this.modal.hide();
    this.notify.emit({product: product});
  }

}
