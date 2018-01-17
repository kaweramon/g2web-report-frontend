import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {Product} from '../../product/product';
import {ProductService} from '../../product/product.service';
import {ToastsManager} from 'ng2-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-search-product',
  templateUrl: './modal-search-product.component.html',
  styleUrls: ['./modal-search-product.component.css']
})
export class ModalSearchProductComponent implements OnInit {

  @Input('modal')
  public modal: ModalDirective;

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  public listProducts: Array<Product> = [];

  public productNameReference: string;

  public product: Product;

  public loadingProducts = false;

  constructor(private productService: ProductService, public toastr: ToastsManager) { }

  ngOnInit(): void {
    this.product = new Product();
  }

  public searchProduct(): void {
    if (this.loadingProducts) {
      return;
    }
    let query = '';
    if (this.product.id) {
      query += 'id=' + this.product.id;
      if (this.productNameReference) {
        query += ',name=' + this.productNameReference;
      }
    } else {
      if (this.productNameReference) {
        query += 'name=' + this.productNameReference;
      }
      if (this.product.barCode) {
        if (this.productNameReference) {
          query += ',barCode=' + this.product.barCode;
        } else {
          query += 'barCode=' + this.product.barCode;
        }
      }
    }
    if (this.product.priceValue && this.product.priceValue > 0) {
      if (query.indexOf(',') !== -1 || query.length > 2) {
        query += ',priceValue=' + this.product.priceValue;
      } else {
        query += 'priceValue=' + this.product.priceValue;
      }
    }
    this.loadingProducts = true;
    $('#btnSearchProducts').prop('disabled', 'disabled');
    this.productService.search(query).subscribe(result => {
      this.listProducts = result;
      this.loadingProducts = false;
      $('#btnSearchProducts').prop('disabled', false);
    }, error => {
      this.loadingProducts = false;
      $('#btnSearchProducts').prop('disabled', false);
      this.toastr.error(error.json().message, 'Error');
    });
  }

  public cleanSearchProduct(): void {
    this.product = new Product();
    this.listProducts = [];
  }

  public selectProduct(product: Product): void {
    this.modal.hide();
    this.product = new Product();
    this.productNameReference = '';
    this.listProducts = [];
    this.notify.emit({product: product});
  }

  public closeModal(): void {
    this.modal.hide();
    this.cleanSearchProduct();
  }

}
