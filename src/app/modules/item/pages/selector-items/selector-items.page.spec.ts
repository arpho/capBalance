import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorItemsPage } from './selector-items.page';
import { ModalController, AngularDelegate, NavParams } from '@ionic/angular';
import { MockNavParams } from './mockNavParams';

describe('SelectorItemsPage', () => {
  let component: SelectorItemsPage;
  let fixture: ComponentFixture<SelectorItemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorItemsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ModalController, AngularDelegate,
      {provide:NavParams,useClass:MockNavParams}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
