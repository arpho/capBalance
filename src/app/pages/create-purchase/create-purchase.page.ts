// tslint:disable: semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner'
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
  title = "inserimento acquisto"
  purchaseFields: any
  barcodeScannerOption: BarcodeScannerOptions

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
    console.log('setting categories', cats)
    this.purchase.categorie = cats
  }

  filter(ev) {
  }

  submit(ev) {
    this.purchase.build(ev)
    console.log('purchase created ', this.purchase)
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
