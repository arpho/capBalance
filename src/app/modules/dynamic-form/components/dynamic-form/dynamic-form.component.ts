import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  Validators,
  FormControl
} from "@angular/forms";

import { QuestionBase } from "../../models/question-base";
import { QuestionControlService } from "../../services/question-control.service";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Output() interactiveSubmit: EventEmitter<{}> = new EventEmitter();
  @Output() singleSubmit: EventEmitter<{}> = new EventEmitter();
  @Input() questions: QuestionBase<any>[] = [];
  @Input() submitText: String;

  form: FormGroup;
  payLoad = "";

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    console.log('question form  ciao')
    this.form = this.qcs.toFormGroup(this.questions);

    if (this.questions.filter(v => v.key === "location").length > 0) {
      this.form.addControl("address", new FormControl()); // input-geolocation usa un control in più
    }
    this.form.valueChanges.subscribe(v => {
      this.interactiveSubmit.emit(v);
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.singleSubmit.emit(this.form.value);
  }
}
