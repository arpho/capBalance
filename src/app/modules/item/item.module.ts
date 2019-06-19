import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MyItemComponent } from "./components/item/item.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";
import { FilterItemsPipe } from "./pipes/filter-items.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { PageItemComponent } from "./components/page-item/page-item.component";
import { PageItemsListComponent } from "./components/page-items-list/page-items-list.page";

@NgModule({
  declarations: [
    MyItemComponent,
    ItemsListComponent,
    FilterItemsPipe,
    PageItemComponent,
    PageItemsListComponent
  ],
  imports: [CommonModule, IonicModule.forRoot(), ReactiveFormsModule],
  exports: [
    MyItemComponent,
    ItemsListComponent,
    PageItemComponent,
    PageItemsListComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ItemModule {}
