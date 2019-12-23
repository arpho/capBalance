import { Injectable } from '@angular/core';
import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import * as firebase from 'firebase';
import { ItemModelInterface } from '../../modules/item/models/itemModelInterface';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements ItemServiceInterface {
  public categoriesListRef: firebase.database.Reference;
  private _items: BehaviorSubject<Array<CategoryModel>> = new BehaviorSubject([])
  public readonly items: Observable<Array<CategoryModel>> = this._items.asObservable()
  private items_list: Array<CategoryModel> = []
  initializeCategory(cat) {
    const Cat = new CategoryModel(cat.key).initialize(cat)
    if (Cat.fatherKey) {
      this.getItem(Cat.fatherKey).on('value', father => {
        const FatherCategory = this.initializeCategory(father.val())
        Cat.father = FatherCategory
      })
    }
    return Cat
  }

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.categoriesListRef = firebase.database().ref(`/categorie/${user.uid}/`); this.getEntitiesList().on('value', eventCategoriesListSnapshot => {
          this.items_list = [];
          eventCategoriesListSnapshot.forEach(snap => {
            const cat = this.initializeCategory(snap.val())
            this.items_list.push(cat)
          }
          );
          this._items.next(this.items_list)
        });
      }
    });


  }


  getDummyItem() {

    return new CategoryModel();
  }




  createItem(item: CategoryModel) {
    return this.categoriesListRef.push(item.serialize());

  }

  getEntitiesList(): firebase.database.Reference {
    return this.categoriesListRef;
  }


  getItem(prId: string): firebase.database.Reference {
    return this.categoriesListRef.child(prId);
  }

  updateItem(item: ItemModelInterface) {
    return this.categoriesListRef.child(item.key).update(item.serialize());
  }
  deleteItem(key: string) {
    return this.categoriesListRef.child(key).remove();
  }

}
