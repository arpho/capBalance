
// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseModel } from './purchasesModel';
import { CategoryModel } from './CategoryModel';
describe('testing purchaseModel', () => {
    const testdata = {
        barcode: '123456', key: '0', descrizione: 'questo è un test', picture: 'picture',
        categorie: [new CategoryModel().build({ title: 'a', key: 'a' }), new CategoryModel().build({ title: 'b', key: 'b' }),
        new CategoryModel().build({ title: 'c', key: 'c' })]
    }
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

    it('categorie should be ok', () => {
        expect(purchase.categorie).toBeTruthy()
        expect(purchase.categorie.length).toBe(3)
        expect(purchase.categorie[0].serialize()).toBe('a')
        expect(purchase.categorie[1].serialize()).toBe('b')
        expect(purchase.categorie[2].serialize()).toBe('c')
    })
    it('clone should work', () => {
        const clonedata = {
            barcode: '9632', prezzo: 123456, note: 'ìqwertyu', moneta: '$', descrizione: 'poiuytr',
            picture: 'asdfghj', categorie:
                [new CategoryModel().build({ title: 'a', key: 'a' }), new CategoryModel().build({ title: 'b', key: 'b' }),
                new CategoryModel().build({ title: 'c', key: 'c' })]
        }
        purchase.clone(clonedata)
        expect(purchase.key).toBe(testdata.key)
        expect(purchase.barcode).toBe(clonedata.barcode)
        expect(purchase.descrizione).toBe(clonedata.descrizione)
        expect(purchase.note).toBe(clonedata.note)
        expect(purchase.moneta).toBe(clonedata.moneta)
        expect(purchase.picture).toBe(clonedata.picture)
        expect(purchase.prezzo).toBe(clonedata.prezzo)
        expect(purchase.categorie).toBeTruthy()
        expect(purchase.categorie.length).toBe(3)
        expect(purchase.serialize().barcode).toBe(clonedata.barcode)
        expect(purchase.serialize().descrizione).toBe(clonedata.descrizione)
        expect(purchase.serialize().categorie.length).toBe(3)

    })
    it('serialize should work', () => {
        purchase = new PurchaseModel(testdata)
        expect(purchase.serialize().categorie.length).toBe(3)
        expect(purchase.serialize().categorie[0]).toBe(testdata.categorie[0].serialize())
        expect(purchase.serialize().barcode).toBe(testdata.barcode)
        const testdata2 = {}
        const purchase2 = new PurchaseModel(testdata2)
        expect(purchase2.serialize().descrizione).toBe('')
        expect(purchase2.serialize().key).toBeTruthy()
        expect(purchase2.serialize().picture).toBe('')
        expect(purchase2.serialize().categorieId.length).toBe(0)
    })


})