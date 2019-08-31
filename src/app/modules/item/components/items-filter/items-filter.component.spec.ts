// tslint:disable:semicolon
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFilterComponent } from './items-filter.component';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { MockShoppingKartervice } from 'src/app/models/mockers/mockShoppingKartService';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';

describe('ItemsFilterComponent', () => {
  let component: ItemsFilterComponent;
  let fixture: ComponentFixture<ItemsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsFilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ModalController, AngularDelegate],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const filterFunctionA = (item: string) => item.includes('testA')
    const filterFunctionB = (item: string) => item.includes('testB')
    const questionA = new QuestionBase<string>({
      order: 0,
      key: 'testA',
      label: 'test',
      value: 'text to be tested',
      filterFunction: filterFunctionA
    })
    const questionB = new QuestionBase<string>({
      order: 0,
      key: 'testB',
      label: 'test',
      value: 'text to be tested',
      filterFunction: filterFunctionA
    })
    const purchaseData = {
      barcode: '123456', key: '0', descrizione: 'questo è un test', picture: 'picture', prezzo: '125.5',
      categorieId: ['a', 'b', 'c']
    }

    const kartdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      title: 'title',
      key: 'zxcvbnm',
      items: [purchaseData]
    }
    const testdata = {
      archived: false,
      dataAcquisto: '1977-03-16',
      fornitoreId: 'qwerty',
      pagamentoId: 'asdfghj',
      totale: 15,
      key: 'zxcvbnm',
      ecommerce: false,
      items: [purchaseData]
    }
    const kartService = new MockShoppingKartervice(testdata)
    const kart = new ShoppingKartModel({ item: kartdata, service: kartService })
    kart.load()
    const kartsList = [kart]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('filter one only kart with one only parameter', () => {
   /*  const filterFunction = (item: ShoppingKartModel) => item.title.includes('test')
    const question = new QuestionBase<string>({ order: 0, key: 'title', label: 'test', value: 'text to be tested', filterFunction }) */
  })
});
