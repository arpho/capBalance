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

  constructor(public modalCtrl: ModalController, public categories: CategoriesService) { }

  ngOnInit() {
    this.categoriesList = []
    this.categories.getEntitiesList().on('value', snap => {
      snap.forEach(val => {
        this.categoriesList.push(new CategoryModel(val.key).build(val.val()))
      })
      console.log(this.categoriesList)
    })
  }
  dismiss(data?) {
    this.modalCtrl.dismiss(data)
  }

}
