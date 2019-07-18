// tslint:disable:semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories/categorie.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';

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
  sorterFunction = (a: ItemModelInterface, b: ItemModelInterface) => (a.title < b.title ? -1 : (a.title > b.title ? 1 : 0))
  filterFuntion = (a: ItemModelInterface) => {
    console.log('a', a.key)
    console.log('map', this.selectedCategoriesList.map((cat: ItemModelInterface) => cat.key))
    return this.selectedCategoriesList.map((cat: ItemModelInterface) => cat.key).includes(a.key)
  }
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
    this.filterFuntion = (a: ItemModelInterface) => this.selectedCategoriesList.map((item: ItemModelInterface) => item.key).includes(a.key)
  }
  addCategory(cat) {
    this.selectedCategoriesList = [...this.selectedCategoriesList, cat]
    this.filterFuntion = (a: ItemModelInterface) => {
      console.log('a', a.key)
      console.log('map', this.selectedCategoriesList.map((item: ItemModelInterface) => item.key))
      return this.selectedCategoriesList.map((item: ItemModelInterface) => item.key).includes(a.key)
    }

  }

  dismiss(data?) {
    this.modalCtrl.dismiss(data)
  }

}
