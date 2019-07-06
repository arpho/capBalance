import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MyItemComponent } from "./components/item/item.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";
import { FilterItemsPipe } from "./pipes/filter-items.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { PageItemComponent } from "./components/page-item/page-item.component";
import { PageItemsListComponent } from "./components/page-items-list/page-items-list.page";
import { ShowValueComponent } from './components/show-value/show-value.component';
import { SorterItemsPipe } from './pipes/sorter-items.pipe';
import { ItemsFilterComponent } from './components/items-filter/items-filter.component';
import { FilterPopupPage } from './pages/filter-popup/filter-popup.page';
import { FilterPopupPageModule } from './pages/filter-popup/filter-popup.module';

@NgModule({
  declarations: [
    MyItemComponent,
    ItemsListComponent,
    FilterItemsPipe,
    FilterPopupPage,
    ItemsFilterComponent,
    SorterItemsPipe,
    PageItemComponent,
    PageItemsListComponent,
    ShowValueComponent,
    ItemsFilterComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot(), ReactiveFormsModule],
  entryComponents:[FilterPopupPage],
  exports: [
    MyItemComponent,
    ItemsListComponent,
    PageItemComponent,
    PageItemsListComponent,
    ItemsFilterComponent,
    ShowValueComponent,
    FilterPopupPage
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ItemModule { }
