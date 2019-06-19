import { QuestionBase } from "./question-base";

export class DateQuestion extends QuestionBase<string> {
  controlType = "datebox";
  type: Date;

  constructor(options: {} = {}) {
    super(options);
    this.type = options["type"] || "";
  }
}
