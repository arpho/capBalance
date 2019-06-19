import { Pipe, PipeTransform } from '@angular/core';
import { ItemModelInterface } from '../models/itemModelInterface';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(allItems: ItemModelInterface[], args?: any): any {
    return (args && allItems) ? allItems.filter(args) : allItems;
  }

}
