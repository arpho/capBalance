// tslint:disable:semicolon
// tslint:disable: quotemark
// tslint:disable: no-string-literal
import { ItemModelInterface } from '../../item/models/itemModelInterface';
import { QuestionProperties } from './questionproperties';
import { Options } from 'selenium-webdriver';

export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  type: string
  controlType: string;
  iconTrue: string;
  iconFalse: string;
  labelTrue: string;
  labelFalse: string;
  neutralFilter: (item: ItemModelInterface) => true
  // any solo per testing TOBE refactored
  public filterFunction: (item: ItemModelInterface, arg: ItemModelInterface | any) => boolean



  constructor(
    options: QuestionProperties<any> | { key: string, label: string }
  ) {
    this.value = options["value"];
    this.key = options.key || "";
    this.type = options['type'] || ''
    this.label = options.label || "";
    this.required = !!options['required'];
    this.filterFunction = options['filterFunction']
    this.order = options['order'] === undefined ? 1 : options['order'];
    this.controlType = options['controlType'] || "";
    // tslint:disable-next-line: prefer-const
    for (let key in options) {
      if (options[key]) {
        this[key] = options[key]
      }
    }
    this.neutralFilter = (item: ItemModelInterface) => true
    this.filterFunction = options['filterFunction'] || this.neutralFilter;
  }
  filterFactory =  (options: {}) => {
return Options[this.key] ? (item: ItemModelInterface) =>
     this.filterFunction(item, options[this.key]) : this.neutralFilter

    // return this['filterFunction'] ? this['filterFunction'] : (item: ItemModelInterface, value: any) => true
  }



}
