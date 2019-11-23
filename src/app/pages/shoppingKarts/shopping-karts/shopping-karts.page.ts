import { Component, OnInit } from '@angular/core';
import { ItemControllerInterface } from 'src/app/modules/item/models/ItemControllerInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { runInThisContext } from 'vm';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';

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



  createItem() {
    throw new Error('Method not implemented.');
  }

  constructor(public service: ShoppingKartsService) {
    const filterDescription = (value: string, item: ShoppingKartModel) =>
      (item.title) ? item.title.toUpperCase().includes(value.toUpperCase()) : true // i vecchi acquisti non hanno il campo title
    const filterNote = (value:string,item:ShoppingKartModel)=> item.note? item.note.toUpperCase().includes(value.toUpperCase()):false
    const filterOnline = (value, item: ShoppingKartModel) => item.online == value
    this.filterFields = [
      new TextboxQuestion({
        key: 'description',
        label: 'filtra per descrizione',
        filterFunction: filterDescription,
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'filtra per note',
        filterFunction:filterNote,
        order: 2
      }),
      new SwitchQuestion({
        key: 'ecommerce',
        label: 'filtra per modalità di acquisto',
        labelTrue: ' acquistato online',
        labelFalse: ' acquistato di persona',
        iconTrue: 'wifi',
        iconFalse: 'person',
        required: false,
        filterFunction: filterOnline,
        order: 4
      })
    ];
  }

  setFilterFunction(filter) {
    this.filterFunction = filter
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

  filter(ev) {
  }

  viewGraps() {

  }

}
