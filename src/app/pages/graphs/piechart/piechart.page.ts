// tslint:disable:semicolon
import { Component, OnInit } from '@angular/core';
import { ShoppingKartsService } from 'src/app/services/shoppingKarts/shopping-karts.service';
import { ShoppingKartModel } from 'src/app/models/shoppingKartModel';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DropdownQuestion } from 'src/app/modules/item/models/question-dropdown';
import { ComboValue } from '../../../modules/dynamic-form/models/ComboValueinterface'
import { Entities } from 'src/app/modules/user/models/EntitiesModel';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { DatePipe } from '@angular/common';
import { PurchaseModel } from 'src/app/models/purchasesModel';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { Title } from '@angular/platform-browser';
import { DateModel } from '../../../modules/user/models/birthDateModel'
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.page.html',
  styleUrls: ['./piechart.page.scss'],
})
// tslint:disable-next-line: component-class-suffix

export class PiechartPage implements OnInit {
  entities = [new Entities({ key: 'Fornitori', value: 'suppliers' }),
  new Entities({ key: 'Pagamenti', value: 'payments' }),
  new Entities({ key: 'Categorie', value: 'categories' })]
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
  }),
  new DropdownQuestion({
    key: 'entity',
    label: 'cosa vedere',
    options: this.entities,
    value: 'categories',
    required: true
  })
  ]
  submitText = ' Opzioni grafico'
  chart
  karts: Array<ShoppingKartModel>
  transformers = {
    categories: (karts: Array<ShoppingKartModel>) => {
      const flattener = (acc: any, el: any) => {
        acc = [...acc, ...el]
        return acc
      }
      const expandCategoriesList2categoryPriceObject = (element: { categorie: Array<CategoryModel>, prezzo: number }) =>
        element.categorie.reduce((acc, cv) => {
          acc.push({ categoria: cv, prezzo: element.prezzo })
          return acc
        }, [])
      const categoryPriceReducer = (acc: {}, currentValue: { categoria: CategoryModel, prezzo: number }) => {
        acc[currentValue.categoria.title] = acc[currentValue.categoria.title] + currentValue.prezzo || currentValue.prezzo
        return acc
      }
      const purchaseModel2CategoriesListMapper = (purchase: PurchaseModel) => ({ categorie: purchase.categorie, prezzo: purchase.prezzo })
      const karts2PurchaseListMapper = (Kart: ShoppingKartModel) => Kart.items
      return karts.map(karts2PurchaseListMapper).reduce(flattener, []).
        map(purchaseModel2CategoriesListMapper).
        map(expandCategoriesList2categoryPriceObject).reduce(flattener, []).reduce(categoryPriceReducer, {})
    },
    suppliers: (karts: Array<ShoppingKartModel>) => {
      const reducer = (acc: { title: string, total: number }, cv: { title: string, total: number }) => {
        acc[cv.title] = acc[cv.title] + cv.total || cv.total
        return acc
      }
      const mapper = (kart: ShoppingKartModel) => {
        return { title: kart.getSupplier().title, total: Math.round(kart.totale * 100) / 100 }
      }
      return karts.map(mapper).reduce(reducer, { title: '', total: 0 })
    },
    payments: (karts: Array<ShoppingKartModel>) => {
      const mapper = (kart: ShoppingKartModel) => {
        return { title: kart.getPayment().title, total: Math.round(kart.totale * 100) / 100 }
      }
      const reducer = (acc: { title: string, total: number }, cv: { title, total: number }) => {
        acc[cv.title] = acc[cv.title] + cv.total || cv.total
        return acc
      }
      return karts.map(mapper).reduce(reducer, { title: '', total: 0 })
    }
  }

  constructor(
    public service: ShoppingKartsService,
    public datepipe: DatePipe) { }

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
        const extractedData = this.newExtractData(
          this.transformers.categories,
          this.filterFactory(7)
        )
        this.setData({ data: extractedData.data2Graph, title: this.makeTitle(extractedData.totaleSpesa, 7) })
      })
    }
  }
  setData(args: { data, title }) {
    this.chart.data = args.data
    this.chart.title = args.title
  }

  filter(ev) {
  }

  submit(ev: { dataInizio: string, dataFine: string, entity: string }) {
    const extractedData = this.newExtractData(this.transformers[ev.entity],
      this.dateFilterFactory({ dataInizio: new Date(ev.dataInizio), dataFine: new Date(ev.dataFine) }))
    this.setData({
      data: extractedData.data2Graph,
      title: this.makeDataTitle({
        tot: extractedData.totaleSpesa,
        dataInizio: new Date(ev.dataInizio),
        dataFine: new Date(ev.dataFine)
      })
    })


  }
  makeDataTitle(args: { tot: number, dataInizio: Date, dataFine: Date }) {
    return `tra ${this.datepipe.transform(args.dataInizio, 'dd/MM/yyyy')} e ${this.datepipe.transform(args.dataFine, 'dd/MM/yyyyy')}
    spesi ${Math.round(args.tot * 100) / 100}`
  }

  makeTitle(tot: number, days: number) {
    return `${tot} di  spesa negli  ultimi ${days} giorni`
  }

  dateFilterFactory(args: { dataInizio: Date, dataFine: Date }) {
    return (item: ShoppingKartModel) => new Date(item.purchaseDate.formatDate()) >= args.dataInizio &&
      new Date(item.purchaseDate.formatDate()) <= args.dataFine

  }

  filterFactory(day: number) {
    const today = new Date()
    const since = new Date(new Date().setDate(today.getDate() - day))
    return (item: ShoppingKartModel) => new Date(item.purchaseDate.formatDate()) > since
  }
  
  newExtractData(trasformer, filterFunction) {
    const trasformed = trasformer(this.karts.filter(filterFunction))
    const data = Object.entries(trasformed)
    const calcolaTotale = (acc: number, currentKart: ShoppingKartModel) => {
      acc += currentKart.totale
      return acc
    }
    const totaleSpesa = this.karts.filter(filterFunction).reduce(calcolaTotale, 0)
    const data2Graph = data
    // const rounder = (Data: number) => Math.round(Data * 100) / 100
    const dataFormatter = (Data: [string, number]) => {
      return [`${Data[0]}`, Math.round(Data[1] * 100) / 100]
    }
    const formatted = data2Graph.map(dataFormatter)
    return { data2Graph: formatted, totaleSpesa }
  }


}
