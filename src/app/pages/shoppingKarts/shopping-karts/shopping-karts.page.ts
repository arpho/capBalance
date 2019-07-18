import { Component, OnInit } from '@angular/core';
import { ItemControllerInterface } from 'src/app/modules/item/models/ItemControllerInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';

@Component({
  selector: 'app-shopping-karts',
  templateUrl: './shopping-karts.page.html',
  styleUrls: ['./shopping-karts.page.scss'],
})
export class ShoppingKartsPage implements OnInit, ItemControllerInterface {
  ItemsList: ItemModelInterface[];
  filterLabel: string;
  filterString: string;
  filterFields: any;
  filterFunction: (item: ItemModelInterface) => boolean;
  sorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number =
    (a: ShoppingKartModel, b: ShoppingKartModel) => {
      // tslint:disable: semicolon
      console.log('sorting', a.purchaseDate, b.purchaseDate)
      const dateA = new Date(a.purchaseDate.formatDate())
      const dateB = new Date(b.purchaseDate.formatDate())
      console.log(dateA > dateB ? -1 : dateA < dateB ? 1 : 0)
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0
    }
  filter() {
    throw new Error('Method not implemented.');
  }
  createItem() {
    throw new Error('Method not implemented.');
  }

  constructor(public service: ShoppingKartsService) {
    this.filterFields = []
  }

  async ngOnInit() {
    if (this.service.getEntitiesList()) {
      this.service.getEntitiesList().on('value', eventSuppliersListSnapshot => {
        this.ItemsList = [];
        eventSuppliersListSnapshot.forEach(snap => {
          this.ItemsList.push(new ShoppingKartModel({ key: snap.key, service: this.service }));

        });
      });
    }
  }

}
