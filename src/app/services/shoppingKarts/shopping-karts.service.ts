
import { Injectable } from '@angular/core';
// tslint:disable:semicolon
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface'
import { CategoriesService } from '../categories/categorie.service'
import { PaymentsService } from '../payments/payments.service'
import { SuppliersService } from '../suppliers/suppliers.service'
import * as firebase from 'firebase';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupplierModel } from 'src/app/models/supplierModel';
import { PaymentsModel } from 'src/app/models/paymentModel';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { CategoryModel } from 'src/app/models/CategoryModel';
// tslint:disable:semicolon

@Injectable({
  providedIn: 'root'
})
export class ShoppingKartsService implements ItemServiceInterface {
  public shoppingKartsListRef: firebase.database.Reference;
  private _items: BehaviorSubject<Array<ShoppingKartModel>> = new BehaviorSubject([])
  public readonly items: Observable<Array<ShoppingKartModel>> = this._items.asObservable()
  private items_list: Array<ShoppingKartModel> = []
  categoriesService?: ItemServiceInterface;

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

  constructor(categories: CategoriesService, public payments: PaymentsService, public suppliers: SuppliersService) {
    this.categoriesService = categories
    const purchaseInitializer = (purchase) => {
      const Purchase = new PurchaseModel().initialize(purchase)


      const initiateCategory = (catKey) => {
        const Category = new CategoryModel(catKey)
        this.categoriesService.getItem(catKey).on('value', (category) => {
          Category.initialize(category.val())
        })
        return Category
      }
      Purchase.categorie = Purchase.categorieId ? Purchase.categorieId.map(initiateCategory) : []
      return Purchase
    }



    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.shoppingKartsListRef = firebase.database().ref(`/acquisti/${user.uid}/`);
        this.items.subscribe(items=>{
        })
        this.getEntitiesList().on('value', eventSuppliersListSnapshot => {
          this.items_list = [];
          eventSuppliersListSnapshot.forEach(snap => {
            const kart = new ShoppingKartModel({ key: snap.val() }).initialize(snap.val())
            kart.key = snap.key
            kart.items = kart.items.map(purchaseInitializer)
            // initialize payment
            this.payments.items.subscribe(payments => {
              kart.setPayment(payments.filter((pagamento: PaymentsModel) => pagamento.key == kart.pagamentoId)[0])
            })
            // inirtialize supplier 
            this.suppliers.items.subscribe(suppliers => {
              kart.setSupplier(suppliers.filter((fornitore: SupplierModel) => fornitore.key == kart.fornitoreId)[0])
            })
            this.items_list.push(kart);

          });
          this._items.next(this.items_list)
        });
      }
    });
  }
}
