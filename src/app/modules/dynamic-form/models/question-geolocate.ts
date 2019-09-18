import { QuestionBase } from './question-base';

export class GeoLocateQuestion extends QuestionBase<string> {
    controlType = 'geobox';
    type: string;

    constructor(options = { key: 'geolocate', label: 'geolocalize' }) {
        super(options);
        // tslint:disable-next-line: no-string-literal
        this.type = options['type'] || '';
    }
}
