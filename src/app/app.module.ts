import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    QuickSellComponent,
    ProductQuickSellComponent,
    QuickSellDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot(),
    TextMaskModule
  ],
  providers: [QuickSellService, ClientService, ProductService, ProductGroupService, ProductFamilyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
