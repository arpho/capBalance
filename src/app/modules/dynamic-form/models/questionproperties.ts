// tslint:disable:semicolon
import { ItemModelInterface } from '../../item/models/itemModelInterface';

export interface QuestionProperties<T> {
    value?: T|any;
    key: string;
    label: string;
    required?: boolean;
    order?: number;
    type?:string
    controlType?: string;
    filterFunction?: (value: any, item: ItemModelInterface | any) => boolean
}
