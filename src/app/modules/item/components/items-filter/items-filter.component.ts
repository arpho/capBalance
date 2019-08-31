// tslint:disable:semicolon
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterPopupPage } from '../../pages/filter-popup/filter-popup.page';
import { QuestionBase } from '../../models/question-base';
import { ItemModelInterface } from '../../models/itemModelInterface';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss'],
})
export class ItemsFilterComponent implements OnInit {
  @Input() filterFields: Array<QuestionBase<any>>
  @Output() filterSet: EventEmitter<{}> = new EventEmitter()

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }
  async showPopup() {
    const modal = await this.modal.create({ component: FilterPopupPage, componentProps: { filterFields: this.filterFields } })
    modal.onDidDismiss().then(data => {
      this.filterSet.emit(data.data)
    })
    return await modal.present()
  }
  filterFactory = (settings: {}, fields: Array<QuestionBase<any>>) => {
    const filter = (item: ItemModelInterface) => {
      // apply all the filter's functions
    fields.reduce((acc, currentValue: any) => acc && currentValue.filterFactory(settings)(item), true)
    }
    return filter

  }



}
