import { Injectable } from "@angular/core";
import {BehaviorSubject, Subject} from 'rxjs';
import { Seller } from "../../shared/models/seller";

@Injectable({
    providedIn:'root'
})
export class SellerSharedService{

    private loggedInSellerDetails=new BehaviorSubject<Seller>(JSON.parse(sessionStorage.getItem("seller")));
    currentSeller=this.loggedInSellerDetails.asObservable();

    // Sourav
    modelDataObject = new Subject<any>();

    // Sourav
    buildModelDataObject(data: any, context: any) {
      this.modelDataObject.next({
        'data': data,
        'context': context
      });
    }

    updateSeller(seller:Seller){
        this.loggedInSellerDetails.next(seller);
    }
}
