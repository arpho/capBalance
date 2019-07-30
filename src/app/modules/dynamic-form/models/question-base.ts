// tslint:disable:semicolon
import { ItemModelInterface } from '../../item/models/itemModelInterface';

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  iconTrue: string;
  iconFalse: string;
  filterFunction: (item: ItemModelInterface|any) => boolean

  constructor(
    options: {
      value?: T;
      key?: string;
      filterFunction?: (field: any, item: ItemModelInterface|any) => boolean
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      labelTrue?: string;
      labelFalse?: string;
      iconTrue?: string;
      iconFalse?: string;
    } = {}
  ) {
    // tslint:disable: quotemark
    // tslint:disable: no-string-literal
    this.value = options["value"];
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.filterFunction = options.filterFunction ?
     (item: ItemModelInterface) => options.filterFunction(this.value, item) : this.neutralFilter
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    this.iconTrue = options["iconTrue"] || "";
    this.iconFalse = options["iconFalse"] || "";
  }
  neutralFilter = (item: ItemModelInterface) => true
  filterFactory = (field: any, filterFunction) => !field ? this.neutralFilter : this.filterFunction
}
