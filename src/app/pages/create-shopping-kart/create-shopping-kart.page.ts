
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
// tslint:disable: semicolon
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
  categoryColor = 'blue'
  categoryIcon = 'pricetag'
  textSelectSupplier = 'Fornitore'
  textSelectPayment = 'Pagamento'
  localPosition: { latitude: number, longitude: number }
  constructor(
    public toastCtrl: ToastController,
    public supplierService: SuppliersService,
    public paymentsService: PaymentsService,
    public geo: GeoService,
    public modalCtrl: ModalController,
    public service: ShoppingKartsService,
  ) {
    this.kart = new ShoppingKartModel()


  }

  setTotal(total: number) {
    this.kart.totale = total
    this.showToast(`totale: ${total}`)
  }

  async addPurchase() {
    const modal = await this.modalCtrl.create({ component: CreatePurchasePage })
    modal.onDidDismiss().then((purchase) => {
      const Purchase = purchase.data
      this.kart.addItem(Purchase)
    })
    return await modal.present()
  }

  setFormFields(kart: ShoppingKartModel, filterFunction: (item: ItemModelInterface) => boolean) {
    return [
      new TextboxQuestion({
        key: 'title',
        label: 'titolo spesa',
        value: kart.title,
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        value: kart.note,
        order: 2
      }),
      new SwitchQuestion({
        key: 'ecommerce',
        label: 'modalità di acquisto',
        labelTrue: 'acquisto online',
        labelFalse: ' acquisto di persona',
        value: kart.online,
        required: false,
        order: 4
      }),
      new DateQuestion({
        key: 'dataAcquisto',
        // tslint:disable-next-line: quotemark
        label: "data di acquisto",
        value: kart.purchaseDate.formatDate(),
        required: true
      }),
      new SelectorQuestion({
        key: 'supplier',
        text: ' Fornitore',
        label: 'Fornitore',
        service: this.service.suppliersService,
        filterFunction,
        value: kart.fornitore,
        required: true
      }),
      new SelectorQuestion({
        key: 'payment',
        text: 'Pagamento',
        label: 'Pagamento',
        service: this.service.paymentsService,
        required: true,
        value: kart.pagamento

      })
    ];
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    })
    toast.present()

  }


  ngOnInit() {
    this.kart = new ShoppingKartModel()
    this.kart.fornitore = new SupplierModel()
    this.kart.pagamento = new PaymentsModel()
    this.kartFields = this.setFormFields(this.kart, this.supplierFilterFunction)
    this.geo.getPosition().then(coords => {
      if (coords) {
        this.localPosition = { latitude: coords.coords.latitude, longitude: coords.coords.longitude };
        this.supplierSorterFunction = (a: SupplierModel, b: SupplierModel) => {
          return this.geo.distance(a.address.latitude, a.address.longitude, this.localPosition.latitude, this.localPosition.longitude)
            - this.geo.distance(b.address.latitude, b.address.longitude, this.localPosition.latitude, this.localPosition.longitude)

          /*
          this.distance(a.address.latitude, a.address.longitude, location.latitude, location.longitude) -
          this.distance(b.address.latitude, b.address.longitude, location.latitude, location.longitude);
          */
        }
      }
    })
    this.supplierFilterFunction = (item: SupplierModel) => true

  }
  removeItem(item) {
    console.log('removing ', item)
    this.kart.removeItem(item)
  }

  async detailPurchase(purchase) {

    const modal = await this.modalCtrl.create({ component: DetailPurchasePage, componentProps: { purchase } })
    modal.onDidDismiss().then(data => {
      console.log('got', data)
      if (data.data) {
        this.kart.updateItem(data.data)
      }
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
    if (ev.ecommerce) {
      this.supplierFilterFunction = (item: SupplierModel) => {
        return item.ecommerce
      }
    } else {
      this.supplierFilterFunction = (item) => true
    }
    if (ev.supplier) {
      this.selectedSupplier(ev.supplier)
    }
    if (ev.payment) {
      this.selectedPayment(ev.payment)
    }
    this.kartFields = this.setFormFields(this.kart, this.supplierFilterFunction)
  }
  submit(ev) {
    this.showSpinner = true
    this.kart.title = ev.title || this.kart.fornitore.getTitle().value
    this.kart.purchaseDate = new DateModel(new Date(ev.dataAcquisto))
    this.service.createItem(this.kart).then(res => {
      this.showSpinner = false
      this.dismiss()
    })
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

}
