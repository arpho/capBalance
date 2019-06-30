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
  filter() {
    throw new Error("Method not implemented.");
  }
  createItem() {
    throw new Error("Method not implemented.");
  }

  constructor(public service: ShoppingKartsService) {
    this.filterFields = []
   }

  async ngOnInit() {
    this.service.getEntitiesList().on('value', eventSuppliersListSnapshot => {
      this.ItemsList = [];
      eventSuppliersListSnapshot.forEach(snap => {
        this.ItemsList.push(new ShoppingKartModel(snap.key, this.service));

      });
    });
  }

}