// tslint:disable:semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories/categorie.service';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Component({
  selector: 'app-categories-selector-page',
  templateUrl: './categories-selector.page.html',
  styleUrls: ['./categories-selector.page.scss'],
})
export class CategoriesSelectorPage implements OnInit {
  categoriesList: Array<CategoryModel>
  selectedCategoriesList: Array<CategoryModel>
  categoryIcon = 'add'
  selectedCategoryIcon = "remove"
  colorSelectableCategory = 'green' // add category green 
  colorSelectedCategory = 'orange'

  constructor(public modalCtrl: ModalController, public categories: CategoriesService) { }

  ngOnInit() {
    this.selectedCategoriesList = []
    this.categories.getEntitiesList().on('value', snap => {
      this.categoriesList = []
      snap.forEach(val => {
        this.categoriesList.push(new CategoryModel(val.key).build(val.val()))
      })
    })
  }

  removeCategory(category) {
    this.selectedCategoriesList = this.selectedCategoriesList.filter((item: CategoryModel) => item.key !== category.key)
  }
  addCategory(cat) {
    console.log('got ', cat)
    this.selectedCategoriesList = [...this.selectedCategoriesList, cat]
  }

  dismiss(data?) {
    this.modalCtrl.dismiss(data)
  }

}
