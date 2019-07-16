import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchasePage } from './create-purchase.page';
import { ModalController, AngularDelegate } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

describe('CreatePurchasePage', () => {
  let component: CreatePurchasePage;
  let fixture: ComponentFixture<CreatePurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePurchasePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ModalController, AngularDelegate, BarcodeScanner]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
