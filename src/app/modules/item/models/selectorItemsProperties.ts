import { QuestionProperties } from '../../dynamic-form/models/questionproperties';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemServiceInterface } from './ItemServiceInterface';

export interface SelectorProperties extends QuestionProperties<CategoryModel> {
    service?: ItemServiceInterface;
    text?: string;

}
