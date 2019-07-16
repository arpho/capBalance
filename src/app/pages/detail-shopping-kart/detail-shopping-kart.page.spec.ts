import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailShoppingKartPage } from './detail-shopping-kart.page';

describe('DetailShoppingKartPage', () => {
  let component: DetailShoppingKartPage;
  let fixture: ComponentFixture<DetailShoppingKartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailShoppingKartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailShoppingKartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
