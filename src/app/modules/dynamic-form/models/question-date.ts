// tslint:disable: quotemark
import { QuestionBase } from "./question-base";
import { QuestionProperties } from './questionproperties';

export class DateQuestion extends QuestionBase<string> {

  controlType = "datebox";
  type: Date;

  constructor(options : { key: string, label: string }|QuestionProperties<Date>) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.type = options["type"] || "";
  }
}
