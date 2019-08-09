import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsPage } from './graphs.page';

describe('GraphsPage', () => {
  let component: GraphsPage;
  let fixture: ComponentFixture<GraphsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
