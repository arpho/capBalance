import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterPopupPage } from '../../pages/filter-popup/filter-popup.page';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent implements OnInit {

  constructor(public modal:ModalController) { }

  ngOnInit() {}
  async showPopup(){
    console.log('showing')
    const modal =  await this.modal.create({component:FilterPopupPage})
    modal.present()
  }

  
  
}
