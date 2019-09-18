import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {
    controlType = 'dropdown';
    options: { key: string, value: string }[] = [];

    constructor(options = { key: 'dropdown', label: 'combobox' }) {
        super(options);
        // tslint:disable-next-line: no-string-literal
        this.options = options['options'] || [];
    }
}
