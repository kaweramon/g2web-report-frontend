import {Component, ViewChild} from '@angular/core';
import {Budget} from './budget';
import {EmployeeService} from '../employee/employee.service';
import {Employee} from '../employee/employee';
import {LocalStorageService} from 'angular-2-local-storage';
import {BudgetService} from './budget.service';
import {ModalDirective} from 'ngx-bootstrap';
import {Client} from '../client/client';
import {Product} from '../product/product';
import * as moment from 'moment';
import {ToastsManager} from 'ng2-toastr';
import {ProductOthers} from '../product/product-others';
import {BudgetProducts} from './budget-products';
import {BudgetProductsService} from './budget-products.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  public budget: Budget;

  public isLoged = false;

  public employee: Employee;

  public client: Client;

  public product: Product;

  public listProducts: Array<Product> = [];

  public dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('modalSearchClient')
  public modalSearchClient: ModalDirective;

  @ViewChild('modalSearchProduct')
  public modalSearchProduct: ModalDirective;

  public saleDateStr: string;

  public totalProducts = 0;

  public discount = 0.0;

  public listBudgetProducts: Array<BudgetProducts> = [];

  constructor(private employeeService: EmployeeService, private localStorageService: LocalStorageService,
              private budgetService: BudgetService, public toastr: ToastsManager,
              private budgetProductsService: BudgetProductsService) {
    this.employee = new Employee();
    this.product = new Product();
    this.product.quantity = 1;
    this.product.productOther = new ProductOthers();
    if (this.localStorageService.get('employee') !== null && this.localStorageService.get('employee') !== undefined) {
      this.isLoged = true;
      this.employee.id = localStorageService.get('employee')['id'];
      this.employee.name = this.localStorageService.get('employee')['name'];
    } else {
      this.isLoged = false;
    }
  }

  public login(): void {
    this.employeeService.login(this.employee.login, this.employee.password).subscribe(employee => {
      this.employee = employee;
      this.budgetService.getLast().subscribe(result => {
        this.budget = result;
        this.localStorageService.set('employee', employee);
        this.isLoged = true;
      });
    }, error => {
      this.toastr.error(error.json().message, 'Error');
    });
  }

  public addBudget(): void {
    this.budgetService.getLast().subscribe(result => {
      this.budget = new Budget();
      this.saleDateStr = moment().format('DD/MM/YYYY');
      this.budget.budgetCounter = result.budgetCounter;
    });
  }

  public onNotify(msg: any): void {
    if (msg.client) {
      this.client = msg.client;
    }
    if (msg.product) {
      this.product = msg.product;
      this.product.quantity = 1;
    }
  }

  public removeProduct(index: number): void {
    this.totalProducts -= (this.listProducts[index].priceValue * this.listProducts[index].quantity);
    this.listProducts.splice(index, 1);
  }

  public logOut(): void {
    this.localStorageService.remove('employee');
    this.isLoged = false;
  }

  public resetEmployee(): void {
    this.employee = new Employee();
  }

  public resetBuget(): void {
    this.budget = undefined;
    this.client = new Client();
    this.listProducts = [];
    this.product = new Product();
    this.product.productOther = new ProductOthers();
    this.totalProducts = 0;
  }

  public addProduct(): void {
    if (this.product.priceValue) {
      this.totalProducts += this.product.priceValue * this.product.quantity;
    }
    this.listProducts.push(this.product);
  }

  public saveBuget(): void {
    this.budget.clientId = this.client.id;
    this.budget.salesman = this.employee.id.toString() + ' - ' + this.employee.name;
    this.budget.hour = new Date();
    this.budget.totalWithDiscount = this.totalProducts - this.discount;
    this.budget.type = 'Venda';
    this.budget.discountValue = this.discount;
    this.budget.operatorId = this.employee.id;
    this.budget.operatorName = this.employee.name;
    this.listProducts.forEach(product => {
      const budgetProduct: BudgetProducts = new BudgetProducts();
      budgetProduct.productId = product.id;
      budgetProduct.productName = product.name;
      budgetProduct.quantity = product.quantity;
      budgetProduct.priceValue = product.priceValue;
      budgetProduct.subTotal = product.priceValue;
      budgetProduct.costValue = product.costPrice;
      budgetProduct.cfop = product.productOther.cfop;
      budgetProduct.ncm = parseInt(product.productOther.ncm, undefined);
      budgetProduct.cst = parseInt(product.productOther.cstNumber, undefined);
      budgetProduct.barCodeProduct = product.barCode;
      if (this.listBudgetProducts.indexOf(budgetProduct) === -1) {
        this.listBudgetProducts.push(budgetProduct);
      }
    });
    console.log(this.budget);
    console.log(this.listBudgetProducts);
    if (this.listBudgetProducts.length > 0 && this.budget) {
      this.budgetService.create(this.budget).subscribe(() => {
        this.budgetProductsService.create(this.listBudgetProducts).subscribe(() => {
          this.toastr.success('Orçamento Cadastrado', 'Sucesso');
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

  public buildBudget(callback): void {
    this.budget.clientId = this.client.id;
    this.budget.salesman = this.employee.id.toString() + ' - ' + this.employee.name;
    this.budget.hour = new Date();
    this.budget.totalWithDiscount = this.totalProducts - this.discount;
    this.budget.type = 'Venda';
    this.budget.discountValue = this.discount;
    this.budget.operatorId = this.employee.id;
    this.budget.operatorName = this.employee.name;
    this.listProducts.forEach(product => {
      const budgetProduct: BudgetProducts = new BudgetProducts();
      budgetProduct.productId = product.id;
      budgetProduct.productName = product.name;
      budgetProduct.quantity = product.quantity;
      budgetProduct.priceValue = product.priceValue;
      budgetProduct.subTotal = product.priceValue;
      budgetProduct.costValue = product.costPrice;
      budgetProduct.cfop = product.productOther.cfop;
      budgetProduct.ncm = parseInt(product.productOther.ncm, undefined);
      budgetProduct.cst = parseInt(product.productOther.cstNumber, undefined);
      budgetProduct.barCodeProduct = product.barCode;
      this.listBudgetProducts.push(budgetProduct);
    });
    console.log(this.listBudgetProducts);
    if (callback &&  this.listBudgetProducts.length > 0) {
      callback();
    }
  }

}
