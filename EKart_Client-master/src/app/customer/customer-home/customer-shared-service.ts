import { Injectable } from "@angular/core";
import { Product } from "../../shared/models/product";
import {BehaviorSubject, throwError, Observable, Subject} from 'rxjs';
import { Cart } from "../../shared/models/cart";
import { Address } from '../../shared/models/address';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CustomerSharedService {

    constructor(private http: HttpClient){}

    private cartList = new BehaviorSubject<Cart[]>(sessionStorage.getItem("cart")==null?[]:JSON.parse(sessionStorage.getItem("cart")));
    updatedCartList = this.cartList.asObservable();

    private addressList = new BehaviorSubject<Address[]>(JSON.parse(sessionStorage.getItem("customer")).addresses);
    updatedAddressList = this.addressList.asObservable();

    private loggedInCustomer = new BehaviorSubject<Customer>(JSON.parse(sessionStorage.getItem("customer")));
    updatedCustomer = this.loggedInCustomer.asObservable();

    // Sourav
    modelDataObject = new Subject<any>();
    // Sourav
    buildModelDataObject(data: any, context: any, infoMessages: any, errorMessages: any) {
      this.modelDataObject.next({
        'data': data,
        'context': context
      });
    }

    updatedCustomerDetails(customer: Customer) {
        this.loggedInCustomer.next(customer);
    }
    updateCartList(cartList: Cart[]) {
        this.cartList.next(cartList);
    }
    updateCustomerAddressList(addressList: Address[]) {
        this.addressList.next(addressList);

    }

    addProductToCart(cart: Cart):Observable<string>  {
        return this.http.post(environment.customerCartUrl+"/addProductToCart/"+cart.customerEmailId, cart, {responseType: "text"})
        .pipe(catchError(this.handleError));

    }

    private handleError(err: HttpErrorResponse) {
        console.log(err)
        let errMsg:string='';
        if (err.error instanceof Error) {
            errMsg=err.error.message;
            console.log(errMsg)
        }
         else if(typeof err.error === 'string'){
            errMsg=JSON.parse(err.error).message
        }
        else {
           if(err.status==0){
               errMsg="A connection to back end can not be established.";
           }else{
               errMsg=err.error.message;
           }
         }
            return throwError(errMsg);
    }

  dealForTodayList() {
    return this.http.get(environment.CustomerProductAPI + '/getAllProductsOnDeal/')
      .pipe(catchError(this.handleError));
  }
}
