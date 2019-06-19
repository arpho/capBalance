import { QuestionBase } from './question-base';

export class GeoLocateQuestion extends QuestionBase<string> {
    controlType = 'geobox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
