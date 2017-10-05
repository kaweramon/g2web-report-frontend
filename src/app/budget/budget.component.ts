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
import {ClientService} from '../client/client.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

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

  constructor(private employeeService: EmployeeService, private localStorageService: LocalStorageService,
              private budgetService: BudgetService, public toastr: ToastsManager,
              private budgetProductsService: BudgetProductsService, private clientService: ClientService) {
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

  public login(): void {
    this.employeeService.login(this.employee.login, this.employee.password).subscribe(employee => {
      this.employee = Object.assign({}, employee);
      this.salesman = Object.assign({}, employee);
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
      this.budget.budgetCounter = result.budgetCounter + 1;
      this.budget.status = 'Andamento';
      this.budget.operatorName = this.employee.name;
      this.budget.operatorId = this.employee.id;
      this.budget.type = 'Venda';
      this.budget.delivered = 'SIM';
      this.budget.salesman = this.salesman.name;
      this.budgetService.create(this.budget).subscribe(budget => {
        this.budget = Object.assign({}, budget);
        this.modalSearchClient.show();
      });
    });
  }

  public onNotify(msg: any): void {
    if (msg.client) {
      this.client = msg.client;
    }
    if (msg.product) {
      this.product = msg.product;
      this.budgetProduct = new BudgetProducts();
      this.budgetProduct.priceValue = msg.product.priceValue;
      this.currentBudgetProductPrice = msg.product.priceValue;
      this.budgetProduct.quantity = 1;
      this.budgetProduct.discountValue = 0;
      this.budgetProduct.increaseValue = 0;
      this.budgetProduct.productName = msg.product.name;
      this.budgetProduct.ncm = msg.product.productOther ? msg.product.productOther.ncm  : '';
      this.budgetProduct.cfop = msg.product.productOther ? msg.product.productOther.cfop : '';
      this.budgetProduct.barCodeProduct = msg.product.barCode;
      this.budgetProduct.unity = msg.product.unity;
      this.budgetProduct.productId = msg.product.id;
      this.budgetProduct.budgetId = this.budget.id;
    }
    if (msg.salesman) {
      this.salesman = msg.salesman;
    }
    if (msg.budget) {
      this.budget = msg.budget;
      this.retrieveBudgetData();
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
    /*if (this.budget.listBudgetProducts !== null && this.budget.listBudgetProducts.length > 0) {
      this.budget.listBudgetProducts.forEach(budgetProduct => {
        const product: Product = new Product();
        product.productOther = new ProductOthers();
        product.name = budgetProduct['productName'];
        product.id = budgetProduct['productId'];
        product.quantity = budgetProduct['quantity'];
        product.priceValue = budgetProduct['priceValue'];
        product.productOther.cfop = budgetProduct['cfop'];
        product.productOther.ncm = budgetProduct['ncm'];
        product.productOther.cstNumber = budgetProduct['cst'];
        product.barCode = budgetProduct['barCodeProduct'];
        this.totalProducts += (product.priceValue * product.quantity);
        this.listBudgetProducts.push(product);
      });
    }*/
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
    /*if (this.budget.increaseValue) {
      this.increaseValue = this.budget.increaseValue;
    }
    if (this.budget.discountValue) {
      this.discountValue = this.budget.discountValue;
    }*/
  }

  public removeProduct(index: number): void {
    this.totalProducts -= (((this.listBudgetProducts[index].priceValue - this.listBudgetProducts[index].discountValue)
    + this.listBudgetProducts[index].increaseValue) * this.listBudgetProducts[index].quantity);
    this.listBudgetProducts.splice(index, 1);
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
    this.budgetProduct = new BudgetProducts();
    this.listBudgetProducts = [];
    this.product = new Product();
    this.product.productOther = new ProductOthers();
    this.totalProducts = 0;
    this.currentBudgetProductPrice = 0;
    this.salesman = Object.assign({}, this.employee);
  }

  public addProduct(): void {
    if (this.budgetProduct.priceValue) {
      this.totalProducts += (((this.currentBudgetProductPrice - this.budgetProduct.discountValue)
        + this.budgetProduct.increaseValue)
        * this.budgetProduct.quantity);
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
    }
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
    // this.budget.discountValue = this.discountValue;
    // this.budget.increaseValue = this.increaseValue;
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

  public calculateIncreaseAndDiscountProduct(productPrice): void {
    if (productPrice > this.currentBudgetProductPrice) {
      this.budgetProduct.increaseValue = (productPrice - this.currentBudgetProductPrice);
      this.budgetProduct.discountValue = 0;
    } else {
      this.budgetProduct.discountValue = (this.currentBudgetProductPrice - productPrice);
      this.budgetProduct.increaseValue = 0;
    }
  }

}
