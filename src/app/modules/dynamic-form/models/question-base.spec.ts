// tslint:disable:semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { QuestionBase } from './question-base';
// tslint:disable-next-line: quotemark
describe("testing filterFunction", () => {
    const filterFunction = (item) => item.includes('test')
    const question = new QuestionBase<string>({ order: 0, key: 'test', label: 'test', value: 'text to be tested', filterFunction })
    it('filterfunction is defined', () => {
        expect(question.filterFunction).toBeTruthy()
    })
    it('base filterFunction should return true', () => {
        expect(question.filterFunction('testing')).toBe(true)
    })
    it('base filterFunction should return false', () => {
        expect(question.filterFunction('abcd')).toBe(false)
    })
    it('filterFactory should return neutralFilter', () => {
        const filter = question.filterFactory({ test: '' })

        expect(filter('abc')).toBe(true)
    })
    it('filterFactory should return filterFunction', () => {
        const filter = question.filterFactory({ test: 'abc' })
        expect(filter('abc')).toBeFalsy()
    })
})
