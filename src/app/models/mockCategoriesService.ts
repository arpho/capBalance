import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';

export class MockCategoriesService implements ItemServiceInterface {
    extraService0?: ItemServiceInterface; extraService1?: ItemServiceInterface;
    extraService2?: ItemServiceInterface;
    getItem(key: string): any {
        const data = { a: 'a', b: 'b', c: 'c' };
        // tslint:disable: label-position
        // tslint:disable: no-unused-expression
        // tslint:disable:semicolon
        // return { val: () => { title: this.data[key] } }
        const val = function () {
            return { title: data[key] }
        }
        const cat = { val }
        const on = (label: string, next) => next(cat)

        return { on }
    }
    updateItem(item: import('../modules/item/models/itemModelInterface').ItemModelInterface) {
        throw new Error('Method not implemented.');
    }
    deleteItem(key: string) {
        throw new Error('Method not implemented.');
    }
    getDummyItem(): import('../modules/item/models/itemModelInterface').ItemModelInterface {
        throw new Error('Method not implemented.');
    }
    createItem(item: import('../modules/item/models/itemModelInterface').
        ItemModelInterface): import('firebase').database.ThenableReference {
        throw new Error('Method not implemented.');
    }
    getEntitiesList(): import('firebase').database.Reference {
        throw new Error('Method not implemented.');
    }


}
