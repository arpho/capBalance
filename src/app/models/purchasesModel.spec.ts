
// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseModel } from './purchasesModel';
describe('testing purchaseModel', () => {
    const testdata = { barcode: '123456', key: '0', descrizione: 'questo è un test', picture: 'picture', categorie: ['a', 'b', 'c'] }
    let purchase = new PurchaseModel(testdata)
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
    it('clone should work', () => {
        const clonedata = { barcode: '9632', prezzo: 123456, note: 'ìqwertyu', moneta: '$', descrizione: 'poiuytr',picture:'asdfghj'}
        purchase.clone(clonedata)
        expect(purchase.key).toBe(testdata.key)
        expect(purchase.barcode).toBe(clonedata.barcode)
        expect(purchase.descrizione).toBe(clonedata.descrizione)
        expect(purchase.note).toBe(clonedata.note)
        expect(purchase.moneta).toBe(clonedata.moneta)
        expect(purchase.picture).toBe(clonedata.picture)
        expect(purchase.prezzo).toBe(clonedata.prezzo)
    })
    it('serialize should work', () => {
        purchase = new PurchaseModel(testdata)
        expect(purchase.serialize().barcode).toBe(testdata.barcode)
        const testdata2 = {}
        const purchase2 = new PurchaseModel(testdata2)
        expect(purchase2.serialize().descrizione).toBe('')
        expect(purchase2.serialize().key).toBeTruthy()
        expect(purchase2.serialize().picture).toBe('')
        expect(purchase2.serialize().categorieId.length).toBe(0)
    })


})