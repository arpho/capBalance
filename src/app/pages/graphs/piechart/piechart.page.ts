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
  options = [new DateQuestion({
    key: 'dataInizio',
    label: 'inizio periodo',
    required: true

  }),
  new DateQuestion({
    key: 'dataFine',
    label: 'fine periodo',
    required: true
  }),
  new DropdownQuestion({
    key: 'entity',
    label: 'cosa vedere',
    options: this.entities,
    value: 'suppliers',
    required: true
  })
  ]
  submitText = ' Opzioni grafico'
  chart
  karts: Array<ShoppingKartModel>
  mappingFunctions = {
    suppliers: (kart: ShoppingKartModel) => {
      return { title: kart.getSupplier().title, total: Math.round(kart.totale * 100) / 100 }

    },
    payments: (kart: ShoppingKartModel) => {
      return { title: kart.getPayment().title, total: Math.round(kart.totale * 100) / 100 }
    },
    categories: (kart: ShoppingKartModel) => {

      const flattener = (acc: any, el: any) => {
        acc = [...acc, ...el]
        return acc

      }

      const mapper = (obj: { categorie: [CategoryModel], prezzo: number }) => {
        return obj.categorie.map((cat: CategoryModel) => [cat.title, obj.prezzo])
      }

      return kart.items.map(this.categoriesMapper).map(mapper) // lista delle liste di categorie di ogni acquisto
        .reduce(flattener) //  lista delle  categorie di ogni carrello
      // .reduce(flattener) // lista delle categorie di tutti i carrelli
    }
  }
  reducerFunctions = {
    suppliers: (acc: { fornitore: string, totale: number }, cv: { title: string, total: number }) => {
      acc[cv.title] = acc[cv.title] + cv.total || cv.total
      return acc
    },
    payments: (acc: { pagamento: string, totale: number }, cv: { title, total: number }) => {
      acc[cv.title] = acc[cv.title] + cv.total || cv.total
      return acc
    },
    categories: (acc: any, cv: any) => {
      acc = cv.reduce((innerAcc: {}, currentValue: [string, number]) => {
        innerAcc[currentValue[0]] = innerAcc[currentValue[0]] + currentValue[1] || currentValue[1]
        return innerAcc
      }, acc)
      // acc[cv[0]] = acc[cv[0]] + cv[1] || cv[1]
      return acc
    }
  }



  expandPurchases = (acc: any[], cv: any) => {
    /**
     * trasforma ogni acquisto in una lista di categorie
     */
    // console.log('expanding purchase', cv, 'acc', acc)
    return [...acc, ...cv.categorie].
      map(this.categoriesMapperFactory(cv.prezzo));
    // .map(this.mapCategoriesFactory(cv.prezzo)) { cats: [...acc, ...cv.categorie], prezzo: cv.prezzo }
  }

  categoriesMapper = (item: PurchaseModel) => ({ categorie: item.categorie, prezzo: item.prezzo })
  categoriesMapperFactory(prezzo: number) {
    /**
     * mappa la lista di categorie prodotta da expandPurchase  in una lista di oggetti {title:string,total:number}
     */
    const mapper = (cat: CategoryModel) => {
      return { title: cat.title, prezzo }

    }
    return mapper

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
        const extractedData = this.extractData(
          this.mappingFunctions.suppliers,
          this.filterFactory(7),
          this.reducerFunctions.suppliers
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
    const extractedData = this.extractData(this.mappingFunctions[ev.entity],
      this.dateFilterFactory({ dataInizio: new Date(ev.dataInizio), dataFine: new Date(ev.dataFine) }),
      this.reducerFunctions[ev.entity])
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

  extractData(
    mapFunction: (
      item: ShoppingKartModel) => { title: string, total: number },
    filterFunction: (item: ShoppingKartModel) => boolean,
    reducer: any) {
    const data = Object.entries(this.karts.filter(filterFunction).map(mapFunction).reduce(reducer, {}))
    const calcolaTotale = (acc: number, cv: [string, number]) => acc += cv[1]
    const totaleSpesa = data.reduce(calcolaTotale, 0)
    const data2Graph = data.map((item: [string, number]) => [item[0], Math.round(item[1] / totaleSpesa * 100)])
    return { data2Graph, totaleSpesa }

  }

}
