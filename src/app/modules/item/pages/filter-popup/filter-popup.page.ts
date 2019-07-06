import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.page.html',
  styleUrls: ['./filter-popup.page.scss'],
})
export class FilterPopupPage implements OnInit {
   filterFields: any;

  constructor(public modalCtrl: ModalController, navParams: NavParams) {
    this.filterFields = navParams.get('filterFields')
    console.log('question',this.filterFields)
  }


  ngOnInit() {
  }

  filter(ev) {
    console.log('data', ev)
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

}
