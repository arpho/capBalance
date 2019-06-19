import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ɵConsole
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { QuestionBase } from "../../models/question-base";

@Component({
  selector: "app-question",
  templateUrl: "./question-form-component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionFormComponent implements OnInit {
  public value: any;
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  ngOnInit() {
    this.value = this.question ? this.question.value : undefined;
    this.form = this.form
      ? this.form
      : new FormGroup({
          // I need an instance of formgroup for run the tests
          name: new FormControl("turiddu"),
          age: new FormControl("20")
        });
  }
  get isValid() {
    return this.question ? this.form.controls[this.question.key].valid : false;
  }
  get getValue() {
    return this.question.key ? this.form.get(this.question.key).value : "";
  }
}
