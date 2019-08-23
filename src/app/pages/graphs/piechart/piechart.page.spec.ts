import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartPage } from './piechart.page';
import { DatePipe } from '@angular/common';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { MockCategoriesService } from 'src/app/models/mockers/mockCategoriesService';
import { CategoryModel } from 'src/app/models/CategoryModel';

describe('PiechartPage', () => {
  let component: PiechartPage;
  let fixture: ComponentFixture<PiechartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PiechartPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.entities.length).toBe(3);

  });
  // tslint:disable-next-line: quotemark
  it("categories'functions work", () => {
    const kartdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      title: 'title',
      key: 'zxcvbnm'
    };
    const kart = new ShoppingKartModel(kartdata);
    const testPurchase = {
      barcode: '123456', key: '0', descrizione: 'questo è un test', picture: 'picture', prezzo: 125.5,
      categorieId: ['a', 'b', 'c']
    };
    const purchaseA = new PurchaseModel(testPurchase, new MockCategoriesService());
    purchaseA.load(); // load categories in purchaseA
    kart.addItem(purchaseA);
    const categoriesList = kart.items.reduce(component.expandPurchases, []);
    expect(categoriesList.length).toBe(3);
    expect(categoriesList[0]).toEqual(jasmine.any(Object));
    const categoriesTuples = categoriesList.map(component.mapCategoriesFactory(Number(testPurchase.prezzo)));
    expect(categoriesTuples.length).toBe(3);
    expect(categoriesTuples[0].title).toBe('a');
    expect(categoriesTuples[0].total).toBe(125.5);
  });
});
