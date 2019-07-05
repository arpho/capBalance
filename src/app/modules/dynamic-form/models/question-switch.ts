import { QuestionBase } from "./question-base";

export class SwitchQuestion<T> extends QuestionBase<boolean> {
  controlType = "switchBox";
  labelTrue: string;
  labelFalse: string;
  iconFalse: string;
  iconTrue: string;
  type: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.labelFalse = options["labelFalse"] || "";
    this.labelTrue = options["labelTrue"] || "";
    this.type = options["type"] || "boolean";
    this.iconFalse = options["iconFalse"] || "";
    this.iconTrue = options["iconTrue"] || "";
  }
  textValue() {
    return this.value ? this.labelTrue : this.labelFalse;
  }
}
