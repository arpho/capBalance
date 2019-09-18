import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
    controlType = 'textbox';
    type: string;

    constructor(options = { key: 'text', label: 'set the text' }) {
        super(options);
        // tslint:disable-next-line: no-string-literal
        this.type = options['type'] || '';
    }
}
