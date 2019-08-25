import { ItemServiceInterface } from '../../modules/item/models/ItemServiceInterface';
import { CategoryModel } from '../CategoryModel';

export class MockCategoriesService implements ItemServiceInterface {
    extraService0?: ItemServiceInterface; extraService1?: ItemServiceInterface;
    extraService2?: ItemServiceInterface;
    public categoriesListRef: firebase.database.Reference;
    getItem(key: string): any {
        const data = { a: 'a', b: 'b', c: 'c', D: 'D', e: 'e', alimenti: 'alimenti', vegetali: 'vegetali', frutta: 'frutta' };
        // tslint:disable: label-position
        // tslint:disable: no-unused-expression
        // tslint:disable:semicolon
        // return { val: () => { title: this.data[key] } }
        // tslint:disable-next-line: only-arrow-functions
        const val = function () {
            return { title: data[key] }
        }
        const cat = { val }
        const on = (label: string, next) => next(cat)

        return { on }
    }
    createCategory() {
        console.log('dummy')
    }
    updateItem(item: import('../../modules/item/models/itemModelInterface').ItemModelInterface) {
        throw new Error('Method not implemented.');
    }
    deleteItem(key: string) {
        throw new Error('Method not implemented.');
    }
    getDummyItem(): import('../../modules/item/models/itemModelInterface').ItemModelInterface {
        return new CategoryModel()
    }
    createItem(item: import('../../modules/item/models/itemModelInterface').
        ItemModelInterface): import('firebase').database.ThenableReference {
        throw new Error('Method not implemented.');
    }
    getEntitiesList(): import('firebase').database.Reference {
        throw new Error('Method not implemented.');
    }


}
