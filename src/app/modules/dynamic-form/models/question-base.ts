export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  iconTrue: String;
  iconFalse: String;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      labelTrue?: String;
      labelFalse?: String;
      iconTrue?: String;
      iconFalse?: String;
    } = {}
  ) {
    this.value = options["value"];
    this.key = options.key || "";
    this.label = options.label || "";
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    this.iconTrue = options["iconTrue"] || "";
    this.iconFalse = options["iconFalse"] || "";
  }
}
