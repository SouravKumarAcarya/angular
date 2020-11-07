import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import {Observable, Subject, throwError} from 'rxjs';
import { Product } from '../../../../shared/models/product';
import { environment } from '../../../../../environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import {SellerSharedService} from '../../seller-shared.service';

@Injectable({
  providedIn: 'root'
})
export class SellerProductsService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private sharedService: SellerSharedService) { }

  getProductCategories(): Observable<string[]> {
    const url = environment.SellerProductManagementAPI + "/getProductCategories";
    return this.http.get<string[]>(url)
      .pipe(catchError(this.handleError));

  }


  updateProductDetails(product: Product): Observable<Product> {
    const url = environment.SellerProductManagementAPI + "/modifyProductDetails";
    return this.http.post<Product>(url, product)
      .pipe(catchError(this.handleError));

  }


  removeProductFromSeller(product: Product): Observable<Product> {
    const url = environment.SellerProductManagementAPI + "/removeProduct";
    console.log(JSON.stringify(product))
    return this.http.post<Product>(url, JSON.stringify(product), { headers: this.headers })
      .pipe(

        catchError(this.handleError));

  }
  private handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg: string = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
      console.log(errMsg)
    }
    else if (typeof err.error === 'string') {
      errMsg = JSON.parse(err.error).message
    }
    else {
      if (err.status == 0) {
        errMsg = "A connection to back end can not be established.";
      } else {
        errMsg = err.error.message;
      }
    }
    return throwError(errMsg);
  }

  // Sourav
  dealForDayListBySellerEmailId() {
    let email = null;
    this.sharedService.currentSeller.subscribe(seller => {
      email = seller.emailId;
    });
    const url = environment.SellerProductManagementAPI + '/getAllProductsOnDealBySelleEmailId?sellerEmailId=' + email;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Sourav
  removeDealFromDealForDay(deal: any) {
    const url = environment.SellerProductManagementAPI + '/deleteProductOnDealByProductId/' + deal.product.productId;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  // Sourav
  addProductOnDealsForToday(deal) {
    const url = environment.SellerProductManagementAPI + '/addProductOnDealSForToday';
    return this.http.post(url, deal).pipe(catchError(this.handleError));
  }
}

