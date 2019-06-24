import { CategoryModel } from './CategoryModel';

export class PurchaseModel {
    barcode: string
    descrizione: string
    key: string
    moneta = "€"
    categorie: Array<string>
    picture: string

    constructor(item:{}){
        this.barcode = item['barcode']
        this.descrizione = item['descrizione']
        this.moneta = item['moneta']
        this.picture = item['picture']
        this.categorie = item['categorie']

    }
}