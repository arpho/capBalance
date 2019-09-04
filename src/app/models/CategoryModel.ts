

// tslint:disable: semicolon
import { FirebaseObject } from './firebaseObject';
import { ItemModelInterface, Genere } from '../modules/item/models/itemModelInterface';
import { Value } from '../modules/item/models/value';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { ItemFilterOPtions } from '../modules/item/models/ItemFIlterOptions';
import { GeneratedFile } from '@angular/compiler';
import { CategoriesService } from '../services/categories/categorie.service';
export class CategoryModel implements FirebaseObject, ItemModelInterface {
    key: string;
    title: string;
    service: ItemServiceInterface;
    note: string;
    fatherKey: string;
    father: CategoryModel;
    constructor(key?: string, service?: ItemServiceInterface) {
        this.key = key
        this.service = service
    }
    build(obj: { title: string, key: string, service?: CategoriesService }) {
        this.title = obj.title;
        this.key = this.key || obj.key;
        this.service = this.service || obj.service

        return this
    }

    hasQuickActions() {
        return false
    }

    async load() {
        if (this.service) {
            this.service.getItem(this.key).on('value', cat => {
                if (cat.val()) {
                    this.title = cat.val().title;
                    this.fatherKey = cat.val().fatherKey
                    if (this.fatherKey) {
                        this.father = new CategoryModel(this.fatherKey, this.service)
                        this.father.load()
                    }
                } else {
                    this.title = 'deleted'
                }
            });
        } else {
            this.title = 'non service'
        }
        return this
    }
    getCountingText() { return ' categorie'; }

    getFilterParams() {
        const out: ItemFilterOPtions = new ItemFilterOPtions('categoria', 'text');
        return [out];
    }

    getElement() {
        const genere: Genere = 'a';
        return { element: 'categoria', genere };
    }
    getTitle() {
        const value = new Value({ value: this.title, label: 'categoria' });
        value.label = 'categoria';
        value.value = this.title || '';
        return value;
    }

    getEditPopup(item: ItemModelInterface, service: ItemServiceInterface) {

        return {
            subHeader: 'modifica categoria',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'categoria',
                    value: item.title,
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        item.title = data.title;
                        service.updateItem(item);
                    },
                },
            ],
        };
    }

    getCreatePopup(service: ItemServiceInterface) {
        const item = new CategoryModel();

        return {
            subHeader: 'modifica categoria',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'categoria',
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        item.title = data.title;
                        service.updateItem(item);
                    },
                },
            ],
        };
    }

    getFilterPopup(next) {

        return {
            subHeader: 'modifica categoria',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'cerca categoria',
                    value: 'test filter',
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        const filterFunction = (item: ItemModelInterface) => {
                            return this.title.toLowerCase().indexOf(data[0]) > -1;
                        };
                        next(filterFunction);
                    },
                },
            ],
        };
    }


    getNote() {
        const value = new Value({ label: 'occorrenze', value: '' });
        value.label = 'occorrenze';
        value.value = '';
        return value;
    }

    aggregateAction() { }

    getValue2() {
        const value = new Value();
        return value;
    }

    getValue3() {
        const value = new Value();
        return value;
    }

    showDetail() {

    }

    getValue4() {
        const value = new Value();
        return value;
    }

    getAggregate() {
        const value = new Value();
        value.label = 'spesa complessiva';
        value.value = ' to be implented';
        return value;
    }


    getKey() {
        return this.key;
    }

    serialize() {
        return {
            title: this.title || '',
            key: this.key || '',
            fatherKey: this.father ? this.father.getKey() : ''
        }
    }
    addCategory() {
        let out: Array<CategoryModel> = [this]
        if (this.father) {
            out = [this, ... this.father.addCategory()]
        }
        return out
    }

    afferTo() {
        /**
         *   used for sankey diagram
         *  @return string father.title if father is defined, 'total' if fater is not defined
         */
        return this.father ? this.father.title : 'total'
    }

}
