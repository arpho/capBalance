// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingKartModel } from './shoppingKartModel'
describe('ShoppingKart should instantiate', () => {
    const kartdata = {
        archived: false,
        dataAcquisto: '2017-09-16T09:49:13.587Z',
        fornitoreId: 'qwerty',
        pagamentoId: 'asdfghj',
        key: 'zxcvbnm'
    }
    const kart = new ShoppingKartModel(kartdata)
    kart.build(kartdata)
    it('shoppingKart data are ok', () => {
        expect(kart.dataAcquisto).toBe(kartdata.dataAcquisto)
        expect(kart.fornitoreId).toBe(kart.fornitoreId)
        expect(kart.pagamentoId).toBe(kart.pagamentoId)
        expect(kart.archived).toBe(kartdata.archived)
        expect(kart.key).toBe(kart.key)
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
})
