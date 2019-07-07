import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterPopupPage } from '../../pages/filter-popup/filter-popup.page';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent implements OnInit {
  @Input() filterFields: any
  @Output() filterSet: EventEmitter<{}> = new EventEmitter()

  constructor(public modal:ModalController) { }

  ngOnInit() {
  }
  async showPopup(){
    const modal =  await this.modal.create({component:FilterPopupPage,componentProps:{filterFields:this.filterFields}})
    modal.onDidDismiss().then(data=>{
      this.filterSet.emit(data.data)
    })
    return await modal.present()
  }

  
  
}
