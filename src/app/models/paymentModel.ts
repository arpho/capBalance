// tslint:disable:semicolon
import { AbstractControl, FormControl } from '@angular/forms';
import { ItemModelInterface, Genere } from '../modules/item/models/itemModelInterface';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { Value } from '../modules/item/models/value';
import { ItemFilterOPtions } from '../modules/item/models/ItemFIlterOptions';
import { QuickAction } from '../modules/item/models/QuickAction';
import { CreatePaymentPage } from '../pages/create-payment/create-payment.page';
export class PaymentsModel implements ItemModelInterface {
    nome: string; // retro compatibilità
    title: string;
    note: string;
    addebito: string;
    key: string;
    quickActions: Array<QuickAction>
    archived: boolean;
    service: ItemServiceInterface
    constructor(payment?: {
        nome: FormControl,
        addebito: FormControl,
        note: FormControl
        key: FormControl
        },
        key?: string,
        service?: ItemServiceInterface) {

        if (payment) {
            this.nome = payment && payment.nome.value || '';
            this.title = this.nome;
            this.addebito = payment && payment.addebito.value || '';
            this.note = payment && payment.note.value || '';
            this.key = payment && payment.key.value || '';
        }
        this.key = key;
        this.service = service;


    }

    build(item) {
        this.key = item.key
        this.title = item.title || item.nome
        this.addebito = item.addebito
        this.note = item.note
    }

    getCountingText() {
        return ' metodi di pagamento'
    }

    getFilterParams() {
        const out: ItemFilterOPtions = new ItemFilterOPtions('categoria', 'text');
        return [out];
    }
    async load() {
        if (this.key && this.service) {
            this.service.getItem(this.key).on('value', pay => {
                if (pay.val()) {
                    this.nome = pay.val().nome ? pay.val().nome : '';
                    this.title = this.nome;
                    this.title = pay.val().title || this.nome; // se lo item è aggiornato avrà il valore di tilte, altrimenti quello di nome
                    this.note = pay.val().note;
                    this.archived = pay.val().archived;
                }
            });
        }
        return this
    }

    getFilterPopup(next) {

        return {
            subHeader: 'modifica categoria',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'cerca categoria',
                    value: 'test filter',
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        const filterFunction = (item: ItemModelInterface) => {
                            return this.title.toLowerCase().indexOf(data[0]) > -1;
                        };
                        next(filterFunction);
                    },
                },
            ],
        };
    }

    buildPayment(payment: any): PaymentsModel {
        this.nome = payment.nome;
        this.key = payment.key;
        this.addebito = payment.addebito;
        this.note = payment.note;
        return this;
    }

    getEditPopup(item: ItemModelInterface, service: ItemServiceInterface) {

        return {
            subHeader: 'modifica pagamento',
            inputs: [
                {
                    type: 'text',
                    name: 'title',
                    placeholder: 'pagamento',
                    value: item.title,
                },
                {
                    type: 'text',
                    name: 'note',
                    placeholder: 'note',
                    value: item.note,
                },
            ],
            buttons: [
                { text: 'Annulla' },
                {
                    text: 'Salva',
                    handler: data => {
                        item.title = data.title;
                        item.note = data.note;
                        service.updateItem(item);
                    },
                },
            ],
        };
    }

    getCreatePopup() {
        return CreatePaymentPage
    }
    getQuickActions() {
        return this.quickActions
    }

    hasQuickActions() {
        return true
    }

    getElement() {
        const genere: Genere = 'o';
        return { element: 'metodo di pagamento', genere };
    }


    getTitle() {
        const value = new Value();
        value.label = 'pagamento';
        value.value = this.title;
        return value;
    }

    getNote() {
        const value = new Value();
        value.label = 'note';
        value.value = this.note;
        return value;
    }

    aggregateAction() { }

    getValue2() {
        const value = new Value();
        return value;
    }

    getValue3() {
        const value = new Value();
        return value;
    }

    showDetail() {

    }

    getValue4() {
        const value = new Value();
        return value;
    }

    getAggregate() {
        const value = new Value();
        value.label = 'spesa complessiva';
        value.value = 'to be implented';
        return value;
    }


    serialize() {
        const out = { key: this.key, title: this.title, addebito: this.addebito, note: this.note, };
        return out;
    }
}
