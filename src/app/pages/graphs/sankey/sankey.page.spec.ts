import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ShoppingKartModel} from '../../../models/shoppingKartModel'
import {PurchaseModel} from '../../../models/purchasesModel'
import {CategoryModel} from '../../../models/CategoryModel'

import { SankeyPage } from './sankey.page';

describe('SankeyPage', () => {
  let component: SankeyPage;
  let fixture: ComponentFixture<SankeyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SankeyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SankeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('testing data',()=>{
  const kartdata = {
    archived: false,
    dataAcquisto: '1977-03-16',
    fornitoreId: 'qwerty',
    pagamentoId: 'asdfghj',
    totale: 15,
    title: 'title',
    note: 'note',
    key: 'zxcvbnm'
}
const kart = new ShoppingKartModel()
kart.build(kartdata)
const a = new PurchaseModel({ key: 'a', prezzo: 1, categorieId: ['a', 'b', 'c'], descrizione: 'a' }).initialize({ key: 'a', prezzo: 1, categorieId: ['a', 'b', 'c'], descrizione: 'a' })
const b = new PurchaseModel({ key: 'b', prezzo: 2, categorieId: ['a', 'b', 'c'], descrizione: 'b' }).initialize({ key: 'b', prezzo: 2, categorieId: ['a', 'b', 'c'], descrizione: 'b' })
const inizializeCategory = (cat: CategoryModel, categoriesServiceMocker: any) => cat.initialize(categoriesServiceMocker.filter((Cat) => Cat.key == cat.key)[0])
const catService = [{ key: 'a', title: 'A' }, { key: 'b', title: 'B' }, { key: 'c', title: 'C' }]
const initializeCategoryWrapper = (cat: CategoryModel) => inizializeCategory(cat, catService)
a.categorie =  a.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
b.categorie =  b.categorieId.map(key => new CategoryModel(key)).map(initializeCategoryWrapper)
kart.addItem(b)
kart.addItem(a)
it('kart should be instantiated',()=>{
  expect(kart).toEqual(jasmine.any(ShoppingKartModel))
})
})
