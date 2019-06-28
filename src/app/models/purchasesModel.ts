import { CategoryModel } from './CategoryModel';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';

export class PurchaseModel {
    barcode: string
    descrizione: string
    key: string
    moneta = "€"
    categorie: Array<CategoryModel>
    picture: string
    categoriesKeys: Array<string>

    constructor(item: {}, categories?: ItemServiceInterface) {
        this.barcode = item['barcode']
        this.descrizione = item['descrizione']
        this.moneta = item['moneta']
        this.picture = item['picture']
        this.categoriesKeys = item['categorieId']
        if (categories) {
            // è presente categoriesService carico le categorie
            if (this.categoriesKeys) {
                this.categorie = this.categoriesKeys.map(key => {
                    return new CategoryModel(key, categories);
                })
            }
        }

    }
}