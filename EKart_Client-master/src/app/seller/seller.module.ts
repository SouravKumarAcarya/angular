import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DatePipe } from '../shared/pipes/date-converter.pipe';
import { SellerLandingComponent } from './seller-landing-page/seller-landing.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerLoginComponent } from './seller-landing-page/login/seller-login.component';
import { SellerProductsComponent } from './seller-home/products/seller-products/seller-products.component';
import { SellerViewOrderComponent } from './seller-home/seller-view-order/seller-view-order.component';
import { SellerProfileComponent } from './seller-home/seller-view-profile/seller-profile.component';
import { SellerAddProductsComponent } from './seller-home/products/seller-add-products/seller-add-products.component';
import { SellerChangePasswordComponent } from './seller-home/seller-change-password/seller-change-password.component';
import { SellerRegistrationComponent } from './seller-landing-page/seller-registration/seller-registration.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerLoginService } from './seller-landing-page/login/seller-login.service';
import { SellerProfileService } from './seller-home/seller-view-profile/seller-profile.service';
import { SellerAddProductService } from './seller-home/products/seller-add-products/seller-add-product.service';
import { SellerSharedService } from './seller-home/seller-shared.service';
import { SellerChangePasswordService } from './seller-home/seller-change-password/seller-change-password.service';
import { SellerViewOrderService } from './seller-home/seller-view-order/seller-view-order.service';
import { SellerRegistrationService } from './seller-landing-page/seller-registration/seller-registration.service';
import { SellerProductsService } from './seller-home/products/seller-products/seller-products.service';
import { DealsForTodayComponent } from './seller-home/deals-for-today/deals-for-today.component';
import {ProductDescriptionPipe} from '../shared/pipes/product-description.pipe';
import {AppModule} from '../app.module';
import {CustomerModule} from '../customer/customer.module';
import { SellerAddProductToDealsComponent } from './seller-home/products/seller-add-product-to-deals/seller-add-product-to-deals.component';



@NgModule({
    declarations: [
        SellerLandingComponent,
        SellerHomeComponent,
        SellerLoginComponent,
        SellerProductsComponent,
        SellerViewOrderComponent,
        SellerProfileComponent,
        SellerAddProductsComponent,
        SellerChangePasswordComponent,
        SellerRegistrationComponent,
        DatePipe,
        DealsForTodayComponent,
        SellerAddProductToDealsComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SellerRoutingModule,
    CustomerModule,
    // AppModule
  ],
    providers: [
        SellerLoginService,
        SellerProfileService,
        SellerAddProductService,
        SellerSharedService,
        SellerProfileService,
        SellerChangePasswordService,
        SellerViewOrderService,
        SellerRegistrationService,
        SellerProductsService
    ],
    exports: []

})
export class SellerModule {

}
