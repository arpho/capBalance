// tslint:disable:semicolon
import { CategoryModel } from './CategoryModel';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';

export class PurchaseModel {
    barcode: string
    descrizione: string
    key: string
    moneta = '€'
    note: string
    prezzo: number
    categorie: Array<CategoryModel>
    picture: string
    categoriesKeys: Array<string>
    service: ItemServiceInterface

    constructor(item?: {}, categories?: ItemServiceInterface) {
        // tslint:disable: no-string-literal
        if (item) {
            this.build(item)
        }
        if (categories) {
            // è presente categoriesService carico le categorie
            this.service = categories
            if (this.categoriesKeys) {
                this.categorie = this.categoriesKeys.map(key => {
                    return new CategoryModel(key, categories);
                })
            }
        }

    }

    build(item) {
        this.barcode = item['barcode']
        this.descrizione = item['descrizione']
        this.moneta = item['moneta']
        this.picture = item['picture']
        this.note = item['note']
        this.categoriesKeys = item['categorieId']
        this.key = item['key'] || ''
        this.note = item['note']
        this.prezzo = item['prezzo']
        this.key = item['key'] || String(new Date().getMilliseconds())
        return this

    }

    serialize() {
        return {
            barcode: this.barcode || '',
            descrizione: this.descrizione || '',
            moneta: this.moneta || '',
            picture: this.picture || '',
            categorieId: this.categoriesKeys || [],
            key: this.key || '',
            note: this.note || '',
            prezzo: this.prezzo || 0
        }
    }
    async load() {
        if (this.categorie) {
            this.categorie.forEach(cat => cat.load()) // carico  le categorie da firebase}
        }
    }
}