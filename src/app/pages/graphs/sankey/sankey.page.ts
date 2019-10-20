import { Component, OnInit } from '@angular/core';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { CategoryModel } from 'src/app/models/CategoryModel';
// tslint:disable:semicolon
@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.page.html',
  styleUrls: ['./sankey.page.scss'],
})
export class SankeyPage implements OnInit {
  chart: any
  data
  karts: Array<ShoppingKartModel>
  tempDate = new Date(Date.now());
  options = [new DateQuestion({
    key: 'dataInizio',
    label: 'inizio periodo',
    value: new DateModel(new Date(this.tempDate).setDate(this.tempDate.getDate() - 7)).formatDate(),
    required: true

  }),
  new DateQuestion({
    key: 'dataFine',
    label: 'fine periodo',
    value: new DateModel(new Date()).formatDate(),
    required: true
  })
  ];
  submitText = ' Opzioni grafico';
  constructor(public service: ShoppingKartsService) { }

  ngOnInit() {
    this.chart = {
      title: 'test',
      type: 'Sankey',
      data: [
        ['A', 'X', 5],
        ['A', 'Y', 7],
        ['A', 'Z', 6],
        ['B', 'X', 2],
        ['B', 'Y', 9],
        ['B', 'Z', 4],
        ['B', 'C', 6],
        ['C', 'X', 7]
      ],
      columnNames: ['From', 'To', 'Toale spesa'],
      options: {
        width: 300,
        height: 500
      }
    };
    if (this.service.getEntitiesList()) {
      this.service.getEntitiesList().on('value', kartsSnap => {
        this.karts = []
        kartsSnap.forEach(snap => {
          const kart = new ShoppingKartModel({ item: snap.val(), service: this.service }).setKey(snap.key)
          kart.load()

          this.karts.push(kart)
        })
        const extractedData = this.extractData(
          // this.transformers.categories,
          this.filterFactory(7)
        )
        this.setData({ data: extractedData, title: this.makeTitle(extractedData.totaleSpesa, 7) })
      })
    }
  }

  makeTitle(tot: number, days: number) {
    return `${tot} di  spesa negli  ultimi ${days} giorni`
  }

  setData(data: { data: [], title: string }) {
    this.chart.data = data.data
    this.chart.title = data.title

  }


  filterFactory(day: number) {
    const today = new Date()
    const since = new Date(new Date().setDate(today.getDate() - day))
    return (item: ShoppingKartModel) => new Date(item.purchaseDate.formatDate()) > since

  }
  roundNumber = (val: number) => Math.round(val * 100) / 100

  extractData(filterFunction) {
    const calcolaTotale = (acc: number, currentKart: ShoppingKartModel) => {
      acc += currentKart.totale
      return acc
    }
    const totaleSpesa = this.karts ? Math.round(this.karts.filter(filterFunction).reduce(calcolaTotale, 0) * 100) / 100 : 0
    // estrae la lista degli acquisti di ogni carrello
    const mappKart2Purchse = (kart: ShoppingKartModel) => kart.items
    const flattener = (acc: any, el: any) => {
      acc = [...acc, ...el]
      return acc
    }
    const purchases = this.karts.filter(filterFunction).map(mappKart2Purchse).reduce(flattener, [])
    const mapPurchase2CategoriesList = (purchase: PurchaseModel) => ({ categorie: purchase.categorie, prezzo: purchase.prezzo })
    const categoriesPriceList = purchases.map(mapPurchase2CategoriesList)
    // mappa gli oggetti di categoriesPrice con una lista di oggetti [caegoria:CategoryModel,prezzo:number]
    const mapCategoriesprice2CategoryPrice = (item: { categorie: Array<CategoryModel>, prezzo: number }) => {
      const CategoryMapper = (cat: CategoryModel) => ({ categoria: cat, prezzo: item.prezzo })
      return item.categorie.map(CategoryMapper)
    }
    const categoryPriceList = categoriesPriceList.map(mapCategoriesprice2CategoryPrice).reduce(flattener, [])
    const calcolaTotaleCategory = (acc: {}, cv: { categoria: CategoryModel, prezzo: number }) => {
      if (cv.categoria && cv.categoria.key) {
        acc[cv.categoria.key] = acc[cv.categoria.key] ?
          { categoria: cv.categoria, prezzo: this.roundNumber(acc[cv.categoria.key].prezzo + cv.prezzo) } :
          {
            categoria: cv.categoria, prezzo: cv.prezzo
          }
      }
      return acc
    }
    const totaleCategorie = categoryPriceList.reduce(calcolaTotaleCategory, {})
    const reduceTotaleCategorie2List = (acc, cv) => {
      acc.push(cv[1])
      return acc
    }
    const totaleCategorieList = Object.entries(totaleCategorie).reduce(reduceTotaleCategorie2List, [])
    const CategoryPrice2dataMapper = (item: { categoria: CategoryModel, prezzo: number }) => {
      return [item.categoria.title, item.categoria.afferTo(), item.prezzo]
    }
    const data2Graph = Object.entries(this.karts
      .filter(filterFunction)
      .map(mappKart2Purchse)
      .reduce(flattener, [])
      .map(mapPurchase2CategoriesList)
      .map(mapCategoriesprice2CategoryPrice).reduce(flattener, [])
      .reduce(calcolaTotaleCategory, {})).reduce(reduceTotaleCategorie2List, [])
      .map(CategoryPrice2dataMapper)
    return data2Graph
  }


  // const formatted = data2Graph.map(dataFormatter)
  // return { data2Graph: formatted, totaleSpesa }



  dateFilterFactory(args: { dataInizio: Date, dataFine: Date }) {
    return (item: ShoppingKartModel) => new Date(item.purchaseDate.formatDate()) >= args.dataInizio &&
      new Date(item.purchaseDate.formatDate()) <= args.dataFine

  }

  filter(ev) {

  }



  submit(ev: { dataInizio: string, dataFine: string, entity: string }) {
    const data2Graph = this.extractData(this.dateFilterFactory({
      dataInizio: new Date(ev.dataInizio),
      dataFine: new Date(ev.dataFine)
    }))
    this.setData({ data: data2Graph, title: '' })
  }

}
