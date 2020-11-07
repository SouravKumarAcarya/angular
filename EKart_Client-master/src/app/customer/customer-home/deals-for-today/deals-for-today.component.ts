import { Component, OnInit } from '@angular/core';
import {CustomerSharedService} from '../customer-shared-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deals-for-today',
  templateUrl: './deals-for-today.component.html',
  styleUrls: ['./deals-for-today.component.css']
})
export class DealsForTodayComponent implements OnInit {

  errorMessage: string = null;
  successMessage: string = null;
  dealForToday: any = [];
  isProductSelected: Boolean = false;
  noDealFound: Boolean = false;
  pageNoList: Number[] = [];
  dealForTodayPageList: any = [];
  activePageNo: Number;

  constructor(private customerSharedService: CustomerSharedService, private router: Router) { }

  ngOnInit() {
    this.dealForTodayList();
  }

  // Method to fetch all the deal for today
  private dealForTodayList() {
    this.successMessage = 'Please wait, Loading deals...!';
    this.customerSharedService.dealForTodayList().subscribe(deals => {
      this.dealForTodayPageList = deals;

      // Check if deal is found or not
      if (this.dealForTodayPageList.length === 0) {
        this.noDealFound = true;
      }

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
      this.dealForToday = this.dealForTodayPageList.slice(0, 11);
      this.activePageNo = 0;
      this.successMessage = null;
    }, error => this.errorMessage = <any>error);
  }

  // Method to view the deal details
  viewDealDetails(deal: any) {
    this.isProductSelected = true;
    this.customerSharedService.buildModelDataObject(deal, this, null, null); // Using Subject to share data between components
  }

  // Method to set flag as product not selected
  setProductNotSelected() {
    this.isProductSelected = false;
    this.customerSharedService.buildModelDataObject(null, this, null, null);
  }

  // Method to set the current selected page and populates the data
  setPageNoAsActive(pageNo: number) {
    const start = 12 * pageNo;
    const end = start + 11;
    this.dealForToday = this.dealForTodayPageList.slice(start, end);
    this.activePageNo = pageNo;
  }
}
