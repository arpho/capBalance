import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { QuestionBase } from 'src/app/modules/dynamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/modules/item/models/question-textbox';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.page.html',
  styleUrls: ['./detail-category.page.scss'],
})
export class DetailCategoryPage implements OnInit {
  category: CategoryModel;
  categoryFields // :  Array<QuestionBase<any>>;

  constructor(public navParams: NavParams) {
    this.category = this.navParams.get('item');
    console.log('got category', this.category);
  }
  filter(ev) {
    console.log('filter', ev);
  }
  submit(ev) {
    console.log('submit', ev);
  }

  ngOnInit() {
    this.categoryFields = [new TextboxQuestion({
      key: 'category',
      label: 'categoria',
      value: this.category ? this.category.title : '',
      order: 1
    })];
  }

}
