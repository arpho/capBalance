// tslint:disable: semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';

@Component({
  selector: 'app-selector-items-page',
  templateUrl: './selector-items.page.html',
  styleUrls: ['./selector-items.page.scss'],
})
export class SelectorItemsPage implements OnInit {
  selectedItem: ItemModelInterface
  title: string
  service: ItemServiceInterface
  itemsList: Array<ItemModelInterface>
  filterFunction: (item:ItemModelInterface)=> boolean
  sorterFunction:(a:ItemModelInterface,b:ItemModelInterface) => number

  constructor(public modalCtrl: ModalController, public navParams: NavParams) {
    this.title = `Seleziona  ${this.navParams.get('title')}`
    this.selectedItem = this.navParams.get('item')
    this.service = this.navParams.get('service')
  }

  ngOnInit() {
    if (this.service) {
      this.service.getEntitiesList().on('value', snap => {
        this.itemsList = []
        snap.forEach(item => {
          const Item = this.service.getDummyItem()
          Item.key = snap.key
          Item.build(item.val())
          this.itemsList.push(Item)

        })
      }

    )}
  }

  selected(item: ItemModelInterface) {
    this.selectedItem = item
    console.log('selected', item)
    this.dismiss(item)
  }


  dismiss(item?: ItemModelInterface) {
    console.log('dismissing', item)
    this.modalCtrl.dismiss(this.selectedItem)
  }

}
