import { QuestionProperties } from '../../dynamic-form/models/questionproperties';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemServiceInterface } from './ItemServiceInterface';
import { ItemModelInterface } from './itemModelInterface';
// tslint:disable:semicolon
export interface SelectorProperties extends QuestionProperties<CategoryModel> {
    service: ItemServiceInterface;
    text?: string;
    filterFunction?: (item: ItemModelInterface) => boolean
    sorterFunction?: (a: ItemModelInterface, b: ItemModelInterface) => number

}
