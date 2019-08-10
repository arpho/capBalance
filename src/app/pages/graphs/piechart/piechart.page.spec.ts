import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartPage } from './piechart.page';

describe('PiechartPage', () => {
  let component: PiechartPage;
  let fixture: ComponentFixture<PiechartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  });
});
