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

@NgModule({
  declarations: [
    AppComponent,
    QuickSellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TabsModule.forRoot()
  ],
  providers: [QuickSellService, ClientService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
