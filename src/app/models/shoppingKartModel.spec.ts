// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingKartModel } from './shoppingKartModel'
import { DateModel } from '../modules/user/models/birthDateModel';
import { PurchaseModel } from './purchasesModel';
import { SupplierModel } from './supplierModel';
describe('ShoppingKart should instantiate', () => {
    const kartdata = {
        archived: false,
        dataAcquisto: '1977-03-16',
        fornitoreId: 'qwerty',
        pagamentoId: 'asdfghj',
        totale: 15,
        title: 'title',
        key: 'zxcvbnm'
    }
    const kart = new ShoppingKartModel(kartdata)
    kart.build(kartdata)
    it('shoppingKart data are ok', () => {
        expect(kart.dataAcquisto).toBe(kartdata.dataAcquisto)
        expect(kart.fornitoreId).toBe(kartdata.fornitoreId)
        expect(kart.pagamentoId).toBe(kartdata.pagamentoId)
        expect(kart.archived).toBe(kartdata.archived)
        expect(kart.key).toBe(kart.key)
        expect(kart.purchaseDate.formatDate()).toBe(new DateModel(new Date(kartdata.dataAcquisto)).formatDate())
        expect(kart.title).toBe(kartdata.title)
        expect(kart.totale).toBe(kartdata.totale)
    })
})
describe('serialize must not have undefined fields', () => {
    const kartdata = {
    }
    const kart = new ShoppingKartModel()
    kart.build(kartdata)
    it('checking pagamentoId', () => {
        expect(kart.serialize().pagamentoId).toBe('')
    })
    it('checking title', () => {
        expect(kart.serialize().title).toBe('')
    })

    it('check fornitoreId', () => {
        expect(kart.serialize().fornitoreId).toBe('')
    })

    it('check pagamentoId', () => {
        expect(kart.serialize().pagamentoId).toBe('')
    })

    it('check total', () => {
        expect(kart.serialize().totale).toBe(0)
    })

    it('checking fornitoreId', () => {
        expect(kart.serialize().fornitoreId).toBe('')
    })

    it('checking key', () => {
        expect(kart.serialize().key).toBe('')
    })

    it('checking archived', () => {
        expect(kart.serialize().archived).toBe(false)
    })

    it('checking online', () => {
        expect(kart.serialize().online).toBe(false)
    })

    it('checking dataAcquisto', () => {
        expect(kart.serialize().dataAcquisto).toBe(new DateModel(new Date()).formatDate())
    })

    it('adding items should work', () => {
        kart.addItem(new PurchaseModel({ key: 'a', prezzo: 1 }))
        expect(kart.items.length).toBe(1)
        expect(kart.items[0].prezzo).toBe(1)
        kart.addItem(new PurchaseModel({ key: 'b', prezzo: 2 }))
        expect(kart.items.length).toBe(2)
        expect(kart.items[1].prezzo).toBe(2)

    })

    it('updating item shoulds work', () => {
        kart.updateItem(new PurchaseModel({ key: 'a', prezzo: 2 }))
        expect(kart.items[1].prezzo).toBe(2)
    })

    it('removing item should work', () => {
        kart.removeItem(new PurchaseModel({ key: 'a' }))
        expect(kart.items.length).toBe(1)
        expect(kart.items[0].key).toBe('b')
    })
})

describe('getTitle should work', () => {
    const kartdata = {
        archived: false,
        dataAcquisto: '1977-03-16',
        fornitoreId: 'qwerty',
        pagamentoId: 'asdfghj',
        totale: 15,
        title: 'title',
        key: 'zxcvbnm',
        fornitore: new SupplierModel({ title: 'test title', note: 'just 4 test', nome: 'dummy', key: 'test', ecommerce: false })
    }
    const kart = new ShoppingKartModel({ item: kartdata })
    it('check getTitle returns the correct title', () => {
        expect(kart.getTitle().value).toBe(kartdata.title)
    })

})
