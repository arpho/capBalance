// tslint:disable: quotemark
import { QuestionBase } from "./question-base";

export class DateQuestion extends QuestionBase<string> {

  controlType = "datebox";
  type: Date;

  constructor(options: {} = {}) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.type = options["type"] || "";
  }
}
