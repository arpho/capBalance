// tslint:disable: semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { SupplierModel } from 'src/app/models/supplierModel';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { PaymentsModel } from 'src/app/models/paymentModel';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { GeoService } from 'src/app/modules/geo-location/services/geo-service';
import { CreatePurchasePage } from '../create-purchase/create-purchase.page';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { DetailPurchasePage } from '../detail-purchase/detail-purchase.page';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';

@Component({
  selector: 'app-create-shopping-kart',
  templateUrl: './create-shopping-kart.page.html',
  styleUrls: ['./create-shopping-kart.page.scss'],
})
export class CreateShoppingKartPage implements OnInit {
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
    public service: ShoppingKartsService
  ) {
    this.kart = new ShoppingKartModel()
    this.kartFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'titolo spesa',
        value: this.kart.title,
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: this.kart.note,
        order: 2
      }),
      new SwitchQuestion({
        key: 'ecommerce',
        label: 'modalità di acquisto',
        labelTrue: 'acquisto online',
        labelFalse: ' acquisto di persona',
        value: this.kart.online,
        required: false,
        order: 4
      }),
      new DateQuestion({
        key: 'dataAcquisto',
        // tslint:disable-next-line: quotemark
        label: "data di acquisto",
        value: this.kart.purchaseDate.formatDate(),
        required: true
      })
    ];


  }

  setTotal(total: number) {
    this.kart.totale = total
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


  ngOnInit() {
    this.kart = new ShoppingKartModel()
    this.geo.getPosition().then(coords => {
      this.localPosition = { latitude: coords.coords.latitude, longitude: coords.coords.longitude };
      this.supplierSorterFunction = (a: SupplierModel, b: SupplierModel) => {
        return this.geo.distance(a.address.latitude, a.address.longitude, this.localPosition.latitude, this.localPosition.longitude)
          - this.geo.distance(b.address.latitude, b.address.longitude, this.localPosition.latitude, this.localPosition.longitude)

        /*
        this.distance(a.address.latitude, a.address.longitude, location.latitude, location.longitude) -
        this.distance(b.address.latitude, b.address.longitude, location.latitude, location.longitude);
        */
      }
    })
    this.supplierFilterFunction = (item: SupplierModel) => true

  }

  async detailPurchase(purchase) {

    const modal = await this.modalCtrl.create({ component: DetailPurchasePage, componentProps: { purchase } })
    modal.onDidDismiss().then(data => {
      console.log('got', data.data)
      this.kart.updateItem(new PurchaseModel(data.data))
    })
    return await modal.present()
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
  submit(ev) {
    this.showSpinner = true
    this.kart.title = ev.title || this.kart.fornitore.getTitle().value
    this.kart.purchaseDate = new DateModel(new Date(ev.dataAcquisto))
    console.log('kart', this.kart)
    this.service.createItem(this.kart).then(res => {
      this.showSpinner = false
      console.log('created kart', this.kart)
      this.dismiss()
    })
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

}
