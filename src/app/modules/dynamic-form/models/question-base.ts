// tslint:disable:semicolon
// tslint:disable: quotemark
// tslint:disable: no-string-literal
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { QuestionProperties } from './questionproperties';

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  iconTrue: string;
  iconFalse: string;
  labelTrue: string;
  labelFalse: string;
  neutralFilter: (item: ItemModelInterface) => boolean
  filterFunction: (item: ItemModelInterface | any) => boolean
  // any solo per testing TOBE refactored
  filterFactory: (Options: {}) => (item: ItemModelInterface | any) => boolean = (Options: {}) =>
    !Options[this.key] ? this.neutralFilter : this.filterFunction
  constructor(
    options: QuestionProperties<T> /* {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      labelTrue?: string;
      labelFalse?: string;
      iconTrue?: string;
      iconFalse?: string;
      filterFunction?: (item: ItemModelInterface | any) => boolean
    }  */= {}
  ) {
    this.value = options["value"];
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.filterFunction = options.filterFunction
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    /* this.labelTrue = options.labelTrue
    this.labelFalse = options.labelFalse
    this.iconTrue = options.iconTrue || ""
    this.iconFalse = options.iconFalse || ""; */
    this.filterFunction = options.filterFunction;
    for (const key in options) {
      if (options[key]) {
        this[key] = options[key]
      }
    }
    this.neutralFilter = (item: ItemModelInterface) => true
    this.filterFactory = (Options: {}) =>
      !Options[this.key] ? this.neutralFilter : this.filterFunction
  }

}
