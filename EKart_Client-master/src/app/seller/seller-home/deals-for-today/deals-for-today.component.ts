import { Component, OnInit } from '@angular/core';
import {SellerProductsService} from '../products/seller-products/seller-products.service';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-deals-for-today',
  templateUrl: './deals-for-today.component.html',
  styleUrls: ['./deals-for-today.component.css']
})
export class DealsForTodayComponent implements OnInit {

  errorMessage: string = null;
  dealForDay: any = [];
  isProductSelected: Boolean = false;
  successMessage: String = null;
  selectedProduct: Product;
  dealForTodayPageList: any = [];
  pageNoList: Number[] = [];
  activePageNo: Number;

  constructor(private sellerProductService: SellerProductsService) { }

  ngOnInit() {
    this.dealForDayList();
  }

  // Method to fetch all the deal for day
  private dealForDayList() {
    this.sellerProductService.dealForDayListBySellerEmailId().subscribe(deals => {
      this.dealForTodayPageList = deals;

      // Populating pages
      let count = 0;
      let i = 12;
      for (i ; i <= this.dealForTodayPageList.length; i = i + 12 ) {
        this.pageNoList.push(count++);
      }

      // Condition to add extra page
      if (i - 12 < this.dealForTodayPageList.length) {
        this.pageNoList.push(count++);
      }

      // Setting default as page no 0
      this.dealForDay = this.dealForTodayPageList.slice(0, 11);
      this.activePageNo = 0;
    }, error => this.errorMessage = <any>error);
  }

  // Method to set flag as product not selected
  setProductNotSelected() {
    this.isProductSelected = false;
  }

  // Method to remove deal from list
  removeDeal(deal: any) {
    this.sellerProductService.removeDealFromDealForDay(deal).subscribe(response => {
      this.dealForDay = this.dealForDay.filter(dealElement => {
        return deal.dealId !== dealElement.dealId;
      });
      this.successMessage = 'Deal with productId ' + deal.product.productId + ' removed successfully!';
    }, error => this.errorMessage = 'Error Occurred while deleting deal!');
  }

  // Method to view deal details
  viewDeal(deal: any) {
    this.selectedProduct = deal.product;
    this.isProductSelected = true;
  }

  // Method to set the current selected page and populates the data
  setPageNoAsActive(pageNo: number) {
    const start = 12 * pageNo;
    const end = start + 11;
    this.dealForDay = this.dealForTodayPageList.slice(start, end);
    this.activePageNo = pageNo;
  }
}
