import { QuestionBase } from './question-base';
import { QuestionProperties } from './questionproperties';

export class GeoLocateQuestion extends QuestionBase<string> {
    controlType = 'geobox';
    type: string;

    constructor(options: { key: string, label: string } | QuestionProperties<Coordinates>) {
        super(options);
        // tslint:disable-next-line: no-string-literal
        this.type = options['type'] || '';
    }
}
