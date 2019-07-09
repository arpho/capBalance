
// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseModel } from './purchasesModel';
describe('testing purchaseModel', () => {
    const testdata = { barcode: '123456', key: '0', descrizione: 'questo è un test', picture: 'picture', categorie: ['a', 'b', 'c'] }
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

    it('key is ok', () => {
        expect(purchase.key).toBe(testdata.key)
    })
    it('picture field is ok', () => {
        expect(purchase.picture).toBe(testdata.picture)
    })
    it('serialize should work', () => {
        expect(purchase.serialize().barcode).toBe(testdata.barcode)
        const testdata2 = {}
        const purchase2 = new PurchaseModel(testdata2)
        expect(purchase2.serialize().descrizione).toBe('')
        expect(purchase2.serialize().key).toBe('')
        expect(purchase2.serialize().picture).toBe('')
        expect(purchase2.serialize().categorieId.length).toBe(0)
    })


})