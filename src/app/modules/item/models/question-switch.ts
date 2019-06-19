import { QuestionBase } from "./question-base";

export class SwitchQuestion<T> extends QuestionBase<boolean> {
  controlType = "switchBox";
  labelTrue: string;
  labelFalse: string;
  iconTrue: string;
  iconFalse: string;
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.labelFalse = options["labelFalse"] || "";
    this.labelTrue = options["labelTrue"] || "";
    this.iconTrue = options["iconTrue"] || "radio-button-off";
    this.iconFalse = options["iconFalse"] || "checkmark";
    this.type = options["type"] || "boolean";
  }
  textValue() {
    return this.value ? this.labelTrue : this.labelFalse;
  }
}
