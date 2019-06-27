import { FormControl } from '@angular/forms';
import { ItemModelInterface, Genere } from '../modules/item/models/itemModelInterface';
import { ItemFilterOPtions } from '../modules/item/models/ItemFIlterOptions';
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { Value } from '../modules/item/models/value';
import { FirebaseObject } from '../models/firebaseObject';
export class SupplierModel implements ItemModelInterface, FirebaseObject {
    nome: string;
    note: string;
    indirizzo: string;
    address: string;
    latitudine: string;
    longitudine: string;
    latitude: number;
    longitude: number;
    altitude: string;
    title: string;
    fidelity_card: string;
    key: string;
    ecommerce: boolean;
    onLine: boolean; // back compatibility
    service:ItemServiceInterface
    constructor(fornitore?: {
        nome: string,
        note: string,
        title?: string,
        fidelity_card?: string,
        location: {

            address: string,
            latitude: number,
            longitude: number
        }
        altitude?: string,
        key: string,
        ecommerce: boolean,

    },key?:string,service?:ItemServiceInterface) {
        if(fornitore){
        this.key = fornitore && fornitore.key || '';
        this.nome = fornitore && fornitore.nome || '';
        this.note = fornitore && fornitore.note || '';
        this.altitude = fornitore && fornitore.altitude || '';
        this.address = fornitore && fornitore.location.address || '';
        this.latitude = fornitore && fornitore.location.latitude || 0;
        this.longitude = fornitore && fornitore.location.longitude || 0;
        this.fidelity_card = fornitore && fornitore.fidelity_card || '';
        this.title = fornitore && fornitore.title || this.nome;
        this.ecommerce = fornitore && fornitore.ecommerce || false;
        }
        if(key && service){
            this.key = key
            this.service = service
            this.load(key,service)
        }

    }

    getCountingText(){
        return " fornitori"
    }

    load(key, service) {
        if (service.getItem(key)) {
            service.getItem(key).on('value', sup => {

                const loader = ([Key, value]) => { this[Key] = value; };
                Object.entries(sup.val()).forEach(loader);
                this.key = key;
                // retro compatibilità
                this.title = this.title || this.nome;
                this.latitude = Number(this.latitude || this.latitudine);
                this.longitude = Number(this.longitude || this.longitudine);
                this.address = this.address || this.indirizzo;
                this.ecommerce = this.ecommerce || this.onLine;
            });
        }
        return this 
    }

    getFilterParams() {
        const out: ItemFilterOPtions = new ItemFilterOPtions('fornitore', 'text');
        return [out];
    }

    getElement() {
        const genere: Genere = 'o';
        return { element: 'fornitore', genere: genere };
    }
    getTitle() {
        const value = new Value();
        value.label = 'fornitore';
        value.value = this.title;
        return value;
    }

    hasQuickActions(){
        return false;
    }

    build(item) {
        this.key = item.key || '';
        this.nome = item.nome || '';
        this.note = item.note || '';
        this.latitudine = item.latitudine || '';
        this.longitudine = item.longitudine || '';
        this.ecommerce = this.ecommerce;
    }
    buildFromActiveForm(fornitore: {
        nome: FormControl,
        note: FormControl,
        key: FormControl,
        indirizzo: FormControl,
        longitudine: FormControl,
        altitude: FormControl,
        latitudine: FormControl,
        ecommerce: FormControl
    }) {
        this.key = fornitore && fornitore.key.value || '';
        this.nome = fornitore && fornitore.nome.value || '';
        this.note = fornitore && fornitore.note.value || '';
        this.altitude = fornitore && fornitore.altitude && fornitore.altitude.value || '';
        this.indirizzo = fornitore && fornitore.indirizzo.value || '';
        this.latitudine = fornitore && fornitore.latitudine.value || '';
        this.longitudine = fornitore && fornitore.longitudine.value || '';
        this.ecommerce = fornitore && fornitore.ecommerce.value || false;
        return this;
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
        value.label = 'fidelity card';
        value.value = this.fidelity_card;
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
        value.value = ' to be implented';
        return value;
    }


    serialize() {
        return {
            title: this.title,
            address: this.address,
            ecommerce: this.ecommerce,
            fidelity_card: this.fidelity_card,
            latitude: this.latitude,
            longitude: this.longitude,
            note: this.note
        };
    }

    getEditPopup() {

        return 'supplierUpdate';
    }

    getCreatePopup() {

        return 'supplierCreate';
    }

    getFilterPopup(next) {

    }

}
