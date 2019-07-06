import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.page.html',
  styleUrls: ['./filter-popup.page.scss'],
})
export class FilterPopupPage implements OnInit {

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

}
