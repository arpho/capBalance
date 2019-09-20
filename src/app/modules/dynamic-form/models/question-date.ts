// tslint:disable: quotemark
import { QuestionBase } from "./question-base";
import { QuestionProperties } from './questionproperties';

export class DateQuestion extends QuestionBase<string> {

  controlType = "datebox";
  type: Date;

  constructor(options :QuestionProperties<Date>| { key: string, label: string }) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.type = options["type"] || "";
  }
}
