import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ItemModelInterface } from "../../models/itemModelInterface";
import { ItemServiceInterface } from "../../models/ItemServiceInterface";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-items-list",
  templateUrl: "./page-items-list.page.html",
  styleUrls: ["./page-items-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageItemsListComponent implements OnInit, OnChanges {
  @Input() items_list: ItemModelInterface[];
  @Input() service: ItemServiceInterface;
  public dummyItem: ItemModelInterface;
  @Input() filterFunction: (item: ItemModelInterface) => boolean;
  @Input() sorterFunction: any
  public showSpinner = true;

  constructor(public alertCtrl: AlertController, public router: Router, public modalController: ModalController) {
    this.filterFunction = v => true;
  }

  async createItem() {
    const modal = await this.modalController.create({ component: this.dummyItem.getCreatePopup() })
    return await modal.present()

  }
  ngOnInit() {
    this.filterFunction = (v: ItemModelInterface) => true;
    if (!this.sorterFunction) {
      this.sorterFunction = (a: ItemModelInterface, b: ItemModelInterface) => 0
    }
    if (this.service) {
      this.dummyItem = this.service.getDummyItem();
    }
  }

  async deleteItem(item: ItemModelInterface, slide) {
    slide.close();
    const element = this.service.getDummyItem().getElement();
    const alert = await this.alertCtrl.create({
      message: ` vuoi deavero cancellare quest${element.genere} ${
        element.element
        }?(${item.title})`,
      buttons: [
        {
          text: "Annulla",
          role: "cancel",
          handler: () => { }
        },
        {
          text: "Cancella",
          handler: () => {
            this.service.deleteItem(item.key);
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items_list && changes.items_list.currentValue) {
      this.items_list = changes.items_list.currentValue;
      this.showSpinner = false;
    }
    if (changes.filterFunction) {
      this.filterFunction = changes.filterFunction.currentValue;
    }
  }

  countItems() {
    return this.items_list
      ? this.items_list.filter(this.filterFunction).length
      : "loading";
  }

  editItem(item: ItemModelInterface) {
    this.router.navigate([item.getEditPopup(), item.key]);
  }


}
