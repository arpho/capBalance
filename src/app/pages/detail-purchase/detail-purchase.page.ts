import { Component, OnInit } from '@angular/core';
import { CreatePurchasePage } from '../create-purchase/create-purchase.page';
import { ModalController, NavParams } from '@ionic/angular';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';

@Component({
  selector: 'app-detail-purchase',
  templateUrl: '../create-purchase/create-purchase.page.html',
  styleUrls: ['./detail-purchase.page.scss'],
})
export class DetailPurchasePage extends CreatePurchasePage implements OnInit {

  constructor(public modalCtrl: ModalController, private navParams: NavParams) {
    super(modalCtrl)
  }

  ngOnInit() {

    this.purchase = this.navParams.get('purchase')
    console.log('editing purchase',this.purchase)
    this.title = this.purchase ? `modifica ${this.purchase.descrizione}` : 'modifica acquisto'
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


  submit(purchase) {
    console.log('updating', this.purchase)
    console.log('new ', purchase)
    this.purchase.clone(purchase)
    console.log('purchase submitted', this.purchase)
    this.dismiss(this.purchase)
  }
}
