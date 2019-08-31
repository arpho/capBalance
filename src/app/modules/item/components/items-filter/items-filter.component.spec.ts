// tslint:disable:semicolon
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFilterComponent } from './items-filter.component';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { ItemModelInterface } from '../../models/itemModelInterface';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
