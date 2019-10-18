import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PaymentsModel } from 'src/app/models/paymentModel';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';

@Component({
  selector: 'app-detail-payment',
  templateUrl: './detail-payment.page.html',
  styleUrls: ['./detail-payment.page.scss'],
})
export class DetailPaymentPage implements OnInit {
  payment: PaymentsModel
  titolo: string
  paymentsFields: Array<QuestionBase<string>>
  ngOnInit() {
    this.payment = this.navParams.get('item')
    this.titolo = `dettaglio ${this.payment.title}`
    this.paymentsFields = [
      new TextboxQuestion({ key: 'titolo', label: 'nome del pagamento', value: this.payment.title, required: true }),
      new TextboxQuestion({ key: 'note', label: 'note', value: this.payment.note }),
      new TextboxQuestion({ key: 'addebito', label: 'codice addebito', value: this.payment.addebito })
    ]
  }

  constructor(public modalCtrl: ModalController, public navParams: NavParams) {
  }
filter(ev){
  console.log('filter',ev)
}

submit(ev){
  console.log('submit',ev)
}

dismiss() {
  this.modalCtrl.dismiss()
}


}
