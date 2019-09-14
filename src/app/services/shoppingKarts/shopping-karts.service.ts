
import { Injectable } from '@angular/core';
// tslint:disable:semicolon
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface'
import { CategoriesService } from '../categories/categorie.service'
import { PaymentsService } from '../payments/payments.service'
import { SuppliersService } from '../suppliers/suppliers.service'
import * as firebase from 'firebase';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
// tslint:disable:semicolon

@Injectable({
  providedIn: 'root'
})
export class ShoppingKartsService implements ItemServiceInterface {
  public shoppingKartsListRef: firebase.database.Reference;
  categoriesService?: ItemServiceInterface;
  suppliersService?: SuppliersService | ItemServiceInterface;
  paymentsService?: ItemServiceInterface | ItemServiceInterface;
  getItem(key: string): firebase.database.Reference {
    return this.shoppingKartsListRef.child(key);
  }
  updateItem(item: ItemModelInterface) {
    return this.shoppingKartsListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {
    return this.shoppingKartsListRef.child(key).remove();
  }
  getDummyItem(): import('../../modules/item/models/itemModelInterface').ItemModelInterface {
    return new ShoppingKartModel()
  }
  createItem(item: ItemModelInterface): import('firebase').database.ThenableReference {
    return this.shoppingKartsListRef.push(item.serialize());
  }
  getEntitiesList(): import('firebase').database.Reference {
    // tslint:disable-next-line: semicolon
    return this.shoppingKartsListRef
  }

  constructor(categories: CategoriesService, payments: PaymentsService, suppliers: SuppliersService) {
    this.categoriesService = categories
    this.suppliersService = suppliers
    this.paymentsService = payments

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.shoppingKartsListRef = firebase.database().ref(`/acquisti/${user.uid}/`);
      }
    });
  }
}
