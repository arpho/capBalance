import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ShoppingKartModel } from './shoppingKartModel';
import { ExpectedConditions } from 'protractor';
import { PurchaseModel } from './purchasesModel';
describe('testing shoppingKartModel',()=>{
    const testdata = {archived:true,dataAcquisto:'qwerty',
    items:[{ barcode: '123456', descrizione: 'questo è un test', picture: 'picture',categorie:['a','b','c'] },
    { barcode: '123457', descrizione: 'questo è un test', picture: 'picture',categorie:['a','b','c'] }]}
    const kart = new ShoppingKartModel(testdata)
    it('should instantiate object',()=>{
        expect(kart).toBeTruthy()
    })
    it('archived field',()=>{
        expect(kart.archived).toBe(testdata.archived)
    })
})
describe('loadPurchase should work',()=>{
    const testdata = {archived:true,dataAcquisto:'qwerty',
    items:[{ barcode: '123456', descrizione: 'questo è un test', picture: 'picture',categorie:['a','b','c'] ,key:'test0',moneta:'$'},
    { barcode: '123457', descrizione: 'questo è un test', picture: 'picture',categorie:['a','b','c'],key:'test1',moneta:'£' }]}
    const kart = new ShoppingKartModel(testdata)
    kart.purchases = kart.loadPurchases(testdata.items)
    // 

    it('checking purchases',()=>{
        expect(kart.purchases).toBeTruthy()
        expect(kart.purchases.length).toBe(2)
        expect(  kart.purchases[0].barcode).toBe(testdata.items[0].barcode)
    })
    // expect(kart.purchases[0])

})