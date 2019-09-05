// tslint:disable:semicolon
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectorItemsPage } from '../../pages/selector-items/selector-items.page';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-selector-items',
  templateUrl: './selector-items.component.html',
  styleUrls: ['./selector-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorItemsComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() text: string
  @Input() item: ItemModelInterface
  @Input() service: ItemServiceInterface
  @Output() selectedItem: EventEmitter<ItemModelInterface> = new EventEmitter()
  @Input() filterFunction: (item: ItemModelInterface) => boolean
  @Input() sorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number
  private disabled = false
  writeValue(value: any): void {
    this.item = value
    this.onChange(value)
  }
  // tslint:disable-next-line: ban-types
  private onChange: Function = (location: Coordinates) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
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
    })
    return await modal.present()

  }

}
