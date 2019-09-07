import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
