
// tslint:disable: semicolon
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryModel } from './CategoryModel';
import { MockCategoriesService } from './mockCategoriesService';

describe('testing CategoryModel', () => {
    const service = new MockCategoriesService()
    const cat = new CategoryModel('a', service)
    it('CategoryModel ashould be instantiated', () => {

        expect(cat.key).toBe('a')
    })

    it('cat should load title', () => {
        cat.load()
        expect(cat.title).toBe('a')
        expect(cat.serialize()).toBe('a')
    })

    it('cat should load category b', () => {
        const catB = new CategoryModel('b', service)
        catB.load()
        expect(catB.title).toBe('b')
        expect(catB.serialize()).toBe('b')
    })
    it('deleted category',()=>{
        const deletedCat = new CategoryModel('d',service)
        deletedCat.load()
        expect(deletedCat.title).toBe('deleted')
    })
})