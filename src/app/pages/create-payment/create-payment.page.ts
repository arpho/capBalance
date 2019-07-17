import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { PaymentsModel } from 'src/app/models/paymentModel';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.page.html',
  styleUrls: ['./create-payment.page.scss'],
})
export class CreatePaymentPage implements OnInit {
  showSpinner = true
  payment: PaymentsModel
  paymentFields: any


  constructor(public modalCtrl: ModalController) {
    this.payment = new PaymentsModel()
    this.paymentFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Nome del Fornitore',
        value: this.payment.title,
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: this.payment.note,
        order: 2
      }),
    ];

  }

  ngOnInit() {
  }

  filter(ev) {
    console.log(ev)
  }

  submit(ev) {
    console.log(ev)
  }

  dismiss(payment) {
    this.modalCtrl.dismiss(payment)
  }

}
