import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories/categorie.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  public CategoriesList: Array<CategoryModel>;
  public filterLabel: String = 'Categorie';
  public filterString: string;
  filterFields: any;
  public filterFunction: (item: ItemModelInterface) => Boolean;

  constructor(public categories: CategoriesService) {
    this.filterFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Filtra per categoria',
        // value: 'Bombasto',
        order: 1
      }),
    ];
  }


  filter(event) {
    const filterTitle = event.title ?
      (item: ItemModelInterface) => item.title.toLowerCase().indexOf(event.title.toLowerCase()) !== -1 :
      (item: ItemModelInterface) => true; // se non filtro il campo title prendo tutto
    const filterNote = event.note ? (item: ItemModelInterface) => item.note.toLowerCase().indexOf(event.note.toLowerCase()) !== -1 :
      (item: ItemModelInterface) => true;
    const out = (item: ItemModelInterface) => filterNote(item) && filterTitle(item);
    return out;
  }

  searchFunctionFactory(v): (item: ItemModelInterface) => Boolean {
    const out = (item: ItemModelInterface) => item.title.toLowerCase().indexOf(v.data.toLowerCase()) !== -1;
    return out;
  }

  ngOnInit() {

    if (this.categories.getEntitiesList()) {
      this.categories.getEntitiesList().on('value', eventCategoriesListSnapshot => {
        this.CategoriesList = [];
        eventCategoriesListSnapshot.forEach(snap => {
          const category = new CategoryModel();
          category.load(snap.key, this.categories);
          this.CategoriesList.push(category);
        });
      });
    }
  }

  ionViewDidLoad() {
    console.log('loading categories');
    this.categories.getEntitiesList().on('value', eventCategoriesListSnapshot => {
      this.CategoriesList = [];
      eventCategoriesListSnapshot.forEach(snap => {
        console.log(snap.val());
      });
    });
  }

}
