// tslint:disable:semicolon
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartPage } from './piechart.page';
import { DatePipe } from '@angular/common';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { MockCategoriesService } from 'src/app/models/mockers/mockCategoriesService';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemFilterOPtions } from 'src/app/modules/item/models/ItemFIlterOptions';

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
  it("categories'functions work with one kart of one purchase", () => {
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
    const categoriesTuples = categoriesList.map(component.categoriesMapperFactory(Number(testPurchase.prezzo)));
    expect(categoriesTuples.length).toBe(3);
    expect(categoriesTuples[0].title).toBe('a');
    expect(categoriesTuples[0].prezzo).toBe(125.5);
    expect(categoriesTuples[1].title).toBe('b');
    expect(categoriesTuples[1].prezzo).toBe(125.5);
    expect(categoriesTuples[2].title).toBe('c');
    expect(categoriesTuples[2].prezzo).toBe(125.5);
  });
  // tslint:disable-next-line: quotemark
  it("categories' functions work with one kart of two purchase", () => {
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
    const testPurchase0 = {
      barcode: '123456', key: '0', descrizione: 'questo è un test', picture: 'picture', prezzo: 125.5,
      categorieId: ['a', 'b', 'c']
    };
    const testPurchase1 = {
      // tslint:disable-next-line: quotemark
      barcode: '123457', key: '1', descrizione: "questo è un'altro test", picture: 'picture', prezzo: 126.5,
      categorieId: ['c', 'D', 'e']
    };
    const purchaseA = new PurchaseModel(testPurchase0, new MockCategoriesService());
    purchaseA.load(); // load categories in purchaseA
    kart.addItem(purchaseA);
    const purchaseB = new PurchaseModel(testPurchase1, new MockCategoriesService())
    purchaseB.load()
    kart.addItem(purchaseB)
    // mappa ogni acquisto con un'oggetto avente la lista delle categorie  e il prezzo dell'acquisto
    const categoriesListB = kart.items.map(component.categoriesMapper);
    expect(categoriesListB.length).toBe(kart.items.length)
    expect(categoriesListB[0].prezzo).toBe(125.5)
    expect(categoriesListB[0].categorie[0]).toEqual(jasmine.any(CategoryModel))
    expect(categoriesListB[1].prezzo).toBe(126.5)
    // tslint:disable-next-line: quotemark
    console.log("two items categories list expanded", categoriesListB)
    const mapper = (obj: { categorie: [CategoryModel], prezzo: number }) => {
      return obj.categorie.map((cat: CategoryModel) => [cat.title, obj.prezzo])
    }
    const flattener = (acc: [any], el: any) => {
      el.forEach(element => {
        acc.push(element)

      });
      return acc

    }
    const toBeFlattened = categoriesListB.map(mapper)
    console.log('should be ok array of two arrays', toBeFlattened) // .reduce(flatten,[]))
    const flattened = toBeFlattened.reduce(flattener)
    console.log('flattened', flattened)
    expect(flattened.length).toBe(kart.items.reduce((acc, cv: PurchaseModel) => {
      acc += cv.categorie.length
      return acc
    }, 0))
  })
});
