// tslint:disable:semicolon
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  forwardRef,
  HostBinding
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectorItemsPage } from '../../pages/selector-items/selector-items.page';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuestionProperties } from 'src/app/modules/dynamic-form/models/questionproperties';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-selector-items',
  templateUrl: './selector-items.component.html',
  styleUrls: ['./selector-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SelectorItemsComponent)
  }]

})

export class SelectorItemsComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() text: string
  // tslint:disable: no-input-rename
  // tslint:disable-next-line: variable-name
  @Input('value') _value = undefined;
  @Input() item: ItemModelInterface
  @Input() service: ItemServiceInterface
  @Output() selectedItem: EventEmitter<ItemModelInterface> = new EventEmitter()
  @Input() filterFunction: (item: ItemModelInterface) => boolean
  @Input() sorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number
  @Input() formControlName: string

  @HostBinding('attr.id')
  externalId = '';
  private _ID = '';
  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }
  get id() {
    return this._ID
  }
  private disabled = false

  writeValue(value: any): void {
    if (value !== undefined) {
      this.item = value
      this.value = value
    }
    console.log('writing ', value)
    this.onChange(value)
  }
  // tslint:disable-next-line: ban-types
  onChange: any = () => { };
  // tslint:disable-next-line: ban-types
  onTouched: any = () => { };
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled
  }


  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sorterFunction) {
      this.sorterFunction = changes.sorterFunction.currentValue
    }

    if (changes.filterFunction) {
      this.filterFunction = changes.filterFunction.currentValue
    }
  }
  async action() {
    const modal = await this.modalCtrl.create({
      component: SelectorItemsPage,
      componentProps: {
        item: this.item,
        title: this.text,
        service: this.service,
        filterFunction: this.filterFunction,
        sorterFunction: this.sorterFunction

      }
    });
    modal.onDidDismiss().then(data => {
      this.item = data.data
      this.selectedItem.emit(data.data)
      this.writeValue(this.item)
    })
    return await modal.present()

  }

}
