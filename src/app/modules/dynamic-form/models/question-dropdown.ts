import { QuestionBase } from './question-base';
import { QuestionProperties } from './questionproperties';
import { ComboValue } from './ComboValueinterface';
// tslint:disable:semicolon
export interface DropdownProperties extends QuestionProperties<ComboValue[]> {
    options: ComboValue[]
}

export class DropdownQuestion extends QuestionBase<string> {
    controlType = 'dropdown';
    options: { key: string, value: string }[] = [];

    constructor(options: { key: string, label: string } | DropdownProperties) {
        super(options);
        // tslint:disable-next-line: no-string-literal
        this.options = options['options'] || [];
    }
}
