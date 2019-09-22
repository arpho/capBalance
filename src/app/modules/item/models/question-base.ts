// tslint:disable:semicolon
import { ItemModelInterface } from '../models/itemModelInterface'
export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;

    constructor(options: {
        value?: T,
        key: string,
        label: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        labelTrue?: string,
        labelFalse?: string,
    }) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        // tslint:disable-next-line: prefer-const
        for (let key in options) {
            if (options[key]) {
                this[key] = options[key];
            }
        }
    }
    filterFactory() {
        // tslint:disable-next-line: no-string-literal
        return this['filterFunction'] || ((item: ItemModelInterface) => Boolean)
    }
}
