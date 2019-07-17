import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-categories-selector-page',
  templateUrl: './categories-selector.page.html',
  styleUrls: ['./categories-selector.page.scss'],
})
export class CategoriesSelectorPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss(data?) {
    this.modalCtrl.dismiss(data)
  }

}
