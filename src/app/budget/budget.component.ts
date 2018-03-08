import {Component, OnInit, ViewChild} from '@angular/core';
import {Budget} from './budget';
import {EmployeeService} from '../employee/employee.service';
import {Employee} from '../employee/employee';
import {LocalStorageService} from 'angular-2-local-storage';
import {BudgetService} from './budget.service';
import {ModalDirective} from 'ngx-bootstrap';
import {Client} from '../client/client';
import {Product} from '../product/product';
import * as moment from 'moment';
import * as $ from 'jquery';
import {ToastsManager} from 'ng2-toastr';
import {ProductOthers} from '../product/product-others';
import {BudgetProducts} from './budget-products';
import {BudgetProductsService} from './budget-products.service';
import {ClientService} from '../client/client.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalSearchBudgetComponent} from './modal-search-budget/modal-search-budget.component';
import {Router} from '@angular/router';
import {ProductService} from '../product/product.service';
import {isNumeric} from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  public budget: Budget;

  public isLoged = false;

  public employee: Employee;

  public salesman: Employee;

  public client: Client;

  public product: Product;

  public budgetProduct: BudgetProducts;

  public dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('modalSearchClient')
  public modalSearchClient: ModalDirective;

  @ViewChild('modalSearchProduct')
  public modalSearchProduct: ModalDirective;

  @ViewChild('modalSearchSalesman')
  public modalSearchSalesman: ModalDirective;

  @ViewChild('modalSearchBudget')
  public modalSearchBudget: ModalDirective;

  @ViewChild('modalEditDiscountAndIncrease')
  public modalEditDiscountAndIncrease: ModalDirective;

  public saleDateStr: string;

  public totalProducts = 0;

  public discountValue = 0.0;

  public increaseValue = 0.0;

  public listBudgetProducts: Array<BudgetProducts> = [];

  public currentBudgetProductPrice: number;

  public formBudgetProduct: FormGroup;

  @ViewChild(ModalSearchBudgetComponent)
  public modalSearchBudgetComponent: ModalSearchBudgetComponent;

  public barCode = '';

  constructor(private employeeService: EmployeeService, private localStorageService: LocalStorageService,
              private budgetService: BudgetService, public toastr: ToastsManager, private formBuilder: FormBuilder,
              private budgetProductsService: BudgetProductsService, private clientService: ClientService,
              private router: Router, private productService: ProductService) {
    this.employee = new Employee();
    this.salesman = new Employee();
    this.budgetProduct = new BudgetProducts();
    this.totalProducts = 0.0;
    if (this.localStorageService.get('employee') !== null && this.localStorageService.get('employee') !== undefined) {
      this.isLoged = true;
      this.employee.id = localStorageService.get('employee')['id'];
      this.employee.name = localStorageService.get('employee')['name'];
      this.salesman.id = localStorageService.get('employee')['id'];
      this.salesman.name = localStorageService.get('employee')['name'];
    } else {
      this.isLoged = false;
    }
  }

  ngOnInit(): void {
    this.modalSearchBudgetComponent = new ModalSearchBudgetComponent(this.budgetService, this.toastr);
    this.formBudgetProduct = this.formBuilder.group({
      'productName': [this.budgetProduct.productName],
      'barCodeProduct': [this.budgetProduct.barCodeProduct],
      'quantity': [this.budgetProduct.quantity],
      'unity': [this.budgetProduct.unity],
      'priceValue': [this.budgetProduct.priceValue],
      'discountValue': [this.budgetProduct.discountValue],
      'increaseValue': [this.budgetProduct.increaseValue],
      'discountPercent': [this.budgetProduct.discountPercent],
      'subTotal': [this.budgetProduct.subTotal],
      'productId': [this.budgetProduct.productId]
    });
    this.formBudgetProduct.disable();
  }

  public login(): void {
    this.employeeService.login(this.employee.login, this.employee.password).subscribe(employee => {
      this.salesman = Object.assign({}, employee);
      this.employeeService.isG2Interno().subscribe(isG2Interno => {
        employee.isG2Interno = isG2Interno;
        this.localStorageService.set('employee', employee);
        this.employee = Object.assign({}, employee);
        this.isLoged = true;
      });
    }, error => {
      this.toastr.error(error.json().message, 'Error');
    });
  }

  public addBudget(): void {
    this.budgetService.getLast().subscribe(result => {
      this.budget = new Budget();
      this.formBudgetProduct.enable();
      this.saleDateStr = moment().format('DD/MM/YYYY');
      this.budget.budgetCounter = result.budgetCounter + 1;
      this.budget.status = 'Andamento';
      this.budget.operatorName = this.employee.name;
      this.budget.operatorId = this.employee.id;
      this.budget.type = 'Venda';
      this.budget.delivered = 'SIM';
      this.budget.salesman = this.salesman.name;
      this.budgetService.create(this.budget).subscribe(budget => {
        this.budget = budget;
        $('#btnUpdateSalesMan').prop('disabled', false);
        $('#btnUpdateClient').prop('disabled', false);
        this.modalSearchClient.show();
      });
    });
  }

  public onNotify(msg: any): void {
    if (msg.client) {
      this.client = msg.client;
    }
    if (msg.product && this.budget !== undefined && this.budget !== null) {
      this.product = Object.assign({}, msg.product);
      this.budgetProduct = new BudgetProducts();
      this.budgetProduct.priceValue = this.product.priceValue;
      this.budgetProduct.subTotal = this.product.priceValue;
      this.currentBudgetProductPrice = this.product.priceValue;
      this.budgetProduct.quantity = 1;
      this.budgetProduct.stock = this.product.stock;
      this.budgetProduct.discountValue = 0;
      this.budgetProduct.discountPercent = 0;
      this.budgetProduct.increaseValue = 0;
      this.budgetProduct.increasePercent = 0;
      this.budgetProduct.productName = this.product.name;
      this.budgetProduct.ncm = this.product.productOther ? msg.product.productOther.ncm  : '';
      this.budgetProduct.cfop = msg.product.productOther ? msg.product.productOther.cfop : '';
      this.budgetProduct.barCodeProduct = msg.product.barCode;
      this.budgetProduct.unity = this.product.unity;
      this.budgetProduct.productId = this.product.id;
      this.budgetProduct.budgetId = this.budget.id;

    }
    if (msg.salesman) {
      this.salesman = msg.salesman;
    }
    if (msg.budget) {
      this.budget = msg.budget;
      this.retrieveBudgetData();
      this.formBudgetProduct.enable();
      $('#btnUpdateSalesMan').prop('disabled', false);
      $('#btnUpdateClient').prop('disabled', false);
    }
    if (msg === 'removeBudget') {
      this.deleteBudget();
    }
    if (msg.message === 'saveDiscountAndIncrease') {
      this.budget.discountValue = msg.discountValue;
      this.budget.increaseValue = msg.increaseValue;
      if (this.budget !== undefined) {
        this.budget.increasePercent = msg.increasePercent;
        this.budget.discountPercent = msg.discountPercent;
      }
    }
  }

  private retrieveBudgetData(): void {
    this.totalProducts =  this.budget.total;
    if (this.budget.discountValue !== null && this.budget.discountValue !== undefined) {
      this.discountValue = this.budget.discountValue;
    }
    if (this.budget.increaseValue !== null && this.budget.increaseValue !== undefined) {
      this.increaseValue = this.budget.increaseValue;
    }
    if (this.budget.clientId !== null && this.budget.clientId !== undefined) {
      this.clientService.searchClients('id=' + this.budget.clientId, false).subscribe(result => {
        if (result.length > 0) {
          this.client = result[0];
        }
      });
    }
    if (this.budget.operatorId !== null && this.budget.operatorId !== undefined) {
      this.employeeService.getById(this.budget.operatorId).subscribe(result => {
        this.employee = result;
      });
    }
    if (this.budget.listBudgetProducts && this.budget.listBudgetProducts.length > 0) {
      this.listBudgetProducts = this.budget.listBudgetProducts;
    }
    if (this.budget.saleDate) {
      this.saleDateStr = moment(this.budget.saleDate).add(1, 'd').format('DD/MM/YYYY');
    }
    this.budget.increaseValue = this.budget.increaseValue ? this.budget.increaseValue : 0;
    this.budget.discountValue = this.budget.discountValue ? this.budget.discountValue : 0;
    this.budget.increasePercent = this.budget.increasePercent ? this.budget.increasePercent : 0;
    this.budget.discountPercent = this.budget.discountPercent ? this.budget.discountPercent : 0;
  }

  public removeProduct(index: number): void {
    this.totalProducts -= this.listBudgetProducts[index].subTotal;
    this.listBudgetProducts.splice(index, 1);
  }

  public logOut(): void {
    this.localStorageService.remove('employee');
    this.isLoged = false;
    this.resetBuget();
    this.resetEmployee();
  }

  public resetEmployee(): void {
    this.employee = new Employee();
  }

  public resetBuget(): void {
    this.budget = undefined;
    this.client = new Client();
    this.budgetProduct = new BudgetProducts();
    this.listBudgetProducts = [];
    this.product = new Product();
    this.product.productOther = new ProductOthers();
    this.totalProducts = 0;
    this.currentBudgetProductPrice = 0;
    this.salesman = Object.assign({}, this.employee);
    $('#btnUpdateSalesMan').prop('disabled', 'disabled');
    $('#btnUpdateClient').prop('disabled', 'disabled');
  }

  public addProduct(): void {
    this.barCode = '';
    if (this.budgetProduct.priceValue) {
      this.totalProducts += this.budgetProduct.subTotal;
    }
    let budgetProductSearched = undefined;
    this.listBudgetProducts.forEach(budgetProduct => {
      if (this.budgetProduct.productId === budgetProduct.productId) {
        budgetProductSearched = budgetProduct;
      }
    });
    if (budgetProductSearched === undefined) {
      this.listBudgetProducts.push(Object.assign({}, this.budgetProduct));
    } else {
      budgetProductSearched.quantity += this.budgetProduct.quantity;
      budgetProductSearched.subTotal += this.budgetProduct.subTotal;
    }
    this.budgetProduct = new BudgetProducts();
  }

  public saveBuget(): void {
    if (((this.totalProducts - this.discountValue) + this.increaseValue) < 0) {
      this.toastr.error('Valor Total não pode ser menor que 0', 'Error');
      return;
    } else {
      this.budget.total = this.totalProducts;
      this.budget.totalWithDiscount = ((this.totalProducts - this.budget.discountValue) + this.budget.increaseValue);
    }
    this.budget.clientId = this.client.id;
    if (this.client.name.length > 30) {
      this.budget.clientName = this.client.name.substring(0, 30);
    } else {
      this.budget.clientName = this.client.name;
    }
    this.budget.salesman = this.employee.id.toString() + ' - ' + this.employee.name;
    this.budget.hour = new Date();
    this.budget.type = 'Venda';
    this.budget.operatorId = this.employee.id;
    this.budget.operatorName = this.employee.name;
    this.budget.status = 'Concluido';
    if (this.listBudgetProducts !== undefined && this.listBudgetProducts.length > 0) {
      this.budget.listBudgetProducts = this.listBudgetProducts;
    }
    if (this.listBudgetProducts.length > 0 && this.budget && this.budget.id) {
      this.budgetService.update(this.budget).subscribe(() => {
        this.budgetProductsService.update(this.listBudgetProducts, this.budget.id).subscribe(() => {
          this.toastr.success('Orçamento Cadastrado', 'Sucesso');
          this.resetBuget();
        }, error => {
          console.log(error);
          this.toastr.error(error.json().message, 'Erro');
        });
      }, error => {
        console.log(error);
        this.toastr.error(error.json().message, 'Erro');
      });
    }
  }

  public deleteBudget(): void {
    if ((this.budget !== undefined && this.budget.id && this.budget !== null) &&
      (this.client !== null && this.client !== undefined) && (this.employee !== null && this.employee !== undefined) &&
      (this.salesman !== null && this.salesman !== undefined)) {
      this.budgetService.deleteBudget(this.budget.id).subscribe(() => {
        this.budgetProductsService.deleteBudgetProducts(this.budget.id).subscribe(() => {
          this.toastr.success('Orçamento Removido', 'Sucesso');
          this.resetBuget();
        }, error => {
          this.toastr.error(error.json().message, 'Erro');
        });
      }, error => {
        this.toastr.error(error.json().message, 'Erro');
      });
    }
  }

  public calculateSubTotal(productPrice): void {
    if (productPrice > this.currentBudgetProductPrice) {
      this.budgetProduct.subTotal =
        ((productPrice - (productPrice * this.budgetProduct.discountPercent) / 100) * this.budgetProduct.quantity);
    }
  }

  public calculateSubTotalOnChangeQuantity(quantity): void {
    if (quantity > 0) {
      if (this.budgetProduct.increaseValue < this.budgetProduct.discountValue) {
        this.budgetProduct.subTotal = ((this.budgetProduct.priceValue -
          (this.budgetProduct.discountValue - this.budgetProduct.increaseValue)) * quantity);
      } else {
        this.budgetProduct.subTotal = ((this.budgetProduct.priceValue +
          (this.budgetProduct.increaseValue - this.budgetProduct.discountValue)) * quantity);
      }
    }
  }

  public calculateDiscountValue(productDiscountPercent): void {
    if (productDiscountPercent > 0 && productDiscountPercent <= 100) {
      this.budgetProduct.discountValue = ((this.budgetProduct.priceValue * productDiscountPercent) / 100);
      if (productDiscountPercent > this.budgetProduct.increasePercent) {
        this.budgetProduct.subTotal = ((this.budgetProduct.priceValue -
          (((this.budgetProduct.priceValue * productDiscountPercent) / 100) - this.budgetProduct.increaseValue))
          * this.budgetProduct.quantity);
      } else {
        this.budgetProduct.subTotal = ((this.budgetProduct.priceValue +
          (this.budgetProduct.increaseValue - ((this.budgetProduct.priceValue * productDiscountPercent) / 100)))
          * this.budgetProduct.quantity);
      }
    }
    if (productDiscountPercent === 0) {
      this.budgetProduct.discountValue = 0;
      this.budgetProduct.subTotal = ((this.budgetProduct.priceValue + this.budgetProduct.increaseValue)
        * this.budgetProduct.quantity);
    }
  }

  public calculateIncreaseValue(productIncreasePercent): void {
    if (productIncreasePercent > 0 && productIncreasePercent <= 100) {
      this.budgetProduct.increaseValue = ((this.budgetProduct.priceValue * productIncreasePercent) / 100);
      if (productIncreasePercent > this.budgetProduct.discountPercent) {
        this.budgetProduct.subTotal = ((this.budgetProduct.priceValue +
          (((this.budgetProduct.priceValue * productIncreasePercent) / 100) - this.budgetProduct.discountValue))
          * this.budgetProduct.quantity);
      } else {
        this.budgetProduct.subTotal = ((this.budgetProduct.priceValue -
          (this.budgetProduct.discountValue - ((this.budgetProduct.priceValue * productIncreasePercent) / 100)))
          * this.budgetProduct.quantity);
      }
    }
    if (productIncreasePercent === 0) {
      this.budgetProduct.increaseValue = 0;
      this.budgetProduct.subTotal = ((this.budgetProduct.priceValue - this.budgetProduct.discountValue)
        * this.budgetProduct.quantity);
    }
  }

  public searchByBarCode(): void {
    if (this.barCode !== undefined && this.barCode.length > 0 && isNumeric(this.barCode)) {
      this.productService.findByBarCode(this.barCode).subscribe(product => {
        this.budgetProduct = new BudgetProducts();
        this.product = Object.assign({}, product);
        this.budgetProduct.priceValue = product.priceValue;
        this.budgetProduct.subTotal = product.priceValue;
        this.currentBudgetProductPrice = product.priceValue;
        this.budgetProduct.quantity = 1;
        this.budgetProduct.discountValue = 0;
        this.budgetProduct.increaseValue = 0;
        this.budgetProduct.discountPercent = 0;
        this.budgetProduct.productName = product.name;
        this.budgetProduct.ncm = product.productOther ? product.productOther.ncm  : '';
        this.budgetProduct.cfop = product.productOther ? product.productOther.cfop : '';
        this.budgetProduct.unity = product.unity;
        this.budgetProduct.productId = product.id;
        this.budgetProduct.budgetId = this.budget.id;
        this.budgetProduct.barCodeProduct = product.barCode;
      }, error => {
        this.toastr.error(error.json().message, 'Erro');
      });
    }
  }

  public test(event): void {
    if (event !== null && event !== undefined && event.target !== undefined && event.target !== null &&
        event.target.value !== undefined
      && isNumeric(event.target.value)) {
      this.barCode = event.target.value;
    }
  }

  public showModalSearchProduct(): void {
    this.modalSearchProduct.show();
    setTimeout(() => {
      $('#inputProductSearchByBarCode').focus();
    }, 1000);

  }

  public onShowModalSearchBudget($event: ModalDirective): void {
    $('#inputBudgetSearchById').focus();
    this.modalSearchBudgetComponent.initBudgetFilter();
  }

  public onShowModalSearchProduct(): void {
    $('#inputProductSearchByBarCode').focus();
  }

  public onShowModalSearchClient(): void {
    $('#inputClientName').focus();
  }

  public goToReports(): void {
    this.router.navigateByUrl('/relatorio');
  }

}
