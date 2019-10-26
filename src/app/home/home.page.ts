import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingKartModel } from '../models/shoppingKartModel';
import { CategoriesService } from '../services/categories/categorie.service';
import { SuppliersService } from '../services/suppliers/suppliers.service';
import { PaymentsService } from '../services/payments/payments.service';
import { ShoppingKartsService } from '../services/shoppingKarts/shopping-karts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalCtrl:ModalController,
    // initializing services, no good way
    public categories: CategoriesService,
    public suppliers:SuppliersService,
    public payments:PaymentsService,
    public shoppingkarts:ShoppingKartsService
    ) {}

  async addShoppingKart(){
    const modal = await this.modalCtrl.create({ component: new ShoppingKartModel().getCreatePopup() })
    return await modal.present()

  }

}
