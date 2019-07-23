// tslint:disable:semicolon
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesSelectorPage } from 'src/app/pages/categories-selector/categories-selector.page';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSelectorComponent implements OnInit {
  @Input() categoriesList: Array<CategoryModel>
  @Output() selectedCategories: EventEmitter<Array<CategoryModel>> = new EventEmitter()


  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('got categories', this.categoriesList)
  }

  async showPopup() {
    const modal = await this.modalCtrl.create({ component: CategoriesSelectorPage, componentProps: { categories: this.categoriesList } })
    modal.onDidDismiss().then(data => {
      console.log(data)
      this.selectedCategories.emit(data.data)


    })
    return await modal.present()
  }

}
