import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { GeoService } from 'src/app/modules/geo-location/services/geo-service';
import { Router } from '@angular/router';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/dynamic-form/models/question-switch';
import { ViewController } from '@ionic/core';
import { filterQueryId } from '@angular/core/src/view/util';
import { GeoLocateQuestion } from 'src/app/modules/dynamic-form/models/question-geolocate';
import { SupplierModel } from 'src/app/models/supplierModel';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.page.html',
  styleUrls: ['./create-supplier.page.scss'],
})
export class CreateSupplierPage implements OnInit {
  filterFields: any
  supplier: SupplierModel
  showSpinner = false

  filter(ev) {
  }

  submit(supplier) {
    this.showSpinner = true
    this.supplier = new SupplierModel(supplier)
    console.log("new supplier", this.supplier)
    this.suppliers.createItem(this.supplier).then(sup => {
      console.log('created supplier', sup)
      this.modalCtrl.dismiss(sup.key)
      this.showSpinner = false
    })

  }

  constructor(
    public suppliers: SuppliersService,
    public geo: GeoService,
    public router: Router,
    public modalCtrl: ModalController) {
    this.supplier = new SupplierModel()
    this.filterFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Nome del Fornitore',
        value: this.supplier.title || this.supplier.nome,
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: this.supplier.note,
        order: 2
      }),
      new SwitchQuestion({
        key: 'ecommerce',
        label: 'venditore online',
        labelTrue: 'venditore fa ecommerce',
        labelFalse: ' venditore tradizionale',
        value: this.supplier.address,
        required: false,
        order: 4
      }),
      new GeoLocateQuestion({
        key: "address",
        label: "indirizzo",
        required: false,

      })
    ];


  }

  dismiss() {
    this.modalCtrl.dismiss()
  }


  ngOnInit() {
  }

}
