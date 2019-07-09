import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SupplierModel } from '../../models/supplierModel';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService implements ItemServiceInterface {
  public suppliersListRef: firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.suppliersListRef = firebase.database().ref(`/fornitori/${user.uid}/`);
      }
    });
  }


  getDummyItem() {

    return new SupplierModel();
  }

  createItem(item: ItemModelInterface) {
    console.log('puhing',item.serialize())
    return this.suppliersListRef.push(item.serialize());

  }

  getEntitiesList(): firebase.database.Reference {
    return this.suppliersListRef;
  }


  getItem(prId: string): firebase.database.Reference {

    return (this.suppliersListRef && prId) ? this.suppliersListRef.child(prId) : undefined;
  }

  updateItem(item: SupplierModel) {
    return this.suppliersListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {

    return (key) ? this.suppliersListRef.child(key).remove() : undefined;
  }

}
