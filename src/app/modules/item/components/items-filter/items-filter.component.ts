import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterPopupPage } from '../../pages/filter-popup/filter-popup.page';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent implements OnInit {
  @Input() filterFields: any

  constructor(public modal:ModalController) { }

  ngOnInit() {
    console.log('filterrFields',this.filterFields)
  }
  async showPopup(){
    console.log('showing')
    const modal =  await this.modal.create({component:FilterPopupPage,componentProps:{filterFields:this.filterFields}})
    return await modal.present()
  }

  
  
}
