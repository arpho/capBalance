// tslint:disable:semicolon
import { CategoryModel } from './CategoryModel';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { CategoriesService } from '../services/categories/categorie.service';

export class PurchaseModel {
    barcode: string
    descrizione: string
    key: string
    moneta = '€'
    note: string
    prezzo: number
    categorie: Array<CategoryModel>
    picture: string
    categorieId: Array<string>
    service: ItemServiceInterface

    constructor(item?: {}, categories?: ItemServiceInterface) {
        // tslint:disable: no-string-literal
        if (item) {
            this.build(item)
        }
        this.key = this.key || String(new Date().getTime())
        if (categories) {
            // è presente categoriesService carico le categorie
            this.service = categories
            if (this.categorieId) {
                this.categorie = this.categorieId.map(key => new CategoryModel(key, categories)
                )
            }
            if (item['categorieId']) {
                // tslint:disable-next-line: quotemark
                this.categorie = item['categorieId'].map(key => new CategoryModel(key, categories))

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
        if (item) {
            this.barcode = item.barcode || ''
            this.note = item.note
            this.moneta = item.moneta
            this.picture = item.picture
            this.prezzo = parseFloat(item.prezzo) || 0
            this.descrizione = item.descrizione
            this.categorie = item.categorie ? item.categorie : this.categorie
        }
        return this
    }

    instatiateCategories(categorieId: Array<string>) {
        if (categorieId) {
            // console.log('got categorieId', categorieId)
            const out = categorieId.map((key: string) => new CategoryModel(key, this.service))
            // console.log('instatiated categorie', out)
            return out
        } else { return [] }
    }

    build(item) {
        this.barcode = item['barcode']
        this.descrizione = item['descrizione']
        this.moneta = item['moneta'] || '€'
        this.picture = item['picture']
        this.note = item['note']
        this.categorieId = item['categorieId']
        this.key = item['key'] || ''
        this.note = item['note']
        this.prezzo = parseFloat(item['prezzo']) || 0
        this.categorie = this.categorie || this.instatiateCategories(item.categorieId || item.categorie)
        this.key = item['key'] || String(new Date().getTime())
        return this

    }

    serialize() {
        return {
            barcode: this.barcode || '',
            descrizione: this.descrizione || '',
            moneta: this.moneta || '',
            picture: this.picture || '',
            categorieId: this.categorie ? this.categorie.map(cat => cat.getKey()) : [],
            key: this.key || '',
            note: this.note || '',
            prezzo: this.prezzo || 0,
        }
    }
    async load() {
        if (this.categorie) {
            this.categorie.forEach(cat => {
                cat.load()
            }) // carico  le categorie da firebase}
        }
    }
}
