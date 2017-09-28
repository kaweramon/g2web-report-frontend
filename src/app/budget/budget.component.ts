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

  public listProducts: Array<Product> = [];

  public dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('modalSearchClient')
  public modalSearchClient: ModalDirective;

  @ViewChild('modalSearchProduct')
  public modalSearchProduct: ModalDirective;

  @ViewChild('modalSearchSalesman')
  public modalSearchSalesman: ModalDirective;

  @ViewChild('modalSearchBudget')
  public modalSearchBudget: ModalDirective;

  public saleDateStr: string;

  public totalProducts = 0;

  public discount = 0.0;

  public percentDiscount = 0.0;

  public listBudgetProducts: Array<BudgetProducts> = [];

  constructor(private employeeService: EmployeeService, private localStorageService: LocalStorageService,
              private budgetService: BudgetService, public toastr: ToastsManager,
              private budgetProductsService: BudgetProductsService, private clientService: ClientService) {
    this.employee = new Employee();
    this.salesman = new Employee();
    this.product = new Product();
    this.product.quantity = 1;
    this.product.productOther = new ProductOthers();
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
      console.log(this.salesman);
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
      this.budget.status = 'Andamento';
      this.budget.operatorName = this.employee.name;
      this.budget.operatorId = this.employee.id;
      this.budget.type = 'Venda';
      this.budget.delivered = 'SIM';
      this.budget.salesman = this.salesman.name;
      this.budgetService.create(this.budget).subscribe(budget => {
        this.budget = Object.assign({}, budget);
        console.log(this.budget);
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
      this.product.quantity = 1;
      console.log(this.product);
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
  }

  private retrieveBudgetData(): void {
    this.product = new Product();
    this.product.productOther = new ProductOthers();
    this.listProducts = [];
    this.totalProducts = 0;
    if (this.budget.listBudgetProducts !== null && this.budget.listBudgetProducts.length > 0) {
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
        this.listProducts.push(product);
      });
    }
    if (this.budget.clientId !== null && this.budget.clientId !== undefined) {
      this.clientService.searchClients('id=' + this.budget.clientId, false).subscribe(result => {
        console.log(result);
        if (result.length > 0) {
          this.client = result[0];
        }
      });
    }
    console.log(this.budget);
    if (this.budget.operatorId !== null && this.budget.operatorId !== undefined) {
      this.employeeService.getById(this.budget.operatorId).subscribe(result => {
        this.employee = result;
      });
    }
    console.log(this.client);
    console.log(this.employee);
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
    this.salesman = Object.assign({}, this.employee);
  }

  public addProduct(): void {
    if (this.product.priceValue) {
      this.totalProducts += this.product.priceValue * this.product.quantity;
    }
    this.listProducts.push(this.product);
  }

  public saveBuget(): void {
    this.budget.clientId = this.client.id;
    if (this.client.name.length > 30) {
      this.budget.clientName = this.client.name.substring(0, 30);
    } else {
      this.budget.clientName = this.client.name;
    }
    this.budget.salesman = this.employee.id.toString() + ' - ' + this.employee.name;
    this.budget.hour = new Date();
    this.budget.totalWithDiscount = this.totalProducts - this.discount;
    this.budget.total = this.totalProducts;
    this.budget.type = 'Venda';
    this.budget.discountValue = this.discount;
    this.budget.operatorId = this.employee.id;
    this.budget.operatorName = this.employee.name;
    this.budget.status = 'Concluido';
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
      budgetProduct.budgetId = this.budget.id;
      if (this.listBudgetProducts.indexOf(budgetProduct) === -1) {
        this.listBudgetProducts.push(budgetProduct);
      }
    });
    console.log(this.budget);
    console.log(this.listBudgetProducts);
    if (this.listBudgetProducts.length > 0 && this.budget && this.budget.id) {
      this.budgetService.update(this.budget).subscribe(() => {
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

  public calculateDiscount(): void {
    if (this.percentDiscount > 0) {
      this.discount = (this.totalProducts * this.percentDiscount) / 100;
    }
  }

  public calculatePercentDiscount(): void {
    if (this.discount > 0) {
      this.percentDiscount = (this.discount * 100) / this.totalProducts;
    }
  }

}
