// tslint:disable: semicolon
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PurchaseModel } from 'src/app/models/purchasesModel';

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

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const reducer: (acc: number, curr: PurchaseModel) => number = (acc: number, curr: PurchaseModel) => acc + curr.prezzo
    const total = this.items.reduce<number>(reducer, 0)
    this.totalValue = total
    this.total.emit(total)
  }

}
