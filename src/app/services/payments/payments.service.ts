import { Injectable } from '@angular/core';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { PaymentsModel } from 'src/app/models/paymentModel';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService implements ItemServiceInterface {

  public paymentsListRef: firebase.database.Reference;
  private _items:BehaviorSubject<Array<PaymentsModel>> = new BehaviorSubject([])
  public readonly items:Observable<Array<PaymentsModel>> = this._items.asObservable()
  private items_list:Array<PaymentsModel> = []
  getDummyItem() {
    return new PaymentsModel();

  }

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.paymentsListRef = firebase.database().ref(`/pagamenti/${user.uid}/`);
        this.getEntitiesList().on('value', eventCategoriesListSnapshot => {
          console.log('loading payments')

          this.items_list = [];
          eventCategoriesListSnapshot.forEach(snap => {
            const payment =  new PaymentsModel().initialize(snap.val())
            this.items_list.push(payment );
          });
        this._items.next(this.items_list)
        });
      }
    });
  }

  getEntitiesList(): firebase.database.Reference {
    return this.paymentsListRef;
  }


  getItem(prId: string): firebase.database.Reference {
    return this.paymentsListRef.child(prId);
  }

  createItem(item: ItemModelInterface) {
    return this.paymentsListRef.push(item.serialize());

  }

  updateItem(item: ItemModelInterface) {
    return this.paymentsListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {
    return this.paymentsListRef.child(key).remove();
  }
}
