import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';

import {AppComponent} from './app.component';
import {QuickSellComponent} from './quick-sell/quick-sell.component';
import {QuickSellService} from './quick-sell/quick-sell-service';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ClientService} from './client/client.service';
import {ProductService} from './product/product.service';
import { ProductQuickSellComponent } from './quick-sell/product-quick-sell/product-quick-sell.component';
import {TextMaskModule} from 'angular2-text-mask';
import {ProductGroupService} from './product/product-group.service';
import {ProductFamilyService} from './product/product-family.service';
import { QuickSellDetailsComponent } from './quick-sell/quick-sell-details/quick-sell-details.component';
import { SightSaleComponent } from './sight-sale/sight-sale.component';
import { ProductSightSaleComponent } from './sight-sale/product-sight-sale/product-sight-sale.component';
import { ReportFiltersComponent } from './report-filters/report-filters.component';
import {SightSaleService} from './sight-sale/sight-sale.service';
import { SightSaleDetailsComponent } from './sight-sale/sight-sale-details/sight-sale-details.component';
import { SaleResumeComponent } from './sale-resume/sale-resume.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {routing} from './app.routes';
import { ReportComponent } from './report/report.component';
import { LiberationComponent } from './liberation/liberation.component';
import {LiberationService} from './liberation/liberation.service';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { ModalClientLiberationComponent } from './liberation/modal-client-liberation/modal-client-liberation.component';
import {ModalModule} from 'ngx-bootstrap';
import {EmployeeService} from './employee/employee.service';
import {LocalStorageModule} from 'angular-2-local-storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from "ng2-toastr";

@NgModule({
  declarations: [
    AppComponent,
    QuickSellComponent,
    ProductQuickSellComponent,
    QuickSellDetailsComponent,
    SightSaleComponent,
    ProductSightSaleComponent,
    ReportFiltersComponent,
    SightSaleDetailsComponent,
    SaleResumeComponent,
    ReportComponent,
    LiberationComponent,
    ModalClientLiberationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    TextMaskModule,
    NgxPaginationModule,
    routing,
    SlimLoadingBarModule.forRoot(),
    ModalModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    ToastModule.forRoot()
  ],
  providers: [
    QuickSellService,
    ClientService,
    ProductService,
    ProductGroupService,
    ProductFamilyService,
    SightSaleService,
    LiberationService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
