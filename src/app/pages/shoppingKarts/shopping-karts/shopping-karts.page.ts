import { Component, OnInit } from '@angular/core';
import { ItemControllerInterface } from 'src/app/modules/item/models/ItemControllerInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { runInThisContext } from 'vm';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { SupplierModel } from 'src/app/models/supplierModel';
import { PaymentsModel } from 'src/app/models/paymentModel';
import { Value } from 'src/app/modules/item/models/value';
import { CategoryModel } from 'src/app/models/CategoryModel';

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
    const filterNote = (value: string, item: ShoppingKartModel) => item.note ? item.note.toUpperCase().includes(value.toUpperCase()) : false
    const filterOnline = (value, item: ShoppingKartModel) => item.online == value
    const filterAfterDate = (value: string, item: ShoppingKartModel) => item.purchaseDate ? item.purchaseDate.getFullDate() >= new Date(value) : false
    const filterBeforeDate = (value: string, item: ShoppingKartModel) => item.purchaseDate ? item.purchaseDate.getFullDate() <= new Date(value) : false
    const filterBySupplier = (value: SupplierModel, item: ShoppingKartModel) => item.fornitore ? item.fornitore.key == value.key : false
    const filterByPayment = (value: PaymentsModel, item: ShoppingKartModel) => item.pagamento ? item.pagamento.key == value.key : false
    const filterByCategory = (value:CategoryModel,item:ShoppingKartModel)=> item.hasCategorykey(value.key)
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
        filterFunction: filterNote,
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
        order: 3
      }),
      new DateQuestion({
        key: 'dateAfter',
        // tslint:disable-next-line: quotemark
        label: " acquistato dopo",
        // value: kart.purchaseDate.formatDate(),
        filterFunction: filterAfterDate,
        order: 3
      }),
      new DateQuestion({
        key: 'dateBefore',
        label: "acquistato prima",
        filterFunction: filterBeforeDate,
        order: 4
      }),
      new SelectorQuestion({
        key: 'supplier',
        text: ' Fornitore',
        label: 'filtra per fornitore',
        service: this.service.suppliersService,
        filterFunction: filterBySupplier,
        order: 5
      }),
      new SelectorQuestion({
        key: 'payment',
        text: 'Pagamento',
        label: 'filtra per pagamento',
        service: this.service.paymentsService,
        filterFunction: filterByPayment,
        order: 6

      }),
      new SelectorQuestion({
        key: 'category',
        text: ' una categoria',
        label: 'filtra per categoria',
        service: this.service.categoriesService,
        filterFunction:filterByCategory,
      })
    ];
  }

  setFilterFunction(filter) {
    if (filter) {
      this.filterFunction = filter
    }
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

  filter(fileds) {
  }

  viewGraps() {

  }

}
