import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.page.html',
  styleUrls: ['./create-supplier.page.scss'],
})
export class CreateSupplierPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  dismiss() {
    this.viewCtrl.dismiss()
  }


  ngOnInit() {
  }

}
