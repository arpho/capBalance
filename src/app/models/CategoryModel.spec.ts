
// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryModel } from './CategoryModel';
import { MockCategoriesService } from './mockers/mockCategoriesService';

describe('testing CategoryModel', () => {
    beforeEach(() => {

    })
    const service = new MockCategoriesService()
    const cat = new CategoryModel('a')
    it('CategoryModel should be instantiated', () => {

        expect(cat.key).toBe('a')
    })

    it('cat should load title', () => {
        expect(cat.title).toBe('a')
        expect(cat.getKey()).toBe('a')
    })

    it('cat should load category b', () => {
        const catB = new CategoryModel('b')
        expect(catB.title).toBe('b')
        expect(catB.getKey()).toBe('b')
    })
    it('deleted category', () => {
        const deletedCat = new CategoryModel('d')
        expect(deletedCat.title).toBe('deleted')
    })
    it('father is undefined', () => {
        expect(cat.fatherKey).toBeFalsy()
        expect(cat.father).toBeFalsy()
        expect(cat.serialize().fatherKey).toBe('')
        expect(cat.afferTo()).toBe('total')
        expect(cat.addCategory().length).toBe(1)
        expect(cat.addCategory()[0]).toEqual(jasmine.any(CategoryModel))
        expect(cat.addCategory()[0].title).toBe(cat.title)

    })
})
describe('testing father fields', () => {
    const service = new MockCategoriesService()
    const cat = new CategoryModel('a')
    it('should load father only one level', () => {
        const vegetali = new CategoryModel('vegetali')
        expect(vegetali.fatherKey).toBe('alimenti')
        expect(vegetali.father).toEqual(jasmine.any(CategoryModel))
        expect(vegetali.serialize().fatherKey).toBe('alimenti')
        expect(vegetali.addCategory().length).toBe(2)
        expect(vegetali.afferTo()).toBe('alimenti')

    })
    it('should load all level', () => {
        const seerice = new MockCategoriesService()
        const frutta = new CategoryModel('frutta')
        expect(frutta.fatherKey).toBe('vegetali')
        expect(frutta.addCategory().length).toBe(3)
        expect(frutta.father.key).toBe('vegetali')
        expect(frutta.father.father.title).toBe('alimenti')
    })

})
