// tslint:disable:semicolon
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectorItemsPage } from '../../pages/selector-items/selector-items.page';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { ItemModel } from 'src/app/models/ItemModel';

@Component({
  selector: 'app-selector-items',
  templateUrl: './selector-items.component.html',
  styleUrls: ['./selector-items.component.scss'],
})
export class SelectorItemsComponent implements OnInit,OnChanges{
  @Input() text: string
  @Input() item: ItemModelInterface
  @Input() service: ItemServiceInterface
  @Output() selectedItem: EventEmitter<ItemModelInterface> = new EventEmitter()
  @Input() filterFunction: (item: ItemModelInterface) => boolean
  @Input() sorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number


  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('filterFunction', this.text,this.filterFunction)
    console.log('sorterFunction',this.text,this.sorterFunction)
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('changes',changes)
  }
  async action() {
    const modal = await this.modalCtrl.create({
      component: SelectorItemsPage,
      componentProps: {
        item: this.item,
        title: this.text,
        service: this.service

      }
    });
    modal.onDidDismiss().then(data => {
      this.item = this.service.getDummyItem()
      this.item = data.data
      console.log('item', this.item)
      this.selectedItem.emit(data.data)
    })
    return await modal.present()

  }

}
