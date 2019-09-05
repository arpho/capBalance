import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { CategoriesService } from 'src/app/services/categories/categorie.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.page.html',
  styleUrls: ['./detail-category.page.scss'],
})
export class DetailCategoryPage implements OnInit {
  category: CategoryModel;
  categoryFields: Array<any>;

  constructor(
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public service: CategoriesService
              ) {
    this.category = this.navParams.get('item');
  }
  filter(ev: {}) {
    console.log('filter', ev);
  }
  submit(ev: {}) {
    console.log('submit', ev);
  }

  dismiss() {
    this.modalCtrl.dismiss(this.category);

  }

  ngOnInit() {
    this.categoryFields = [new TextboxQuestion({
      key: 'category',
      label: 'categoria',
      value: this.category ? this.category.title : '',
      order: 1
    }),
    new SelectorQuestion({
      key: 'father',
      label: 'categoria origine',
      text: 'seleziona categoria origine',
      service: this.service
    })];
  }

}
