// tslint:disable: semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.page.html',
  styleUrls: ['./create-purchase.page.scss'],
})
export class CreatePurchasePage implements OnInit {
  purchase: PurchaseModel
  scannedData: {}
  encodedData: any
  message: string
  title = 'inserimento acquisto'
  purchaseFields: any

  constructor(public modalCtrl: ModalController) {
    this.purchaseFields = [
      new TextboxQuestion({
        key: 'descrizione',
        label: 'descrizione',
        value: this.purchase ? this.purchase.descrizione : '',
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: this.purchase ? this.purchase.note : '',
        order: 2
      }),
      new TextboxQuestion({
        key: 'prezzo',
        type: 'number',
        label: 'prezzo',
        value: this.purchase ? this.purchase.prezzo : 0
      })
    ];
  }

  setCategories(cats: Array<CategoryModel>) {
    this.purchase.categorie = cats
  }

  filter(ev) {
  }

  submit(ev) {
    console.log('data', ev)
    this.purchase.build(ev)
    console.log('submitting purchase', this.purchase)
    this.dismiss(this.purchase)
  }

  ngOnInit() {
    this.purchase = new PurchaseModel()
  }
  barcode() {
    console.log('barcode')
  }

  dismiss(purchase?) {
    this.modalCtrl.dismiss(purchase)
  }

}
