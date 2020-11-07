import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SellerProductsService} from '../seller-products/seller-products.service';
import {Product} from '../../../../shared/models/product';
import {SellerSharedService} from '../../seller-shared.service';
import {LoginValidators} from '../../../../shared/validators/login.validator';

@Component({
  selector: 'app-seller-add-product-to-deals',
  templateUrl: './seller-add-product-to-deals.component.html',
  styleUrls: ['./seller-add-product-to-deals.component.css']
})
export class SellerAddProductToDealsComponent implements OnInit {

  dealForDayForm: FormGroup;
  product: Product;
  successMessage: string = null;
  errorMessage: string = null;

  constructor(private sellerSharedService: SellerSharedService, private sellerProductService: SellerProductsService) { }

  ngOnInit() {
    this.sellerSharedService.modelDataObject.subscribe(modelObject => {
      this.product = modelObject.data;
    });
    this.createDealForDayForm();
  }

  private createDealForDayForm() {
    this.dealForDayForm = new FormGroup({
      dealDiscount: new FormControl(null, [Validators.required, Validators.maxLength(2)]),
      dealStartDate: new FormControl(null, [Validators.required, LoginValidators.validateDealStartDate]),
      dealEndDate: new FormControl(null, [Validators.required]),
    });
    this.dealForDayForm.get('dealEndDate').setValidators([
      Validators.required,
      LoginValidators.validateDealEndDate(this.dealForDayForm.get('dealStartDate'))
    ]);
  }

  onSaveDeal() {
    const deals = this.dealForDayForm.value;
    deals.product = this.product;
    deals.emailId = JSON.parse(sessionStorage.getItem('seller')).emailId;
    this.sellerProductService.addProductOnDealsForToday(deals).subscribe(response => {
      this.successMessage = 'Product Added to deal successfully!';
      this.errorMessage = null;
      this.createDealForDayForm();
    }, error => {
      this.successMessage = null;
      this.errorMessage = 'Error occurred while ading product to deal'; });
  }
}
