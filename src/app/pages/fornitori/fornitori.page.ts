import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { SupplierModel } from 'src/app/models/supplierModel';
import { Router } from '@angular/router';
import { GeoService } from '../../modules/geo-location/services/geo-service';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { ItemControllerInterface } from '../../modules/item/models/ItemControllerInterface'
import { DistanceSorterPipe } from 'src/app/modules/geo-location/pipes/distance-sorter.pipe';

@Component({
  selector: 'app-fornitori',
  templateUrl: './fornitori.page.html',
  styleUrls: ['./fornitori.page.scss'],
})
export class FornitoriPage implements OnInit, OnChanges, ItemControllerInterface {
  public ItemsList: Array<SupplierModel>;
  public filterLabel: string = 'Categorie';
  public filterString: string;
  public filterFields: any;
  public filterFunction: (item: SupplierModel) => boolean;
  public sorterFunction: (a: any, b: any) => number
  public position = { latitude: 0, longitude: 0 };

  constructor(
    public suppliers: SuppliersService,
    public geo: GeoService,
    public router: Router, ) {
    this.sorterFunction = (a: SupplierModel, b: SupplierModel) => {

      // console.log('distanza con a', this.distance(a.latitude, a.longitude, this.position.latitude, this.position.longitude))
      // console.log('distanza con b',this.distance(b.latitude, b.longitude, this.position.latitude, this.position.longitude))
      // console.log('distance', this.distance(a.latitude, a.longitude, this.position.latitude, this.position.longitude) -
      return this.geo.distance(a.address.latitude, a.address.longitude, this.position.latitude, this.position.longitude) -
        this.geo.distance(b.address.latitude, b.address.longitude, this.position.latitude, this.position.longitude);
    }
    this.filterFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Nome del Fornitore',
        // value: 'Bombasto',
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'note',
        // value: 'Bombasto',
        order: 2
      }),
      new SwitchQuestion({
        key: 'ecommerce',
        label: 'venditore online',
        labelTrue: 'venditore fa ecommerce',
        labelFalse: ' venditore tradizionale',
        required: false,
        order: 4
      })
    ];

  }


  filter(filterParams) { // è possibile filtrare per titolo, nota  e ecommerce
    console.log(filterParams);
    const filterTitle: (item: ItemModelInterface) => boolean = (!filterParams.title) ? (item: ItemModelInterface) => true :
      (item: ItemModelInterface) => item.title.toLocaleLowerCase().indexOf(filterParams.title.toLowerCase()) > -1;
    const filterNote = (!filterParams.note) ? (item: ItemModelInterface) => true :
      (item: ItemModelInterface) => item.note.toLocaleLowerCase().indexOf(filterParams.note.toLowerCase()) > -1;
    this.filterFunction = (item: ItemModelInterface) => filterNote(item) && filterTitle(item);
    const filterEcommerce: (item: ItemModelInterface) => boolean = (!filterParams.ecommerce) ? (item: ItemModelInterface) => true :
      (item: SupplierModel) => item.ecommerce;
    // combina le funzioni filtro elemewntari
    this.filterFunction = (item: ItemModelInterface) => filterEcommerce(item) && filterNote(item) && filterTitle(item);

  }

  async ngOnInit() {
    this.geo.getPosition().then(coords => {
      this.position = { latitude: coords.coords.latitude, longitude: coords.coords.longitude };
    });
    if (this.suppliers.getEntitiesList()) {
      this.suppliers.getEntitiesList().on('value', eventSuppliersListSnapshot => {
        this.ItemsList = [];
        eventSuppliersListSnapshot.forEach(snap => {
          const supplier = new SupplierModel(undefined, snap.key, this.suppliers)
          supplier.load()
          supplier.key = snap.key // alcuni item non hanno il campo key
          this.ItemsList.push(supplier);
        });
      });
    }
  }



  ngOnChanges(changes: SimpleChanges) {
    this.geo.getPosition().then(coords => {
      this.position = { latitude: coords.coords.latitude, longitude: coords.coords.longitude };
    });

  }

}
