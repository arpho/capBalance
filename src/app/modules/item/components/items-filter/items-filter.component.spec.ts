import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFilterComponent } from './items-filter.component';
import { ModalController, AngularDelegate } from '@ionic/angular';

describe('ItemsFilterComponent', () => {
  let component: ItemsFilterComponent;
  let fixture: ComponentFixture<ItemsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsFilterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:[ModalController,AngularDelegate],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
