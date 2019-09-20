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
  // any solo per testing TOBE refactored
  filterFunction: (value: any, item: ItemModelInterface | any) => boolean
  filterFactory: (Options: any) => (item: ItemModelInterface | any) => boolean = (Options: any) =>
    Options[this.key] ? (item: ItemModelInterface) => this.filterFunction(Options[this.key], item) :
      this.neutralFilter

  constructor(
    options: QuestionProperties<any> | { key: string, label: string }
  ) {
    this.value = options["value"];
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options['required'];
    this.filterFunction = options['filterFunction']
    this.order = options['order'] === undefined ? 1 : options['order'];
    this.controlType = options['controlType'] || "";
    for (const key in options) {
      if (options[key]) {
        this[key] = options[key]
      }
    }
    this.neutralFilter = (item: ItemModelInterface) => true
    this.filterFunction = options['filterFunction'] || this.neutralFilter;
  }



}
