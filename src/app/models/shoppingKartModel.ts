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
import { BirthDateModel } from '../modules/user/models/birthDateModel'
import { CreateShoppingKartPage } from '../pages/create-shopping-kart/create-shopping-kart.page';
import { ShoppingKartsService } from '../services/shoppingKarts/shopping-karts.service';

export class ShoppingKartModel implements ItemModelInterface {
    quickActions?: QuickAction[];
    archived: boolean;
    dataAcquisto: string
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
    private service: ShoppingKartsService


    constructor(args?: { key?: string, service?: ShoppingKartsService, item?: {} }) {
        if (args) {

            this.key = (args.key) ? args.key : ''
            this.service = (args.service) ? args.service : undefined
            if (args.item) {
                this.build(args.item)
            }
        }

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
    getValue3(): Value {
        return new Value({ value: new BirthDateModel(new Date(this.dataAcquisto)).formatDate(), label: ' data di acquisto' })
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
        return false
    }
    serialize() {
        return {
            fornitoreId: this.fornitore.key || '',
            pagamentoId: this.pagamento.key || '',
            key: this.key || '',
            archived: Boolean(this.archived),
            online: Boolean(this.online)
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
        this.fornitore = new SupplierModel(undefined, this.fornitoreId, this.service.extraService1)
        this.pagamento = new PaymentsModel(undefined, this.pagamentoId, this.service.extraService2)
        this.fornitore.load(next)
        this.pagamento.load()
        if (this.purchases || this.items) { // ci sono carrelli senza acquisti
            this.purchases = this.loadPurchases(this.purchases || this.items, this.service.extraService0)
            this.purchases.forEach(p => p.load()) // carica le categorie degli acqwuisti
        }
        this.title = `${this.fornitore.getTitle().value}  ${new BirthDateModel(new Date(this.dataAcquisto)).formatDate()}`

    }

    loadPurchases(items: {}[], categories?): PurchaseModel[] {
        return items.map(value => new PurchaseModel(value, categories))

    }

}
