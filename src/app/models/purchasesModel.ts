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
        this.key = this.key || String(new Date().getUTCMilliseconds())
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

    clone(item: {
        barcode?: string,
        prezzo?: any,
        descrizione: string,
        moneta: string,
        note: string,
        picture: string,
        categorie?: Array<CategoryModel>
    }) {
        this.barcode = item.barcode
        this.note = item.note
        this.moneta = item.moneta
        this.picture = item.picture
        this.prezzo = parseInt(item.prezzo, 10)
        this.descrizione = item.descrizione
        this.categorie = item.categorie? item.categorie:this.categorie
        return this
    }

    build(item) {
        this.barcode = item['barcode']
        this.descrizione = item['descrizione']
        this.moneta = item['moneta'] || '€'
        this.picture = item['picture']
        this.note = item['note']
        this.categoriesKeys = item['categorieId']
        this.key = item['key'] || ''
        this.note = item['note']
        this.prezzo = parseInt(item['prezzo'], 10)
        this.categorie = this.categorie || item['categorie']
        this.key = item['key'] || String(new Date().getUTCMilliseconds())
        console.log()
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
            prezzo: this.prezzo || 0,
            categorie: this.categorie ? this.categorie.map(cat => cat.serialize()) : []
        }
    }
    async load() {
        if (this.categorie) {
            this.categorie.forEach(cat => cat.load()) // carico  le categorie da firebase}
        }
    }
}