// tslint:disable: semicolon
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalComponent implements OnInit, OnChanges {
  @Input() items: Array<PurchaseModel>
  @Output() total: EventEmitter<number> = new EventEmitter()
  totalValue = 0

  constructor(public toastCtrl: ToastController) { }

  ngOnInit() { }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    })
    toast.present()

  }

  ngOnChanges(changes: SimpleChanges) {
    const reducer: (acc: number, curr: PurchaseModel) => number = (acc: number, curr: PurchaseModel) => acc + curr.prezzo
    const total = this.items ? this.items.reduce<number>(reducer, 0) : 0
    this.totalValue = Math.round(total * 100) / 100
    this.total.emit(total)
    this.showToast(`Totale: ${this.totalValue}`)
  }

}
