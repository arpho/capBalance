
// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseModel } from './purchasesModel';
describe('testing purchaseModel', () => {
    const testdata = { barcode: '123456', descrizione: 'questo è un test', picture: 'picture',categorie:['a','b','c'] }
    const purchase = new PurchaseModel(testdata)
    it('purchase insttiated', () => {
        expect(purchase).toBeTruthy()
    })
    it('barcode field is ok', () => {
        expect(purchase.barcode).toBe(testdata.barcode)
    })
    it('descrizione field is ok', () => {
        expect(purchase.descrizione).toBe(testdata.descrizione)
    })

    it('picture field is ok', () => {
        expect(purchase.picture).toBe(testdata.picture)
    })


})