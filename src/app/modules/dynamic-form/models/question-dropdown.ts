import { QuestionBase } from './question-base';
import { QuestionProperties } from './questionproperties';

export interface DropdownProperties extends QuestionProperties<any[]> {
    options: any[]
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
