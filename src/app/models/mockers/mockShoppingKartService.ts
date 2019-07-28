// tslint:disable:semicolon
import { extend } from 'webdriver-js-extender';
import { ShoppingKartsService } from '../../services/shoppingKarts/shopping-karts.service';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { PaymentsService } from '../../services/payments/payments.service';
import { MockCategoriesService } from './mockCategoriesService';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { ShoppingKartModel } from '../shoppingKartModel';
import { MockSupplierService } from './mockSuppliersService';
import { MockPaymentService } from './mockPaymentService';

export class MockShoppingKartervice implements ItemServiceInterface {
    extraService0?: MockCategoriesService; extraService1?: MockSupplierService;
    extraService2?: MockPaymentService;
    data: {}
    public shoppingKartsListRef: firebase.database.Reference

    constructor(data: {}) {
        this.data = data
        this.extraService0 = new MockCategoriesService()
        this.extraService1 = new MockSupplierService()
        this.extraService2 = new MockPaymentService()

    }

    getItem(key: string): any {
        const data = { a: 'a', b: 'b', c: 'c' };
        // tslint:disable: label-position
        // tslint:disable: no-unused-expression
        // tslint:disable:semicolon
        // return { val: () => { title: this.data[key] } }
        const val = function () {
            return this.data
        }
        const cat = { val }
        const on = (label: string, next) => next(cat)

        return { on }
    }
    updateItem(item: import('../../modules/item/models/itemModelInterface').ItemModelInterface) {
        return new Promise<any>((resolve, reject) => { })
    }
    deleteItem(key: string) {
        return new Promise<any>((resolve, reject) => { })
    }
    getDummyItem(): import('../../modules/item/models/itemModelInterface').ItemModelInterface {
        return new ShoppingKartModel()
    }
    createItem(item: import('../../modules/item/models/itemModelInterface').ItemModelInterface):
        import('firebase').database.ThenableReference {
        throw new Error('Method not implemented.');
    }
    getEntitiesList(): import('firebase').database.Reference {
        throw new Error('Method not implemented.');
    }



}
