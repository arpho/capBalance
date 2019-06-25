import { ItemModelInterface, Genere } from '../modules/item/models/itemModelInterface';
import { SupplierModel } from './supplierModel';
import { PaymentsModel } from './paymentModel';
import { PurchaseModel } from './purchasesModel';
import { getTranslationForTemplate } from '@angular/core/src/render3/i18n';
import { Value } from '../modules/item/models/value';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { QuickAction } from '../modules/item/models/QuickAction';

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
    moneta = "€"
    pagagamento: PaymentsModel
    online: boolean
    tassoConversione: number
    totale: number
    items: Array<PurchaseModel> // for back compatibility
    purchases: Array<PurchaseModel>
    note: string


    constructor() {
    }
    build?(item: {}) {
        throw new Error("Method not implemented.");
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
        return new Value({ value: undefined, label: 'value3 to be defined' })
    }
    getValue4(): Value {
        return new Value({ value: undefined, label: 'value to be defined' })
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    getCreatePopup(service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    getElement(): { element: string; genere: Genere } {

        const genere: Genere = 'a';
        return { element: 'carrello della spesa', genere };
    }
    getTitle() {
        // tslint:disable: semicolon
        return new Value({ value: `${this.fornitore.getTitle().value}`, label: 'titolo' })

    }

    getCountingText() {
        return ' Carrelli della spesa'
    }

    getValue2() {
        return new Value({ value: this.totale * this.tassoConversione, label: 'totale' })
    }

    getNote() {
        return new Value({ value: this.note, label: 'nota' })
    }

    load(key: string, service: ItemServiceInterface) {
        service.getItem(key).on('value', (kart) => {
            if (kart.val()) {
                // carico i valori 
                Object.keys(kart.val()).forEach(k => { this[k] = kart.val()[k] })
            }
        })

        this.purchases = this.loadPurchases(this.purchases || this.items, service.extraService0)
        const fornitore = new SupplierModel()
        fornitore.load(this.fornitoreId, service.extraService1)
        this.fornitore = fornitore
        const pagamento = new PaymentsModel()
        pagamento.load(this.pagamentoId, service.extraService2)
        this.pagagamento = pagamento

    }
    loadPurchases(items: PurchaseModel[], categories?): PurchaseModel[] {
        const purchases = items.map(value => new PurchaseModel(value, categories))
        return purchases
    }

}
