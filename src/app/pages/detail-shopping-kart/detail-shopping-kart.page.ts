// tslint:disable: semicolon
import { Component, OnInit } from '@angular/core';
import { CreateShoppingKartPage } from '../create-shopping-kart/create-shopping-kart.page';
import { ModalController, NavParams } from '@ionic/angular';
import { GeoService } from 'src/app/modules/geo-location/services/geo-service';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { SupplierModel } from 'src/app/models/supplierModel';
import { PaymentsModel } from 'src/app/models/paymentModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';
import { ComponentsPageModule } from 'src/app/modules/item/components/components.module';
import { DetailPurchasePage } from '../detail-purchase/detail-purchase.page';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';
import { CreatePurchasePage } from '../create-purchase/create-purchase.page';

@Component({
  selector: 'app-detail-shopping-kart',
  templateUrl: './detail-shopping-kart.page.html',
  styleUrls: ['./detail-shopping-kart.page.scss'],
})
export class DetailShoppingKartPage implements OnInit {
  showSpinner = false
  supplierFilterFunction: (item: ItemModelInterface) => boolean
  supplierSorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number
  kart: ShoppingKartModel
  kartFields: any
  textSelectSupplier = 'Fornitore'
  textSelectPayment = 'Pagamento'
  localPosition: { latitude: number, longitude: number }

  constructor(
    public supplierService: SuppliersService,
    public paymentsService: PaymentsService,
    public geo: GeoService,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public service: ShoppingKartsService) {

  }

  ngOnInit() {
    this.kart = this.navParams.get('kart')
    console.log('got', this.kart)
    this.kartFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'titolo spesa',
        value: this.kart ? this.kart.title : '',
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: this.kart ? this.kart.note : '',
        order: 2
      }),
      new SwitchQuestion({
        key: 'ecommerce',
        label: 'modalità di acquisto',
        labelTrue: 'acquisto online',
        labelFalse: ' acquisto di persona',
        value: this.kart ? this.kart.online : false,
        required: false,
        order: 4
      }),
      new DateQuestion({
        key: 'dataAcquisto',
        // tslint:disable-next-line: quotemark
        label: "data di acquisto",
        value: this.kart ? this.kart.purchaseDate.formatDate() : new DateModel(new Date()).formatDate(),
        required: true
      })
    ];



  }

  submit(ev) {
    console.log(ev)
  }

  async addPurchase() {
    const modal = await this.modalCtrl.create({ component: CreatePurchasePage })
    modal.onDidDismiss().then((purchase) => {
      console.log('purchase to add', purchase.data)
      const Purchase = new PurchaseModel(purchase.data)
      console.log('adding purcvhase', Purchase)
      this.kart.addItem(Purchase)
    })
    return await modal.present()
  }

  async detailPurchase(purchase) {

    const modal = await this.modalCtrl.create({ component: DetailPurchasePage, componentProps: { purchase } })
    modal.onDidDismiss().then(data => {
      console.log('got', data.data)
      this.kart.updateItem(new PurchaseModel().clone(data.data))
    })
    return await modal.present()
  }

  setTotal(tot: number) {
    this.kart.totale = tot
  }

  async selectedSupplier(supplier: SupplierModel) {
    if (supplier) {

      this.kart.setSupplier(supplier)
    }
  }

  selectedPayment(payment: PaymentsModel) {
    if (payment) {
      this.kart.setPayment(payment)

    }
  }

  filter(ev) {
    console.log(ev)
    if (ev.ecommerce) {
      this.supplierFilterFunction = (item: SupplierModel) => {
        return item.ecommerce
      }
    } else {
      this.supplierFilterFunction = (item) => true
    }
  }


  dismiss() {
    this.modalCtrl.dismiss()
  }

}
