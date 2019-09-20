import { Component, OnInit } from '@angular/core';
import { ItemControllerInterface } from 'src/app/modules/item/models/ItemControllerInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-shopping-karts',
  templateUrl: './shopping-karts.page.html',
  styleUrls: ['./shopping-karts.page.scss'],
})
export class ShoppingKartsPage implements OnInit, ItemControllerInterface {
  ItemsList: ItemModelInterface[];
  filterLabel: string;
  filterString: string;
  secondSpinner: boolean;
  filterFields: any;
  filterFunction: (item: ItemModelInterface) => boolean;
  sorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number =
    (a: ShoppingKartModel, b: ShoppingKartModel) => {
      // tslint:disable: semicolon
      const dateA = a.purchaseDate.getFullDate()
      const dateB = b.purchaseDate.getFullDate()
      return this.compareDate(dateA, dateB)
    }

  compareDate = (a: Date, b: Date) => a > b ? -1 : a < b ? 1 : 0

  filter() {
    throw new Error('Method not implemented.');
  }

  createItem() {
    throw new Error('Method not implemented.');
  }

  constructor(public service: ShoppingKartsService) {
    this.filterFields = []
  }
  async loadKart(snap) {
    const kart = new ShoppingKartModel({ key: snap.key, service: this.service })
    await kart.load()
    return kart
  }

  async ngOnInit() {
    if (this.service.getEntitiesList()) {
      this.service.getEntitiesList().on('value', eventSuppliersListSnapshot => {
         this.secondSpinner = true
         this.ItemsList = [];
         eventSuppliersListSnapshot.forEach(snap => {
          const kart = new ShoppingKartModel({ item: snap.val(), service: this.service })
          kart.key = snap.key
          kart.load()
          this.ItemsList.push(kart);
        });
         this.secondSpinner = false
      });
    }
  }

  viewGraps() {

  }

}
