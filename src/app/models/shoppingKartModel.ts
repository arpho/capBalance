// tslint:disable:semicolon
import { ItemModelInterface, Genere } from '../modules/item/models/itemModelInterface';
import { SupplierModel } from './supplierModel';
import { PaymentsModel } from './paymentModel';
import { PurchaseModel } from './purchasesModel';
import { getTranslationForTemplate } from '@angular/core/src/render3/i18n';
import { Value } from '../modules/item/models/value';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { QuickAction } from '../modules/item/models/QuickAction';
import { CategoriesService } from '../services/categories/categorie.service';
import { PaymentsService } from '../services/payments/payments.service';
import { SuppliersService } from '../services/suppliers/suppliers.service';
import { DateModel } from '../modules/user/models/birthDateModel'
import { CreateShoppingKartPage } from '../pages/create-shopping-kart/create-shopping-kart.page';
import { ShoppingKartsService } from '../services/shoppingKarts/shopping-karts.service';
import { OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailShoppingKartPage } from '../pages/detail-shopping-kart/detail-shopping-kart.page';

export class ShoppingKartModel implements ItemModelInterface, OnInit {
    quickActions?: QuickAction[];
    archived: boolean;
    dataAcquisto: string
    purchaseDate: DateModel
    dataAddebito: string
    fornitore: SupplierModel;
    fornitoreId: string; // campo di comodo
    pagamentoId: string // campo di comodo
    key: string
    title: string
    moneta = '€'
    pagamento: PaymentsModel
    online: boolean
    tassoConversione: number
    totale: number
    items: Array<PurchaseModel> // for back compatibility
    purchases: Array<PurchaseModel>
    note: string
    // -next-line: semicolon
    public service: ShoppingKartsService


    constructor(args?: { key?: string, service?: ShoppingKartsService, item?: {} }) {
        this.purchaseDate = new DateModel(new Date())
        if (args) {

            this.key = (args.key) ? args.key : ''
            this.service = (args.service) ? args.service : undefined
            if (args.item) {
                this.build(args.item)
            }
        }
        this.items = (this.items) ? this.items.map(Item => new PurchaseModel(Item)) : []


    }

    ngOnInit() {
        this.quickActions = [
            new QuickAction({
                icon: 'eye',
                title: 'visualiza',
                description: "",
                action: async (args: { alertCtrl?: any, router: any, modal: ModalController }) => {
                    const modal = await args.modal.create({ component: DetailShoppingKartPage, componentProps: { kart: this } })
                    return await modal.present()
                }
            })
        ]
    }

    getQuickActions() {
        return this.quickActions
    }
    build?(item: {}) {
        const loader = ([Key, value]) => {
            if (Key !== 'key') { // evito di sovrascrivere la chiave
                this[Key] = value;
            }
        }
        Object.entries(item).forEach(loader)
        this.fornitore = new SupplierModel()
        this.fornitore.key = this.fornitoreId
        this.pagamento = new PaymentsModel()
        this.pagamento.key = this.pagamentoId
        this.items = (this.items) ? this.items.map(Item => new PurchaseModel(Item)) : []
        // purchaseDate deve sempre essere definito
        this.purchaseDate = this.dataAcquisto ? new DateModel(new Date(this.dataAcquisto)) : new DateModel(new Date())
        return this
    }
    isArchived(): boolean {
        return this.archived
    }
    archiveItem?(b: boolean) {
        throw new Error("Method not implemented.");
    }
    isArchivable?(): boolean {
        return true;
    }

    setSupplier(supplier: SupplierModel) {
        this.fornitore = supplier
        this.fornitoreId = supplier.key
    }

    setPayment(pay: PaymentsModel) {
        this.pagamento = pay
        this.pagamentoId = pay.key
    }

    addItem(purchase: PurchaseModel) {
        this.items = [...this.items, purchase]
    }

    removeItem(purchase: PurchaseModel) {
        this.items = this.items.filter((v: PurchaseModel) => v.key !== purchase.key)
    }

    updateItem(purchase: PurchaseModel) {
        this.items = this.items.map((item: PurchaseModel) => (item.key === purchase.key) ? purchase : item)
    }

    getValue3(): Value {
        return new Value({ value: this.purchaseDate.formatDate(), label: ' data di acquisto' })
    }
    getValue4(): Value {
        return new Value({ value: '  ' + this.fornitore.title || this.fornitore.nome, label: ' fornitore ' })
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    getCreatePopup() {
        return CreateShoppingKartPage
    }
    getAggregate(): Value {
        return new Value({ value: undefined, label: 'aggregate to be defined' })
    }
    aggregateAction?() {
        throw new Error("Method not implemented.");
    }
    hasQuickActions?(): boolean {
        return true
    }
    serialize() {
        return {
            fornitoreId: this.fornitore.key || '',
            pagamentoId: this.pagamento.key || '',
            key: this.key || '',
            archived: Boolean(this.archived),
            online: Boolean(this.online),
            dataAcquisto: (this.purchaseDate) ? this.purchaseDate.formatDate() : ''
        }
    }
    getElement(): { element: string; genere: Genere } {

        const genere: Genere = 'a';
        return { element: 'carrello della spesa', genere };
    }
    getTitle() {
        // tslint:disable: semicolon
        return new Value({ value: `${this.getValue4().value}`, label: 'titolo' })

    }

    getCountingText() {
        return ' Carrelli della spesa'
    }

    getValue2() {
        return new Value({ value: this.totale * (this.tassoConversione || 1), label: 'totale' })
    }

    getNote() {
        return new Value({ value: this.note, label: 'nota' })
    }

    async load(next: () => void) {
        this.service.getItem(this.key).on('value', (kart) => {
            if (kart.val()) {
                // carico i valori 
                Object.keys(kart.val()).forEach(k => { this[k] = kart.val()[k] })
            }
        })
        this.purchaseDate = this.dataAcquisto ? new DateModel(new Date(this.dataAcquisto)) : new DateModel(new Date())
        this.fornitore = new SupplierModel(undefined, this.fornitoreId, this.service.extraService1)
        this.pagamento = new PaymentsModel(undefined, this.pagamentoId, this.service.extraService2)
        this.fornitore.load(next)
        this.pagamento.load()
        if (this.purchases || this.items) { // ci sono carrelli senza acquisti
            this.purchases = this.loadPurchases(this.purchases || this.items, this.service.extraService0)
            this.purchases.forEach(p => p.load()) // carica le categorie degli acqwuisti
        }
        this.title = `${this.fornitore.getTitle().value}  ${new DateModel(new Date(this.dataAcquisto)).formatDate()}`

    }

    loadPurchases(items: {}[], categories?): PurchaseModel[] {
        return items.map(value => new PurchaseModel(value, categories))

    }

}
