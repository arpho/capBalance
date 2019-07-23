// tslint:disable: semicolon
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Component({
  selector: 'app-categories-viewer',
  templateUrl: './categories-viewer.component.html',
  styleUrls: ['./categories-viewer.component.scss'],
})
export class CategoriesViewerComponent implements OnInit {
  @Input() categorie: Array<CategoryModel>
  @Output() updatedCategories: EventEmitter<Array<CategoryModel>> = new EventEmitter()
  categoryIcon = 'eye'
  colorCategory = 'blue'

  constructor() { }

  ngOnInit() {

    console.log('got categories', this.categorie)
  }

  viewCategory(){
    console.log('view')
  }

}
