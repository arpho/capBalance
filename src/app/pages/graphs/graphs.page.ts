// tslint:disable:semicolon
import { Component, OnInit } from '@angular/core';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { filter } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.page.html',
  styleUrls: ['./graphs.page.scss'],
})
export class GraphsPage implements OnInit {
  chart
  karts: Array<ShoppingKartModel>
  mappingFunctions = {
    suppliersMapper: (item: ShoppingKartModel) => {
      const out = { title: item.getSupplier().title, total: Math.round(item.totale * 100) / 100 }
      return out
    }
  }
  reducerFunctions = {
    suppliersReducer: (acc: { fornitore: string, totale: number }, cv: { title: string, total: number }) => {
      acc[cv.title] = acc[cv.title] + cv.total || cv.total
      return acc
    }
  }

  constructor(public service: ShoppingKartsService) {


  }

  ngOnInit() {
    this.chart = {
      title: 'test',
      type: 'PieChart',
      data: [
        ['Firefox', 45.0],
        ['IE', 26.8],
        ['Chrome', 12.8],
        ['Safari', 8.5],
        ['Opera', 6.2],
        ['Others', 0.7]
      ],
      columnNames: ['year', 'Asia']
    }
    if (this.service.getEntitiesList()) {
      this.service.getEntitiesList().on('value', kartsSnap => {
        this.karts = []
        kartsSnap.forEach(snap => {
          const kart = new ShoppingKartModel({ item: snap.val(), service: this.service }).setKey(snap.key)
          kart.load()

          this.karts.push(kart)
        })
        const extractedData = this.extractData(
          this.mappingFunctions.suppliersMapper,
          this.filterFactory(7),
          this.reducerFunctions.suppliersReducer
        )
        this.chart.data = extractedData.data2Graph
        this.chart.title = this.makeTitle(extractedData.totaleSpesa, 7)
      })
    }
  }

  makeTitle(tot: number, days: number) {
    return `${tot} di  spesa negli  ultimi ${days} giorni`
  }

  filterFactory(day: number) {
    const today = new Date()
    const since = new Date(new Date().setDate(today.getDate() - 7))
    return (item: ShoppingKartModel) => new Date(item.purchaseDate.formatDate()) > since

  }

  extractData(mapFunction: (item: ShoppingKartModel) => { title: string, total: number },
    filterFunction: (item: ShoppingKartModel) => boolean,
    reducer: any) {
    const data = Object.entries(this.karts.filter(filterFunction).map(mapFunction).reduce(reducer, {}))
    const sommatore = (acc, cv: [string, number]) => acc[cv[0]] = acc[cv[0]] + cv[1] || cv[1]
    const calcolaTotale = (acc: number, cv: [string, number]) => acc += cv[1]
    const totaleSpesa = data.reduce(calcolaTotale, 0)
    const data2Graph = data.map((item: [string, number]) => [item[0], Math.round(item[1] / totaleSpesa * 100)])
    return { data2Graph, totaleSpesa }

  }

}
