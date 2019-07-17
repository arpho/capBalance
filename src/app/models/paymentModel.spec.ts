// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsModel } from './paymentModel';
describe('testing Payment model', () => {
    const testdata = { key: '123', title: 'qwertyu', note: 'asdfghj', addebito: '12/05/2019', nome: 'cash' }
    const payment = new PaymentsModel(testdata)
    it('title should be title', () => {
        expect(payment.title).toBe(testdata.title)
    })
    it('key should be correct', () => {
        expect(payment.key).toBe(testdata.key)
    })

    it('note should be correct', () => {
        expect(payment.note).toBe(testdata.note)
    })

    it('addebito should be correct', () => {
        expect(payment.addebito).toBe(testdata.addebito)
    })
    describe('testing serialize with all data', () => {
        const testdata = { key: '123', title: 'qwertyu', note: 'asdfghj', addebito: '12/05/2019', nome: 'cash' }
        const payment = new PaymentsModel(testdata)
        it('title should be title', () => {
            expect(payment.serialize().title).toBe(testdata.title)
        })
        it('key should be correct', () => {
            expect(payment.serialize()['key']).toBeFalsy()
        })

        it('note should be correct', () => {
            expect(payment.serialize().note).toBe(testdata.note)
        })

        it('addebito should be correct', () => {
            expect(payment.serialize().addebito).toBe(testdata.addebito)
        })
        it('nome should be falsy', () => {
            // tslint:disable-next-line: no-string-literal
            expect(payment.serialize()['nome']).toBeFalsy()
        })
    })
    describe('serialize should not have undefined fields', () => {
        const testdata = {
            key: undefined,
            title: undefined,
            note: undefined,
            addebito: undefined
        }
        const payment = new PaymentsModel(testdata)
        it("note should be ''", () => {
            expect(payment.serialize().note).toBe('')
        })

        it("title should be ''", () => {
            expect(payment.serialize().title).toBe('')
        })

        it("addebito should be ''", () => {
            expect(payment.serialize().addebito).toBe('')
        })

    })
})