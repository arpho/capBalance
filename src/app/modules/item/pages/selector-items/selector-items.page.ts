// tslint:disable: semicolon
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';

@Component({
  selector: 'app-selector-items-page',
  templateUrl: './selector-items.page.html',
  styleUrls: ['./selector-items.page.scss'],
})
export class SelectorItemsPage implements OnInit, OnChanges {
  selectedItem: ItemModelInterface
  title: string
  service: ItemServiceInterface
  itemsList: Array<ItemModelInterface>
  filterText: string
  filterFunction: any // (item: ItemModelInterface) => boolean
  sorterFunction: any // (a: ItemModelInterface, b: ItemModelInterface) => number

  constructor(public modalCtrl: ModalController, public navParams: NavParams) {
    this.title = `Seleziona  ${this.navParams.get('title')}`
    this.selectedItem = this.navParams.get('item')
    this.service = this.navParams.get('service')
    this.filterFunction = this.navParams.get('filterFunction')
    this.sorterFunction = this.navParams.get('sorterFunction')
  }
  async createItem() {
    const modal = await this.modalCtrl.create({ component: this.service.getDummyItem().getCreatePopup() })
    modal.onDidDismiss().then(item => {
      console.log('created', item)
      this.dismiss(item.data)
    })
    return await modal.present()
  }

  ngOnInit() {
    if (this.service) {
      this.service.getEntitiesList().on('value', snap => {
        this.itemsList = []
        snap.forEach(item => {
          const Item = this.service.getDummyItem()
          Item.key = item.key
          Item.build(item.val())
          this.itemsList.push(Item)

        })
      }

      )
    }
  }
  filter(ev) {
    this.filterFunction = (item: ItemModelInterface) => item.title.toUpperCase().includes(ev.detail.value.toUpperCase())
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sorterFunction) {
      this.sorterFunction = changes.sorterFunction
    }
    if (changes.filterFunction) {
      this.filterFunction = changes.filterFunction
    }
  }

  selected(item: ItemModelInterface) {
    this.selectedItem = item
    this.dismiss(item)
  }


  dismiss(item?: ItemModelInterface) {
    this.modalCtrl.dismiss(item)
  }

}
