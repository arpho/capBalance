// tslint:disable:semicolon
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories/categorie.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { ComponentsPageModule } from 'src/app/modules/item/components/components.module';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';

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
  filterString: string
  searchbar: any
  searchControl: FormControl
  baseFilter: (item: CategoryModel) => boolean
  filterFunction: (item: CategoryModel) => boolean
  sorterFunction = (a: ItemModelInterface, b: ItemModelInterface) => (a.title < b.title ? -1 : (a.title > b.title ? 1 : 0))
  handleInput(event) {
    console.log('input', event)
    const query = event.target.value.toLowerCase();
    /*requestAnimationFrame(() => {
      items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });*/
  }


  constructor(public modalCtrl: ModalController, public service: CategoriesService, public navParams: NavParams) {
    this.searchControl = new FormControl()
  }
  filterFactory(args: { selectedCategoriesList: Array<CategoryModel> }) {
    return (a: ItemModelInterface) => !args.selectedCategoriesList.map((cat: ItemModelInterface) => cat.key).includes(a.key)
  }

  onInput(ev) {

    this.filterFunction = this.makeFilter(ev.detail.value)
    this.filterString = ev.detail.value // spaghetti code waiting to be refactored
  }

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe(search => {
      this.handleInput(search)
    })
    this.selectedCategoriesList = this.navParams.get('categories') || []
    this.filterFunction = this.filterFactory({ selectedCategoriesList: this.selectedCategoriesList })
    this.baseFilter = this.filterFactory({ selectedCategoriesList: this.selectedCategoriesList })
    if (this.service.getEntitiesList()) {
      this.service.getEntitiesList().on('value', snap => {
        this.categoriesList = []
        snap.forEach(val => {
          this.categoriesList.push(new CategoryModel(val.key).build(val.val()))
        })
      })
    }
  }

  makeFilter(pattern: string) {
    return (item: CategoryModel) => this.baseFilter(item) && String(item.getTitle().value).toLowerCase().includes(pattern.toLowerCase())

  }

  createCategory() {

    console.log('creare', this.filterString)
    const newCategory = new CategoryModel().build({ title: this.filterString, key: '', service: this.service })
    console.log('new category', newCategory)


    this.service.createItem(newCategory).then(category => {
      console.log('created', category)
      category.on('value', cat => {
        console.log('created', cat)
      })
      newCategory.key = category.key
      this.selectedCategoriesList = [...this.selectedCategoriesList, newCategory]
    })
  }

  removeCategory(category) {
    this.selectedCategoriesList = this.selectedCategoriesList.filter((item: CategoryModel) => item.key !== category.key)
    this.filterFunction = (a: ItemModelInterface) => this.selectedCategoriesList.map((item: ItemModelInterface) => item.key).includes(a.key)
    this.filterFunction = this.filterFactory({ selectedCategoriesList: this.selectedCategoriesList })
  }
  addCategory(cat) {
    // this.searchControl.reset()
    this.selectedCategoriesList = [...this.selectedCategoriesList, cat]
    this.filterFunction = this.filterFactory({ selectedCategoriesList: this.selectedCategoriesList })

  }

  dismiss(data?) {
    this.modalCtrl.dismiss(data)
  }

}
