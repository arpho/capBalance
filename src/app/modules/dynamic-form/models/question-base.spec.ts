// tslint:disable:semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { QuestionBase } from './question-base';
describe("testing filterFunction", () => {
    const filterFunction = (field, item) => item.includes(field)
    const question = new QuestionBase<string>({ order: 0, label: 'test', value: 'text to be tested', filterFunction })
    it('filterfunction is defined',()=>{
        expect(question.filterFunction).toBeTruthy()
    })
})