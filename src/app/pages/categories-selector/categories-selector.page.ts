// tslint:disable:semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories/categorie.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'app-categories-selector-page',
  templateUrl: './categories-selector.page.html',
  styleUrls: ['./categories-selector.page.scss'],
})
export class CategoriesSelectorPage implements OnInit {
  categoriesList: Array<CategoryModel>
  selectedCategoriesList: Array<CategoryModel>
  categoryIcon = 'add'
  selectedCategoryIcon = 'remove'
  colorSelectableCategory = 'green' // add category green 
  colorSelectedCategory = 'orange'
  filterFunction: (item: CategoryModel) => boolean
  sorterFunction = (a: ItemModelInterface, b: ItemModelInterface) => (a.title < b.title ? -1 : (a.title > b.title ? 1 : 0))


  constructor(public modalCtrl: ModalController, public Categories: CategoriesService, public navParams: NavParams) { }
  filterFactory(args: { selectedCategoriesList: Array<CategoryModel> }) {
    return (a: ItemModelInterface) => !args.selectedCategoriesList.map((cat: ItemModelInterface) => cat.key).includes(a.key)
  }

  ngOnInit() {
    this.selectedCategoriesList = this.navParams.get('categories') || []
    this.filterFunction = this.filterFactory({ selectedCategoriesList: this.selectedCategoriesList })
    if (this.Categories.getEntitiesList()) {
      this.Categories.getEntitiesList().on('value', snap => {
        this.categoriesList = []
        snap.forEach(val => {
          this.categoriesList.push(new CategoryModel(val.key).build(val.val()))
        })
      })
    }
  }

  removeCategory(category) {
    this.selectedCategoriesList = this.selectedCategoriesList.filter((item: CategoryModel) => item.key !== category.key)
    this.filterFunction = (a: ItemModelInterface) => this.selectedCategoriesList.map((item: ItemModelInterface) => item.key).includes(a.key)
    this.filterFunction = this.filterFactory({ selectedCategoriesList: this.selectedCategoriesList })
  }
  addCategory(cat) {
    this.selectedCategoriesList = [...this.selectedCategoriesList, cat]
    this.filterFunction = this.filterFactory({ selectedCategoriesList: this.selectedCategoriesList })

  }

  dismiss(data?) {
    this.modalCtrl.dismiss(data)
  }

}
