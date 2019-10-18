import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingKartModel } from '../models/shoppingKartModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalCtrl:ModalController) {}

  async addShoppingKart(){
    const modal = await this.modalCtrl.create({ component: new ShoppingKartModel().getCreatePopup() })
    return await modal.present()

  }

}
