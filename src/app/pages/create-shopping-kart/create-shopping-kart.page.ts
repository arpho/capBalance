import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-shopping-kart',
  templateUrl: './create-shopping-kart.page.html',
  styleUrls: ['./create-shopping-kart.page.scss'],
})
export class CreateShoppingKartPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  dismiss() {
    this.viewCtrl.dismiss()
  }
  ngOnInit() {
  }

}
